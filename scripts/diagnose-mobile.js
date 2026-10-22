import http from 'node:http';
import { spawn } from 'node:child_process';

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const port = 9334;
const tempDir = `C:\\Users\\7x\\AppData\\Local\\Temp\\edge_diag_${Date.now()}`;

const proc = spawn(edgePath, [
  '--headless=new',
  `--remote-debugging-port=${port}`,
  `--user-data-dir=${tempDir}`,
  'about:blank'
]);

function wait(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function run() {
  let json = null;
  for (let attempt = 0; attempt < 20; attempt++) {
    await wait(300);
    try {
      json = await new Promise((resolve, reject) => {
        const req = http.get(`http://127.0.0.1:${port}/json/version`, res => {
          let data = '';
          res.on('data', c => data += c);
          res.on('end', () => resolve(JSON.parse(data)));
        });
        req.on('error', reject);
      });
      if (json && json.webSocketDebuggerUrl) break;
    } catch (e) {}
  }

  const ws = new WebSocket(json.webSocketDebuggerUrl);
  let id = 1;
  const callbacks = new Map();

  function send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const msgId = id++;
      callbacks.set(msgId, { resolve, reject });
      ws.send(JSON.stringify({ id: msgId, method, params }));
    });
  }

  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if (msg.id && callbacks.has(msg.id)) {
      const cb = callbacks.get(msg.id);
      callbacks.delete(msg.id);
      if (msg.error) cb.reject(msg.error);
      else cb.resolve(msg.result);
    }
  };

  await new Promise(r => ws.onopen = r);

  const { targetId } = await send('Target.createTarget', { url: 'about:blank' });
  const { sessionId } = await send('Target.attachToTarget', { targetId, flatten: true });

  function sendSession(method, params = {}) {
    return new Promise((resolve, reject) => {
      const msgId = id++;
      callbacks.set(msgId, { resolve, reject });
      ws.send(JSON.stringify({ id: msgId, sessionId, method, params }));
    });
  }

  await sendSession('Page.enable');
  await sendSession('Emulation.setDeviceMetricsOverride', {
    width: 390,
    height: 844,
    deviceScaleFactor: 1,
    mobile: true,
  });

  await sendSession('Page.navigate', { url: 'http://localhost:4180/?noload=true' });
  await wait(2000);

  // Scroll to 1450
  await sendSession('Runtime.evaluate', {
    expression: `window.scrollTo(0, 1450);`
  });
  await wait(1000);

  // Evaluate page structure
  const result = await sendSession('Runtime.evaluate', {
    expression: `
      (() => {
        const sections = Array.from(document.querySelectorAll('section')).map(s => {
          const rect = s.getBoundingClientRect();
          const style = window.getComputedStyle(s);
          return {
            class: s.className,
            top: Math.round(rect.top),
            bottom: Math.round(rect.bottom),
            height: Math.round(rect.height),
            opacity: style.opacity,
            h2Text: s.querySelector('h2') ? s.querySelector('h2').textContent : null,
            h2Opacity: s.querySelector('h2') ? window.getComputedStyle(s.querySelector('h2')).opacity : null,
            h2Reveal: s.querySelector('h2') ? s.querySelector('h2').dataset.textReveal : null,
            cards: Array.from(s.querySelectorAll('article, .home-collection, .product-card')).map(c => {
              const cRect = c.getBoundingClientRect();
              const cStyle = window.getComputedStyle(c);
              return {
                class: c.className,
                top: Math.round(cRect.top),
                opacity: cStyle.opacity,
                visibility: cStyle.visibility,
                display: cStyle.display,
                itemReveal: c.dataset.itemReveal
              };
            })
          };
        });
        return {
          windowScrollY: window.scrollY,
          sections
        };
      })()
    `,
    returnByValue: true
  });

  console.log(JSON.stringify(result.result.value, null, 2));

  ws.close();
  proc.kill();
  process.exit(0);
}

run().catch(err => {
  console.error(err);
  proc.kill();
  process.exit(1);
});

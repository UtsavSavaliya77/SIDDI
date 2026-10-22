import http from 'node:http';
import fs from 'node:fs';
import { spawn } from 'node:child_process';
import path from 'node:path';

const artifactsDir = 'C:\\Users\\7x\\.gemini\\antigravity\\brain\\6a883add-40a1-4b1a-9c3a-afcc67d88c31';
const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const port = 9352;
const tempDir = `C:\\Users\\7x\\AppData\\Local\\Temp\\edge_scr_${Date.now()}`;

const proc = spawn(edgePath, [
  '--headless=new',
  `--remote-debugging-port=${port}`,
  `--user-data-dir=${tempDir}`,
  'about:blank'
]);

const wait = ms => new Promise(r => setTimeout(r, ms));

async function run() {
  let json = null;
  for (let attempt = 0; attempt < 25; attempt++) {
    await wait(250);
    try {
      json = await new Promise((resolve, reject) => {
        const req = http.get(`http://127.0.0.1:${port}/json/version`, res => {
          let data = '';
          res.on('data', c => data += c);
          res.on('end', () => {
            try { resolve(JSON.parse(data)); } catch (e) { reject(e); }
          });
        });
        req.on('error', reject);
        req.setTimeout(500, () => req.destroy());
      });
      if (json?.webSocketDebuggerUrl) break;
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
  await sendSession('Runtime.enable');

  async function captureView({ width, height, isMobile, filename, extraScroll = 0, clickSelector = null }) {
    await sendSession('Emulation.setDeviceMetricsOverride', {
      width,
      height,
      deviceScaleFactor: 1,
      mobile: isMobile,
    });

    await sendSession('Page.navigate', { url: 'http://localhost:4180/?noload=true' });
    
    // Poll until .finish-options-section is mounted
    for (let i = 0; i < 30; i++) {
      await wait(300);
      const found = await sendSession('Runtime.evaluate', {
        expression: `!!document.querySelector('.finish-options-section')`,
        returnByValue: true
      });
      if (found?.result?.value) break;
    }
    await wait(600);

    // Find bounding box of .finish-options-section
    const evalRes = await sendSession('Runtime.evaluate', {
      expression: `(() => {
        const el = document.querySelector('.finish-options-section');
        if (!el) return null;
        const rect = el.getBoundingClientRect();
        return {
          top: rect.top + window.scrollY,
          left: rect.left,
          width: rect.width,
          height: rect.height
        };
      })()`,
      returnByValue: true
    });

    const box = evalRes.result.value;
    console.log(`[${filename}] FinishOptionsSection top offset:`, box ? box.top : 'not found');

    if (box && box.top > 0) {
      const targetScroll = Math.max(0, Math.round(box.top - 15 + extraScroll));
      const step = 120;
      const steps = Math.ceil(targetScroll / step);
      const midX = Math.round(width / 2);
      const midY = Math.round(height / 2);

      for (let s = 0; s < steps; s++) {
        const delta = (s === steps - 1) ? (targetScroll - s * step) : step;
        await sendSession('Input.dispatchMouseEvent', {
          type: 'mouseWheel',
          x: midX,
          y: midY,
          deltaX: 0,
          deltaY: delta,
        });
        await wait(25);
      }
      await wait(800);
    }

    if (clickSelector) {
      const clickCoord = await sendSession('Runtime.evaluate', {
        expression: `(() => {
          const btn = Array.from(document.querySelectorAll('.finish-options-section button')).find(b => b.textContent.includes('${clickSelector}') && b.offsetParent !== null);
          if (!btn) return null;
          const r = btn.getBoundingClientRect();
          return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
        })()`,
        returnByValue: true
      });
      if (clickCoord?.result?.value) {
        const { x, y } = clickCoord.result.value;
        await sendSession('Input.dispatchMouseEvent', { type: 'mousePressed', x, y, button: 'left', clickCount: 1 });
        await sendSession('Input.dispatchMouseEvent', { type: 'mouseReleased', x, y, button: 'left', clickCount: 1 });
        await wait(600);
      }
    }

    const { data } = await sendSession('Page.captureScreenshot', { format: 'png' });
    const fullPath = path.join(artifactsDir, filename);
    fs.writeFileSync(fullPath, Buffer.from(data, 'base64'));
    console.log(`Saved screenshot to ${fullPath}`);
  }

  // 1. Tablet 768x1024 - Compact hero image + 6 in row + content without 2nd image
  await captureView({
    width: 768,
    height: 1024,
    isMobile: false,
    filename: 'verify-tablet-compact-hero.png'
  });

  // 2. Tablet 768x1024 - Click Brushed Brass (Dynamic main image update!)
  await captureView({
    width: 768,
    height: 1024,
    isMobile: false,
    clickSelector: 'Brushed brass',
    filename: 'verify-tablet-clicked-brass.png'
  });

  // 3. Mobile 375x812 - Horizontal scrolling swatches (no 2-row grid) + content
  await captureView({
    width: 375,
    height: 812,
    isMobile: true,
    filename: 'verify-mobile-horizontal-scroll.png'
  });

  // 4. Mobile 375x812 - Click Matte Black (Dynamic main image update on mobile!)
  await captureView({
    width: 375,
    height: 812,
    isMobile: true,
    clickSelector: 'Matte black',
    filename: 'verify-mobile-clicked-black.png'
  });

  // 5. Desktop 1440x950
  await captureView({
    width: 1440,
    height: 950,
    isMobile: false,
    filename: 'verify-desktop-final.png'
  });

  ws.close();
  proc.kill();
  try {
    fs.rmSync(tempDir, { recursive: true, force: true });
  } catch {}
  process.exit(0);
}

run().catch(err => {
  console.error(err);
  proc.kill();
  process.exit(1);
});

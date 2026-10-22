import http from 'node:http';
import fs from 'node:fs';
import { spawn } from 'node:child_process';

const url = process.argv[2] || 'http://localhost:4180/?noload=true';
const outputFile = process.argv[3] || 'screenshot.png';
const width = parseInt(process.argv[4] || '1440', 10);
const height = parseInt(process.argv[5] || '900', 10);
const scrollY = parseInt(process.argv[6] || '0', 10);

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const port = 9345;
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

  if (!json?.webSocketDebuggerUrl) {
    throw new Error('Failed to connect to browser debugging port');
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
  await sendSession('Emulation.setDeviceMetricsOverride', {
    width,
    height,
    deviceScaleFactor: 1,
    mobile: width < 768,
  });

  await sendSession('Page.navigate', { url });
  await wait(3000);

  // If scrollY requested, dispatch mouseWheel events to physically advance compositor
  if (scrollY > 0) {
    const step = 100;
    const numSteps = Math.ceil(scrollY / step);
    const midX = Math.round(width / 2);
    const midY = Math.round(height / 2);

    for (let s = 0; s < numSteps; s++) {
      const delta = (s === numSteps - 1) ? (scrollY - s * step) : step;
      await sendSession('Input.dispatchMouseEvent', {
        type: 'mouseWheel',
        x: midX,
        y: midY,
        deltaX: 0,
        deltaY: delta,
      });
      // Short delay between wheel ticks
      await wait(30);
    }
    // Allow reveal animations and layout to settle
    await wait(800);
  }

  const { data } = await sendSession('Page.captureScreenshot', {
    format: 'png',
  });

  fs.writeFileSync(outputFile, Buffer.from(data, 'base64'));
  console.log(`Saved screenshot to ${outputFile} (${width}x${height}, scrollY=${scrollY}, ${data.length} bytes)`);

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

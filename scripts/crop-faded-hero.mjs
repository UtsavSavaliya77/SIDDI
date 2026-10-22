import http from 'node:http';
import fs from 'node:fs';
import { spawn } from 'node:child_process';
import path from 'node:path';

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const port = 9350;
const tempDir = `C:\\Users\\7x\\AppData\\Local\\Temp\\edge_crop_${Date.now()}`;

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

  const userImgPath = 'C:/Users/7x/.gemini/antigravity/brain/6a883add-40a1-4b1a-9c3a-afcc67d88c31/.user_uploaded/media_1792651829907_5c89a9ca.png';
  const userImgB64 = fs.readFileSync(userImgPath).toString('base64');

  const html = `
    <!DOCTYPE html>
    <html>
      <body>
        <img id="ref" src="data:image/png;base64,${userImgB64}" />
        <canvas id="c"></canvas>
      </body>
    </html>
  `;

  await sendSession('Page.setDocumentContent', { html, frameId: (await sendSession('Page.getFrameTree')).frameTree.frame.id });
  await wait(1000);

  // Let's create an alpha-faded version of the door handle scene for seamless blending on the right!
  // In the reference, the scene is at x=200..610, y=0..300.
  // We can draw it onto a canvas where the left edge has a linear alpha gradient from 0 to 1,
  // and the bottom edge has an alpha fade from 1 to 0 or blends into #F4EFEA!
  const res = await sendSession('Runtime.evaluate', {
    expression: `(() => {
      const img = document.getElementById('ref');
      const c = document.getElementById('c');
      const sw = 290;
      const sh = 205;
      const sx = 320;
      const sy = 0;
      c.width = sw;
      c.height = sh;
      const ctx = c.getContext('2d');
      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, sw, sh);

      // Create a smooth gradient mask on the left so it blends seamlessly
      ctx.globalCompositeOperation = 'destination-out';
      const grad = ctx.createLinearGradient(0, 0, 70, 0);
      grad.addColorStop(0, 'rgba(0, 0, 0, 1)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 70, sh);

      // And a gentle bottom fade
      const bGrad = ctx.createLinearGradient(0, 150, 0, sh);
      bGrad.addColorStop(0, 'rgba(0, 0, 0, 0)');
      bGrad.addColorStop(1, 'rgba(0, 0, 0, 0.7)');
      ctx.fillStyle = bGrad;
      ctx.fillRect(0, 150, sw, sh - 150);

      return c.toDataURL('image/png').split(',')[1];
    })()`,
    returnByValue: true
  });

  const b64 = res.result.value;
  const dest = path.join('C:\\Users\\7x\\Downloads\\Siddi\\public', 'door-handle-faded-hero.png');
  fs.writeFileSync(dest, Buffer.from(b64, 'base64'));
  console.log('Saved door-handle-faded-hero.png');

  ws.close();
  proc.kill();
  try { fs.rmSync(tempDir, { recursive: true, force: true }); } catch {}
  process.exit(0);
}

run().catch(e => {
  console.error(e);
  proc.kill();
  process.exit(1);
});

import http from 'node:http';
import fs from 'node:fs';
import { spawn } from 'node:child_process';
import path from 'node:path';

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const port = 9349;
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

  // Crop function
  async function cropAndSave(sx, sy, sw, sh, outName) {
    const res = await sendSession('Runtime.evaluate', {
      expression: `(() => {
        const img = document.getElementById('ref');
        const c = document.getElementById('c');
        c.width = ${sw};
        c.height = ${sh};
        const ctx = c.getContext('2d');
        ctx.drawImage(img, ${sx}, ${sy}, ${sw}, ${sh}, 0, 0, ${sw}, ${sh});
        return c.toDataURL('image/png').split(',')[1];
      })()`,
      returnByValue: true
    });
    const b64 = res.result.value;
    const dest = path.join('C:\\Users\\7x\\Downloads\\Siddi\\public', outName);
    fs.writeFileSync(dest, Buffer.from(b64, 'base64'));
    console.log(`Saved ${outName} (${sw}x${sh})`);
  }

  // In the 610x535 image:
  // Macro texture in lower card:
  // Starts around x=24, y=320, width ~255, height ~202
  await cropAndSave(24, 320, 255, 202, 'satin-steel-macro.png');

  // Top right door handle on travertine:
  // x ~ 260, y ~ 10, width ~ 350, height ~ 280
  await cropAndSave(260, 0, 350, 290, 'door-handle-travertine.png');

  // Also swatches:
  // In the image, the 6 swatches are around y=200..260:
  // 1: Matte black: x ~ 33, y ~ 205, size ~ 50x50
  await cropAndSave(33, 205, 50, 50, 'swatch-matte-black.png');
  // 2: Brushed brass: x ~ 114, y ~ 205, size ~ 50x50
  await cropAndSave(114, 205, 50, 50, 'swatch-brushed-brass.png');
  // 3: Satin steel: x ~ 194, y ~ 205, size ~ 50x50
  await cropAndSave(194, 205, 50, 50, 'swatch-satin-steel.png');
  // 4: Polished chrome: x ~ 276, y ~ 205, size ~ 50x50
  await cropAndSave(276, 205, 50, 50, 'swatch-polished-chrome.png');
  // 5: Gunmetal: x ~ 355, y ~ 205, size ~ 50x50
  await cropAndSave(355, 205, 50, 50, 'swatch-gunmetal.png');
  // 6: Antique bronze: x ~ 440, y ~ 205, size ~ 50x50
  await cropAndSave(440, 205, 50, 50, 'swatch-antique-bronze.png');

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

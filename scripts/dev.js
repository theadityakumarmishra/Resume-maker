import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import process from 'node:process';

// Run the Vite client in this process. This avoids Windows npm.cmd spawning
// issues and makes the displayed localhost URL reliable.
const port = Number(process.env.VITE_PORT || 5173);
const vitePath = fileURLToPath(new URL('../node_modules/vite/bin/vite.js', import.meta.url));
const vite = spawn(process.execPath, [vitePath, '--host', '127.0.0.1', '--port', String(port)], {
  stdio: 'inherit',
  env: process.env,
});

function stop() {
  vite.kill();
}

vite.on('exit', (code) => {
  if (code) process.exitCode = code;
});
process.on('SIGINT', stop);
process.on('SIGTERM', stop);

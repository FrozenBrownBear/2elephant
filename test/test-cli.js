import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import os from 'os';

const bin = path.join(process.cwd(), 'cli.js');
const dataDir = path.join(os.homedir(), '.fextify');

function run(args) {
  return execSync(`node ${bin} ${args}`, { encoding: 'utf8' }).trim();
}

// clean
fs.rmSync(dataDir, { recursive: true, force: true });

const title = run('new');
run(`save ${title} hello`);
const content = run(`read ${title}`);
console.assert(content === 'hello', 'Content should be hello');
run(`theme dark.css`);
const theme = run('theme');
console.assert(theme === 'dark.css', 'Theme should be set');
run(`delete ${title}.md`);
console.log('ok');

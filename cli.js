#!/usr/bin/env node
import { promises as fs } from 'fs';
import path from 'path';
import os from 'os';

const dataDir = path.join(os.homedir(), '.fextify');
const configPath = path.join(dataDir, 'config.json');

async function ensureDirs() {
  await fs.mkdir(dataDir, { recursive: true });
  try {
    await fs.stat(configPath);
  } catch {
    await fs.writeFile(configPath, JSON.stringify({ children: [], opened: [], theme: 'themes/default.css' }, null, 2));
  }
}

async function loadConfig() {
  await ensureDirs();
  const data = await fs.readFile(configPath, 'utf8');
  return JSON.parse(data);
}

async function saveConfig(cfg) {
  await fs.writeFile(configPath, JSON.stringify(cfg, null, 2));
}

async function save_file(p, content) {
  await ensureDirs();
  const file = path.join(dataDir, p + '.md');
  await fs.writeFile(file, content);
}

async function delete_file(p) {
  await ensureDirs();
  const file = path.join(dataDir, p);
  await fs.rm(file, { force: true });
  const cfg = await loadConfig();
  cfg.children = cfg.children.filter(c => c.path !== p);
  await saveConfig(cfg);
}

async function read_file(p) {
  await ensureDirs();
  const file = path.join(dataDir, p + '.md');
  try {
    const contents = await fs.readFile(file, 'utf8');
    return contents;
  } catch {
    return '';
  }
}

async function new_file() {
  await ensureDirs();
  const id = Date.now().toString(36);
  const title = `Untitled-${id}`;
  await save_file(title, '');
  const cfg = await loadConfig();
  cfg.children.push({ id, path: title });
  await saveConfig(cfg);
  return title;
}

async function set_theme(name) {
  const cfg = await loadConfig();
  cfg.theme = name;
  await saveConfig(cfg);
}

async function get_theme() {
  const cfg = await loadConfig();
  return cfg.theme;
}

async function main() {
  const [cmd, ...args] = process.argv.slice(2);
  switch (cmd) {
    case 'new':
      const title = await new_file();
      console.log(title);
      break;
    case 'save':
      await save_file(args[0], args.slice(1).join(' '));
      break;
    case 'read':
      const content = await read_file(args[0]);
      console.log(content);
      break;
    case 'delete':
      await delete_file(args[0]);
      break;
    case 'theme':
      if (args[0]) {
        await set_theme(args[0]);
      } else {
        console.log(await get_theme());
      }
      break;
    default:
      console.log('Usage: fextify <new|save|read|delete|theme>');
  }
}

main();

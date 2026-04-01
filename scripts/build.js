#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

console.log('🔨 Building Clelim Serrurerie...\n');

const checks = [
  {
    name: 'HTML files',
    test: () => {
      const files = ['index.html', 'politique-confidentialite.html', 'cgu.html'];
      return files.every(f => fs.existsSync(path.join(rootDir, f)));
    },
  },
  {
    name: 'CSS files',
    test: () => {
      const files = ['style.css', 'mobile.css'];
      return files.every(f => fs.existsSync(path.join(rootDir, f)));
    },
  },
  {
    name: 'JavaScript files',
    test: () => {
      return fs.existsSync(path.join(rootDir, 'script.js'));
    },
  },
  {
    name: 'Config file',
    test: () => {
      return fs.existsSync(path.join(rootDir, 'config', 'site.config.js'));
    },
  },
  {
    name: 'Public assets',
    test: () => {
      const publicDir = path.join(rootDir, 'public');
      return fs.existsSync(publicDir) && fs.statSync(publicDir).isDirectory();
    },
  },
];

let allPassed = true;

checks.forEach(check => {
  const passed = check.test();
  const icon = passed ? '✅' : '❌';
  console.log(`${icon} ${check.name}`);
  if (!passed) allPassed = false;
});

console.log('\n' + (allPassed ? '✨ Build successful!' : '⚠️  Build completed with warnings'));
console.log('\nStatic site is ready for deployment.\n');

process.exit(allPassed ? 0 : 1);

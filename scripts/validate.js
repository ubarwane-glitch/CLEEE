#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

console.log('🔍 Validating Clelim Serrurerie configuration...\n');

let warnings = [];
let errors = [];

const configPath = path.join(rootDir, 'config', 'site.config.js');
if (!fs.existsSync(configPath)) {
  errors.push('Missing config/site.config.js');
} else {
  const configContent = fs.readFileSync(configPath, 'utf-8');

  if (configContent.includes('VOTRE_ID_ICI')) {
    warnings.push(
      '⚠️  Formspree endpoint not configured in config/site.config.js (forms.formspreeEndpoint)'
    );
  }

  if (configContent.includes("siteUrl: 'https://clelim-serrurerie.fr'")) {
    warnings.push('⚠️  Update siteUrl in config/site.config.js with your actual domain');
  }
}

const scriptPath = path.join(rootDir, 'script.js');
if (fs.existsSync(scriptPath)) {
  const scriptContent = fs.readFileSync(scriptPath, 'utf-8');
  if (scriptContent.includes('VOTRE_ID_ICI')) {
    warnings.push('⚠️  Formspree endpoint hardcoded in script.js - use config instead');
  }
}

console.log('Validation Results:\n');

if (errors.length > 0) {
  console.log('❌ Errors:');
  errors.forEach(err => console.log(`   - ${err}`));
  console.log('');
}

if (warnings.length > 0) {
  console.log('⚠️  Warnings:');
  warnings.forEach(warn => console.log(`   - ${warn}`));
  console.log('');
}

if (errors.length === 0 && warnings.length === 0) {
  console.log('✅ No issues found!\n');
}

console.log(
  'Before deploying:\n' +
    '  1. Configure Formspree endpoint in config/site.config.js\n' +
    '  2. Update siteUrl with your actual domain\n' +
    '  3. Add Google Analytics ID if needed\n' +
    '  4. Test form submission\n'
);

process.exit(errors.length > 0 ? 1 : 0);

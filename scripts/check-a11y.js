#!/usr/bin/env node

/**
 * Enhanced Accessibility Check Script
 * Runs webhint with proper error handling and exit codes
 */

import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const HINT_REPORT_DIR = 'hint-report';

console.log('🔍 Running accessibility validation...\n');

// Clean up previous reports
if (fs.existsSync(HINT_REPORT_DIR)) {
  fs.rmSync(HINT_REPORT_DIR, { recursive: true, force: true });
}

// Run webhint with HTML report
console.log('📊 Running webhint with strict accessibility rules...');
const hint = spawn('npx', ['hint', 'dist/', '--formatters', 'summary'], {
  stdio: 'inherit'
});

hint.on('close', (code) => {
  if (code === 0) {
    console.log('\n✅ Accessibility validation passed - no issues found');
    console.log('💡 All HTML files passed WCAG 2.1 Level A & AA checks');
    process.exit(0);
  }

  console.log('\n❌ Accessibility validation FAILED');
  console.log('📋 HTML report generated in hint-report/ directory');
  console.log('💡 Run `npm run check:a11y:report` to view detailed report');
  console.log(`\n🔍 Exit code: ${code} - Build failed due to accessibility violations`);
  process.exit(code || 1);
});

hint.on('error', (error) => {
  console.error('❌ Failed to run accessibility check:', error.message);
  process.exit(1);
});
#!/usr/bin/env node

/**
 * FE Interview Practice — Test Runner
 * Run: node runner.js
 *      node runner.js --topic javascript
 *      node runner.js --question debounce
 *      node runner.js --watch
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const args = process.argv.slice(2);
const topicFilter = args.includes('--topic') ? args[args.indexOf('--topic') + 1] : null;
const questionFilter = args.includes('--question') ? args[args.indexOf('--question') + 1] : null;
const watchMode = args.includes('--watch');

const COLORS = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  gray: '\x1b[90m',
  blue: '\x1b[34m',
};

const c = (color, text) => `${COLORS[color]}${text}${COLORS.reset}`;

function runTests() {
  console.clear();
  console.log(c('bold', '\n🧠 FE Interview Practice — Test Runner\n'));
  console.log(c('gray', '─'.repeat(50)));

  const testDir = path.join(__dirname, 'tests');
  if (!fs.existsSync(testDir)) {
    console.log(c('red', 'No tests/ directory found.'));
    process.exit(1);
  }

  let testFiles = fs.readdirSync(testDir)
    .filter(f => f.endsWith('.test.js'))
    .sort();

  if (topicFilter) {
    testFiles = testFiles.filter(f => f.startsWith(topicFilter) || f.includes(topicFilter));
  }
  if (questionFilter) {
    testFiles = testFiles.filter(f => f.includes(questionFilter));
  }

  if (testFiles.length === 0) {
    console.log(c('yellow', `\nNo test files found${topicFilter ? ` for topic: ${topicFilter}` : ''}.`));
    return;
  }

  let totalPassed = 0;
  let totalFailed = 0;
  let totalSkipped = 0;
  const results = [];

  for (const file of testFiles) {
    const filePath = path.join(testDir, file);
    const label = file.replace('.test.js', '');

    try {
      const testModule = require(filePath);
      const { passed, failed, skipped, details } = testModule.run();
      totalPassed += passed;
      totalFailed += failed;
      totalSkipped += skipped;
      results.push({ label, passed, failed, skipped, details });
    } catch (err) {
      results.push({ label, passed: 0, failed: 1, skipped: 0, details: [{ name: 'Load error', error: err.message }] });
      totalFailed++;
    }

    // Clear require cache for watch mode
    delete require.cache[filePath];
  }

  // Print results
  for (const { label, passed, failed, skipped, details } of results) {
    const icon = failed > 0 ? c('red', '✗') : c('green', '✓');
    const status = failed > 0
      ? c('red', `${failed} failed`)
      : c('green', `${passed} passed`);
    const skipTxt = skipped > 0 ? c('yellow', ` · ${skipped} skipped`) : '';

    console.log(`\n${icon} ${c('bold', label)} — ${status}${skipTxt}`);

    for (const t of details) {
      if (t.error) {
        console.log(`   ${c('red', '✗')} ${c('gray', t.name)}`);
        console.log(`     ${c('red', t.error)}`);
      } else if (t.skipped) {
        console.log(`   ${c('yellow', '○')} ${c('gray', t.name + ' (not implemented yet)')}`);
      } else {
        console.log(`   ${c('green', '✓')} ${c('gray', t.name)}`);
      }
    }
  }

  // Summary
  console.log('\n' + c('gray', '─'.repeat(50)));
  const summaryColor = totalFailed > 0 ? 'red' : 'green';
  console.log(c(summaryColor, c('bold',
    `\n  ${totalPassed} passed · ${totalFailed} failed · ${totalSkipped} skipped\n`
  )));

  if (totalFailed === 0 && totalPassed > 0) {
    console.log(c('green', '  🎉 All tests passing! Great work.\n'));
  }

  if (watchMode) {
    console.log(c('gray', '  Watching for changes... (Ctrl+C to quit)\n'));
  }
}

if (watchMode) {
  runTests();
  const watchDirs = ['solutions', 'tests'];
  watchDirs.forEach(dir => {
    const dirPath = path.join(__dirname, dir);
    if (fs.existsSync(dirPath)) {
      fs.watch(dirPath, { recursive: true }, () => {
        // Clear all cached modules
        Object.keys(require.cache).forEach(key => {
          if (key.includes('/solutions/') || key.includes('/tests/') || key.includes('/utils/')) {
            delete require.cache[key];
          }
        });
        setTimeout(runTests, 100);
      });
    }
  });
} else {
  runTests();
}

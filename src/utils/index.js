'use strict';

const COLORS = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  white: '\x1b[37m',
  yellow: '\x1b[33m',
};

const assert = ({ testName, actual, expected }) => {
  actual = typeof actual === 'function' ? actual() : actual;
  if (actual === expected) {
    console.log(COLORS.green, `PASS: ${testName}`, COLORS.reset);
  } else {
    console.log(
      COLORS.red,
      `FAIL: ${testName}\n\r`,
      COLORS.green,
      `Expected: "${expected}"\n\r`,
      COLORS.yellow,
      `  Actual: "${actual}"`,
      COLORS.reset,
    );
  }
};

module.exports = {
  assert,
  COLORS,
};

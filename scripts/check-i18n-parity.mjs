#!/usr/bin/env node
/**
 * Verifies the en/ar translation dictionaries (src/i18n/dictionaries/) stay
 * structurally in sync: same keys, same array lengths, and flags any ar
 * value that's byte-identical to its en counterpart (a likely sign a string
 * was added in English and never actually translated).
 *
 * TypeScript already enforces key presence at compile time (ar must satisfy
 * Dictionary, which is derived from en's shape), but it can't catch array
 * *length* mismatches (a testimonials list with 3 en entries and 2 ar
 * entries type-checks fine) or literal duplicate strings — this fills
 * exactly that gap.
 *
 * Usage: npm run check:i18n
 *
 * A flagged "identical value" isn't automatically a bug — proper nouns,
 * email addresses, and phone numbers are correctly identical in both
 * languages. Read each flag before "fixing" it.
 */
import { en } from "../src/i18n/dictionaries/en.ts";
import { ar } from "../src/i18n/dictionaries/ar.ts";

const issues = [];

function walk(a, b, path) {
  if (Array.isArray(a)) {
    if (!Array.isArray(b)) {
      issues.push(`${path}: en is array, ar is ${typeof b}`);
      return;
    }
    if (a.length !== b.length) {
      issues.push(`${path}: length mismatch — en has ${a.length}, ar has ${b.length}`);
    }
    const len = Math.min(a.length, b.length);
    for (let i = 0; i < len; i++) walk(a[i], b[i], `${path}[${i}]`);
    return;
  }
  if (a && typeof a === "object") {
    if (!b || typeof b !== "object") {
      issues.push(`${path}: en is object, ar is ${typeof b}`);
      return;
    }
    for (const key of Object.keys(a)) {
      if (!(key in b)) {
        issues.push(`${path}.${key}: missing in ar`);
        continue;
      }
      walk(a[key], b[key], `${path}.${key}`);
    }
    for (const key of Object.keys(b)) {
      if (!(key in a)) issues.push(`${path}.${key}: present in ar but not en (orphaned key)`);
    }
    return;
  }
  if (typeof a === "string") {
    if (typeof b !== "string") {
      issues.push(`${path}: en is string, ar is ${typeof b}`);
    } else if (b.trim() === "") {
      issues.push(`${path}: ar value is empty`);
    } else if (a === b && /[a-zA-Z]{3,}/.test(a)) {
      issues.push(`${path}: ar value identical to en ("${a}") — verify this is intentional (proper noun, email, etc.)`);
    }
  }
}

walk(en, ar, "root");

if (issues.length === 0) {
  console.log("No i18n parity issues found.");
} else {
  console.log(`Found ${issues.length} issue(s):`);
  for (const issue of issues) console.log(" -", issue);
  process.exitCode = 1;
}

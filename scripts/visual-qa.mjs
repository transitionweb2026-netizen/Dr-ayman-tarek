#!/usr/bin/env node
/**
 * Visual QA screenshot sweep.
 *
 * Static analysis (build/typecheck/lint) cannot catch real rendering bugs —
 * this project shipped a mobile drawer that collapsed to an 80px sliver
 * (a `backdrop-filter` containing-block quirk) and a desktop nav that
 * wrapped onto two lines at 768–1024px, and neither was visible from
 * reading the source. This script renders every page at every supported
 * breakpoint in a real headless browser and saves screenshots so a human
 * (or an agent) can actually look at the UI instead of reasoning about it.
 *
 * Usage:
 *   npm run build && npm run start          # in one terminal
 *   npm run qa:screenshots                  # in another
 *
 * Output goes to .qa-screenshots/ (gitignored — this is a tool, not a
 * fixture; screenshots are meant to be reviewed then discarded, not
 * committed). Override the target with QA_BASE_URL, e.g. to point at a
 * deployed preview instead of localhost.
 */
import { chromium } from "playwright";
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, "..", ".qa-screenshots");
const BASE_URL = process.env.QA_BASE_URL || "http://localhost:3000";

const PAGES = [
  ["home", "/"],
  ["dr-ayman-tarek", "/dr-ayman-tarek"],
  ["services", "/services"],
  ["videos", "/videos"],
  ["blog", "/blog"],
  ["contact", "/contact"],
];

// Matches the project's documented supported-device list.
const BREAKPOINTS = [
  ["320", 320],
  ["375", 375],
  ["390", 390],
  ["430", 430],
  ["768", 768],
  ["1024", 1024],
  ["1280", 1280],
  ["1440", 1440],
];

const VIEWPORT_HEIGHT = 1000;

async function withPage(browser, width, height, fn) {
  const context = await browser.newContext({ viewport: { width, height } });
  const page = await context.newPage();
  try {
    await fn(page);
  } finally {
    await context.close();
  }
}

async function checkOverflow(page) {
  return page.evaluate(() => ({
    docWidth: document.documentElement.scrollWidth,
    winWidth: window.innerWidth,
    overflowing: document.documentElement.scrollWidth > window.innerWidth,
  }));
}

async function run() {
  rmSync(OUT_DIR, { recursive: true, force: true });
  mkdirSync(OUT_DIR, { recursive: true });

  const browser = await chromium.launch();
  const overflowReport = [];

  // 1. Hero/nav (top viewport) + overflow check, every page x every breakpoint.
  for (const [vname, width] of BREAKPOINTS) {
    await withPage(browser, width, VIEWPORT_HEIGHT, async (page) => {
      for (const [pname, route] of PAGES) {
        await page.goto(BASE_URL + route, { waitUntil: "networkidle" });
        await page.waitForTimeout(350);
        await page.screenshot({ path: path.join(OUT_DIR, `${pname}_${vname}_top.png`) });

        const overflow = await checkOverflow(page);
        if (overflow.overflowing) overflowReport.push({ page: pname, breakpoint: vname, ...overflow });

        // Footer, scrolled fully into view. The site sets `scroll-behavior:
        // smooth` globally (intentional, for real users), which makes
        // window.scrollTo animate over ~1-2s instead of jumping instantly —
        // explicit behavior: "instant" bypasses that for the screenshot.
        await page.evaluate(() =>
          window.scrollTo({ top: document.body.scrollHeight, behavior: "instant" }),
        );
        await page.waitForTimeout(300);
        await page.screenshot({ path: path.join(OUT_DIR, `${pname}_${vname}_footer.png`) });
      }
    });
  }

  // 2. Contact form, every breakpoint.
  for (const [vname, width] of BREAKPOINTS) {
    await withPage(browser, width, VIEWPORT_HEIGHT, async (page) => {
      await page.goto(BASE_URL + "/contact", { waitUntil: "networkidle" });
      const form = page.locator("text=Request an Appointment").first();
      await form.scrollIntoViewIfNeeded().catch(() => {});
      await page.waitForTimeout(300);
      await page.screenshot({ path: path.join(OUT_DIR, `contact-form_${vname}.png`) });
    });
  }

  // 3. Mobile menu open, at every breakpoint below the xl (1280px) nav cutover.
  for (const [vname, width] of BREAKPOINTS.filter(([, w]) => w < 1280)) {
    await withPage(browser, width, VIEWPORT_HEIGHT, async (page) => {
      await page.goto(BASE_URL + "/", { waitUntil: "networkidle" });
      await page.click('button[aria-label="Toggle menu"]');
      await page.waitForTimeout(600);
      await page.screenshot({ path: path.join(OUT_DIR, `menu-open_${vname}.png`) });
    });
  }

  await browser.close();

  writeFileSync(
    path.join(OUT_DIR, "_overflow-report.json"),
    JSON.stringify(overflowReport, null, 2),
  );

  console.log(`Saved screenshots to ${OUT_DIR}`);
  if (overflowReport.length > 0) {
    console.log(`\nHORIZONTAL OVERFLOW DETECTED on ${overflowReport.length} page/breakpoint combo(s):`);
    for (const o of overflowReport) {
      console.log(`  ${o.page}@${o.breakpoint}: docWidth=${o.docWidth} winWidth=${o.winWidth}`);
    }
    process.exitCode = 1;
  } else {
    console.log("No horizontal overflow detected on any page/breakpoint.");
  }
}

run().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});

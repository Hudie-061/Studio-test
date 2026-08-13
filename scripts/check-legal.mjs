// Pre-deploy gate for /privacy and /legal. Scans the actual production
// build output (not the source) for the literal placeholder text "TBC",
// which lib/legal/constants.ts uses for CONTROLLER_ADDRESS and
// COMPANY_NUMBER until their real values are known. Exits non-zero if any
// are found, so `npm run check-legal` can block a deploy.
//
// Usage: npm run check-legal   (runs `next build` first, then this check)

import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const LOCALES = ["en", "fr", "nl"];
const PAGES = ["privacy", "legal"];
const BUILD_DIR = join(process.cwd(), ".next", "server", "app");

const targets = LOCALES.flatMap((locale) =>
  PAGES.flatMap((page) => [
    join(BUILD_DIR, locale, `${page}.html`),
    join(BUILD_DIR, locale, `${page}.rsc`),
  ])
);

const missing = targets.filter((path) => !existsSync(path));
if (missing.length > 0) {
  console.error("check-legal: expected build output is missing:");
  for (const path of missing) console.error(`  ${path}`);
  console.error("Did `next build` run and succeed before this check?");
  process.exit(1);
}

let found = false;
for (const path of targets) {
  const contents = readFileSync(path, "utf8");
  if (contents.includes("TBC")) {
    found = true;
    console.error(`check-legal: found "TBC" in ${path}`);
  }
}

if (found) {
  console.error(
    "\ncheck-legal: unfilled compliance placeholder(s) found — see lib/legal/constants.ts " +
      "(CONTROLLER_ADDRESS and/or COMPANY_NUMBER). Do not deploy until these are filled in."
  );
  process.exit(1);
}

console.log("check-legal: no placeholder text found in /privacy or /legal. OK.");

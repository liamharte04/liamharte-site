import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import { join, relative, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { walkHtml } from "./walk-html.mjs";

const root = resolve(import.meta.dirname, "..", "site");

// nginx serves /assets/ with max-age=604800. The HTML references these files by
// a stable path, so without a content-derived version a changed stylesheet stays
// hidden behind the browser cache for up to a week and the deploy looks like it
// did nothing. This bit Liam on 17 August 2026 with a stretched-photo CSS fix
// that shipped correctly and still rendered broken for returning visitors.
//
// Do not relax this to a warning. A stale stamp is indistinguishable from a
// successful deploy from the outside, which is exactly what makes it dangerous.
const STAMPED_ASSETS = ["/assets/css/styles.css", "/assets/js/main.js"];

const REFERENCE = /(?:href|src)="(\/assets\/(?:css|js)\/[^"?]+)(?:\?v=[^"]*)?"/g;

// Hashes the normalised text, not the raw bytes. core.autocrlf is true on
// Liam's Windows checkout, so the working tree holds CRLF while the committed
// blob and the Linux CI runner hold LF. Hashing raw bytes makes a locally
// written stamp fail in CI every single time.
export const assetVersion = async (urlPath) => {
  const source = await readFile(join(root, urlPath), "utf8");
  return createHash("sha256").update(source.replaceAll("\r\n", "\n")).digest("hex").slice(0, 10);
};

export const assetVersions = async () => {
  const versions = new Map();
  for (const urlPath of STAMPED_ASSETS) {
    versions.set(urlPath, await assetVersion(urlPath));
  }
  return versions;
};

// Rewrites every stamped reference in `source` to the current content hash.
// Returns the rewritten source plus the references it had to correct.
export const restamp = (source, versions) => {
  const stale = [];
  const output = source.replace(REFERENCE, (match, urlPath) => {
    const version = versions.get(urlPath);
    if (!version) return match;
    const attribute = match.startsWith("href") ? "href" : "src";
    const replacement = `${attribute}="${urlPath}?v=${version}"`;
    if (replacement !== match) stale.push(urlPath);
    return replacement;
  });
  return { output, stale };
};

// Used by verify-site.mjs so a stale stamp fails the deploy rather than
// shipping a change nobody can see.
export const findStaleStamps = async (htmlFiles) => {
  const versions = await assetVersions();
  const failures = [];
  for (const file of htmlFiles) {
    const source = await readFile(file, "utf8");
    const { stale } = restamp(source, versions);
    for (const urlPath of new Set(stale)) {
      failures.push(
        `${relative(root, file)}: ${urlPath} is not stamped with its current content version - run "npm run stamp"`,
      );
    }
  }
  return failures;
};

// `npm run stamp` writes the current versions into every page.
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const versions = await assetVersions();
  const changed = [];
  for (const file of await walkHtml(root)) {
    const source = await readFile(file, "utf8");
    const { output } = restamp(source, versions);
    if (output !== source) {
      await writeFile(file, output);
      changed.push(relative(root, file));
    }
  }
  console.log(
    changed.length
      ? `Stamped ${changed.length} page(s): ${changed.join(", ")}`
      : "All pages already carry the current asset versions.",
  );
}

import { readFile, stat } from "node:fs/promises";
import { join, relative, resolve } from "node:path";
import { walkHtml } from "./walk-html.mjs";
import { findStaleStamps } from "./asset-stamps.mjs";

const root = resolve(import.meta.dirname, "..", "site");
const failures = [];

const htmlFiles = await walkHtml(root);

for (const file of htmlFiles) {
  const source = await readFile(file, "utf8");
  const label = relative(root, file);
  const h1Count = (source.match(/<h1(?:\s|>)/g) || []).length;

  if (h1Count !== 1) failures.push(`${label}: expected one h1, found ${h1Count}`);
  if (!/<meta name="viewport"/.test(source)) failures.push(`${label}: missing viewport`);
  if (!/<meta name="robots"/.test(source)) failures.push(`${label}: missing robots metadata`);
  if (source.includes("—")) failures.push(`${label}: contains an em dash`);
  if (/Alex Morgan|laws of Greece|Liam Harte Ltd\./.test(source)) failures.push(`${label}: contains inherited template content`);
  // Liam confirmed Belfast on 16 August 2026 (D09 resolved, B20). This guard
  // used to forbid any personal-location claim while the fact was unconfirmed.
  // It now asserts the opposite: the confirmed locality must be present and no
  // superseded locality may reappear. Do not weaken this to a no-op - the whole
  // point is that a location claim is only ever as good as the confirmation
  // behind it.
  if (/Northampton/.test(source)) {
    failures.push(`${label}: contains the superseded Northampton location claim`);
  }

  if (["index.html", "about\\index.html"].includes(label)) {
    if (!source.includes('"@id": "https://liamharte.com/#person"')) {
      failures.push(`${label}: missing canonical Liam Harte Person identifier`);
    }
    if (!source.includes('"@id": "https://rephobia.com/#organization"')) {
      failures.push(`${label}: missing reciprocal Rephobia Organization identifier`);
    }
    if (!source.includes('"addressLocality": "Belfast"')) {
      failures.push(`${label}: Person schema is missing the confirmed Belfast locality`);
    }
    if (!source.includes('"homeLocation"')) {
      failures.push(`${label}: Person schema is missing homeLocation`);
    }
    if (!source.includes("https://www.wikidata.org/entity/Q10686")) {
      failures.push(`${label}: Belfast is not resolved to its Wikidata entity`);
    }
  }

  for (const match of source.matchAll(/<img\b[^>]*>/g)) {
    if (!/\balt="[^"]*"/.test(match[0])) failures.push(`${label}: image is missing alt attribute`);
  }

  for (const match of source.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      JSON.parse(match[1]);
    } catch (error) {
      failures.push(`${label}: invalid JSON-LD: ${error.message}`);
    }
  }

  for (const match of source.matchAll(/(?:href|src)="(\/[^"#?]*)/g)) {
    const urlPath = match[1];
    if (urlPath === "/") continue;
    const target = urlPath.endsWith("/")
      ? join(root, urlPath, "index.html")
      : join(root, urlPath);
    try {
      await stat(target);
    } catch {
      failures.push(`${label}: missing internal target ${urlPath}`);
    }
  }
}

failures.push(...await findStaleStamps(htmlFiles));

const sitemap = await readFile(join(root, "sitemap.xml"), "utf8");
for (const url of ["https://liamharte.com/", "https://liamharte.com/about/", "https://liamharte.com/rephobia-founder/", "https://liamharte.com/recognition/", "https://liamharte.com/speaking/", "https://liamharte.com/privacy/", "https://liamharte.com/terms/"]) {
  if (!sitemap.includes(`<loc>${url}</loc>`)) failures.push(`sitemap.xml: missing ${url}`);
}

const serverSource = await readFile(resolve(root, "..", "server", "contact-server.mjs"), "utf8");
if (!serverSource.includes("/api/contact")) failures.push("contact server: endpoint is missing");

if (failures.length) {
  console.error(failures.map((failure) => `- ${failure}`).join("\n"));
  process.exit(1);
}

console.log(`Verified ${htmlFiles.length} HTML pages, internal targets, asset versions, JSON-LD, sitemap and contact endpoint.`);

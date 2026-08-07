import { readFile, readdir, stat } from "node:fs/promises";
import { dirname, join, relative, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..", "site");
const failures = [];

const walk = async (directory) => {
  const entries = await readdir(directory);
  const files = [];
  for (const entry of entries) {
    const path = join(directory, entry);
    const info = await stat(path);
    if (info.isDirectory()) files.push(...await walk(path));
    else files.push(path);
  }
  return files;
};

const files = await walk(root);
const htmlFiles = files.filter((file) => file.endsWith(".html"));

for (const file of htmlFiles) {
  const source = await readFile(file, "utf8");
  const label = relative(root, file);
  const h1Count = (source.match(/<h1(?:\s|>)/g) || []).length;

  if (h1Count !== 1) failures.push(`${label}: expected one h1, found ${h1Count}`);
  if (!/<meta name="viewport"/.test(source)) failures.push(`${label}: missing viewport`);
  if (!/<meta name="robots"/.test(source)) failures.push(`${label}: missing robots metadata`);
  if (source.includes("—")) failures.push(`${label}: contains an em dash`);
  if (/Alex Morgan|laws of Greece|Liam Harte Ltd\./.test(source)) failures.push(`${label}: contains inherited template content`);

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

console.log(`Verified ${htmlFiles.length} HTML pages, internal targets, JSON-LD, sitemap and contact endpoint.`);

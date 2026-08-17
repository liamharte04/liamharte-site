import { readdir, stat } from "node:fs/promises";
import { join } from "node:path";

export const walk = async (directory) => {
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

export const walkHtml = async (directory) =>
  (await walk(directory)).filter((file) => file.endsWith(".html"));

import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { gzipSync } from "node:zlib";
import path from "node:path";

const dist = path.resolve("dist");
const html = readFileSync(path.join(dist, "index.html"), "utf8");
assert.equal(readFileSync(path.join(dist, "404.html"), "utf8"), html, "SPA fallback must match index.html");
const assetPaths = [...html.matchAll(/(?:src|href)="([^\"]+\.js)"/g)].map((match) => match[1]);
assert.ok(assetPaths.length, "The built page must reference JavaScript");
const visited = new Set();
let initialBytes = 0;
function inspect(asset) {
  const relative = asset.replace(/^\/pracofi\//, "");
  const file = path.resolve(dist, relative);
  assert.ok(file.startsWith(dist + path.sep), "Asset must remain inside dist");
  if (visited.has(file)) return;
  visited.add(file);
  const source = readFileSync(file, "utf8");
  initialBytes += gzipSync(source).length;
  // Static module dependencies load with the entry; dynamic import() chunks do not.
  for (const match of source.matchAll(/(?:\bfrom\s*|\bimport\s*)["'](\.[^"']+\.js)["']/g)) {
    inspect(path.relative(dist, path.resolve(path.dirname(file), match[1])));
  }
}
assetPaths.forEach((asset) => {
  assert.ok(asset.startsWith("/pracofi/"), "Expected the existing GitHub Pages base path");
  inspect(asset);
});
assert.ok(initialBytes < 160180, `Initial JavaScript ${initialBytes} bytes gzip exceeds the v1 baseline`);
console.log(`SPA fallback and base path verified. Initial JavaScript: ${(initialBytes / 1000).toFixed(2)} kB gzip across ${visited.size} file(s).`);

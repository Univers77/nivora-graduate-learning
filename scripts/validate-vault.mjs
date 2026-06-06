import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const manifests = [
  "content-index.json",
  "assets-index.json",
  "module-map.json",
  "version-history.json",
];

const errors = [];
for (const file of manifests) {
  const path = resolve("learning-vault", "manifests", file);
  try {
    const parsed = JSON.parse(await readFile(path, "utf8"));
    if (!parsed.version || !Array.isArray(parsed.items)) {
      errors.push(`${file}: requiere version e items[]`);
    }
  } catch (error) {
    errors.push(`${file}: ${error.message}`);
  }
}

if (errors.length) {
  console.error("Vault invalido:\n- " + errors.join("\n- "));
  process.exit(1);
}

console.log(`Vault valido: ${manifests.length} manifests revisados.`);

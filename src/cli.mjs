/**
 * @typedef {import("glob")} glob
 * @typedef {import("path")} join
 * @typedef {import("path")} dirname
 * @typedef {import("fs")} writeFileSync
 * @typedef {import("url")} fileURLToPath
 */

import { writeFileSync } from "fs";
import { generateTypes } from "./generate.mjs";
import { glob } from "glob";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

async function main() {
  const pattern = process.argv[2];
  if (!pattern) {
    throw new Error("pattern is required.");
  }

  const files = await glob(pattern);

  files.forEach((file) => {
    const dts = generateTypes(file);
    const dtsFilePath = join(file + ".d.ts");

    writeFileSync(dtsFilePath, dts, { encoding: "utf8" });
  });
}

await main();

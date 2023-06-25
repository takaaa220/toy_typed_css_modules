/**
 * @typedef {import("glob")} glob
 * @typedef {import("path")} join
 * @typedef {import("path")} dirname
 * @typedef {import("fs")} writeFileSync
 * @typedef {import("fs")} readFileSync
 * @typedef {import("url")} fileURLToPath
 */

import { readFileSync, writeFileSync } from "fs";
import { generateTypes } from "./core.mjs";
import { glob } from "glob";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

/**
 * @param {string} pattern
 */
export async function run(pattern) {
  if (!pattern) {
    throw new Error("pattern is required.");
  }

  const files = await glob(pattern);

  files.forEach((fileName) => {
    const modulesCss = readFileSync(fileName, "utf8");

    const dts = generateTypes(modulesCss);
    const dtsFilePath = join(fileName + ".d.ts");

    writeFileSync(dtsFilePath, dts, { encoding: "utf8" });

    console.log(`Generated: ${dtsFilePath}`);
  });
}

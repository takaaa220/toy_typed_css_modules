/**
 * @typedef {import("glob")} glob
 * @typedef {import("path")} join
 * @typedef {import("path")} dirname
 * @typedef {import("fs")} writeFileSync
 * @typedef {import("fs")} readFileSync
 * @typedef {import("url")} fileURLToPath
 * @typedef {import("chokidar")} default
 */

import { readFileSync, writeFileSync } from "fs";
import { generateTypes } from "./core.mjs";
import { glob } from "glob";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import chokidar from "chokidar";

/**
 * @param {string} pattern
 * @param {{ watch: boolean; }} _options
 */
export async function run(pattern, _options) {
  if (!pattern) {
    throw new Error("pattern is required.");
  }

  const options = {
    watch: _options?.watch ?? false,
  };

  if (options.watch) {
    await watch(pattern);
    return;
  } else {
    await runAll(pattern);
  }
}

/**
 * @param {string} pattern
 */
async function watch(pattern) {
  if (!pattern) {
    throw new Error("pattern is required.");
  }

  const watcher = chokidar.watch(pattern);
  watcher.on("change", (path) => {
    runSingleFile(path);
  });

  watcher.on("add", (path) => {
    runSingleFile(path);
  });

  console.info(`Watching: ${pattern}`);
}

/**
 * @param {string} pattern
 */
async function runAll(pattern) {
  if (!pattern) {
    throw new Error("pattern is required.");
  }

  const files = await glob(pattern);

  files.forEach(runSingleFile);
}

/**
 * @param {string} fileName
 */
function runSingleFile(fileName) {
  if (!fileName || !fileName.endsWith(".css")) return;

  const modulesCss = readFileSync(fileName, "utf8");

  const dts = generateTypes(modulesCss);
  const dtsFilePath = join(fileName + ".d.ts");

  writeFileSync(dtsFilePath, dts, { encoding: "utf8" });

  console.info(`Generated: ${dtsFilePath}`);
}

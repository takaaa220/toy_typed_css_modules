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
import { extractClassNames } from "./core.mjs";
import { glob } from "glob";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import chokidar from "chokidar";
import { generateDtsFile } from "./output.mjs";

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
    await watch(pattern, generateDtsFile);
    return;
  } else {
    await runAll(pattern, generateDtsFile);
  }
}

/**
 * @param {string} pattern
 * @param {(classNames: string[], originalFileName: string) => void} output
 */
async function watch(pattern, output) {
  const watcher = chokidar.watch(pattern);

  watcher.on("change", runSingleFile(output));
  watcher.on("add", runSingleFile(output));

  console.info(`Watching: ${pattern}`);
}

/**
 * @param {string} pattern
 * @param {(classNames: string[], originalFileName: string) => void} output
 */
async function runAll(pattern, output) {
  const files = await glob(pattern);

  files.forEach(runSingleFile(output));
}

/**
 * @param {string} fileName
 * @param {(classNames: string[], originalFileName: string) => void} output
 */
function runSingleFile(output) {
  return function (fileName) {
    if (!fileName || !fileName.endsWith(".css")) return;

    const modulesCss = readFileSync(fileName, "utf8");

    const classNames = extractClassNames(modulesCss);

    output(classNames, fileName);
  };
}

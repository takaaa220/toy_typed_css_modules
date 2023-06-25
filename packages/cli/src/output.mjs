/**
 * @typedef {import("path")} join
 * @typedef {import("fs")} writeFileSync
 */

import { writeFileSync } from "fs";
import { join } from "path";

/**
 * @param {string[]} classNames
 * @param {string} originalFileName
 */
export function generateDtsFile(classNames, originalFileName) {
  const dts = generateTypeDeclaration(classNames);

  const dtsFilePath = join(originalFileName + ".d.ts");

  writeFileSync(dtsFilePath, dts, { encoding: "utf8" });

  console.info(`Generated: ${dtsFilePath}`);
}

/**
 * @param {string[]} classNames
 * @return {string}
 */
export function generateTypeDeclaration(classNames) {
  return classNames
    .map(normalizeClassName)
    .map((className) => {
      return `export const ${className}: string;\n`;
    })
    .join("");
}

/**
 * @param {string} className
 * @return {string}
 */
function normalizeClassName(className) {
  const parts = className.split("-");
  return (
    parts[0] +
    parts
      .slice(1)
      .map((part) => part[0].toUpperCase() + part.slice(1))
      .join("")
  );
}

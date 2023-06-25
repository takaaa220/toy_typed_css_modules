/**
 * @typedef {import("css-tree")} parse
 * @typedef {import("css-tree")} walk
 */

import { parse, walk } from "css-tree";

/**
 * @param {string} cssString
 * @return {string}
 */
export function generateTypes(cssString) {
  const classNames = extractClassNames(cssString);

  return generateTypeDeclaration(classNames);
}

/**
 * @param {string} cssString
 * @return {string[]}
 */
function extractClassNames(cssString) {
  const ast = parse(cssString);

  const classNames = new Set();

  walk(ast, (node) => {
    if (node.type === "ClassSelector") {
      classNames.add(node.name);
    }
  });

  return [...classNames];
}

/**
 *
 * @param {string[]} classNames
 * @return {string}
 */
function generateTypeDeclaration(classNames) {
  return classNames
    .map((className) => {
      const parts = className.split("-");
      return (
        parts[0] +
        parts
          .slice(1)
          .map((part) => part[0].toUpperCase() + part.slice(1))
          .join("")
      );
    })
    .map((className) => {
      return `export const ${className}: string;\n`;
    })
    .join("");
}

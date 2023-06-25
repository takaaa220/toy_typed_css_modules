/**
 * @typedef {import("css-tree")} parse
 * @typedef {import("css-tree")} walk
 */

import { parse, walk } from "css-tree";

/**
 * @param {string} cssString
 * @return {string[]}
 */
export function extractClassNames(cssString) {
  const ast = parse(cssString);

  const classNames = new Set();

  walk(ast, (node) => {
    if (node.type === "ClassSelector") {
      classNames.add(node.name);
    }
  });

  return [...classNames];
}

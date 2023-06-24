import { readFileSync } from "fs";

/**
 * @param {string} fileName
 * @return {string}
 */
export function generateTypes(fileName) {
  const modulesCss = readFileSync(fileName, "utf8");
  const classNames = extractClassNames(modulesCss);

  return generateTypeDeclaration(classNames);
}

/**
 * @param {string} file
 * @return {string[]}
 */
function extractClassNames(file) {
  const selectorRegex = /\.([a-zA-Z0-9_-]+)\s*\{/g;
  const matches = [...file.matchAll(selectorRegex)];

  return matches.map((match) => match[1]);
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

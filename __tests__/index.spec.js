import { describe, expect, it } from "vitest";
import { generateTypes } from "../src/generate.mjs";
import { readFileSync, readdirSync, statSync, writeFileSync } from "fs";
import { join } from "path";

describe("generateTypes", () => {
  const directories = readdirSync(__dirname).filter((name) =>
    statSync(join(__dirname, name)).isDirectory()
  );

  describe("should generate correct types", () => {
    it.each(directories)("dir: %s", (dirname) => {
      const cssFile = join(__dirname, dirname, "input.modules.css");
      const dtsFile = join(__dirname, dirname, "expected.d.ts");

      const actual = generateTypes(cssFile);
      const expected = readFileSync(dtsFile, "utf8");

      writeFileSync(join(__dirname, dirname, "actual.d.ts"), actual, {
        encoding: "utf8",
      });

      expect(actual).toBe(expected);
    });
  });
});

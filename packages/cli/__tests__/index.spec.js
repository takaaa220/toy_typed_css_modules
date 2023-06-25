import { it, describe, expect } from "vitest";
import { run } from "../src/run.mjs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { readFileSync } from "fs";

describe("cli", () => {
  const __dirname = dirname(fileURLToPath(import.meta.url));

  it("should work", async () => {
    await run(join(__dirname, "test_src/**/*.css"));

    expect(() => {
      // 生成されたファイルの存在確認
      readFileSync(join(__dirname, "test_src/index.module.css.d.ts"));
      readFileSync(join(__dirname, "test_src/dir/index.module.css.d.ts"));
    }).not.toThrow();
  });
});

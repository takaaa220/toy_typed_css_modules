import { configDefaults, defineConfig } from "vitest/config";

export default defineConfig({
  ...configDefaults,
  test: {
    exclude: ["**/__tests__/**/actual.d.ts", "**/__tests__/**/expected.d.ts"],
  },
});

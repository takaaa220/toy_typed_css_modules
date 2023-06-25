import { configDefaults, defineConfig } from "vitest/config";

export default defineConfig({
  ...configDefaults,
  test: {
    include: ["./__tests__/**/*.spec.js"],
    exclude: ["./__tests__/**/actual.d.ts", "./__tests__/**/expected.d.ts"],
  },
});

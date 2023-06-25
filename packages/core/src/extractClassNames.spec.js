import { describe, expect } from "vitest";
import { extractClassNames } from "./extractClassNames.mjs";
import { it } from "vitest";

const cssString = `
.text {
  color: red;
}

.text:hover {
  opacity: 0.1;
}

.text--bold {
  font-weight: bold;
}

.text--bold:hover {
  opacity: 0.2;
}

.button {
  background-color: blue;
}

.button:active {
  background-color: red;
}

.button:disabled {
  background-color: gray;
}

.container > .button {
  margin: 10px;
}
`;

describe("extractClassNames", () => {
  it("should work", () => {
    const classNames = extractClassNames(cssString);

    expect(classNames).toEqual(["text", "text--bold", "button", "container"]);
  });
});

/**
 * @typedef {import("yargs")} default
 */

import { run } from "./run.mjs";
import yargs from "yargs";

async function main() {
  const argv = yargs(process.argv)
    .option({
      pattern: {
        type: "string",
        describe: "Glob pattern",
        demandOption: true,
        alias: "p",
      },
    })
    .option({
      watch: {
        type: "boolean",
        describe: "Watch for file changes",
        default: false,
        alias: "w",
      },
    })
    .help()
    .parseSync();

  await run(argv.pattern, { watch: argv.watch });
}

main();

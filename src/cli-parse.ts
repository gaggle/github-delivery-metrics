/**
 * Module for parsing arguments passed into via Command Line Interface
 */
import { Command } from "commander";
import { join } from "path";
import { readFileSync } from "fs";

const packageInfo = JSON.parse(readFileSync(join(__dirname, "..", "package.json")).toString());

export type CliArgs = {
  debug: boolean;
  path: string;
  token: string;
}

/**
 * Parse argv for the main CLI args
 *
 * This is expected to be used by `main.ts`
 */
export function parseMainCli(program: Command, argv: string[]): CliArgs {
  program.version(packageInfo.version)
    .allowExcessArguments(false)
    .name("github-delivery-metrics")
    .description("This tool calculates various metrics that can be useful for discussions about delivery performance.")
    .option("-d, --debug", "Enable debug logging");

  program
    .command("lead-time")
    .description("Delivery Lead Time is inspired by the Accelerate book by Dr. Forsgren, " +
      "it finds when a release was made and compares it to the oldest commit in that release, " +
      "which speaks to how long it took from the code was committed until that code was released" +
      "\n(this assumes a GitHub release equals running in production)")
    .argument("<token>", "GitHub Personal Access Token")
    .argument("<path>", "Repository path in the form of <owner>/<repo>, e.g. \"gaggle/github-delivery-metrics\"")
    .action((token, path, opts, command: Command) => {
      command.setOptionValue("token", token);
      command.setOptionValue("path", path);
    })

  program.parse(argv);
  return program.opts();
}

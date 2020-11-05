/**
 * Module for parsing arguments passed into the Command Line Interface
 *
 * This module primarily exposes `parse` functions
 * that take raw args and returns objects with the parsed values
 */
import { readFileSync } from "fs"
import { join } from "path"

import { CommanderStatic } from "commander"

const packageInfo = JSON.parse(readFileSync(join(__dirname, "..", "package.json")).toString())
type Command = CommanderStatic["program"]

// SERVICE ARGS RELATE TO THE EXPRESS WEBSERVER
interface AppArgs {
  owner: string;
  rawPath: string;
  repo: string;
  token: string;
}

function enhanceWithAppArgs (program: Command): void {
  program
    .arguments("<token> <path>")
    .description("Calculate delivery lead time\n\n" +
      "Delivery Lead Time is an important metric in measuring team performance, " +
      "measuring the time it takes from code committed until it runs in production.\n" +
      "This tool finds releases and compares each release date with that release's oldest commit, " +
      "and that speaks to the lead time for code committed to that code running in production",
      {
        token: "GitHub access token to access API",
        path: "Repository path in the form of <owner>/<repo, e.g. \"gaggle/github-delivery-lead-time\""
      })
    .action(function (token: string, path: string, cmdObj) {
      const [owner, repo] = path.split("/")
      cmdObj.owner = owner
      cmdObj.rawPath = path
      cmdObj.repo = repo
      cmdObj.token = token
    })
}

// DEBUG ARGS ARE THE MISC. OPTIONS DISPLAYED LAST IN --HELP
interface DebugArgs {
  debug: boolean;
}

function enhanceWithDebugArgs (program: Command): void {
  program
    .option("-d, --debug", "output debug logging")
}

// PARSE FUNCTIONS - THE ACTUAL PURPOSE OF THIS MODULE :)
export type CliArgs = AppArgs & DebugArgs

/**
 * Parse argv for the main CLI args
 *
 * This is expected to be used by `main.ts`
 */
export function parseMainCli (program: Command, argv: string[]): Command & CliArgs {
  program.version(packageInfo.version)
  enhanceWithAppArgs(program)
  enhanceWithDebugArgs(program)

  program.parse(argv)
  return program as Command & CliArgs
}

// UTILITY FUNCTIONS
function parseNonNegativeNumber (program: Command, val: string, fieldName: string): number | undefined {
  const result = parseInt(val, 10)
  if (!Number.isNaN(result) && result >= 0) return result
  program.help(() => `Invalid ${fieldName} number: ${val}`)
}

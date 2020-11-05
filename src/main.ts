import { program } from "commander"
import { parseMainCli, CliArgs } from "./cliParse"
import { csv } from "./csv"
import { Fetcher } from "./fetcher"
import { GithubRepoWrapper } from "./githubWrapper"

async function main (args: CliArgs) {
  const fetcher = new Fetcher(new GithubRepoWrapper(args.token, args.owner, args.repo))
  await csv(fetcher)
}

const parsedArgs = parseMainCli(program, process.argv)
main(parsedArgs)
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })

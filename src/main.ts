import { program } from "commander";
import { parseMainCli, CliArgs } from "./cli-parse";
import { csv } from "./csv";
import { Fetcher } from "./fetcher";
import { GithubRepoWrapper } from "./github-wrapper";

async function main(args: CliArgs) {
  const [owner, repo] = args.path.split("/");
  const fetcher = new Fetcher(new GithubRepoWrapper(args.token, owner, repo));
  await csv(fetcher);
}

const parsedArgs = parseMainCli(program, process.argv);
main(parsedArgs)
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

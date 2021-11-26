import GitHub from "github-api"
import {
  GithubClient,
  GithubClientRepo,
  GithubCommit,
  GithubPullRequest,
  GithubRelease,
  GithubTag
} from "./types/github"

export class GithubRepoWrapper {
  private readonly ghClient: GithubClient
  private readonly ghRepo: GithubClientRepo
  private readonly owner: string
  private readonly repo: string

  public constructor (githubAccessToken: string, owner: string, repo: string) {
    this.ghClient = new GitHub({ token: githubAccessToken })
    this.owner = owner
    this.repo = repo
    this.ghRepo = this.ghClient.getRepo(owner, repo)
  }

  public async getPullRequest (number: string | number): Promise<GithubPullRequest> {
    const res = await this.ghRepo.getPullRequest(number)
    return res.data
  }

  public async listCommits (opts = {}): Promise<GithubCommit[]> {
    const res = await this.ghRepo._requestAllPages<GithubCommit[]>(this.getReposPath("commits"), opts)
    return res.data
  }

  public async listReleases (opts = {}): Promise<GithubRelease[]> {
    const res = await this.ghRepo._requestAllPages<GithubRelease[]>(this.getReposPath("releases"), opts)
    return res.data
  }

  public async listTags (opts = {}): Promise<GithubTag[]> {
    const res = await this.ghRepo._requestAllPages<GithubTag[]>(this.getReposPath("tags"), opts)
    return res.data
  }

  private getReposPath (suffix: string): string {
    return `https://api.github.com/repos/${this.owner}/${this.repo}/${suffix}`
  }
}


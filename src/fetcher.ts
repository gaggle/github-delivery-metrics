import { GithubRepoWrapper } from "./github-wrapper"
import { CommitModel, ReleaseModel } from "./types/fetcher"
import { GithubRelease } from "./types/github"

export class Fetcher {
  private readonly gh: GithubRepoWrapper

  constructor (githubRepoWrapper: GithubRepoWrapper) {
    this.gh = githubRepoWrapper
  }

  public async getReleases (): Promise<ReleaseModel[]> {
    const githubListReleases = await this.gh.listReleases()
    return githubListReleases
      .filter((r) => r.tag_name.endsWith("-prod"))
      .reduce((accumulator, ghRelease, idx, array) => {
        const prevGhRelease: GithubRelease | undefined = array[idx + 1]
        accumulator.push({
          createdAt: ghRelease.created_at,
          prevRelease: prevGhRelease
            ? {
              tagName: prevGhRelease.tag_name,
              publishedAt: prevGhRelease.published_at,
              createdAt: prevGhRelease.created_at,
            } : undefined,
          publishedAt: ghRelease.published_at,
          tagName: ghRelease.tag_name,
        })
        return accumulator
      }, [] as ReleaseModel[])
  }

  public async getReleaseCommits (release: ReleaseModel): Promise<CommitModel[]> {
    const githubListCommits = await this.gh.listCommits({ since: release.prevRelease.createdAt, until: release.createdAt })
    githubListCommits.pop() // The last commit *IS* the "since" commit, so we don't need it.
    return await Promise.all(
      githubListCommits
        .map(async (ghCommit) => {
          const commit: CommitModel = {
            date: ghCommit.commit.committer.date,
            message: ghCommit.commit.message,
            sha: ghCommit.sha,
          }
          const mergePRMatch = ghCommit.commit.message.match(/Merge pull request #(?<number>\w+)/)
          if (mergePRMatch) {
            const matchedNumber = mergePRMatch.groups.number
            const ghPr = await this.gh.getPullRequest(matchedNumber)
            commit.prNumber = ghPr.number
            commit.prTitle = ghPr.title
          }
          return commit
        })
    )
  }
}

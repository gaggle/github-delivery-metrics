import { DateTime } from "luxon"
import { Fetcher } from "./fetcher"

export async function csv (fetcher: Fetcher) {
  const releases = await fetcher.getReleases()
  const latestReleaseDate = DateTime.fromISO(releases[0].publishedAt)
  const aMonthAgo = latestReleaseDate.minus({ days: 60 }).toMillis()
  const recentReleases = releases.filter(release => DateTime.fromISO(release.publishedAt).toMillis() > aMonthAgo)
  console.log("tagName,publishedAt,firstCommitDate,leadTime,#commits,#pr,#devs")
  for (const release of recentReleases.reverse()) {
    const tagName = release.tagName
    const publishedAt = prettyDate(release.publishedAt)
    const commits = await fetcher.getReleaseCommits(release)
    if (!commits.length) continue

    const firstCommit = commits[commits.length - 1]
    const firstCommitDate = prettyDate(firstCommit.date)
    const leadTimeHumanized = prettyDuration(firstCommit.date, release.publishedAt)
    const numCommits = commits.length
    const numPRs = commits.filter(value => !!value.prNumber).length
    const numDevs = 7
    console.log(`${tagName},${publishedAt},${firstCommitDate},${leadTimeHumanized},${numCommits},${numPRs},${numDevs}`)

    // console.log(`${tagName}`)
    // console.log(`  PUBLISHED: ${publishedAt}`)
    // console.log(`  FIRST COMMIT: ${firstCommitDate}`)
    // console.log(`  LEAD TIME: ${leadTimeHumanized}`)

    // console.log("  COMMITS:")
    // for (const commit of commits) {
    //   const prNumber = `#${commit.prNumber}`.padStart(5)
    //   console.log(`    (${prettyDate(commit.date)} / #${commit.sha.slice(0, 7)}) PR${prNumber} ${commit.prTitle}`)
    // }
  }
}

function prettyDate (date: string): string {
  const dt = DateTime.fromISO(date)
  return dt.toFormat("dd/LL/yyyy TT")
}

function prettyDuration (from: string, to: string): string {
  const fromDt = DateTime.fromISO(from)
  const toDt = DateTime.fromISO(to)
  const d = toDt.diff(fromDt, ["years", "months", "days", "hours", "minutes", "seconds"])
  const elements = []
  if (d.years) elements.push(`${d.years}y`)
  if (d.months) elements.push(`${d.months}m`)
  if (d.days) elements.push(`${d.days}d`)
  if (d.hours) elements.push(`${d.hours}h`)
  if (d.minutes) elements.push(`${d.minutes}m`)
  if (d.seconds) elements.push(`${d.seconds}s`)
  return elements.join(" ")
}

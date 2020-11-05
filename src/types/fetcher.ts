export interface CommitModel {
  date: string;
  message: string;
  prNumber?: number,
  prTitle?: string,
  sha: string;
}

export interface ReleaseModel {
  createdAt: string;
  prevRelease?: ReleaseModel
  publishedAt: string;
  tagName: string;
}

export interface TagModel {
  commitSha: string;
  tagName: string;
}

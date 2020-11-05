export interface GithubClient {
  getGist: (id) => any
  getUser: (user) => any
  getOrganization: (organization) => any
  getTeam: (teamId) => any
  getRepo: (user, repo) => GithubClientRepo
  getIssues: (user, repo) => any
  search: (query) => any
  getRateLimit: () => any
  getMarkdown: () => any
  getProject: (id) => any
}

export interface GithubClientRepo {
  _requestAllPages: <ResponseDataType>(path, options) => Promise<GithubResponse<ResponseDataType>>
  commit: (parent, tree, message, options) => Promise<any>
  compareBranches: (base, head) => Promise<any>
  createBlob: (content) => Promise<any>
  createBranch: (oldBranch, newBranch) => Promise<any>
  createHook: (options) => Promise<any>
  createKey: (options) => Promise<any>
  createProject: (options) => Promise<any>
  createPullRequest: (options) => Promise<any>
  createRef: (options) => Promise<any>
  createRelease: (options) => Promise<any>
  createTree: (tree, baseSHA) => Promise<any>
  deleteFile: (branch, path) => Promise<any>
  deleteHook: (id) => Promise<any>
  deleteKey: (id) => Promise<any>
  deleteRef: (ref) => Promise<any>
  deleteRelease: (id) => Promise<any>
  deleteRepo: () => Promise<any>
  fork: () => Promise<any>
  forkToOrg: (org) => Promise<any>
  getBlob: (sha) => Promise<any>
  getBranch: (branch) => Promise<any>
  getCollaborators: () => Promise<any>
  getCombinedStatus: (sha) => Promise<any>
  getCommit: (sha) => Promise<any>
  getContents: (ref, path, raw) => Promise<any>
  getContributors: () => Promise<any>
  getContributorStats: () => Promise<any>
  getDetails: () => Promise<any>
  getHook: (id) => Promise<any>
  getKey: (id) => Promise<any>
  getPullRequest: (number) => Promise<GithubResponse<GithubPullRequest>>
  getReadme: (ref, raw) => Promise<any>
  getRef: (ref) => Promise<any>
  getRelease: (id) => Promise<any>
  getSha: (branch, path) => Promise<any>
  getSingleCommit: (ref) => Promise<any>
  getTree: (treeSHA) => Promise<any>
  isCollaborator: (username) => Promise<any>
  isStarred: () => Promise<any>
  listBranches: () => Promise<any>
  listCommits: (options) => Promise<any>
  listForks: () => Promise<any>
  listHooks: () => Promise<any>
  listKeys: () => Promise<any>
  listProjects: () => Promise<any>
  listPullRequestFiles: (number) => Promise<any>
  listPullRequests: (options) => Promise<GithubResponse<GithubPullRequest[]>>
  listReleases: () => Promise<GithubResponse<GithubRelease[]>>
  listStatuses: (sha) => Promise<any>
  listTags: () => Promise<GithubResponse<GithubTag[]>>
  mergePullRequest: (number, options) => Promise<any>
  move: (branch, oldPath, newPath) => Promise<any>
  star: () => Promise<any>
  unstar: () => Promise<any>
  updateHead: (ref, commitSHA, force) => Promise<any>
  updateHook: (id, options) => Promise<any>
  updatePullRequest: (number, options) => Promise<any>
  updateRelease: (id, options) => Promise<any>
  updateRepository: (options) => Promise<any>
  updateStatus: (commitSHA, options) => Promise<any>
  updateTree: (baseTreeSHA, path, blobSHA) => Promise<any>
  writeFile: (branch, path, content, message, options) => Promise<any>
}

interface GithubResponse<Data> {
  status: number;
  statusText: "OK";
  headers: any;
  config: any;
  request: any;
  data: Data;
}

export interface GithubCommit {
  "author": {
    "avatar_url": string,
    "events_url": string,
    "followers_url": string,
    "following_url": string,
    "gists_url": string,
    "gravatar_id": string,
    "html_url": string,
    "id": number,
    "login": string,
    "node_id": string,
    "organizations_url": string,
    "received_events_url": string,
    "repos_url": string,
    "site_admin": false
    "starred_url": string,
    "subscriptions_url": string,
    "type": "User",
    "url": string,
  },
  "comments_url": string,
  "commit": {
    "author": {
      "date": string
      "email": string,
      "name": string,
    },
    "comment_count": number,
    "committer": {
      "date": string
      "email": string,
      "name": string,
    },
    "message": string,
    "tree": {
      "sha": string,
      "url": string
    },
    "url": string,
    "verification": {
      "payload": null
      "reason": "unsigned",
      "signature": null,
      "verified": boolean,
    }
  },
  "committer": {
    "avatar_url": string,
    "events_url": string,
    "followers_url": string,
    "following_url": string,
    "gists_url": string,
    "gravatar_id": string,
    "html_url": string,
    "id": number,
    "login": string,
    "node_id": string,
    "organizations_url": string,
    "received_events_url": string,
    "repos_url": string,
    "site_admin": boolean
    "starred_url": string,
    "subscriptions_url": string,
    "type": "User",
    "url": string,
  },
  "files": Array<{
    "additions": number,
    "blob_url": string,
    "changes": number,
    "contents_url": string,
    "deletions": number,
    "filename": string,
    "patch": string
    "raw_url": string,
    "sha": string,
    "status": "added",
  }>
  "html_url": string,
  "node_id": string,
  "parents": Array<{
    "html_url": string
    "sha": string,
    "url": string,
  }>,
  "sha": string,
  "stats": {
    "additions": number,
    "deletions": number
    "total": number,
  },
  "url": string,
}

export interface GithubPullRequest {
  title: string;
  number: number;
  created_at: string;
  merged_at: string;
}

export interface GithubRelease {
  assets: []
  assets_url: string
  author: {
    login: string
    id: number
    node_id: string
    avatar_url: string
    gravatar_id: string
    url: string
    html_url: string
    followers_url: string
    following_url: string
    gists_url: string
    starred_url: string
    subscriptions_url: string
    organizations_url: string
    repos_url: string
    events_url: string
    received_events_url: string
    type: string
    site_admin: boolean
  }
  body: string
  created_at: string
  draft: boolean
  html_url: string
  id: number
  name: string
  node_id: string
  prerelease: boolean
  published_at: string
  tag_name: string
  tarball_url: string
  target_commitish: string
  upload_url: string
  url: string
  zipball_url: string
}

export interface GithubTag {
  commit: {
    sha: string;
    url: string;
  }
  name: string;
  node_id: string;
  tarball_url: string;
  zipball_url: string;
}

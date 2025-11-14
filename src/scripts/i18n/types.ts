/**
 * GET https://api.github.com/search/code
 */
export type GHOwner = {
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
  user_view_type: string
  site_admin: boolean
}

export type GHRepository = {
  id: number
  node_id: string
  name: string
  full_name: string
  private: boolean
  owner: GHOwner
  html_url: string
  description: string | null
  fork: boolean
  url: string
  forks_url: string
  keys_url: string
  collaborators_url: string
  teams_url: string
  hooks_url: string
  issue_events_url: string
  events_url: string
  assignees_url: string
  branches_url: string
  tags_url: string
  blobs_url: string
  git_tags_url: string
  git_refs_url: string
  trees_url: string
  statuses_url: string
  languages_url: string
  stargazers_url: string
  contributors_url: string
  subscribers_url: string
  subscription_url: string
  commits_url: string
  git_commits_url: string
  comments_url: string
  issue_comment_url: string
  contents_url: string
  compare_url: string
  merges_url: string
  archive_url: string
  downloads_url: string
  issues_url: string
  pulls_url: string
  milestones_url: string
  notifications_url: string
  labels_url: string
  releases_url: string
  deployments_url: string
}

export type GitHubQueryResponseItem = {
  name: string
  path: string
  sha: string
  url: string
  git_url: string
  html_url: string
  repository: GHRepository
  score: number
}

// Optional: the whole response is an array of items
export type GitHubQueryResponse = GitHubQueryResponseItem[]

/**
 * getFileMetadata
 */
export type ContentType =
  | "application/json"
  | "text/markdown"
  | "application/octet-stream"

export type GitHubCrowdinFileMetadata = {
  "Crowdin-API-FileName": string
  filePath: string // e.g., src/intl/en/page-layer-2-networks.json (no leading slash)
  download_url: string
  "Content-Type": ContentType
}

/**
 * GET https://api.crowdin.com/api/v2/projects/${env.projectID}/files
 */
export type CrowdinImportOptions = {
  contentSegmentation: boolean
  customSegmentation: boolean
  excludeCodeBlocks: boolean
  excludedFrontMatterElements: string[]
  inlineTags: string[]
}

export type CrowdinExportOptions = {
  exportPattern: string | null
  strongMarker: string
  emphasisMarker: string
  unorderedListBullet: string
  tableColumnWidth: string
  frontMatterQuotes: string
}

export type CrowdinFileData = {
  id: number // fileId
  projectId: number
  branchId: number | null
  directoryId: number
  name: string
  title: string | null
  context: string | null
  type: "md" | "json" // string
  path: string // e.g., /public/content/about/index.md (with leading slash)
  status: string
  revisionId: number
  priority: string
  importOptions: CrowdinImportOptions
  exportOptions: CrowdinExportOptions
  excludedTargetLanguages: string[] | null
  parserVersion: number
  createdAt: string
  updatedAt: string
}

/**
 * PUT https://api.crowdin.com/api/v2/projects/${projectId}/files/${fileId}
 * https://support.crowdin.com/developer/api/v2/#tag/Source-Files/operation/api.projects.files.put
 */
export type CrowdinFileInfoResponseModel = {
  id: number
  projectId: number
  branchId: number | null
  directoryId: number | null
  name: string
  title: string | null
  context: string | null
  type: string
  path: string
  status: string
  revisionId: number
  priority: string
  importOptions: Record<string, unknown> | null
  exportOptions: Record<string, unknown> | null
  excludedTargetLanguages: string[] | null
  parserVersion: number | null
  createdAt: string | null
  updatedAt: string | null
}

export type CrowdinPreTranslateAttributes = {
  languageIds: string[]
  fileIds: number[]
  method: string
  autoApproveOption: string
  duplicateTranslations: boolean
  skipApprovedTranslations: boolean
  labelIds: number[]
  aiPromptId: number | null
  excludeLabelIds: number[]
  sourceLanguageId: string | null
  fallbackLanguages: string[] | null
  translateUntranslatedOnly: boolean
  translateWithPerfectMatchOnly: boolean
}

export type CrowdinPreTranslateResponse = {
  identifier: string
  status: "created" | "in_progress" | "canceled" | "failed" | "finished"
  progress: number // In percentages
  attributes: CrowdinPreTranslateAttributes
  createdAt: string
  updatedAt: string
  startedAt: string | null
  finishedAt: string | null
  eta: string | null
}

export type BuildProjectFileTranslationResponse = {
  url: string
  expireIn: string
  etag: string
}

export type BranchObject = {
  sha: string
  type: string // e.g. "commit"
  url: string
}

export type BranchDetailsResponse = {
  ref: string // e.g. "refs/heads/dev"
  node_id: string
  url: string
  object: BranchObject
}

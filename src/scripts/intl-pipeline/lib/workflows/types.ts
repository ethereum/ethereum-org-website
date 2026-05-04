// Types for intl-pipeline workflow phases

/**
 * File committed to GitHub branch
 */
export interface CommittedFile {
  path: string
  content: string
}

/**
 * Language pair mapping
 */
export interface LanguagePair {
  internalLanguageCode: string
  languageName: string
}

/**
 * Pull request data
 */
export interface PullRequest {
  html_url: string
  number: number
}

/**
 * Result of processing a single language in split-PR mode
 */
export interface SplitPRResult {
  language: string
  status: "success" | "failed"
  prUrl?: string
  error?: string
}

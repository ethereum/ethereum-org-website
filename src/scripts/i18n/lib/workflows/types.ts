// Types for i18n workflow phases

import type { GlossaryByLanguage } from "../supabase"
import type { CrowdinFileData, CrowdinPreTranslateResponse } from "../types"

/**
 * Shared context passed between workflow phases
 */
export interface WorkflowContext {
  crowdinProjectFiles: CrowdinFileData[]
  fileIdsSet: Set<number>
  processedFileIdToPath: Record<number, string>
  englishBuffers: Record<number, Buffer>
  glossary: GlossaryByLanguage
}

/**
 * Result of file preparation phase
 */
export interface FilePreparationResult {
  fileIdsSet: Set<number>
  processedFileIdToPath: Record<number, string>
  englishBuffers: Record<number, Buffer>
}

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
  crowdinId: string
  internalLanguageCode: string
}

/**
 * Result of translation download phase
 */
export interface TranslationDownloadResult {
  branch: string
  committedFiles: CommittedFile[]
  languagePairs: LanguagePair[]
  fileIdToPathMapping: Record<number, string>
}

/**
 * Pull request data
 */
export interface PullRequest {
  html_url: string
  number: number
}

/**
 * Pre-translation job result
 */
export interface PreTranslationResult {
  response: CrowdinPreTranslateResponse
  fileIdToPathMapping: Record<number, string>
}

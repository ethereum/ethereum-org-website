// Types for i18n workflow phases

import type { GlossaryByLanguage } from "../supabase"
import type { CrowdinFileData, CrowdinPreTranslateResponse } from "../types"

/**
 * Per-language job tracking data
 */
export interface LanguageJobInfo {
  /** Internal language code (e.g., "es", "zh") */
  internalCode: string
  /** Crowdin language code (e.g., "es-EM", "zh-CN") */
  crowdinCode: string
  /** Ephemeral prompt ID created for this language */
  ephemeralPromptId: number
  /** Pre-translation job ID */
  preTranslationId: string
}

/**
 * Shared context passed between workflow phases
 */
export interface WorkflowContext {
  crowdinProjectFiles: CrowdinFileData[]
  fileIdsSet: Set<number>
  processedFileIdToPath: Record<number, string>
  englishBuffers: Record<number, Buffer>
  glossary: GlossaryByLanguage
  /** Per-language job info (populated during pre-translation phase) */
  languageJobs: LanguageJobInfo[]
  /** Crowdin user ID (needed for ephemeral prompt cleanup) */
  crowdinUserId?: number
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
 * Pre-translation job result (supports multiple per-language jobs)
 */
export interface PreTranslationResult {
  /** All pre-translation responses (one per language) */
  responses: CrowdinPreTranslateResponse[]
  /** File ID to path mapping */
  fileIdToPathMapping: Record<number, string>
  /** File IDs that were translated */
  fileIds: number[]
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

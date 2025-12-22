import crowdin from "@crowdin/crowdin-api-client"

import { loadEnv } from "./env"

// Retry configuration
const RETRY_COUNT = 3
const RETRY_WAIT_MS = 1000

/**
 * Check if an error is retryable (rate limit or server error).
 */
function isRetryableError(error: unknown): boolean {
  if (typeof error !== "object" || error === null) return false
  const err = error as { code?: number; status?: number }
  const status = err.code ?? err.status
  return status === 429 || (status !== undefined && status >= 500)
}

/**
 * Create a configured Crowdin client with retry logic.
 */
function createCrowdinClient() {
  const env = loadEnv()

  return new crowdin({
    token: env.crowdinApiKey,
    retryConfig: {
      retries: RETRY_COUNT,
      waitInterval: RETRY_WAIT_MS,
      conditions: [{ test: isRetryableError }],
    },
  })
}

// Lazily initialized client
let clientInstance: ReturnType<typeof createCrowdinClient> | null = null

function getClient() {
  if (!clientInstance) {
    clientInstance = createCrowdinClient()
  }
  return clientInstance
}

/**
 * Crowdin API wrapper with typed methods.
 */
export const crowdinClient = {
  /**
   * Get the project ID from environment.
   */
  get projectId(): number {
    return loadEnv().crowdinProjectId
  },

  /**
   * Source Files API - for uploading and managing source files.
   */
  get sourceFiles() {
    return getClient().sourceFilesApi
  },

  /**
   * Upload Storage API - for uploading file content before creating files.
   */
  get uploadStorage() {
    return getClient().uploadStorageApi
  },

  /**
   * Translations API - for building and downloading translations.
   */
  get translations() {
    return getClient().translationsApi
  },

  /**
   * Source Strings API - for managing strings (unhiding, etc).
   */
  get sourceStrings() {
    return getClient().sourceStringsApi
  },

  /**
   * AI API - for pre-translation with AI prompts.
   */
  get ai() {
    return getClient().aiApi
  },

  /**
   * Projects API - for project-level operations.
   */
  get projects() {
    return getClient().projectsGroupsApi
  },
}

/**
 * Type exports for SDK responses (re-export from SDK types).
 */
export type {
  SourceFilesModel,
  TranslationsModel,
  UploadStorageModel,
} from "@crowdin/crowdin-api-client"

import { z } from "zod"

/**
 * Zod schema for i18n workflow environment variables.
 * Validates and transforms environment variables at startup.
 */
const EnvSchema = z.object({
  // Crowdin configuration
  CROWDIN_API_KEY: z
    .string()
    .min(1, "CROWDIN_API_KEY is required (I18N_CROWDIN_API_KEY)")
    .optional(),
  I18N_CROWDIN_API_KEY: z.string().min(1).optional(),
  CROWDIN_PROJECT_ID: z
    .string()
    .transform(Number)
    .pipe(z.number().positive())
    .optional()
    .default("834930"),

  // GitHub configuration
  GITHUB_API_KEY: z
    .string()
    .min(1, "GITHUB_API_KEY is required (I18N_GITHUB_API_KEY)")
    .optional(),
  I18N_GITHUB_API_KEY: z.string().min(1).optional(),
  GITHUB_TOKEN: z.string().min(1).optional(),
  GITHUB_REPOSITORY: z.string().default("ethereum/ethereum-org-website"),

  // Gemini configuration (for JSX translation)
  GEMINI_API_KEY: z.string().optional(),

  // Translation targets
  TARGET_LANGUAGE: z.string().min(2).max(10).optional(),
  TARGET_LANGUAGES: z.string().optional(),

  // Workflow configuration
  BASE_BRANCH: z.string().default("dev"),
  FILE_LIMIT: z
    .string()
    .transform(Number)
    .pipe(z.number().positive())
    .optional()
    .default("100"),

  // Crowdin AI prompt ID
  PRE_TRANSLATE_PROMPT_ID: z
    .string()
    .transform(Number)
    .pipe(z.number().positive())
    .optional()
    .default("168584"),
})

/**
 * Processed environment type with resolved values.
 */
export interface Env {
  crowdinApiKey: string
  crowdinProjectId: number
  githubApiKey: string
  githubOwner: string
  githubRepo: string
  geminiApiKey?: string
  targetLanguage?: string
  targetLanguages: string[]
  baseBranch: string
  fileLimit: number
  preTranslatePromptId: number
}

let cachedEnv: Env | null = null

/**
 * Load and validate environment variables.
 * Supports both new (CROWDIN_API_KEY) and legacy (I18N_CROWDIN_API_KEY) names.
 */
export function loadEnv(): Env {
  if (cachedEnv) return cachedEnv

  const result = EnvSchema.safeParse(process.env)
  if (!result.success) {
    console.error("Environment validation failed:")
    result.error.issues.forEach((issue) => {
      console.error(`  ${issue.path.join(".")}: ${issue.message}`)
    })
    process.exit(1)
  }

  const raw = result.data

  // Resolve API keys (support legacy names)
  const crowdinApiKey = raw.CROWDIN_API_KEY || raw.I18N_CROWDIN_API_KEY
  const githubApiKey =
    raw.GITHUB_API_KEY || raw.I18N_GITHUB_API_KEY || raw.GITHUB_TOKEN

  if (!crowdinApiKey) {
    console.error("CROWDIN_API_KEY or I18N_CROWDIN_API_KEY is required")
    process.exit(1)
  }

  if (!githubApiKey) {
    console.error(
      "GITHUB_API_KEY, I18N_GITHUB_API_KEY, or GITHUB_TOKEN is required"
    )
    process.exit(1)
  }

  // Parse repository
  const [githubOwner, githubRepo] = raw.GITHUB_REPOSITORY.split("/")

  // Parse target languages
  const targetLanguages = raw.TARGET_LANGUAGES
    ? raw.TARGET_LANGUAGES.split(",").map((lang) => lang.trim())
    : raw.TARGET_LANGUAGE
      ? [raw.TARGET_LANGUAGE]
      : ["es-EM"]

  cachedEnv = {
    crowdinApiKey,
    crowdinProjectId: raw.CROWDIN_PROJECT_ID ?? 834930,
    githubApiKey,
    githubOwner,
    githubRepo,
    geminiApiKey: raw.GEMINI_API_KEY,
    targetLanguage: raw.TARGET_LANGUAGE,
    targetLanguages,
    baseBranch: raw.BASE_BRANCH,
    fileLimit: raw.FILE_LIMIT ?? 100,
    preTranslatePromptId: raw.PRE_TRANSLATE_PROMPT_ID ?? 168584,
  }

  return cachedEnv
}

/**
 * Clear the cached environment (useful for testing).
 */
export function clearEnvCache(): void {
  cachedEnv = null
}

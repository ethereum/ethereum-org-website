import {
  BASE_TIME_UNIT,
  DEFAULT_LOCALE,
  GITHUB_REPO_URL,
  STATIC_LOCALES,
  TIMEOUT_MS,
} from "../constants"
import { fetchWithTimeoutAndRevalidation } from "../utils/data/utils"

const getGitHubRawUrl = (locale: string, slug: string): string => {
  const repoPath = GITHUB_REPO_URL.replace("https://github.com/", "").replace(
    /\/$/,
    ""
  )
  const branch = "master"

  if (locale === DEFAULT_LOCALE) {
    return `https://raw.githubusercontent.com/${repoPath}/${branch}/public/content/${slug}/index.md`
  }

  return `https://raw.githubusercontent.com/${repoPath}/${branch}/public/content/translations/${locale}/${slug}/index.md`
}

const fetchMarkdownFromGitHub = async (
  locale: string,
  slug: string
): Promise<string> => {
  const url = getGitHubRawUrl(locale, slug)
  const response = await fetchWithTimeoutAndRevalidation(
    url,
    TIMEOUT_MS,
    BASE_TIME_UNIT * 24
  )

  if (!response.ok) {
    throw new Error(
      `Failed to fetch markdown from GitHub: ${response.status} ${response.statusText}`
    )
  }

  return await response.text()
}

// Imports markdown content either locally (for STATIC_LOCALES) or remotely from GitHub
export const importMd = async (locale: string, slug: string) => {
  const isStaticLocale = STATIC_LOCALES.includes(locale)

  let markdown = ""

  if (locale === DEFAULT_LOCALE) {
    markdown = (await import(`../../../public/content/${slug}/index.md`))
      .default
  } else {
    try {
      if (isStaticLocale) {
        markdown = (
          await import(
            `../../../public/content/translations/${locale}/${slug}/index.md`
          )
        ).default
      } else {
        markdown = await fetchMarkdownFromGitHub(locale, slug)
      }
    } catch (error) {
      // Fallback to default locale - try local first, then remote
      try {
        const markdown = (
          await import(`../../../public/content/${slug}/index.md`)
        ).default

        return {
          markdown,
          isTranslated: false,
        }
      } catch (localError) {
        try {
          const markdown = await fetchMarkdownFromGitHub(DEFAULT_LOCALE, slug)
          return {
            markdown,
            isTranslated: false,
          }
        } catch (githubError) {
          throw error
        }
      }
    }
  }

  return {
    markdown,
    isTranslated: true,
  }
}

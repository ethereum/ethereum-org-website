import { join } from "path"

import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import type { Author, FileContributorsState, Lang } from "@/lib/types"

import {
  DEFAULT_LOCALE,
  GITHUB_COMMITS_URL,
  OLD_CONTENT_DIR,
} from "@/lib/constants"

export const gitHubAuthHeaders = {
  headers: new Headers({
    // About personal access tokens https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token#about-personal-access-tokens
    Authorization: "Token " + process.env.NEXT_PUBLIC_GITHUB_TOKEN_READ_ONLY,
  }),
}

const fetchGitHubContributors = async (
  relativePath: string,
  locale?: Lang
): Promise<FileContributorsState> => {
  const url = new URL(GITHUB_COMMITS_URL)
  // TODO: OLD_CONTENT_DIR -> CONTENT_DIR for production
  const localePath =
    locale && locale !== DEFAULT_LOCALE
      ? join("translations", locale, relativePath)
      : relativePath
  const filePath = join(OLD_CONTENT_DIR, localePath, "index.md")
  url.searchParams.set("path", filePath)

  try {
    const response = await fetch(url, gitHubAuthHeaders)
    if (!response.ok) throw new Error(response.statusText)
    const commits = await response.json()
    const authorSet = new Set<string>()
    commits
      .filter(({ author }) => author)
      .forEach(({ author, commit }) => {
        const entry: Author = {
          name: commit.author.name,
          email: commit.author.email,
          avatarUrl: author.avatar_url,
          user: {
            login: author.login,
            url: author.html_url,
          },
        }
        // Unique authors only
        authorSet.add(JSON.stringify(entry))
      })
    const authors = Array.from(authorSet).map(
      JSON.parse as (entry: string) => Author
    )
    return { loading: false, authors }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(filePath, error.message)
    }
    return { loading: false, error }
  }
}
/**
 * Client-side hook to fetch GitHub contributors for a given file
 * @param relativePath Relative path of the file being queried
 * @returns `state` comprise of { loading, authors?, error? }
 */
export const useClientSideGitHubContributors = (
  relativePath: string
): FileContributorsState => {
  const [state, setState] = useState<FileContributorsState>({ loading: true })
  const { locale } = useRouter()
  useEffect(() => {
    ;(async () => {
      setState(await fetchGitHubContributors(relativePath, locale as Lang))
    })()
  }, [relativePath])
  return state
}

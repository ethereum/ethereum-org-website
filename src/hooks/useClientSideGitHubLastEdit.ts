import { join } from "path"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import {
  DEFAULT_LOCALE,
  GITHUB_COMMITS_URL,
  OLD_CONTENT_DIR,
} from "@/lib/constants"
import type { Lang, LastUpdatedState } from "@/lib/types"

import { gitHubAuthHeaders } from "@/hooks/useClientSideGitHubContributors"

const fetchGitHubLastEdit = async (
  relativePath: string,
  locale?: Lang
): Promise<LastUpdatedState> => {
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
    const lastCommit = (await response.json())[0]
    const lastEdit = lastCommit.commit.author.date
    return { loading: false, lastEdit }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(filePath, error.message)
    }
    return { loading: false, error }
  }
}
/**
 * Client-side hook to fetch date of last commit through GitHub
 * Use example:
 * @param relativePath Relative path of the file being queried
 * @returns `state` comprise of { loading, lastEdit?, error? }
 */
export const useClientSideGitHubLastEdit = (
  relativePath: string
): LastUpdatedState => {
  const [state, setState] = useState<LastUpdatedState>({ loading: true })
  const { locale } = useRouter()
  useEffect(() => {
    ;(async () => {
      setState(await fetchGitHubLastEdit(relativePath, locale as Lang))
    })()
  }, [relativePath])
  return state
}

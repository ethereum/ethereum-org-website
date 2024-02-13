import { join } from "path"

import { useEffect, useState } from "react"
import { useRouter } from "next/router"

import type { Lang, LastUpdatedState } from "@/lib/types"

import {
  CONTENT_DIR,
  DEFAULT_LOCALE,
  GITHUB_COMMITS_URL,
} from "@/lib/constants"

import { gitHubAuthHeaders } from "@/hooks/useClientSideGitHubContributors"

const fetchGitHubLastEdit = async (
  relativePath: string,
  locale?: Lang
): Promise<LastUpdatedState> => {
  const url = new URL(GITHUB_COMMITS_URL)
  const localePath =
    locale && locale !== DEFAULT_LOCALE
      ? join("translations", locale, relativePath)
      : relativePath
  const filePath = join(CONTENT_DIR, localePath, "index.md")
  url.searchParams.set("path", filePath)

  try {
    const response = await fetch(url, gitHubAuthHeaders)
    if (!response.ok) throw new Error(response.statusText)
    const lastCommit = (await response.json())[0]
    const lastEdit = lastCommit.commit.author.date
    return { loading: false, data: lastEdit }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(filePath, error.message)
    }
    return { loading: false, error }
  }
}
/**
 * Client-side hook to fetch date of last commit through GitHub
 * @param relativePath Relative path of the file being queried
 * @returns `state` comprise of data with loading state, where data is last edit string
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
  }, [relativePath, locale])
  return state
}

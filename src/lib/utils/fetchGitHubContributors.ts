import { join } from "path"
import { GITHUB_COMMITS_URL, OLD_CONTENT_DIR } from "@/lib/constants"
import type { Author } from "@/lib/interfaces"
import type { FileContributorsState } from "@/lib/types"

export const gitHubAuthHeaders = {
  headers: new Headers({
    // About personal access tokens https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token#about-personal-access-tokens
    Authorization: "Token " + process.env.NEXT_PUBLIC_GITHUB_TOKEN_READ_ONLY,
  }),
}

export const fetchGitHubContributors = async (
  relativePath: string
): Promise<FileContributorsState> => {
  const url = new URL(GITHUB_COMMITS_URL)
  // TODO: OLD_CONTENT_DIR -> CONTENT_DIR for production
  const filePath = join(OLD_CONTENT_DIR, relativePath, "index.md")
  url.searchParams.set("path", filePath)

  try {
    const response = await fetch(url, gitHubAuthHeaders)
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
  } catch (error) {
    console.error(filePath, error)
    return { loading: false, error }
  }
}

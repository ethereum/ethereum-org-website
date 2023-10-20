import { join } from "path"
import { GITHUB_AUTH_HEADERS, GITHUB_COMMITS_URL } from "@/lib/constants"
import type { Author } from "@/lib/interfaces"
import type { FileContributorsState } from "@/lib/types"

export const fetchGitHubAuthors = async (
  relativePath: string
): Promise<FileContributorsState> => {
  const url = new URL(GITHUB_COMMITS_URL)
  const CONTENT_DIR = "/src/content/" // TODO: Overriding with Gatsby repo—Remove and import from constants.ts for production
  const filePath = join(CONTENT_DIR, relativePath, "index.md")
  url.searchParams.set("path", filePath)

  try {
    const uniqueAuthors: Array<Author> = []
    const response = await fetch(url, GITHUB_AUTH_HEADERS)
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
    Array.from(authorSet).forEach((entry) =>
      uniqueAuthors.push(JSON.parse(entry))
    )
    return { loading: false, authors: uniqueAuthors }
  } catch (error) {
    console.error(filePath, error)
    return { loading: false, error }
  }
}

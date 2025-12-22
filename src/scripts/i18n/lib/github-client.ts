import { createPullRequest } from "octokit-plugin-create-pull-request"
import { throttling } from "@octokit/plugin-throttling"
import { Octokit } from "@octokit/rest"

import { loadEnv } from "./env"

const MAX_RETRY_COUNT = 2

/**
 * Create a configured Octokit client with throttling and PR creation plugins.
 */
function createGitHubClient() {
  const env = loadEnv()

  const MyOctokit = Octokit.plugin(throttling, createPullRequest)

  return new MyOctokit({
    auth: env.githubApiKey,
    throttle: {
      onRateLimit: (
        retryAfter: number,
        options: { method: string; url: string },
        _: unknown,
        retryCount: number
      ) => {
        console.warn(
          `[GitHub] Rate limit hit for ${options.method} ${options.url}, retrying after ${retryAfter}s`
        )
        return retryCount < MAX_RETRY_COUNT
      },
      onSecondaryRateLimit: (
        retryAfter: number,
        options: { method: string; url: string }
      ) => {
        console.warn(
          `[GitHub] Secondary rate limit for ${options.method} ${options.url}, waiting ${retryAfter}s`
        )
        // Don't retry abuse detection limits
        return false
      },
    },
  })
}

// Lazily initialized client
let clientInstance: ReturnType<typeof createGitHubClient> | null = null

function getClient() {
  if (!clientInstance) {
    clientInstance = createGitHubClient()
  }
  return clientInstance
}

/**
 * GitHub API wrapper.
 */
export const githubClient = {
  /**
   * Get owner and repo from environment.
   */
  get owner(): string {
    return loadEnv().githubOwner
  },

  get repo(): string {
    return loadEnv().githubRepo
  },

  get baseBranch(): string {
    return loadEnv().baseBranch
  },

  /**
   * Get the raw Octokit instance.
   */
  get octokit() {
    return getClient()
  },

  /**
   * Create a new branch from a reference.
   */
  async createBranch(branchName: string, fromRef?: string): Promise<string> {
    const client = getClient()
    const ref = fromRef || this.baseBranch

    // Get the SHA of the base branch
    const { data: refData } = await client.git.getRef({
      owner: this.owner,
      repo: this.repo,
      ref: `heads/${ref}`,
    })

    // Create the new branch
    await client.git.createRef({
      owner: this.owner,
      repo: this.repo,
      ref: `refs/heads/${branchName}`,
      sha: refData.object.sha,
    })

    console.log(`[GitHub] Created branch ${branchName} from ${ref}`)
    return branchName
  },

  /**
   * Create or update a file in the repository.
   */
  async createOrUpdateFile(
    path: string,
    content: string | Buffer,
    branch: string,
    message: string
  ): Promise<void> {
    const client = getClient()

    // Check if file exists to get its SHA
    let sha: string | undefined
    try {
      const { data } = await client.repos.getContent({
        owner: this.owner,
        repo: this.repo,
        path,
        ref: branch,
      })
      if (!Array.isArray(data) && data.type === "file") {
        sha = data.sha
      }
    } catch (error: unknown) {
      // File doesn't exist, that's fine for creation
      const err = error as { status?: number }
      if (err.status !== 404) throw error
    }

    // Convert content to base64
    const contentBase64 =
      typeof content === "string"
        ? Buffer.from(content).toString("base64")
        : content.toString("base64")

    await client.repos.createOrUpdateFileContents({
      owner: this.owner,
      repo: this.repo,
      path,
      message,
      content: contentBase64,
      branch,
      sha,
    })

    console.log(`[GitHub] ${sha ? "Updated" : "Created"} ${path}`)
  },

  /**
   * Create a pull request.
   */
  async createPullRequest(
    head: string,
    title: string,
    body: string,
    base?: string
  ): Promise<{ number: number; html_url: string }> {
    const client = getClient()

    const { data } = await client.pulls.create({
      owner: this.owner,
      repo: this.repo,
      head,
      base: base || this.baseBranch,
      title,
      body,
    })

    console.log(`[GitHub] Created PR #${data.number}: ${data.html_url}`)
    return { number: data.number, html_url: data.html_url }
  },

  /**
   * Create a pull request with multiple file changes in a single commit.
   * Uses octokit-plugin-create-pull-request for atomic PR creation.
   */
  async createPullRequestWithFiles(options: {
    title: string
    body: string
    branch: string
    base?: string
    files: Record<string, string | Buffer | null>
    commitMessage: string
  }): Promise<{ number: number; html_url: string } | null> {
    const client = getClient() as ReturnType<typeof createGitHubClient> & {
      createPullRequest: (opts: {
        owner: string
        repo: string
        title: string
        body: string
        head: string
        base?: string
        changes: {
          files: Record<string, string | { content: string; encoding: string }>
          commit: string
        }[]
      }) => Promise<{ data: { number: number; html_url: string } } | null>
    }

    // Convert Buffer files to base64 encoded objects
    const convertedFiles: Record<
      string,
      string | { content: string; encoding: string }
    > = {}
    for (const [path, content] of Object.entries(options.files)) {
      if (content === null) {
        // Deletion - skip for now (plugin doesn't support deletion well)
        continue
      } else if (Buffer.isBuffer(content)) {
        convertedFiles[path] = {
          content: content.toString("base64"),
          encoding: "base64",
        }
      } else {
        convertedFiles[path] = content
      }
    }

    const result = await client.createPullRequest({
      owner: this.owner,
      repo: this.repo,
      title: options.title,
      body: options.body,
      head: options.branch,
      base: options.base || this.baseBranch,
      changes: [
        {
          files: convertedFiles,
          commit: options.commitMessage,
        },
      ],
    })

    if (!result) {
      console.log("[GitHub] No changes to commit")
      return null
    }

    console.log(
      `[GitHub] Created PR #${result.data.number}: ${result.data.html_url}`
    )
    return { number: result.data.number, html_url: result.data.html_url }
  },
}

export type GitHubClient = typeof githubClient

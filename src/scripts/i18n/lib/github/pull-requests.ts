// GitHub pull request operations

import { config, gitHubBearerHeaders } from "../../config"
import { fetchWithRetry } from "../utils/fetch"

/**
 * Create a pull request
 *
 * @param head - The head branch (source of changes)
 * @param base - The base branch (target for merge, defaults to config.baseBranch)
 * @param title - PR title
 * @param bodyText - Optional PR description text
 * @returns The created pull request object
 */
export const postPullRequest = async (
  head: string,
  base = config.baseBranch,
  title: string,
  bodyText?: string
) => {
  const url = new URL(
    `https://api.github.com/repos/${config.ghOrganization}/${config.ghRepo}/pulls`
  )

  const body = {
    title,
    head,
    base,
    body: bodyText || "Automated Crowdin translation import",
  }

  const res = await fetchWithRetry(url.toString(), {
    method: "POST",
    headers: {
      ...gitHubBearerHeaders,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    console.warn("Res not OK")
    const body = await res.text().catch(() => "")
    throw new Error(`Crowdin postPullRequest failed (${res.status}): ${body}`)
  }

  const json = await res.json()
  return json
}

/**
 * Post a comment on a pull request
 *
 * @param prNumber - The PR number
 * @param commentBody - The comment body text
 * @returns The created comment object
 */
export const postPullRequestComment = async (
  prNumber: number,
  commentBody: string
) => {
  const url = new URL(
    `https://api.github.com/repos/${config.ghOrganization}/${config.ghRepo}/issues/${prNumber}/comments`
  )

  const res = await fetchWithRetry(url.toString(), {
    method: "POST",
    headers: {
      ...gitHubBearerHeaders,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ body: commentBody }),
  })

  if (!res.ok) {
    const body = await res.text().catch(() => "")
    throw new Error(`Failed to post PR comment (${res.status}): ${body}`)
  }

  const json = await res.json()
  return json
}

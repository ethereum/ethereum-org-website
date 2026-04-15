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
    body: bodyText || "Automated Gemini translation import",
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
    throw new Error(`postPullRequest failed (${res.status}): ${body}`)
  }

  const json = await res.json()
  return json
}

/**
 * Find an open PR for a given head -> base branch pair.
 * Returns the PR object if found, null otherwise.
 */
export const findOpenPR = async (
  head: string,
  base: string = config.baseBranch
): Promise<{ number: number; html_url: string; body: string } | null> => {
  const fullHead = `${config.ghOrganization}:${head}`
  const url = `https://api.github.com/repos/${config.ghOrganization}/${config.ghRepo}/pulls?state=open&head=${encodeURIComponent(fullHead)}&base=${encodeURIComponent(base)}`

  const res = await fetchWithRetry(url, {
    method: "GET",
    headers: gitHubBearerHeaders,
  })

  if (!res.ok) return null

  const prs = (await res.json()) as Array<{
    number: number
    html_url: string
    body: string
  }>
  return prs.length > 0 ? prs[0] : null
}

/**
 * Update the body of an existing PR.
 */
export const updatePRBody = async (
  prNumber: number,
  body: string
): Promise<void> => {
  const url = `https://api.github.com/repos/${config.ghOrganization}/${config.ghRepo}/pulls/${prNumber}`

  const res = await fetchWithRetry(url, {
    method: "PATCH",
    headers: {
      ...gitHubBearerHeaders,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ body }),
  })

  if (!res.ok) {
    const text = await res.text().catch(() => "")
    throw new Error(
      `Failed to update PR #${prNumber} body (${res.status}): ${text}`
    )
  }
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

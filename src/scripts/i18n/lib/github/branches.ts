// GitHub branch operations

import { config, gitHubBearerHeaders } from "../../config"
import type { BranchDetailsResponse, BranchObject } from "../types"
import { fetchWithRetry } from "../utils/fetch"

/**
 * Retrieves the Git object for a branch from the GitHub API
 *
 * @param branch - The branch name to look up (e.g., "main" or "dev")
 * @returns A promise that resolves to the BranchObject containing sha, type, and url
 */
export const getBranchObject = async (
  branch: string
): Promise<BranchObject> => {
  const url = new URL(
    `https://api.github.com/repos/${config.ghOrganization}/${config.ghRepo}/git/ref/heads/${branch}`
  )

  const res = await fetchWithRetry(url.toString(), {
    headers: gitHubBearerHeaders,
  })

  if (!res.ok) {
    console.warn("Res not OK")
    const body = await res.text().catch(() => "")
    throw new Error(`GitHub getBranchObject (${res.status}): ${body}`)
  }

  type JsonResponse = BranchDetailsResponse
  const json: JsonResponse = await res.json()
  return json.object
}

/**
 * Generate a branch name based on current timestamp
 */
export const createBranchName = () => {
  const ts = new Date().toISOString().replace(/\..*$/, "").replace(/[:]/g, "-")
  return "i18n/import/" + ts
}

/**
 * Create a new branch from a base branch
 *
 * @param ref - The base branch reference (defaults to config.baseBranch)
 * @returns Object containing the new branch name and SHA
 */
export const postCreateBranchFrom = async (ref = config.baseBranch) => {
  const { sha } = await getBranchObject(ref)
  const branch = createBranchName()

  const url = new URL(
    `https://api.github.com/repos/${config.ghOrganization}/${config.ghRepo}/git/refs`
  )

  try {
    console.log(
      `[DEBUG] Creating branch from base="${ref}" sha=${sha} -> new branch="${branch}"`
    )
    const res = await fetchWithRetry(url.toString(), {
      method: "POST",
      headers: {
        ...gitHubBearerHeaders,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ref: `refs/heads/${branch}`, sha }),
    })

    if (!res.ok) {
      console.warn("Res not OK")
      const body = await res.text().catch(() => "")
      console.error(
        `[ERROR] Failed to create branch. URL=${url.toString()} status=${res.status}`
      )
      throw new Error(`GitHub createBranchFrom (${res.status}): ${body}`)
    }

    return { branch, sha }
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

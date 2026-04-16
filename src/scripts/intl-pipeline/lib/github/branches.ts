// GitHub branch operations

import { config, gitHubBearerHeaders } from "../../config"
import type { BranchDetailsResponse, BranchObject } from "../types"
import { fetchWithRetry } from "../utils/fetch"
import { debugLog } from "../workflows/utils"

/**
 * Create a new branch on GitHub from a known SHA.
 * Use this when you already have the base SHA (e.g., from getBranchObject).
 */
export const createBranchFromSha = async (
  branchName: string,
  sha: string
): Promise<void> => {
  const url = `https://api.github.com/repos/${config.ghOrganization}/${config.ghRepo}/git/refs`

  debugLog(`Creating branch "${branchName}" from SHA ${sha}`)

  const res = await fetchWithRetry(url, {
    method: "POST",
    headers: {
      ...gitHubBearerHeaders,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ref: `refs/heads/${branchName}`, sha }),
  })

  if (!res.ok) {
    const body = await res.text().catch(() => "")
    throw new Error(`GitHub createBranch (${res.status}): ${body}`)
  }
}

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
export const createBranchName = (suffix?: string) => {
  const now = new Date()
  const mm = String(now.getUTCMonth() + 1).padStart(2, "0")
  const dd = String(now.getUTCDate()).padStart(2, "0")
  const hh = String(now.getUTCHours()).padStart(2, "0")
  const min = String(now.getUTCMinutes()).padStart(2, "0")
  const ts = `${mm}-${dd}T${hh}${min}`
  const label = suffix || "multi"
  return `i18n/${label}-${ts}`
}

/**
 * Check if a branch exists on GitHub.
 */
export const branchExists = async (branchName: string): Promise<boolean> => {
  const url = `https://api.github.com/repos/${config.ghOrganization}/${config.ghRepo}/git/ref/heads/${branchName}`
  const res = await fetchWithRetry(url, {
    headers: gitHubBearerHeaders,
  })
  return res.ok
}

/**
 * Merge a base branch into a head branch via the GitHub API.
 * Used to keep the staging branch up-to-date with dev.
 * Returns true if merge succeeded (or was already up-to-date).
 */
export const mergeBranchInto = async (
  base: string,
  head: string
): Promise<boolean> => {
  const url = `https://api.github.com/repos/${config.ghOrganization}/${config.ghRepo}/merges`
  debugLog(`Merging "${base}" into "${head}"`)

  const res = await fetchWithRetry(url, {
    method: "POST",
    headers: {
      ...gitHubBearerHeaders,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      base: head,
      head: base,
      commit_message: `i18n: merge ${base} into ${head}`,
    }),
  })

  if (res.status === 204) {
    debugLog("Already up-to-date")
    return true
  }
  if (res.status === 201) {
    debugLog("Merge commit created")
    return true
  }
  if (res.status === 409) {
    console.error(
      `[ERROR] Merge conflict: ${base} into ${head}. Manual resolution needed.`
    )
    return false
  }

  const body = await res.text().catch(() => "")
  console.error(`[ERROR] Merge failed (${res.status}): ${body}`)
  return false
}

/**
 * Ensure a staging branch exists and is up-to-date with its base.
 * Creates the branch if it doesn't exist; merges base into it if it does.
 * Returns the branch name.
 */
export const ensureStagingBranch = async (
  branchName: string,
  baseBranch: string
): Promise<string> => {
  const exists = await branchExists(branchName)

  if (!exists) {
    console.log(`[branch] Creating "${branchName}" from "${baseBranch}"`)
    const baseObj = await getBranchObject(baseBranch)
    await createBranchFromSha(branchName, baseObj.sha)
    return branchName
  }

  console.log(
    `[branch] "${branchName}" exists, merging "${baseBranch}" into it`
  )
  const merged = await mergeBranchInto(baseBranch, branchName)
  if (!merged) {
    throw new Error(
      `Cannot merge ${baseBranch} into ${branchName}. Resolve conflicts or delete the branch and retry.`
    )
  }

  return branchName
}

/**
 * Create a new branch from a base branch
 *
 * @param ref - The base branch reference (defaults to config.baseBranch)
 * @returns Object containing the new branch name and SHA
 */
export const postCreateBranchFrom = async (
  ref = config.baseBranch,
  suffix?: string
) => {
  const { sha } = await getBranchObject(ref)
  const branch = createBranchName(suffix)

  const url = new URL(
    `https://api.github.com/repos/${config.ghOrganization}/${config.ghRepo}/git/refs`
  )

  try {
    debugLog(
      `Creating branch from base="${ref}" sha=${sha} -> new branch="${branch}"`
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
    throw error instanceof Error
      ? error
      : new Error(`postCreateBranchFrom failed: ${String(error)}`)
  }
}

// GitHub pull request operations

import { config, gitHubBearerHeaders } from "../../config"
import { fetchWithRetry } from "../utils/fetch"

/**
 * Create a pull request
 *
 * @param head - The head branch (source of changes)
 * @param base - The base branch (target for merge, defaults to config.baseBranch)
 * @param bodyText - Optional PR description text
 * @returns The created pull request object
 */
export const postPullRequest = async (
  head: string,
  base = config.baseBranch,
  bodyText?: string
) => {
  const url = new URL(
    `https://api.github.com/repos/${config.ghOrganization}/${config.ghRepo}/pulls`
  )

  const body = {
    title: "i18n: automated Crowdin translation import",
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

// GitHub commit operations

import { config, gitHubBearerHeaders } from "../../config"
import { fetchWithRetry } from "../utils/fetch"

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

/**
 * Get the destination path for a translated file
 *
 * @param crowdinFilePath - The Crowdin file path (e.g., src/intl/en/page-foo.json)
 * @param internalLanguageCode - The internal language code
 * @returns The destination path in the repository
 */
export const getDestinationFromPath = (
  crowdinFilePath: string,
  internalLanguageCode: string
) => {
  const normalized = crowdinFilePath.replace(/^\//, "")
  const isJson = normalized.toLowerCase().endsWith(".json")
  const isMarkdown = normalized.toLowerCase().endsWith(".md")

  let destinationPath = normalized

  if (isJson) {
    // JSON: src/intl/en/*.json -> src/intl/<lang>/*.json
    if (normalized.startsWith("src/intl/en/")) {
      destinationPath = normalized.replace(
        /^src\/intl\/en\//,
        `src/intl/${internalLanguageCode}/`
      )
    } else if (normalized.startsWith("src/intl/")) {
      // Fallback: if for some reason "en" segment is missing, inject lang after src/intl/
      const parts = normalized.split("/")
      // parts: [src, intl, ...]
      parts.splice(2, 0, internalLanguageCode)
      destinationPath = parts.join("/")
    }
  } else if (isMarkdown) {
    // Markdown: public/content/<path>/index.md -> public/content/translations/<lang>/<path>/index.md
    if (normalized.startsWith("public/content/")) {
      const rel = normalized.replace(/^public\/content\//, "")
      // If already inside translations/, avoid duplicating; rewrite to current lang
      const relParts = rel.split("/").filter(Boolean)
      if (relParts[0] === "translations") {
        // Drop existing translations/<lang>/
        const rest = relParts.slice(2).join("/")
        destinationPath = `public/content/translations/${internalLanguageCode}/${rest}`
      } else {
        destinationPath = `public/content/translations/${internalLanguageCode}/${rel}`
      }
    }
  }

  console.log(
    `[DEBUG] Destination mapping: ${crowdinFilePath} -> ${destinationPath} (lang=${internalLanguageCode})`
  )
  return destinationPath
}

/**
 * Get the SHA of a file at a specific path
 *
 * @param path - The file path in the repository
 * @param branch - The branch name
 * @returns Object containing the file SHA
 */
export const getPathSha = async (path: string, branch: string) => {
  const url = new URL(
    `https://api.github.com/repos/${config.ghOrganization}/${config.ghRepo}/contents/${path}?ref=${branch}`
  )

  const res = await fetchWithRetry(url.toString(), {
    headers: gitHubBearerHeaders,
  })

  if (!res.ok) {
    console.warn("Res not OK")
    const body = await res.text().catch(() => "")
    throw new Error(`GitHub getPathSha (${res.status}): ${body}`)
  }

  type JsonResponse = { sha: string }
  const { sha }: JsonResponse = await res.json()

  return { sha }
}

/**
 * Commit a file to a GitHub branch with retry logic for conflicts
 *
 * @param buffer - The file contents as a Buffer
 * @param destinationPath - The path in the repository
 * @param branch - The branch name
 * @param sha - Optional SHA for updating existing files
 * @param attempt - Current retry attempt number
 */
export const putCommitFile = async (
  buffer: Buffer,
  destinationPath: string,
  branch: string,
  sha?: string,
  attempt = 0
): Promise<void> => {
  const url = `https://api.github.com/repos/${config.ghOrganization}/${config.ghRepo}/contents/${destinationPath}`

  try {
    // Use the buffer contents as base64-encoded content for the commit
    const contentBase64 = buffer.toString("base64")

    const body = {
      message: `update(i18n): ${destinationPath}`,
      content: contentBase64,
      branch,
    }

    if (sha) body["sha"] = sha

    const res = await fetchWithRetry(url.toString(), {
      method: "PUT",
      headers: {
        ...gitHubBearerHeaders,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })

    if (res.status === 422) {
      const { sha: fileSha } = await getPathSha(destinationPath, branch)
      console.warn(
        `[RETRY] 422 Unprocessable for ${destinationPath}. Retrying with existing SHA ${fileSha}`
      )
      return await putCommitFile(
        buffer,
        destinationPath,
        branch,
        fileSha,
        attempt
      )
    }

    if (res.status === 409) {
      if (attempt >= 5) {
        const bodyText = await res.text().catch(() => "")
        throw new Error(
          `GitHub putCommitFile conflict persists after ${attempt} retries (${res.status}): ${bodyText}`
        )
      }
      const backoff = 500 * Math.pow(2, attempt) // 500ms, 1s, 2s, 4s, 8s
      console.warn(
        `[RETRY] 409 Conflict for ${destinationPath}. Attempt ${attempt + 1}. Waiting ${backoff}ms before retry.`
      )
      await delay(backoff)
      const { sha: latestSha } = await getPathSha(destinationPath, branch)
      return await putCommitFile(
        buffer,
        destinationPath,
        branch,
        latestSha,
        attempt + 1
      )
    }

    if (!res.ok) {
      console.warn("Res not OK")
      const body = await res.text().catch(() => "")
      throw new Error(`GitHub putCommitFile (${res.status}): ${body}`)
    }
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

// GitHub commit operations

import { config, gitHubBearerHeaders } from "../../config"
import { fetchWithRetry } from "../utils/fetch"
import { debugLog, delay } from "../workflows/utils"

/** File to be committed in a batch */
export interface BatchFile {
  path: string
  content: Buffer
}

interface TreeItem {
  path: string
  mode: string
  type: string
  sha: string
}

/**
 * Shared committer for parallel language translation.
 *
 * Creates individual chained commits (each parented on the previous)
 * so multiple languages can interleave safely. Each file appears on the
 * branch immediately for crash safety.
 *
 * After all translations complete, call squashByLanguage() to collapse
 * the individual commits into one per language for a clean history.
 */
export class SharedCommitter {
  private currentCommitSha = ""
  private currentTreeSha = ""
  private queue: Promise<void> = Promise.resolve()
  private baseUrl = `https://api.github.com/repos/${config.ghOrganization}/${config.ghRepo}`
  /** Track blob SHAs per language for squashing */
  private blobsByLanguage = new Map<string, TreeItem[]>()
  /** SHA of the original base before any translations */
  private originalBaseSha = ""

  constructor(private branch: string) {}

  /** Snapshot the current branch state. */
  async init(): Promise<void> {
    const refRes = await fetchWithRetry(
      `${this.baseUrl}/git/ref/heads/${this.branch}`,
      { headers: gitHubBearerHeaders }
    )
    if (!refRes.ok) {
      const body = await refRes.text().catch(() => "")
      throw new Error(`SharedCommitter init ref (${refRes.status}): ${body}`)
    }
    const refData: { object: { sha: string } } = await refRes.json()
    this.currentCommitSha = refData.object.sha
    this.originalBaseSha = refData.object.sha

    const commitRes = await fetchWithRetry(
      `${this.baseUrl}/git/commits/${this.currentCommitSha}`,
      { headers: gitHubBearerHeaders }
    )
    if (!commitRes.ok) {
      const body = await commitRes.text().catch(() => "")
      throw new Error(
        `SharedCommitter init commit (${commitRes.status}): ${body}`
      )
    }
    const commitData: { tree: { sha: string } } = await commitRes.json()
    this.currentTreeSha = commitData.tree.sha
  }

  /**
   * Queue a file commit. Serialized so concurrent languages don't race.
   * Each commit chains on the previous (not amending).
   */
  commitFile(
    filePath: string,
    content: string,
    language: string
  ): Promise<void> {
    const result = this.queue.then(() =>
      this._doCommit(filePath, content, language)
    )
    this.queue = result.then(
      () => {},
      () => {}
    )
    return result
  }

  private async _doCommit(
    filePath: string,
    content: string,
    language: string
  ): Promise<void> {
    // 1. Create blob
    const blobRes = await fetchWithRetry(`${this.baseUrl}/git/blobs`, {
      method: "POST",
      headers: { ...gitHubBearerHeaders, "Content-Type": "application/json" },
      body: JSON.stringify({
        content: Buffer.from(content, "utf8").toString("base64"),
        encoding: "base64",
      }),
    })
    if (!blobRes.ok) {
      const body = await blobRes.text().catch(() => "")
      throw new Error(
        `Failed to create blob for ${filePath} (${blobRes.status}): ${body}`
      )
    }
    const blobData: { sha: string } = await blobRes.json()

    const item: TreeItem = {
      path: filePath,
      mode: "100644",
      type: "blob",
      sha: blobData.sha,
    }

    // Track blob for squashing
    if (!this.blobsByLanguage.has(language)) {
      this.blobsByLanguage.set(language, [])
    }
    this.blobsByLanguage.get(language)!.push(item)

    // 2. Create tree on top of current tree
    const treeRes = await fetchWithRetry(`${this.baseUrl}/git/trees`, {
      method: "POST",
      headers: { ...gitHubBearerHeaders, "Content-Type": "application/json" },
      body: JSON.stringify({
        base_tree: this.currentTreeSha,
        tree: [item],
      }),
    })
    if (!treeRes.ok) {
      const body = await treeRes.text().catch(() => "")
      throw new Error(`Failed to create tree (${treeRes.status}): ${body}`)
    }
    const treeData: { sha: string } = await treeRes.json()

    // 3. Create commit parented on the current tip (chaining, not amending)
    const commitRes = await fetchWithRetry(`${this.baseUrl}/git/commits`, {
      method: "POST",
      headers: { ...gitHubBearerHeaders, "Content-Type": "application/json" },
      body: JSON.stringify({
        message: `i18n(${language}): ${filePath.split("/").pop()}`,
        tree: treeData.sha,
        parents: [this.currentCommitSha],
      }),
    })
    if (!commitRes.ok) {
      const body = await commitRes.text().catch(() => "")
      throw new Error(`Failed to create commit (${commitRes.status}): ${body}`)
    }
    const commitData: { sha: string } = await commitRes.json()

    // 4. Update branch ref (no force needed -- linear chain)
    const updateRes = await fetchWithRetry(
      `${this.baseUrl}/git/refs/heads/${this.branch}`,
      {
        method: "PATCH",
        headers: { ...gitHubBearerHeaders, "Content-Type": "application/json" },
        body: JSON.stringify({ sha: commitData.sha }),
      }
    )
    if (!updateRes.ok) {
      const body = await updateRes.text().catch(() => "")
      throw new Error(`Failed to update ref (${updateRes.status}): ${body}`)
    }

    // Advance internal state
    this.currentCommitSha = commitData.sha
    this.currentTreeSha = treeData.sha

    debugLog(`SharedCommitter [${language}]: committed ${filePath}`)
  }

  /**
   * Squash all individual commits into one per language.
   * Builds a new commit chain from the original base:
   *   base -> lang1 (all files) -> lang2 (all files) -> ...
   * Then force-updates the branch ref.
   */
  async squashByLanguage(): Promise<void> {
    const languages = Array.from(this.blobsByLanguage.keys()).sort()
    if (languages.length === 0) return

    console.log(
      `[SharedCommitter] Squashing ${languages.length} language(s): ${languages.join(", ")}`
    )

    let parentSha = this.originalBaseSha
    // Get the original base tree
    const baseCommitRes = await fetchWithRetry(
      `${this.baseUrl}/git/commits/${this.originalBaseSha}`,
      { headers: gitHubBearerHeaders }
    )
    if (!baseCommitRes.ok) {
      const body = await baseCommitRes.text().catch(() => "")
      throw new Error(
        `Failed to get base commit for squash (${baseCommitRes.status}): ${body}`
      )
    }
    const baseCommitData: { tree: { sha: string } } = await baseCommitRes.json()
    let currentTree = baseCommitData.tree.sha

    for (const lang of languages) {
      const blobs = this.blobsByLanguage.get(lang)!

      // Create tree with all blobs for this language on top of current tree
      const treeRes = await fetchWithRetry(`${this.baseUrl}/git/trees`, {
        method: "POST",
        headers: { ...gitHubBearerHeaders, "Content-Type": "application/json" },
        body: JSON.stringify({
          base_tree: currentTree,
          tree: blobs,
        }),
      })
      if (!treeRes.ok) {
        const body = await treeRes.text().catch(() => "")
        throw new Error(
          `Failed to create squash tree for ${lang} (${treeRes.status}): ${body}`
        )
      }
      const treeData: { sha: string } = await treeRes.json()

      // Create squashed commit
      const commitRes = await fetchWithRetry(`${this.baseUrl}/git/commits`, {
        method: "POST",
        headers: { ...gitHubBearerHeaders, "Content-Type": "application/json" },
        body: JSON.stringify({
          message: `i18n(${lang}): Gemini translation`,
          tree: treeData.sha,
          parents: [parentSha],
        }),
      })
      if (!commitRes.ok) {
        const body = await commitRes.text().catch(() => "")
        throw new Error(
          `Failed to create squash commit for ${lang} (${commitRes.status}): ${body}`
        )
      }
      const commitData: { sha: string } = await commitRes.json()

      parentSha = commitData.sha
      currentTree = treeData.sha

      console.log(
        `[SharedCommitter] Squashed ${blobs.length} files for ${lang}`
      )
    }

    // Force-update branch to squashed chain
    const updateRes = await fetchWithRetry(
      `${this.baseUrl}/git/refs/heads/${this.branch}`,
      {
        method: "PATCH",
        headers: { ...gitHubBearerHeaders, "Content-Type": "application/json" },
        body: JSON.stringify({ sha: parentSha, force: true }),
      }
    )
    if (!updateRes.ok) {
      const body = await updateRes.text().catch(() => "")
      throw new Error(
        `Failed to update ref after squash (${updateRes.status}): ${body}`
      )
    }

    // Update internal state
    this.currentCommitSha = parentSha
    this.currentTreeSha = currentTree

    console.log(
      `[SharedCommitter] Squash complete: ${languages.length} commits`
    )
  }

  get totalFiles(): number {
    let count = 0
    for (const blobs of this.blobsByLanguage.values()) {
      count += blobs.length
    }
    return count
  }

  get languageCount(): number {
    return this.blobsByLanguage.size
  }
}

/**
 * Commit multiple files in a single commit using GitHub's Git Data API.
 * This avoids creating one commit per file.
 *
 * @param files - Array of files to commit
 * @param branch - Target branch name
 * @param message - Commit message
 */
export async function batchCommitFiles(
  files: BatchFile[],
  branch: string,
  message: string
): Promise<void> {
  if (files.length === 0) {
    debugLog("batchCommitFiles: No files to commit, skipping")
    return
  }

  const baseUrl = `https://api.github.com/repos/${config.ghOrganization}/${config.ghRepo}`

  // 1. Get current branch ref
  const refRes = await fetchWithRetry(`${baseUrl}/git/ref/heads/${branch}`, {
    headers: gitHubBearerHeaders,
  })
  if (!refRes.ok) {
    const body = await refRes.text().catch(() => "")
    throw new Error(`Failed to get branch ref (${refRes.status}): ${body}`)
  }
  const refData: { object: { sha: string } } = await refRes.json()
  const latestCommitSha = refData.object.sha

  // 2. Get the commit to find base tree
  const commitRes = await fetchWithRetry(
    `${baseUrl}/git/commits/${latestCommitSha}`,
    { headers: gitHubBearerHeaders }
  )
  if (!commitRes.ok) {
    const body = await commitRes.text().catch(() => "")
    throw new Error(`Failed to get commit (${commitRes.status}): ${body}`)
  }
  const commitData: { tree: { sha: string } } = await commitRes.json()
  const baseTreeSha = commitData.tree.sha

  // 3. Create blobs for each file
  // Add delay between requests to avoid hitting GitHub's secondary rate limits
  const BLOB_CREATION_DELAY_MS = 200 // 200ms between blob creations
  const treeItems: { path: string; mode: string; type: string; sha: string }[] =
    []

  for (let i = 0; i < files.length; i++) {
    const file = files[i]

    // Add delay before each request (except the first one)
    if (i > 0) {
      await delay(BLOB_CREATION_DELAY_MS)
    }

    const blobRes = await fetchWithRetry(`${baseUrl}/git/blobs`, {
      method: "POST",
      headers: { ...gitHubBearerHeaders, "Content-Type": "application/json" },
      body: JSON.stringify({
        content: file.content.toString("base64"),
        encoding: "base64",
      }),
    })
    if (!blobRes.ok) {
      const body = await blobRes.text().catch(() => "")
      throw new Error(
        `Failed to create blob for ${file.path} (${blobRes.status}): ${body}`
      )
    }
    const blobData: { sha: string } = await blobRes.json()
    treeItems.push({
      path: file.path,
      mode: "100644",
      type: "blob",
      sha: blobData.sha,
    })

    // Log progress for large batches
    if (files.length > 10 && (i + 1) % 10 === 0) {
      debugLog(`Created ${i + 1}/${files.length} blobs...`)
    }
  }

  // 4. Create new tree
  const treeRes = await fetchWithRetry(`${baseUrl}/git/trees`, {
    method: "POST",
    headers: { ...gitHubBearerHeaders, "Content-Type": "application/json" },
    body: JSON.stringify({
      base_tree: baseTreeSha,
      tree: treeItems,
    }),
  })
  if (!treeRes.ok) {
    const body = await treeRes.text().catch(() => "")
    throw new Error(`Failed to create tree (${treeRes.status}): ${body}`)
  }
  const treeData: { sha: string } = await treeRes.json()

  // 5. Create commit
  const newCommitRes = await fetchWithRetry(`${baseUrl}/git/commits`, {
    method: "POST",
    headers: { ...gitHubBearerHeaders, "Content-Type": "application/json" },
    body: JSON.stringify({
      message,
      tree: treeData.sha,
      parents: [latestCommitSha],
    }),
  })
  if (!newCommitRes.ok) {
    const body = await newCommitRes.text().catch(() => "")
    throw new Error(`Failed to create commit (${newCommitRes.status}): ${body}`)
  }
  const newCommitData: { sha: string } = await newCommitRes.json()

  // 6. Update branch ref
  const updateRefRes = await fetchWithRetry(
    `${baseUrl}/git/refs/heads/${branch}`,
    {
      method: "PATCH",
      headers: { ...gitHubBearerHeaders, "Content-Type": "application/json" },
      body: JSON.stringify({ sha: newCommitData.sha }),
    }
  )
  if (!updateRefRes.ok) {
    const body = await updateRefRes.text().catch(() => "")
    throw new Error(`Failed to update ref (${updateRefRes.status}): ${body}`)
  }

  debugLog(
    `batchCommitFiles: Committed ${files.length} files in single commit ${newCommitData.sha}`
  )
}

/**
 * Get the destination path for a translated file
 *
 * @param filePath - The source file path (e.g., src/intl/en/page-foo.json)
 * @param internalLanguageCode - The internal language code
 * @returns The destination path in the repository
 */
export const getDestinationFromPath = (
  filePath: string,
  internalLanguageCode: string
) => {
  const normalized = filePath.replace(/^\//, "")
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

  debugLog(
    `Destination mapping: ${filePath} -> ${destinationPath} (lang=${internalLanguageCode})`
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

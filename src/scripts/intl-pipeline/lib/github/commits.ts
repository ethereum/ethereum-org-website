// GitHub commit operations

import { config, gitHubBearerHeaders } from "../../config"
import { LLM } from "../../constants"
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
 * commitFile() only creates a git blob and records it per-language; it does
 * NOT touch the branch ref. squashByLanguage() (called once after all tasks
 * drain) builds the real commit chain from the recorded blobs and force-updates
 * the ref a single time.
 *
 * This deliberately does NOT advance the branch ref per file. An earlier design
 * created a chained commit + ref update for every file, but under the pool's
 * concurrency those per-file ref updates raced and returned 422 "not a fast
 * forward". A task that threw on that 422 had already recorded its content blob
 * but aborted before recording its manifest blob(s), so the squash shipped
 * content WITHOUT its manifest -- silently desyncing the manifest tracking that
 * the whole incremental pipeline depends on. The per-file ref update was also
 * redundant: the squash rebuilds everything from blobsByLanguage regardless.
 */
export class SharedCommitter {
  private baseUrl = `https://api.github.com/repos/${config.ghOrganization}/${config.ghRepo}`
  /** Track blob SHAs per language for squashing */
  private blobsByLanguage = new Map<string, TreeItem[]>()
  /** SHA of the original base before any translations */
  private originalBaseSha = ""

  constructor(private branch: string) {}

  /** Snapshot the base commit the squash will build on top of. */
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
    this.originalBaseSha = refData.object.sha
  }

  /**
   * Record a file for committing: creates a git blob and tracks it under its
   * language. Does NOT touch the branch ref -- squashByLanguage() builds the
   * commit chain from the tracked blobs at the end of the run.
   *
   * Safe to call concurrently across languages and files: blob creation is an
   * independent API call and the per-language array push is atomic on the JS
   * event loop. Crucially, this never throws on a branch-ref race, so a task
   * always reaches its manifest commits after its content commit.
   */
  async commitFile(
    filePath: string,
    content: string,
    language: string
  ): Promise<void> {
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

    if (!this.blobsByLanguage.has(language)) {
      this.blobsByLanguage.set(language, [])
    }
    this.blobsByLanguage.get(language)!.push(item)

    debugLog(`SharedCommitter [${language}]: recorded ${filePath}`)
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
          message: `i18n(${lang}): LLM translation\n\nCo-Authored-By: ${LLM.coAuthor || LLM.name}`,
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

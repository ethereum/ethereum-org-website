/**
 * Glossary and TM backup utilities
 * Handles hashing, Git operations, and timestamped backups
 */

import * as crypto from "crypto"
import * as fs from "fs"
import * as path from "path"

const ROOT = process.cwd()
const BACKUP_ROOT = path.join(ROOT, "src/scripts/i18n/backups")
const GLOSSARY_BACKUP_DIR = path.join(BACKUP_ROOT, "glossary")
const TM_BACKUP_DIR = path.join(BACKUP_ROOT, "tm")
const HASH_FILE = path.join(BACKUP_ROOT, "hashes.json")

export interface BackupHashes {
  glossary?: Record<string, string> // glossaryName -> hash
  tm?: Record<string, string> // tmName -> hash
  lastUpdated?: string
}

/**
 * Calculate SHA-256 hash of content
 */
export function calculateHash(content: string): string {
  return crypto.createHash("sha256").update(content, "utf8").digest("hex")
}

/**
 * Get short hash (first 8 characters)
 */
export function getShortHash(content: string): string {
  return calculateHash(content).substring(0, 8)
}

/**
 * Ensure backup directories exist
 */
export function ensureBackupDirs(): void {
  if (!fs.existsSync(BACKUP_ROOT)) {
    fs.mkdirSync(BACKUP_ROOT, { recursive: true })
  }
  if (!fs.existsSync(GLOSSARY_BACKUP_DIR)) {
    fs.mkdirSync(GLOSSARY_BACKUP_DIR, { recursive: true })
  }
  if (!fs.existsSync(TM_BACKUP_DIR)) {
    fs.mkdirSync(TM_BACKUP_DIR, { recursive: true })
  }
}

/**
 * Load existing backup hashes
 */
export function loadBackupHashes(): BackupHashes {
  if (!fs.existsSync(HASH_FILE)) {
    return { glossary: {}, tm: {} }
  }

  try {
    const content = fs.readFileSync(HASH_FILE, "utf8")
    return JSON.parse(content)
  } catch (error) {
    console.warn(`[BACKUP] Failed to load hashes, using empty:`, error)
    return { glossary: {}, tm: {} }
  }
}

/**
 * Save backup hashes
 */
export function saveBackupHashes(hashes: BackupHashes): void {
  ensureBackupDirs()
  hashes.lastUpdated = new Date().toISOString()
  fs.writeFileSync(HASH_FILE, JSON.stringify(hashes, null, 2), "utf8")
}

/**
 * Check if content has changed (compare with stored hash)
 */
export function hasContentChanged(
  name: string,
  content: string,
  type: "glossary" | "tm"
): boolean {
  const hashes = loadBackupHashes()
  const storedHash = (type === "glossary" ? hashes.glossary : hashes.tm)?.[name]

  if (!storedHash) {
    console.log(`[BACKUP] No previous hash found for ${type}:${name}`)
    return true
  }

  const currentHash = calculateHash(content)
  const changed = currentHash !== storedHash

  if (changed) {
    console.log(`[BACKUP] Content changed for ${type}:${name}`)
    console.log(`[BACKUP] - Old hash: ${storedHash}`)
    console.log(`[BACKUP] - New hash: ${currentHash}`)
  } else {
    console.log(`[BACKUP] No changes detected for ${type}:${name}`)
  }

  return changed
}

/**
 * Save backup file with timestamp and hash
 */
export function saveBackup(
  name: string,
  content: string,
  type: "glossary" | "tm",
  extension: string = "tbx"
): string {
  ensureBackupDirs()

  const timestamp = Date.now()
  const shortHash = getShortHash(content)
  const sanitizedName = name.replace(/[^a-z0-9-_]/gi, "_").toLowerCase()
  const filename = `${timestamp}_${shortHash}_${sanitizedName}.${extension}`

  const dir = type === "glossary" ? GLOSSARY_BACKUP_DIR : TM_BACKUP_DIR
  const filepath = path.join(dir, filename)

  fs.writeFileSync(filepath, content, "utf8")
  console.log(`[BACKUP] Saved ${type} backup: ${filename}`)

  // Update hash record
  const hashes = loadBackupHashes()
  if (type === "glossary") {
    if (!hashes.glossary) hashes.glossary = {}
    hashes.glossary[name] = calculateHash(content)
  } else {
    if (!hashes.tm) hashes.tm = {}
    hashes.tm[name] = calculateHash(content)
  }
  saveBackupHashes(hashes)

  return filepath
}

/**
 * Get list of backup files for a resource
 */
export function listBackups(
  name: string,
  type: "glossary" | "tm"
): Array<{ path: string; timestamp: number; hash: string }> {
  const dir = type === "glossary" ? GLOSSARY_BACKUP_DIR : TM_BACKUP_DIR

  if (!fs.existsSync(dir)) {
    return []
  }

  const sanitizedName = name.replace(/[^a-z0-9-_]/gi, "_").toLowerCase()
  const files = fs.readdirSync(dir)

  return files
    .filter((file) => file.includes(sanitizedName))
    .map((file) => {
      const [timestampStr, hash] = file.split("_")
      return {
        path: path.join(dir, file),
        timestamp: parseInt(timestampStr, 10),
        hash,
      }
    })
    .sort((a, b) => b.timestamp - a.timestamp) // Most recent first
}

/**
 * Get most recent backup for a resource
 */
export function getMostRecentBackup(
  name: string,
  type: "glossary" | "tm"
): string | null {
  const backups = listBackups(name, type)
  if (backups.length === 0) return null

  const mostRecent = backups[0]
  return fs.readFileSync(mostRecent.path, "utf8")
}

/**
 * Clean up old backups, keeping only the most recent N
 */
export function cleanupOldBackups(
  name: string,
  type: "glossary" | "tm",
  keepCount: number = 10
): void {
  const backups = listBackups(name, type)

  if (backups.length <= keepCount) {
    console.log(
      `[BACKUP] Only ${backups.length} backups for ${type}:${name}, no cleanup needed`
    )
    return
  }

  const toDelete = backups.slice(keepCount)
  console.log(
    `[BACKUP] Cleaning up ${toDelete.length} old backups for ${type}:${name}`
  )

  for (const backup of toDelete) {
    try {
      fs.unlinkSync(backup.path)
      console.log(`[BACKUP] Deleted: ${path.basename(backup.path)}`)
    } catch (error) {
      console.warn(`[BACKUP] Failed to delete ${backup.path}:`, error)
    }
  }
}

/**
 * Get relative paths for all backup files (for Git commit)
 */
export function getAllBackupPaths(): string[] {
  const paths: string[] = []

  if (fs.existsSync(GLOSSARY_BACKUP_DIR)) {
    const glossaryFiles = fs.readdirSync(GLOSSARY_BACKUP_DIR)
    paths.push(
      ...glossaryFiles.map((f) =>
        path.relative(ROOT, path.join(GLOSSARY_BACKUP_DIR, f))
      )
    )
  }

  if (fs.existsSync(TM_BACKUP_DIR)) {
    const tmFiles = fs.readdirSync(TM_BACKUP_DIR)
    paths.push(
      ...tmFiles.map((f) => path.relative(ROOT, path.join(TM_BACKUP_DIR, f)))
    )
  }

  if (fs.existsSync(HASH_FILE)) {
    paths.push(path.relative(ROOT, HASH_FILE))
  }

  return paths
}

/**
 * Mock storage implementation for local development.
 *
 * This reads mock data files from /data-layer/mocks instead of connecting
 * to Netlify Blobs. Useful for local development without requiring
 * Netlify Blobs credentials.
 */

import * as fs from "fs"
import * as fsPromises from "fs/promises"
import * as path from "path"

import type { Storage, StorageMetadata, StorageResult, TaskId } from "../types"

/**
 * Get the mocks directory path.
 * Resolves lazily at runtime to handle different working directories during build vs runtime.
 */
function getMocksDir(): string {
  // Try multiple possible locations
  const possiblePaths = [
    path.resolve(process.cwd(), "src/data-layer/mocks"),
    path.resolve(process.cwd(), "src", "data-layer", "mocks"),
    // Fallback: try relative to this file's location (for when __dirname works)
    path.resolve(__dirname, "../mocks"),
  ]

  console.log(
    `[Mock Storage] Looking for mocks directory. CWD: ${process.cwd()}`
  )
  for (const dirPath of possiblePaths) {
    const exists = fs.existsSync(dirPath)
    console.log(
      `[Mock Storage] Checking: ${dirPath} - ${exists ? "EXISTS" : "NOT FOUND"}`
    )
    if (exists) {
      console.log(`[Mock Storage] Using mocks directory: ${dirPath}`)
      return dirPath
    }
  }

  console.warn(
    `[Mock Storage] No mocks directory found in any of the checked paths`
  )
  // Return the first path as default (will show error if used)
  return possiblePaths[0]
}

/**
 * Mock storage implementation that reads from local JSON files.
 * This is a read-only implementation for local development.
 */
export const mockStorage: Storage = {
  async get<T>(taskId: TaskId): Promise<StorageResult<T> | null> {
    const mocksDir = getMocksDir()
    const filePath = path.join(mocksDir, `${taskId}.json`)
    const mocksDirExists = fs.existsSync(mocksDir)
    const fileExists = fs.existsSync(filePath)

    // Build a comprehensive error message that will show up even if console logs are suppressed
    if (!mocksDirExists) {
      const errorMsg = `[MOCK STORAGE ERROR] Mocks directory not found!
Task: ${taskId}
Expected directory: ${mocksDir}
Current working directory: ${process.cwd()}
Checked paths:
  - ${path.resolve(process.cwd(), "src/data-layer/mocks")}
  - ${path.resolve(process.cwd(), "src", "data-layer", "mocks")}
  - ${path.resolve(__dirname, "../mocks")}

Make sure src/data-layer/mocks/ exists and contains mock JSON files.`
      throw new Error(errorMsg)
    }

    if (!fileExists) {
      const errorMsg = `[MOCK STORAGE ERROR] Mock data file not found!
Task: ${taskId}
Expected file: ${filePath}
Mocks directory: ${mocksDir} (exists: ${mocksDirExists})
Current working directory: ${process.cwd()}

Available files in mocks directory:
${fs
  .readdirSync(mocksDir)
  .filter((f) => f.endsWith(".json"))
  .slice(0, 10)
  .join("\n")}

Make sure ${taskId}.json exists in src/data-layer/mocks/ or run:
npx dotenv-cli -e .env -- npx ts-node -r tsconfig-paths/register -O '{"module":"commonjs"}' src/data-layer/mocks/generate-mocks.ts`
      throw new Error(errorMsg)
    }

    try {
      // Use async file operations for consistency with Next.js build process
      const fileContent = await fsPromises.readFile(filePath, "utf-8")
      const data = JSON.parse(fileContent) as T

      // Generate mock metadata based on file modification time
      const stats = await fsPromises.stat(filePath)
      const metadata: StorageMetadata = {
        storedAt: stats.mtime.toISOString(),
      }

      console.log(`[Mock Storage] Retrieved mock data for task: ${taskId}`)
      return { data, metadata }
    } catch (error) {
      // If file read fails, provide detailed error context
      const errorMsg = error instanceof Error ? error.message : String(error)
      const enhancedError = new Error(
        `[Mock Storage] Failed to read mock data for task "${taskId}": ${errorMsg}\n` +
          `File path: ${filePath}\n` +
          `Directory exists: ${fs.existsSync(mocksDir)}\n` +
          `File exists: ${fs.existsSync(filePath)}\n` +
          `CWD: ${process.cwd()}`
      )
      console.error(enhancedError.message)
      throw enhancedError
    }
  },

  async set(taskId: TaskId, data: unknown): Promise<void> {
    // In mock storage, we can optionally write to files for testing
    // but typically this is read-only for local dev
    try {
      const mocksDir = getMocksDir()
      const filePath = path.join(mocksDir, `${taskId}.json`)
      const jsonData = JSON.stringify(data, null, 2)
      fs.writeFileSync(filePath, jsonData, "utf-8")

      console.log(`[Mock Storage] Saved mock data for task: ${taskId}`)
    } catch (error) {
      console.error(
        `[Mock Storage] Failed to save mock data for task: ${taskId}`,
        error
      )
      throw error
    }
  },
}

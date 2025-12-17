import * as fs from "fs"
import * as fsPromises from "fs/promises"
import * as path from "path"

import type { Storage, StorageMetadata, StorageResult, TaskId } from "../types"

function getMocksDir(): string {
  const possiblePaths = [
    path.resolve(process.cwd(), "src/data-layer/mocks"),
    path.resolve(process.cwd(), "src", "data-layer", "mocks"),
    path.resolve(__dirname, "../mocks"),
  ]

  for (const dirPath of possiblePaths) {
    if (fs.existsSync(dirPath)) return dirPath
  }

  return possiblePaths[0]
}

/** Mock storage that reads from local JSON files for development. */
export const mockStorage: Storage = {
  async get<T>(taskId: TaskId): Promise<StorageResult<T> | null> {
    const mocksDir = getMocksDir()
    const filePath = path.join(mocksDir, `${taskId}.json`)

    if (!fs.existsSync(mocksDir)) {
      throw new Error(`[Mock Storage] Directory not found: ${mocksDir}`)
    }

    if (!fs.existsSync(filePath)) {
      throw new Error(`[Mock Storage] File not found: ${filePath}`)
    }

    const fileContent = await fsPromises.readFile(filePath, "utf-8")
    const data = JSON.parse(fileContent) as T
    const stats = await fsPromises.stat(filePath)
    const metadata: StorageMetadata = { storedAt: stats.mtime.toISOString() }

    return { data, metadata }
  },

  async set(taskId: TaskId, data: unknown): Promise<void> {
    const mocksDir = getMocksDir()
    const filePath = path.join(mocksDir, `${taskId}.json`)
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8")
  },
}

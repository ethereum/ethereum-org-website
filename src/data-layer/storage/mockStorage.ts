/**
 * Mock storage implementation for local development.
 *
 * This reads mock data files from /data-layer/mocks instead of connecting
 * to Netlify Blobs. Useful for local development without requiring
 * Netlify Blobs credentials.
 */

import * as fs from "fs"
import * as path from "path"

import type { tasks } from "../registry"
import type { StorageMetadata } from "../types"

import type { GetStorageImplementation } from "./getter"
import type { StorageImplementation } from "./setter"

type TaskId = (typeof tasks)[number]["id"]

const MOCKS_DIR = path.join(__dirname, "../mocks")

/**
 * Mock storage implementation that reads from local JSON files.
 * This is a read-only implementation for local development.
 */
export const mockStorage: StorageImplementation & GetStorageImplementation = {
  async get<T>(
    taskId: TaskId
  ): Promise<{ data: T; metadata: StorageMetadata } | null> {
    try {
      const filePath = path.join(MOCKS_DIR, `${taskId}.json`)

      if (!fs.existsSync(filePath)) {
        console.log(`[Mock Storage] No mock data found for task: ${taskId}`)
        return null
      }

      const fileContent = fs.readFileSync(filePath, "utf-8")
      const data = JSON.parse(fileContent) as T

      // Generate mock metadata based on file modification time
      const stats = fs.statSync(filePath)
      const metadata: StorageMetadata = {
        storedAt: stats.mtime.toISOString(),
      }

      console.log(`[Mock Storage] Retrieved mock data for task: ${taskId}`)
      return { data, metadata }
    } catch (error) {
      console.error(
        `[Mock Storage] Failed to retrieve mock data for task: ${taskId}`,
        error
      )
      throw error
    }
  },

  async set(taskId: TaskId, data: unknown): Promise<void> {
    // In mock storage, we can optionally write to files for testing
    // but typically this is read-only for local dev
    try {
      const filePath = path.join(MOCKS_DIR, `${taskId}.json`)
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

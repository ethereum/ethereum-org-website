import fs from "fs/promises"
import path from "path"

const MOCK_DATA_DIR = path.resolve("src/data/mocks")

/**
 * Helper to load mock data from JSON files for testing
 */
export async function loadMockDataFile<T>(filename: string): Promise<T> {
  const filePath = path.join(MOCK_DATA_DIR, filename)
  const content = await fs.readFile(filePath, "utf-8")
  return JSON.parse(content) as T
}

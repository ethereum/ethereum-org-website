import fs from "fs/promises"
import path from "path"

const MOCK_DATA_DIR = path.resolve("src/data/mocks")

export async function loadMockData<T>(key: string): Promise<T> {
  try {
    const mockFilePath = path.join(MOCK_DATA_DIR, `${key}.json`)
    const mockDataRaw = await fs.readFile(mockFilePath, "utf-8")
    return JSON.parse(mockDataRaw) as T
  } catch (error) {
    console.error(`Error loading mock data for key "${key}":`, error)
    throw error
  }
}

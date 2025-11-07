import fs from "fs/promises"
import path from "path"

import type { ExternalDataReturnData } from "@/lib/types"

const MOCK_DATA_DIR = path.resolve("src/data/mocks")

/**
 * Loads mock data from a JSON file for a given key.
 * The mock data can be in:
 * - ExternalDataReturnData format (e.g., { value: T, timestamp: number } or { error: string })
 * - Record<string, ExternalDataReturnData> format (e.g., beaconchainEpoch with nested values)
 * If the mock data is not already in one of these formats, it will be wrapped.
 *
 * @param key The data key (e.g., "ethPrice", "beaconchainEpoch")
 * @returns Promise resolving to ExternalDataReturnData, Record<string, ExternalDataReturnData>, or null if file doesn't exist
 */
export async function loadMockData(
  key: string
): Promise<
  ExternalDataReturnData | Record<string, ExternalDataReturnData> | null
> {
  try {
    const mockFilePath = path.join(MOCK_DATA_DIR, `${key}.json`)
    const mockDataRaw = await fs.readFile(mockFilePath, "utf-8")
    const parsedData = JSON.parse(mockDataRaw)

    // Check if the data is already in ExternalDataReturnData format
    // (has "value" or "error" property at top level)
    if (
      parsedData &&
      typeof parsedData === "object" &&
      ("value" in parsedData || "error" in parsedData)
    ) {
      return parsedData as ExternalDataReturnData
    }

    // Check if the data is a Record<string, ExternalDataReturnData>
    // (e.g., beaconchainEpoch with totalEthStaked, validatorscount)
    // This format has nested objects with "value" or "error" properties
    if (
      parsedData &&
      typeof parsedData === "object" &&
      !Array.isArray(parsedData) &&
      Object.values(parsedData).every(
        (v) => v && typeof v === "object" && ("value" in v || "error" in v)
      )
    ) {
      return parsedData as Record<string, ExternalDataReturnData>
    }

    // If not in the expected format, wrap it in { value: data, timestamp: now }
    // This handles mock files that contain the raw data directly
    return {
      value: parsedData,
      timestamp: Date.now(),
    } as ExternalDataReturnData
  } catch (error) {
    // File doesn't exist or can't be read - return null (graceful fallback)
    if (
      error instanceof Error &&
      ((error as NodeJS.ErrnoException).code === "ENOENT" ||
        error.message.includes("ENOENT"))
    ) {
      console.warn(`Mock data file not found for key "${key}"`)
      return null
    }

    // Other errors (parse errors, etc.) - log and return null
    console.error(`Error loading mock data for key "${key}":`, error)
    return null
  }
}

/**
 * Loads mock data for multiple keys in parallel.
 *
 * @param keys Array of keys to load mock data for
 * @returns Promise resolving to a map of key to ExternalDataReturnData or Record<string, ExternalDataReturnData>
 */
export async function loadMockDataForKeys(
  keys: string[]
): Promise<
  Record<
    string,
    ExternalDataReturnData | Record<string, ExternalDataReturnData>
  >
> {
  const results = await Promise.all(
    keys.map(async (key) => {
      const data = await loadMockData(key)
      return { key, data }
    })
  )

  // Build the data map, only including keys that have data
  const dataMap = results.reduce(
    (acc, { key, data }) => {
      if (data !== null) {
        acc[key] = data
      }
      return acc
    },
    {} as Record<
      string,
      ExternalDataReturnData | Record<string, ExternalDataReturnData>
    >
  )

  return dataMap
}

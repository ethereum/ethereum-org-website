import fs from "fs/promises"
import path from "path"

// Load environment variables from .env.local or .env (same pattern as playwright.config.ts)
// Using require() here because dotenv needs to be loaded before other imports
// eslint-disable-next-line @typescript-eslint/no-var-requires
const dotenv = require("dotenv")
try {
  dotenv.config({ path: path.resolve(__dirname, "../.env.local") })
  dotenv.config({ path: path.resolve(__dirname, "../.env") })
} catch (error) {
  // dotenv might not be available or files might not exist - that's okay
  // Environment variables might be set another way (e.g., system env vars)
}

import { getRedisData } from "@/lib/utils/data/clients/redisClient"
import { getSupabaseData } from "@/lib/utils/data/clients/supabaseClient"

import {
  externalServicesDaily,
  externalServicesHourly,
} from "@/data/external-services"

const MOCK_DATA_DIR = path.resolve("src/data/mocks")

async function generateAllMockData() {
  console.log("🔄 Generating mock data for all external services...\n")
  console.log("📡 Fetching from Redis/Supabase...\n")

  const allServices = [...externalServicesHourly, ...externalServicesDaily]
  const allKeys = allServices.map((service) => service.key)

  // Fetch all data from Redis/Supabase, with fallback to fresh fetch
  const fetchResults = await Promise.all(
    allKeys.map(async (key) => {
      try {
        // Try Redis first
        let data = await getRedisData(key, 3600) // Use 1 hour revalidation

        // Fallback to Supabase if Redis returns null
        if (data === null) {
          data = await getSupabaseData(key, 3600) // Use 1 hour revalidation
        }

        // If still not found in cache, try fetching fresh data
        if (data === null) {
          const service = allServices.find((s) => s.key === key)
          if (service) {
            console.log(
              `   ⚠️  ${service.name} not in cache, fetching fresh data...`
            )
            try {
              const freshData = await service.function()
              // Only use fresh data if it's not an error response
              if (
                freshData &&
                typeof freshData === "object" &&
                !("error" in freshData)
              ) {
                data = freshData
              } else if (
                freshData &&
                typeof freshData === "object" &&
                "error" in freshData
              ) {
                console.error(
                  `   ❌ ${service.name} fetch returned error: ${freshData.error}`
                )
              }
            } catch (fetchError) {
              console.error(
                `   ❌ Failed to fetch fresh data for ${service.name}:`,
                fetchError instanceof Error
                  ? fetchError.message
                  : String(fetchError)
              )
            }
          }
        }

        return { key, data }
      } catch (error) {
        console.error(`Error fetching data for key "${key}":`, error)
        return { key, data: null }
      }
    })
  )

  // Build the data map
  const dataMap = fetchResults.reduce(
    (acc, { key, data }) => {
      if (data !== null && data !== undefined) {
        acc[key] = data
      }
      return acc
    },
    {} as Record<string, unknown>
  )

  if (Object.keys(dataMap).length === 0) {
    console.error("❌ Failed to fetch any data from Redis/Supabase")
    process.exit(1)
  }

  const saveResults: Array<{ key: string; success: boolean; error?: string }> =
    []

  // Save each key's data to a mock file
  for (const service of allServices) {
    const data = dataMap[service.key]

    if (!data) {
      console.warn(`⚠️  No data found for ${service.name} (${service.key})`)
      saveResults.push({
        key: service.key,
        success: false,
        error: "No data in response",
      })
      continue
    }

    if (data && typeof data === "object" && "error" in data) {
      const errorMessage =
        typeof data.error === "string" ? data.error : String(data.error)
      console.error(`   ❌ ${service.name}: ${errorMessage}`)
      saveResults.push({
        key: service.key,
        success: false,
        error: errorMessage,
      })
      continue
    }

    try {
      const outputPath = path.join(MOCK_DATA_DIR, `${service.key}.json`)
      const jsonData = JSON.stringify(data, null, 2)

      await fs.writeFile(outputPath, jsonData, "utf-8")

      // Log success with data info
      if (data && typeof data === "object" && "value" in data) {
        const value = data.value
        if (Array.isArray(value)) {
          console.log(`   ✅ ${service.name}: Saved ${value.length} items`)
        } else if (typeof value === "object" && value !== null) {
          const keys = Object.keys(value)
          console.log(
            `   ✅ ${service.name}: Saved object with ${keys.length} keys`
          )
        } else if (typeof value === "number") {
          console.log(`   ✅ ${service.name}: Saved value: ${value}`)
        } else {
          console.log(`   ✅ ${service.name}: Saved`)
        }
      } else {
        console.log(`   ✅ ${service.name}: Saved`)
      }

      saveResults.push({ key: service.key, success: true })
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error)
      console.error(`   ❌ ${service.name}: Failed to save - ${errorMessage}`)
      saveResults.push({
        key: service.key,
        success: false,
        error: errorMessage,
      })
    }
  }

  // Summary
  console.log("\n" + "=".repeat(60))
  console.log("📊 Summary:")
  const successful = saveResults.filter((r) => r.success).length
  const failed = saveResults.filter((r) => !r.success).length
  console.log(`   ✅ Successful: ${successful}/${saveResults.length}`)
  if (failed > 0) {
    console.log(`   ❌ Failed: ${failed}/${saveResults.length}`)
    console.log("\nFailed services:")
    saveResults
      .filter((r) => !r.success)
      .forEach((r) => {
        const service = allServices.find((s) => s.key === r.key)
        console.log(`   - ${service?.name || r.key}: ${r.error}`)
      })
  }
  console.log("=".repeat(60))
}

generateAllMockData().catch((error) => {
  console.error("Fatal error generating mock data:", error)
  process.exit(1)
})

import { fetchExternalData } from "@/lib/utils/data/refactor/fetchExternalData"
import { storeExternalData } from "@/lib/utils/data/refactor/storeExternalData"

import "dotenv/config"

/**
 * CRON job function to fetch and store external data in Redis.
 * Optionally set EXTERNAL_DATA_TTL_SECONDS environment variable to set TTL for stored data.
 */
export const externalDataStorageCRON = async () => {
  try {
    console.log("Starting external data fetch and storage...")
    const externalData = await fetchExternalData()

    const success = await storeExternalData(externalData)

    if (success) {
      console.log("External data storage completed successfully")
    } else {
      console.error("External data storage completed with errors")
      process.exit(1)
    }
  } catch (error) {
    console.error("Error in external data storage CRON:", error)
    process.exit(1)
  }
}

// Run if executed directly
if (require.main === module) {
  externalDataStorageCRON()
}

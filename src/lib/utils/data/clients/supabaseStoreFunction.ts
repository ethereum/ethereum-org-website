import { ExternalDataMap } from "../fetchExternalData"

import { storeSupabase } from "./supabaseClient"

export const supabaseStoreFunction = async (data: ExternalDataMap) => {
  const results = await Promise.all(
    Object.entries(data).map(async ([key, value]) => {
      const success = await storeSupabase(key, value)
      return success
    })
  )

  const allSuccess = results.every((success) => success)

  if (allSuccess) {
    console.log(
      `Successfully stored ${Object.keys(data).length} external data entries in Supabase`
    )
  } else {
    const successCount = results.filter((success) => success).length
    console.warn(
      `Stored ${successCount}/${Object.keys(data).length} external data entries in Supabase`
    )
  }

  return allSuccess
}

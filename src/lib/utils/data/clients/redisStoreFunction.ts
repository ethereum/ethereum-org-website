import { ExternalDataMap } from "../fetchExternalData"

import { storeRedis } from "./redisClient"

export const redisStoreFunction = async (data: ExternalDataMap) => {
  const results = await Promise.all(
    Object.entries(data).map(async ([key, value]) => {
      const success = await storeRedis(key, value)
      return success
    })
  )

  const allSuccess = results.every((success) => success)

  if (allSuccess) {
    console.log(
      `Successfully stored ${Object.keys(data).length} external data entries`
    )
  } else {
    const successCount = results.filter((success) => success).length
    console.warn(
      `Stored ${successCount}/${Object.keys(data).length} external data entries`
    )
  }

  return allSuccess
}

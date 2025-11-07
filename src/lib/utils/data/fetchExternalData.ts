import { ExternalDataReturnData } from "@/lib/types"

import { ExternalService } from "@/data/external-services"

export type ExternalDataMap = Record<
  string,
  ExternalDataReturnData | Record<string, ExternalDataReturnData>
>

export const fetchExternalData = async (
  services: ExternalService[]
): Promise<ExternalDataMap> => {
  const results = await Promise.all(
    services.map(async (service) => {
      try {
        const data = await service.function()
        // Data can be ExternalDataReturnData or Record<string, ExternalDataReturnData>
        // Both are valid for ExternalDataMap
        return {
          key: service.key,
          data: data as
            | ExternalDataReturnData
            | Record<string, ExternalDataReturnData>,
        }
      } catch (error) {
        return {
          key: service.key,
          data: {
            error: error instanceof Error ? error.message : String(error),
          } as ExternalDataReturnData,
        }
      }
    })
  )

  return results.reduce((acc, { key, data }) => {
    acc[key] = data
    return acc
  }, {} as ExternalDataMap)
}

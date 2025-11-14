import { ExternalDataReturnData } from "@/lib/types"

import { ExternalService } from "@/data/external-services"

export type ExternalDataMap = Record<
  string,
  | ExternalDataReturnData
  | Record<string, ExternalDataReturnData>
  | null
  | undefined
>

export const fetchExternalData = async (
  services: ExternalService[]
): Promise<ExternalDataMap> => {
  const results = await Promise.all(
    services.map(async (service) => {
      try {
        const result = await service.function()
        return {
          key: service.key,
          data: {
            value: result,
            timestamp: Date.now(),
          } as ExternalDataReturnData,
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

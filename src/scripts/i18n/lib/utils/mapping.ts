import { crowdinToInternalCodeMapping } from "../../config"

/**
 * Convert Crowdin language code to internal language code
 */
export function mapCrowdinCodeToInternal(crowdinCode: string): string {
  return crowdinToInternalCodeMapping[crowdinCode] || crowdinCode
}

/**
 * Convert internal language code to Crowdin language code
 */
export function mapInternalCodeToCrowdin(internalCode: string): string {
  const entry = Object.entries(crowdinToInternalCodeMapping).find(
    ([, internal]) => internal === internalCode
  )
  return entry ? entry[0] : internalCode
}

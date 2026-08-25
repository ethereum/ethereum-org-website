import Tooltip from "@/components/Tooltip"

import { formatStringList } from "@/lib/utils/wallets"

import { NUMBER_OF_SUPPORTED_LANGUAGES_SHOWN } from "@/lib/constants"

type SupportedLanguagesTooltipProps = {
  supportedLanguages: string[]
  /** How many languages are shown before the "+ N" chip (must match the caller). */
  shown?: number
}

export const SupportedLanguagesTooltip = ({
  supportedLanguages,
  shown = NUMBER_OF_SUPPORTED_LANGUAGES_SHOWN,
}: SupportedLanguagesTooltipProps) => {
  const numberOfSupportedLanguages = supportedLanguages.length
  const rest = numberOfSupportedLanguages - shown

  if (rest <= 0) {
    return null
  }

  const tooltipContent = formatStringList(supportedLanguages.slice(shown))

  return (
    <Tooltip content={tooltipContent}>
      <span className="text-md font-normal text-primary">+ {rest}</span>
    </Tooltip>
  )
}

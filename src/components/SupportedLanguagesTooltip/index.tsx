import Tooltip from "@/components/Tooltip"

import { formatStringList } from "@/lib/utils/wallets"

import { NUMBER_OF_SUPPORTED_LANGUAGES_SHOWN } from "@/lib/constants"

type SupportedLanguagesTooltipProps = {
  supportedLanguages: string[]
}

// Tooltip to show other supported languages on a wallet
export const SupportedLanguagesTooltip = ({
  supportedLanguages,
}: SupportedLanguagesTooltipProps) => {
  const numberOfSupportedLanguages = supportedLanguages.length
  const rest = numberOfSupportedLanguages - NUMBER_OF_SUPPORTED_LANGUAGES_SHOWN

  if (rest <= 0) {
    return null
  }

  const tooltipContent = formatStringList(
    supportedLanguages.slice(NUMBER_OF_SUPPORTED_LANGUAGES_SHOWN)
  )

  return (
    <Tooltip content={tooltipContent}>
      <span className="text-md font-normal text-primary">+ {rest}</span>
    </Tooltip>
  )
}

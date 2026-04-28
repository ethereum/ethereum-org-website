import { formatStringList } from "@/lib/utils/wallets"

import { NUMBER_OF_SUPPORTED_LANGUAGES_SHOWN } from "@/lib/constants"

type SupportedLanguagesTooltipProps = {
  supportedLanguages: string[]
}

// Shows the count of additional supported languages with the full list
// available via the native browser tooltip on hover.
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
    <span className="text-md font-normal text-primary" title={tooltipContent}>
      + {rest}
    </span>
  )
}

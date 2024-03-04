import { Text } from "@chakra-ui/react"

import Tooltip from "@/components/Tooltip"

import { formatSupportedLanguages } from "@/lib/utils/wallets"

import { NUMBER_OF_SUPPORTED_LANGUAGES_SHOWN } from "@/lib/constants"

type SupportedLanguagesTooltipProps = {
  supportedLanguages: string[]
  restText: string
}

export const SupportedLanguagesTooltip = ({
  supportedLanguages,
  restText,
}: SupportedLanguagesTooltipProps) => {
  return (
    <Tooltip
      content={
        <Text fontSize="1rem !important" fontWeight="normal !important">
          {formatSupportedLanguages(
            supportedLanguages.slice(NUMBER_OF_SUPPORTED_LANGUAGES_SHOWN)
          )}
        </Text>
      }
    >
      <Text
        color="primary.base"
        fontSize="1rem !important"
        fontWeight="normal !important"
      >
        {restText}
      </Text>
    </Tooltip>
  )
}

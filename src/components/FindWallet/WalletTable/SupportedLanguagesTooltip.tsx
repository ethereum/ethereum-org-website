import { Box, Text } from "@chakra-ui/react"

import Tooltip from "@/components/Tooltip"

import { formatSupportedLanguages } from "@/lib/utils/wallets"

import { NUMBER_OF_SUPPORTED_LANGUAGES_SHOWN } from "@/lib/constants"

type SupportedLanguagesTooltipProps = {
  supportedLanguages: string[]
  restText: string
}

// Tooltip to show other supported languages on a wallet
export const SupportedLanguagesTooltip = ({
  supportedLanguages,
  restText,
}: SupportedLanguagesTooltipProps) => {
  const tooltipContent = formatSupportedLanguages(
    supportedLanguages.slice(NUMBER_OF_SUPPORTED_LANGUAGES_SHOWN)
  )

  return (
    <Tooltip content={tooltipContent}>
      <Text
        as="span"
        color="primary.base"
        fontSize="md !important"
        fontWeight="normal !important"
      >
        {restText}
      </Text>
    </Tooltip>
  )
}

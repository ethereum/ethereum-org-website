import { Text } from "@chakra-ui/react"

import Tooltip from "@/components/Tooltip"

import { formatSupportedLanguages } from "@/lib/utils/wallets"

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
          {formatSupportedLanguages(supportedLanguages)}
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

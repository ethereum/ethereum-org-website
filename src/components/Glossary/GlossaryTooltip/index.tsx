import React, { ReactNode } from "react"
import { useRouter } from "next/router"
import { Box, Text } from "@chakra-ui/react"

import GlossaryDefinition from "@/components/Glossary/GlossaryDefinition"
import Tooltip from "@/components/Tooltip"

import { trackCustomEvent } from "@/lib/utils/matomo"
import { cleanPath } from "@/lib/utils/url"

type GlossaryTooltipProps = {
  children: ReactNode
  termKey: string
}

const GlossaryTooltip = ({ children, termKey }: GlossaryTooltipProps) => {
  const { asPath } = useRouter()

  return (
    <Box display="inline-block">
      <Tooltip
        content={
          <GlossaryDefinition
            term={termKey}
            size="sm"
            options={{ ns: "glossary-tooltip" }}
          />
        }
        onOpen={() => {
          trackCustomEvent({
            eventCategory: "Glossary Tooltip",
            eventAction: cleanPath(asPath),
            eventName: termKey,
          })
        }}
      >
        <Text
          as="u"
          textDecorationStyle="dotted"
          textUnderlineOffset="3px"
          _hover={{
            textDecorationColor: "primary.hover",
            color: "primary.hover",
          }}
          cursor="help"
        >
          {children}
        </Text>
      </Tooltip>
    </Box>
  )
}

export default GlossaryTooltip

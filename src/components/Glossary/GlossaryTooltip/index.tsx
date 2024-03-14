import React, { ReactNode } from "react"
import { Box, Text } from "@chakra-ui/react"

import GlossaryDefinition from "@/components/Glossary/GlossaryDefinition"
import Tooltip from "@/components/Tooltip"

type GlossaryTooltipProps = {
  children: ReactNode
  termKey: string
}

const GlossaryTooltip = ({ children, termKey }: GlossaryTooltipProps) => {
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

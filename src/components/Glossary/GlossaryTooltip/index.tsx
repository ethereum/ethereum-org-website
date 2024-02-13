import React, { ReactNode } from "react"
import { Text, useBreakpointValue } from "@chakra-ui/react"

import GlossaryDefinition from "@/components/Glossary/GlossaryDefinition"
import Tooltip from "@/components/Tooltip"

type GlossaryTooltipProps = {
  children: ReactNode
  termKey: string
}

const GlossaryTooltip = ({ children, termKey }: GlossaryTooltipProps) => {
  const isLargeScreen = useBreakpointValue({ base: false, lg: true })

  return isLargeScreen ? (
    <Tooltip content={<GlossaryDefinition term={termKey} size="sm" />}>
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
  ) : (
    <Text as="span">{children}</Text>
  )
}

export default GlossaryTooltip

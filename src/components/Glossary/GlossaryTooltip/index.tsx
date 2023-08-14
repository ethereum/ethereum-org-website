import React, { ReactNode } from "react"
import { Text } from "@chakra-ui/react"

import GlossaryDefinition from "../GlossaryDefinition"
import Tooltip from "../../Tooltip"

import { isMobile } from "../../../utils/isMobile"

interface IProps {
  children: ReactNode
  to: string
}

const GlossaryTooltip: React.FC<IProps> = ({ children, to }) => {
  var hash = to.match(/#(.*)/)?.[1]

  return isMobile() ? (
    <Text>{children}</Text>
  ) : (
    <Tooltip content={<GlossaryDefinition term={hash!} tooltip={true} />}>
      <Text
        as="u"
        textDecorationStyle="dotted"
        _hover={{ textDecorationColor: "primary.hover" }}
      >
        {children}
      </Text>
    </Tooltip>
  )
}

export default GlossaryTooltip

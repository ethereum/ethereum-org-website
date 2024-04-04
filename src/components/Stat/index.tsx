import * as React from "react"
import type { IconType } from "react-icons/lib"
import { MdInfoOutline, MdWarning } from "react-icons/md"
import { Flex, HStack, Icon, Text } from "@chakra-ui/react"

import Tooltip, { type TooltipProps } from "../Tooltip"

const nullValue = <>&mdash;</>

const initialContent = {
  contentValue: nullValue,
  tooltipIcon: MdInfoOutline,
}

export type StatProps = {
  tooltipProps?: TooltipProps
  value: string | undefined
  label: string
  isError: boolean
}

const Stat = ({ tooltipProps, value, label, isError }: StatProps) => {
  const [content, setContent] = React.useState<{
    contentValue: string | JSX.Element
    tooltipIcon: IconType
  }>(initialContent)

  React.useEffect(() => {
    if (isError) {
      return setContent({
        contentValue: nullValue,
        tooltipIcon: MdWarning,
      })
    }

    if (!value) return

    return setContent({ ...initialContent, contentValue: value })
  }, [isError, value])

  return (
    <Flex flexDirection="column-reverse">
      <HStack lineHeight="initial" spacing="0.5" color="body.medium">
        <Text as="span">{label}</Text>
        {!!tooltipProps && (
          <Tooltip {...tooltipProps}>
            <Icon as={content.tooltipIcon} />
          </Tooltip>
        )}
      </HStack>
      <Text as="span" size="5xl" fontWeight="bold">
        {content.contentValue}
      </Text>
    </Flex>
  )
}

export default Stat

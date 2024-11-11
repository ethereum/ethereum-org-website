import { useEffect, useState } from "react"
import type { IconType } from "react-icons/lib"
import { MdInfoOutline, MdWarning } from "react-icons/md"
import { chakra, Flex, HStack, Icon, Text } from "@chakra-ui/react"

import { NULL_VALUE } from "@/lib/constants"

import Tooltip, { type TooltipProps } from "../Tooltip"

const initialContent = {
  contentValue: NULL_VALUE,
  tooltipIcon: MdInfoOutline,
}

export type StatProps = {
  tooltipProps?: TooltipProps
  value: string | undefined
  label: string
  isError: boolean
}

const Stat = ({ tooltipProps, value, label, isError }: StatProps) => {
  const [content, setContent] = useState<{
    contentValue: string | JSX.Element
    tooltipIcon: IconType
  }>(initialContent)

  useEffect(() => {
    if (isError) {
      return setContent({
        contentValue: NULL_VALUE,
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
            <chakra.button display="flex" color="inherit">
              <Icon as={content.tooltipIcon} />
            </chakra.button>
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

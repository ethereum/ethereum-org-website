import React, { ReactNode } from "react"
import Emoji from "./Emoji"
import { Text, Box, Flex } from "@chakra-ui/react"

export interface IProps {
  children?: React.ReactNode
  emoji: string
  title?: ReactNode
  description: ReactNode
  className?: string
  emojiSize?: number
}

const HorizontalCard: React.FC<IProps> = ({
  emoji,
  children,
  className,
  emojiSize,
}) => (
  <Flex borderRadius="base" className={className}>
    <Emoji fontSize={emojiSize} text={emoji} />
    <Text display="flex" flexGrow="0" flexShrink="1" flexBasis="75%" ml="8">
      <Text fontSize="lg" />
      <Box as="p" opacity="0.8" mt="-4" mb="2" />
      {children}
    </Text>
  </Flex>
)

export default HorizontalCard

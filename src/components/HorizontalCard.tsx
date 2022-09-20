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
    <Emoji fontSize={`${emojiSize}rem`} text={emoji} />
    <Flex grow="0" shrink="1" basis="75%" ml="8">
      <Text fontSize="lg" />
      <Text opacity="0.8" mt="-4" mb="2" />
      {children}
    </Flex>
  </Flex>
)

export default HorizontalCard

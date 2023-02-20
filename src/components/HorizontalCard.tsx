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
  title,
  description,
  children,
  className,
  emojiSize,
}) => (
  <Flex borderRadius="base" className={className}>
    <Emoji fontSize={`${emojiSize}rem`} text={emoji} />
    <Box flexGrow="0" flexShrink="1" flexBasis="75%" ml="8">
      <Text fontSize="lg">{title}</Text>
      <Text opacity="0.8" mt="-4" mb="2">
        {description}
      </Text>
      {children}
    </Box>
  </Flex>
)

export default HorizontalCard

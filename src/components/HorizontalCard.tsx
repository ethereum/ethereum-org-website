import React, { ReactNode } from "react"
import Emoji from "./Emoji"
import { Text, Box } from "@chakra-ui/react"

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
  <Box
    display="flex"
    flexGrow="0"
    flexShrink="1"
    flexBasis="75%"
    borderRadius="base"
    className={className}
  >
    <Emoji size={emojiSize} text={emoji} />
    <Box display="flex" ml="8">
      <Text fontSize="lg" />
      <Box as="p" p="0.8" mt="-4" mb="2" />
      {children}
    </Box>
  </Box>
)

export default HorizontalCard

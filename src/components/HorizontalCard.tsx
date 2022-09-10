import React, { ReactNode } from "react"
import Emoji from "./OldEmoji"
import { Text, Box } from "@chakra-ui/react"

// const StyledCard = styled.div`
//   border-radius: 4px;
//   display: flex;
// `

// const Content = styled.div`
//   flex: 0 1 75%;
//   margin-left: 2rem;
// `

// const Description = styled.p`
//   opacity: 0.8;
//   margin-top: -1rem;
//   margin-bottom: 0.5rem;
// `

// const Title = styled.p`
//   font-size: 1.25rem;
// `

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

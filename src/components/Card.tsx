import React, { ReactNode } from "react"
import Emoji from "./Emoji"
import { Flex, Text } from "@chakra-ui/react"

export interface IProps {
  children?: React.ReactNode
  emoji?: string
  title?: ReactNode
  description?: ReactNode
  className?: string
}

const Card: React.FC<IProps> = ({
  emoji,
  title,
  description,
  children,
  className,
}) => (
  <Flex
    direction="column"
    bg="ednBackground"
    borderRadius="2px"
    border="1px"
    borderStyle="solid"
    borderColor="lightBorder"
    p={6}
    className={className}
  >
    <div>
      {emoji && <Emoji fontSize="5xl" text={emoji} mb={4} />}
      {title && (
        <Text as="h3" mt={0}>
          {title}
        </Text>
      )}
      {description && (
        <Text opacity={0.8} m={0}>
          {description}
        </Text>
      )}
    </div>
    {children}
  </Flex>
)

export default Card

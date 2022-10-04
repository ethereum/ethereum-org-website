import React, { ReactNode } from "react"
import { Flex, Heading, Text } from "@chakra-ui/react"
import styled from "@emotion/styled"
import Emoji from "./Emoji"

export interface IProps {
  children?: React.ReactNode
  emoji?: string
  title?: ReactNode
  description?: ReactNode
  className?: string
}

const Container = styled.div`
  h3 {
    min-height: 67px !important;
  }
`
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
    borderRadius="sm"
    border="1px"
    borderStyle="solid"
    borderColor="lightBorder"
    p={6}
    className={className}
    style={{ justifyContent: "space-between" }}
  >
    <Container>
      {emoji && <Emoji fontSize="5xl" text={emoji} mb={4} />}
      {title && (
        <Heading as="h3" mt={0} fontSize="2xl" lineHeight={1.4}>
          {title}
        </Heading>
      )}
      {description && (
        <Text opacity={0.8} m={0}>
          {description}
        </Text>
      )}
    </Container>
    {children}
  </Flex>
)

export default Card

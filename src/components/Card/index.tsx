import React, { ReactNode } from "react"
import { Heading, Stack, StackProps, Text } from "@chakra-ui/react"
import Emoji from "../Emoji"

export interface IProps extends Omit<StackProps, "children" | "title"> {
  children?: ReactNode
  emoji?: string
  title?: ReactNode
  description?: ReactNode
}

const Card: React.FC<IProps> = ({
  emoji,
  title,
  description,
  children,
  ...props
}) => (
  <Stack
    spacing="4"
    justifyContent="space-between"
    bg="ednBackground"
    borderRadius="sm"
    border="1px"
    borderStyle="solid"
    borderColor="lightBorder"
    p="6"
    {...props}
  >
    <Stack spacing="4">
      {emoji && <Emoji fontSize="5xl" lineHeight={0} text={emoji} />}
      <Stack spacing="8">
        {title && (
          <Heading as="h3" fontSize="2xl">
            {title}
          </Heading>
        )}
        {description && <Text opacity={0.8}>{description}</Text>}
      </Stack>
    </Stack>
    {children}
  </Stack>
)

export default Card

import React from "react"
import { Flex } from "@chakra-ui/react"

export interface IProps {
  children?: React.ReactNode
  className?: string
  isSecondary?: boolean
  color?: string
}

const Pill: React.FC<IProps> = ({
  children,
  className,
  isSecondary,
  color,
}) => {
  return isSecondary ? (
    <Flex
      border="1px"
      borderStyle="solid"
      borderColor="primary100"
      color="text"
      textTransform="uppercase"
      textAlign="center"
      display="inline-block"
      py={1}
      px={2}
      borderRadius="base"
      fontSize="xs"
      className={className}
    >
      {children}
    </Flex>
  ) : (
    <Flex
      backgroundColor={color ? color : "primary100"}
      display="inline-block"
      color="black300"
      textTransform="uppercase"
      textAlign="center"
      py={1}
      px={2}
      mr={2}
      fontSize="xs"
      borderRadius="base"
      className={className}
    >
      {children}
    </Flex>
  )
}

export default Pill

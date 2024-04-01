import React from "react"
import { Flex, FlexProps } from "@chakra-ui/react"

export type PillProps = FlexProps & {
  children?: React.ReactNode
  className?: string
  isSecondary?: boolean
  color?: string
}

const Pill = ({
  children,
  className,
  isSecondary,
  background,
  ...rest
}: PillProps) => {
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
      lineHeight="1.6rem"
      className={className}
      {...rest}
    >
      {children}
    </Flex>
  ) : (
    <Flex
      background={background ?? "primary100"}
      display="inline-block"
      color="black300"
      textTransform="uppercase"
      textAlign="center"
      py={1}
      px={2}
      me={2}
      fontSize="xs"
      borderRadius="base"
      lineHeight="1.6rem"
      className={className}
      {...rest}
    >
      {children}
    </Flex>
  )
}

export default Pill

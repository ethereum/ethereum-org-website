import React from "react"
import { Flex, type FlexProps } from "@chakra-ui/react"

export const Template: React.FC<FlexProps> = ({ children, ...flexProps }) => {
  return (
    <Flex
      pt={{ base: 0, md: 8 }}
      px={{ base: 0, md: 16 }}
      w="full"
      justify="center"
      direction={{ base: "column", md: "row" }}
      gap={8}
      {...flexProps}
    >
      {children}
    </Flex>
  )
}

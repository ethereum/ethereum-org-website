import React from "react"
import { Flex, type FlexProps } from "@chakra-ui/react"

export const Template = (props: FlexProps) => (
  <Flex
    w="full"
    justify="center"
    direction={{ base: "column", md: "row" }}
    gap={{ base: 6, md: 8 }}
    {...props}
  />
)

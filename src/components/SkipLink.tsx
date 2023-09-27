import React from "react"
import { Box } from "@chakra-ui/react"

import Translation from "./Translation"
import { BaseLink } from "../components/Link"

export interface IProps {
  hrefId: string
}

export const SkipLink: React.FC<IProps> = ({ hrefId }) => {
  return (
    <Box bg="primary.base">
      <BaseLink
        href={hrefId}
        lineHeight="taller"
        position="absolute"
        top="-12"
        ml="2"
        color="background.base"
        textDecorationLine="none"
        _hover={{ textDecoration: "none" }}
        _focus={{ position: "static" }}
      >
        <Translation id="skip-to-main-content" />
      </BaseLink>
    </Box>
  )
}

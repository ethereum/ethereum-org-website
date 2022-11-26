import React from "react"
import Translation from "./Translation"
import { Box, Link } from "@chakra-ui/react"

export interface IProps {
  hrefId: string
}

export const SkipLink: React.FC<IProps> = ({ hrefId }) => {
  return (
    <Box bg="primary">
      <Link
        href={hrefId}
        lineHeight="2rem"
        position="absolute"
        top="-3rem"
        ml="2"
        color="background"
        textDecorationLine="none"
        _hover={{ textDecoration: "none" }}
        _focus={{ position: "static" }}
      >
        <Translation id="skip-to-main-content" />
      </Link>
    </Box>
  )
}

export const SkipLinkAnchor: React.FC<{ id: string }> = ({ id }) => {
  return <Box height="80px" mt="-80px" id={id}></Box>
}

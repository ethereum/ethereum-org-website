import React from "react"
import styled from "@emotion/styled"
import { Box, HTMLChakraProps } from "@chakra-ui/react"
import { Twemoji, Props } from "react-emoji-render"

export interface IProps extends HTMLChakraProps<"span">, Props {}

const StyledEmoji = styled(Twemoji)`
  & > img {
    margin: 0 !important;
  }
`

const Emoji = (props: IProps) => {
  return <Box as={StyledEmoji} svg d="inline-block" {...props} />
}

export default Emoji

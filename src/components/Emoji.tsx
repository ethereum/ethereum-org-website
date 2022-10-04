import React from "react"
import styled from "@emotion/styled"
import { Box, HTMLChakraProps } from "@chakra-ui/react"
import { Twemoji, Props } from "react-emoji-render"

import { IS_DEV } from "../utils/env"

export interface IProps extends HTMLChakraProps<"span">, Props {}

const StyledEmoji = styled(Twemoji)`
  & > img {
    margin: 0 !important;
  }
`

const Emoji = (props: IProps) => {
  return (
    <Box
      as={StyledEmoji}
      // The emoji lib is switching the protocol based on the existence of the
      // `location` object. That condition in DEV causes hydration mismatches.
      // https://github.com/tommoor/react-emoji-render/blob/master/src/index.js#L8
      // Hence, here we are defining how we want it to handle the protocol to
      // avoid differences in SSR
      options={{ protocol: IS_DEV ? "http" : "https" }}
      svg
      display="inline-block"
      {...props}
    />
  )
}

export default Emoji

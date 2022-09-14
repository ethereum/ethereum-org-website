import React from "react"
import { Twemoji } from "react-emoji-render"
import styled from "@emotion/styled"
import { margin, MarginProps } from "styled-system"

import { IS_DEV } from "../utils/env"

export interface IProps extends MarginProps {
  size?: number
  text: string
}

const StyledEmoji = styled(Twemoji)<{ size: number }>`
  & > img {
    width: ${(props) => props.size}em !important;
    height: ${(props) => props.size}em !important;
    margin: 0 !important;
  }
  display: inline-block; /* respect top & bottom margins */
  ${margin}
`

/**
 * DEPRECATED component.
 *
 * Use the new `src/components/Emoji.tsx` instead.
 */
const Emoji: React.FC<IProps> = ({ size = 1.5, text, ...props }) => {
  return (
    <StyledEmoji
      // The emoji lib is switching the protocol based on the existence of the
      // `location` object. That condition in DEV causes hydration mismatches.
      // https://github.com/tommoor/react-emoji-render/blob/master/src/index.js#L8
      // Hence, here we are defining how we want it to handle the protocol to
      // avoid differences in SSR
      options={{ protocol: IS_DEV ? "http" : "https" }}
      size={size}
      text={text}
      svg
      {...props}
    />
  )
}

Emoji.defaultProps = {
  mt: 0,
  mr: 0,
  mb: 0,
  ml: 0,
}

export default Emoji

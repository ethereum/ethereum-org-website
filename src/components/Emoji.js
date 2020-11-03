import React from "react"
import { Twemoji } from "react-emoji-render"
import styled from "styled-components"
import { margin } from "styled-system"

const StyledEmoji = styled(Twemoji)`
  & > img {
    width: ${(props) => props.size}em !important;
    height: ${(props) => props.size}em !important;
    margin: 0 !important;
  }
  display: inline-block; /* respect top & bottom margins */
  ${margin}
`

const Emoji = ({ size = 1.5, text, ...props }) => {
  return <StyledEmoji size={size} text={text} svg {...props} />
}

Emoji.defaultProps = {
  mt: 0,
  mr: 0,
  mb: 0,
  ml: 0,
}

export default Emoji

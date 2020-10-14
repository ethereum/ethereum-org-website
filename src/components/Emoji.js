import React from "react"
import { Twemoji } from "react-emoji-render"
import styled from "styled-components"

const Emoji = ({
  size = 1.5,
  text,
  marginLeft = 0,
  marginRight = 0,
  marginBottom = 0,
  marginTop = 0,
}) => {
  return (
    <StyledEmoji
      size={size}
      text={text}
      marginLeft={marginLeft}
      marginRight={marginRight}
      marginBottom={marginBottom}
      marginTop={marginTop}
      svg
    />
  )
}

const StyledEmoji = styled(Twemoji)`
  & > img {
    width: ${(props) => props.size}em !important;
    height: ${(props) => props.size}em !important;
    margin-left: ${(props) => props.marginLeft}em !important;
    margin-right: ${(props) => props.marginRight}em !important;
    margin-bottom: ${(props) => props.marginBottom}em !important;
    margin-top: ${(props) => props.marginTop}em !important;
  }
`

export default Emoji

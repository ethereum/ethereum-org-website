import React from "react"
import { Twemoji } from "react-emoji-render"
import styled from "styled-components"

const Emoji = ({ size = 1.5, text, marginRight, marginBottom, marginTop }) => {
  return (
    <StyledEmoji
      size={size}
      text={text}
      marginRight={marginRight}
      marginBottom={marginBottom}
      marginTop={marginTop}
    />
  )
}

const StyledEmoji = styled(Twemoji)`
  margin-right: ${(props) => props.marginRight}em !important;
  margin-bottom: ${(props) => props.marginBottom}em !important;
  margin-top: ${(props) => props.marginTop}em !important;

  & > img {
    width: ${(props) => props.size}em !important;
    height: ${(props) => props.size}em !important;
    margin-right: ${(props) => props.marginRight}em !important;
    margin-bottom: ${(props) => props.marginBottom}em !important;
    margin-top: ${(props) => props.marginTop}em !important;
  }
`

export default Emoji

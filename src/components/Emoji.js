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
      marginleft={marginLeft}
      marginright={marginRight}
      marginbottom={marginBottom}
      margintop={marginTop}
      svg
    />
  )
}

const StyledEmoji = styled(Twemoji)`
  & > img {
    width: ${(props) => props.size}em !important;
    height: ${(props) => props.size}em !important;
    margin-left: ${(props) => props.marginleft}em !important;
    margin-right: ${(props) => props.marginright}em !important;
    margin-bottom: ${(props) => props.marginbottom}em !important;
    margin-top: ${(props) => props.margintop}em !important;
  }
`

export default Emoji

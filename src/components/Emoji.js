import React from "react"
import { Twemoji } from "react-emoji-render"
import styled from "styled-components"

const Emoji = (props) => {
  console.log(props.size, "this is props.size")
  console.log(props, "props")
  console.log(props.text, "props.text")
  const defaultSize = 1.5
  const defaultMarginRight = 1.5
  const size = props.size ? props.size : defaultSize
  const marginRight = props.marginRight ? props.marginRight : defaultMarginRight

  return (
    <StyledEmoji
      size={size}
      text={props.text}
      marginRight={props.marginRight}
      marginBottom={props.marginBottom}
      marginTop={props.marginTop}
    />
  )
}

const StyledEmoji = styled(Twemoji)`
  width: ${(props) => props.size}em !important;
  height: ${(props) => props.size}em !important;
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

// const EmojiContainer = styled.div``

export default Emoji

// flex-wrap: ${props => (props.isWrapped ? "wrap" : "nowrap")};
// flex-direction: ${props => (props.isRow ? "row" : "column")};
// isRow='true' isWrapped='false'

// margin-right: 1.5rem;

// display: inline;

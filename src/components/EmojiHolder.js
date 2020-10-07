import React from "react"
import { Twemoji } from "react-emoji-render"
import styled from "styled-components"

const EmojiHolder = (props) => {
  console.log(props.size, "this is props.size")
  console.log(props, "props")
  console.log(props.text, "props.text")
  const defaultSize = 1.5
  const size = props.size ? props.size : defaultSize
  return (
    <div>
      <TEmoji size={size} text={props.text} />
    </div>
  )
}

const TEmoji = styled(Twemoji)`
  margin-right: 1.5rem;
  width: ${(props) => props.size}em !important;
  height: ${(props) => props.size}em !important;

  & > img {
    width: ${(props) => props.size}em !important;
    height: ${(props) => props.size}em !important;
  }
`

export default EmojiHolder

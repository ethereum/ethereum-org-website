import React from "react"
import { Twemoji } from "react-emoji-render"
import styled from "styled-components"
import { margin, MarginProps } from "styled-system"

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

const Emoji: React.FC<IProps> = ({ size = 1.5, text, ...props }) => {
  return <StyledEmoji size={size} text={text} svg {...props} />
}

Emoji.defaultProps = {
  mt: 0,
  mr: 0,
  mb: 0,
  ml: 0,
}

export default Emoji

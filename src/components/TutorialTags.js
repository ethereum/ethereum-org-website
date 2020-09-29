import React from "react"
import styled from "styled-components"

import Pill from "./Pill"

// Represent string as 32-bit integer
const hashCode = (string) => {
  let hash = 0
  for (const char of string) {
    const code = char.charCodeAt(0)
    hash = (hash << 5) - hash + code
    hash |= 0
  }
  return Math.abs(hash)
}

// Theme variables from Theme.js
const colors = [
  "tagBlue",
  "tagOrange",
  "tagGreen",
  "tagRed",
  "tagTurqouise",
  "tagGray",
  "tagYellow",
  "tagMint",
  "tagPink",
]

const TagPill = styled(Pill)`
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  background-color: ${(props) => props.theme.colors[props.color]};
`

const Tags = ({ tags }) => {
  return tags.map((tag, idx) => {
    const tagColorIdx = hashCode(tag) % colors.length
    const tagColor = colors[tagColorIdx]
    return (
      <TagPill key={idx} color={tagColor}>
        {tag}
      </TagPill>
    )
  })
}

export default Tags

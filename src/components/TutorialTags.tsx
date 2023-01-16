import { Badge } from "@chakra-ui/react"
import React from "react"

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
  "tagTurquoise",
  "tagGray",
  "tagYellow",
  "tagMint",
  "tagPink",
] as const

export interface IProps {
  tags: Array<string>
}

const TutorialTags: React.FC<IProps> = ({ tags }) => {
  return (
    <>
      {tags.map((tag, idx) => {
        const tagColorIdx = hashCode(tag) % colors.length
        const tagColor = colors[tagColorIdx]
        return (
          <Badge key={idx} me={2} mb={2} background={tagColor}>
            {tag}
          </Badge>
        )
      })}
    </>
  )
}

export default TutorialTags

import React from "react"

import { Tag } from "./ui/tag"

export type TutorialTagsProps = {
  tags: Array<string>
}

const TutorialTags = ({ tags }: TutorialTagsProps) => {
  return (
    <>
      {tags.map((tag, idx) => {
        return (
          <Tag key={idx} className="mb-2 me-2" status="tag">
            {tag}
          </Tag>
        )
      })}
    </>
  )
}

export default TutorialTags

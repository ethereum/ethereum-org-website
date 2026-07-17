import { Tag } from "./ui/tag"

export type TutorialTagsProps = {
  tags: string[]
}

const TutorialTags = ({ tags }: TutorialTagsProps) => (
  <>
    {tags.map((tag, idx) => (
      <Tag key={idx} status="tag">
        {tag}
      </Tag>
    ))}
  </>
)

export default TutorialTags

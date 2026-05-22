import { ReactNode } from "react"

import {
  Card,
  CardContent,
  CardEmoji,
  CardHeader,
  CardParagraph,
  CardProps,
  CardTitle,
} from "../ui/card"

export type MarkdownCardProps = {
  emoji?: string
  title?: ReactNode
  description?: ReactNode
} & CardProps

const MarkdownCard = ({
  emoji,
  title,
  description,
  children,
  ...props
}: MarkdownCardProps) => (
  <Card {...props}>
    {emoji && (
      <CardHeader>
        <CardEmoji text={emoji} />
      </CardHeader>
    )}
    <CardContent>
      {title && <CardTitle>{title}</CardTitle>}
      {description && <CardParagraph>{description}</CardParagraph>}
      {children}
    </CardContent>
  </Card>
)

export default MarkdownCard

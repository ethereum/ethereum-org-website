import { ReactNode } from "react"

import { ButtonLink } from "../ui/buttons/Button"
import {
  Card,
  CardContent,
  CardEmoji,
  CardFooter,
  CardHeader,
  CardParagraph,
  CardProps,
  CardTitle,
} from "../ui/card"

type MarkdownCardCTAProps =
  | { ctaLabel: ReactNode; href: string }
  | { ctaLabel?: never; href?: never }

export type MarkdownCardProps = {
  emoji?: string
  title?: ReactNode
  description?: ReactNode
} & MarkdownCardCTAProps &
  CardProps

const MarkdownCard = ({
  emoji,
  title,
  description,
  children,
  ctaLabel,
  href,
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
    {ctaLabel && (
      <CardFooter>
        <ButtonLink href={href}>{ctaLabel}</ButtonLink>
      </CardFooter>
    )}
  </Card>
)

export default MarkdownCard

import { ReactNode } from "react"

import { ButtonLink } from "../ui/buttons/Button"
import {
  Card,
  CardContent,
  CardEmoji,
  CardFooter,
  CardHeader,
  CardIconContainer,
  CardParagraph,
  CardProps,
  CardTitle,
} from "../ui/card"

type MarkdownCardIconProps =
  | { emoji?: string; icon?: never }
  | { emoji?: never; icon?: ReactNode }

type MarkdownCardCTAProps =
  | { ctaLabel: ReactNode; href: string }
  | { ctaLabel?: never; href?: never }

export type MarkdownCardProps = {
  title?: ReactNode
  description?: ReactNode
} & MarkdownCardIconProps &
  MarkdownCardCTAProps &
  CardProps

const MarkdownCard = ({
  emoji,
  icon,
  title,
  description,
  children,
  ctaLabel,
  href,
  ...props
}: MarkdownCardProps) => (
  <Card {...props}>
    {(emoji || icon) && (
      <CardHeader>
        {emoji ? (
          <CardEmoji text={emoji} />
        ) : (
          <CardIconContainer>{icon}</CardIconContainer>
        )}
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

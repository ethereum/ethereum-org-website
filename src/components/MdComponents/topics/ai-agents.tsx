import type { ChildOnlyProp } from "@/lib/types"

import Emoji from "@/components/Emoji"
import { ButtonLink } from "@/components/ui/buttons/Button"
import {
  Card,
  CardBanner,
  CardContent,
  CardParagraph,
  CardTitle,
} from "@/components/ui/card"

const CardGrid = (props: ChildOnlyProp) => (
  <div className="my-8 grid grid-cols-fill-4 gap-4" {...props} />
)

type HubCardProps = {
  emoji: string
  title: string
  description: string
  href: string
  ctaLabel: string
}

const HubCard = ({
  emoji,
  title,
  description,
  href,
  ctaLabel,
}: HubCardProps) => (
  <Card className="row-span-3 grid grid-rows-subgrid gap-y-8 bg-background-highlight p-8 max-md:p-4">
    <CardBanner
      background="none"
      fit="contain"
      className="flex h-auto items-center justify-center self-start"
    >
      <Emoji text={emoji} className="text-6xl leading-none" />
    </CardBanner>
    <CardContent className="p-0">
      <CardTitle variant="bold">{title}</CardTitle>
      <CardParagraph variant="light">{description}</CardParagraph>
    </CardContent>
    <ButtonLink href={href} variant="solid">
      {ctaLabel}
    </ButtonLink>
  </Card>
)

// MDX components available to ai-agents markdown pages.
// The layout itself lives in `src/layouts/Topic.tsx`; per-section config is
// in `src/data/topics/ai-agents.ts`.
export const aiAgentsComponents = {
  CardGrid,
  HubCard,
}

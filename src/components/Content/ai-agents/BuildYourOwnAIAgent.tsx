import { getTranslations } from "next-intl/server"

import { Image } from "@/components/Image"
import { ButtonLink } from "@/components/ui/buttons/Button"
import {
  Card,
  CardBanner,
  CardContent,
  CardFooter,
  CardHeader,
  CardParagraph,
  CardTitle,
} from "@/components/ui/card"

import ai16z from "@/public/images/ai-agents/ai16z.png"
import game from "@/public/images/ai-agents/game.png"

const BuildYourOwnAIAgent = async () => {
  const t = await getTranslations("component-build-your-own-ai-agent")

  const cards = [
    {
      image: ai16z,
      title: t("elizaos-title"),
      tagline: t("elizaos-tagline"),
      description: t("elizaos-description"),
      ctaLabel: t("elizaos-cta"),
      href: "https://elizaos.ai/",
    },
    {
      image: game,
      title: t("game-title"),
      tagline: t("game-tagline"),
      description: t("game-description"),
      ctaLabel: t("game-cta"),
      href: "https://console.game.virtuals.io/",
    },
  ]

  return (
    <div className="flex flex-col gap-8 *:flex-1 md:flex-row">
      {cards.map((card) => (
        <Card key={card.href}>
          <CardHeader>
            <CardBanner size="thumbnail-lg" background="none">
              <Image src={card.image} alt="" sizes="128px" />
            </CardBanner>
          </CardHeader>
          <CardContent>
            <CardTitle>{card.title}</CardTitle>
            <CardParagraph>{card.tagline}</CardParagraph>
            <CardParagraph>{card.description}</CardParagraph>
          </CardContent>
          <CardFooter buttons="compact">
            <ButtonLink href={card.href} variant="outline">
              {card.ctaLabel}
            </ButtonLink>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

export default BuildYourOwnAIAgent

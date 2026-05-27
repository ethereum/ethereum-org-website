import { Image } from "@/components/Image"
import { ButtonLink } from "@/components/ui/buttons/Button"
import {
  Card,
  CardContent,
  CardParagraph,
  CardTitle,
} from "@/components/ui/card"

import { cn } from "@/lib/utils/cn"

import speedRunEthereumImage from "@/public/images/dev-tools/speed-run-ethereum-banner.png"

type SpeedRunCardProps = {
  title: string
  description: string
  ctaLabel: string
  className?: string
}
const SpeedRunCard = ({
  title,
  description,
  ctaLabel,
  className,
}: SpeedRunCardProps) => (
  <Card
    variant="ghost"
    className={cn(
      "relative min-h-112 overflow-hidden rounded-b-none",
      className
    )}
    data-label="speedrunethereum-banner"
  >
    <Image
      className="pointer-events-none absolute z-hide h-full w-screen object-cover object-[75%_50%]"
      src={speedRunEthereumImage}
      alt="SpeedRunEthereum banner"
      sizes="(max-width: 768px) 100vw, 50vw"
    />

    <CardContent>
      <CardTitle variant="black">{title}</CardTitle>
      <CardParagraph>{description}</CardParagraph>
      <ButtonLink
        href="https://speedrunethereum.com/"
        className="sm:w-fit"
        customEventOptions={{
          eventCategory: "top_boxes",
          eventAction: "click",
          eventName: "speedrun",
        }}
        rel="noopener"
      >
        {ctaLabel}
      </ButtonLink>
    </CardContent>
  </Card>
)

export default SpeedRunCard

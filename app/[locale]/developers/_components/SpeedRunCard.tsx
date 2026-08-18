import { Image } from "@/components/Image"
import {
  Card,
  CardButtonFake,
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
    href="https://speedrunethereum.com/"
    // Preserve referrer for partner attribution (#19101)
    rel="noopener"
    variant="ghost"
    className={cn(
      "relative min-h-112 overflow-hidden rounded-b-none hover:bg-inherit hover:shadow-none",
      className
    )}
    customEventOptions={{
      eventCategory: "top_boxes",
      eventAction: "click",
      eventName: "speedrun",
    }}
    data-label="speedrunethereum-banner"
  >
    <Image
      className="pointer-events-none absolute z-hide h-full w-screen object-cover object-[75%_50%]"
      src={speedRunEthereumImage}
      alt="SpeedRunEthereum banner"
      sizes="(max-width: 768px) 100vw, 50vw"
    />

    <CardContent>
      <CardTitle size="lg">{title}</CardTitle>
      <CardParagraph>{description}</CardParagraph>
      <CardButtonFake className="sm:w-fit">{ctaLabel}</CardButtonFake>
    </CardContent>
  </Card>
)

export default SpeedRunCard

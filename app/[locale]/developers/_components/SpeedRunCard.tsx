import { Image } from "@/components/Image"
import { ButtonLink } from "@/components/ui/buttons/Button"

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
  <div
    className={cn("relative h-[450px]", className)}
    data-label="speedrunethereum-banner"
  >
    <Image
      className="pointer-events-none absolute -z-[1] h-full w-screen rounded-t-4xl object-cover object-[75%_50%]"
      src={speedRunEthereumImage}
      alt="SpeedRunEthereum banner"
      sizes="(max-width: 768px) 100vw, 50vw"
    />
    <div className="z-[1] flex flex-col space-y-4 break-words px-6 py-10 md:space-y-6 lg:p-6">
      <h3>{title}</h3>
      <p>{description}</p>
      <ButtonLink
        href="https://speedrunethereum.com/"
        className="mt-4 sm:w-fit"
        customEventOptions={{
          eventCategory: "top_boxes",
          eventAction: "click",
          eventName: "speedrun",
        }}
        rel="noopener"
      >
        {ctaLabel}
      </ButtonLink>
    </div>
  </div>
)

export default SpeedRunCard

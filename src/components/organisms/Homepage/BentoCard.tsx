import { HTMLAttributes } from "react"
import { type StaticImageData } from "next/image"

import { Center } from "@/components/atoms/flex"
import { ChevronNext } from "@/components/molecules/Chevron"
import { Image } from "@/components/molecules/Image"
import { ButtonLink } from "@/components/ui/buttons/Button"
import { Card, CardTitle } from "@/components/ui/card"

import { cn } from "@/lib/utils/cn"

export type BentoCardProps = HTMLAttributes<HTMLDivElement> & {
  action: string
  href: string
  imgSrc: StaticImageData
  imgWidth?: number
  imgHeight?: number
  title: string
  eventName: string
  eventCategory: string
}

const BentoCard = ({
  action,
  children,
  className,
  href,
  imgSrc,
  imgWidth,
  imgHeight,
  title,
  eventName,
  eventCategory,
}: BentoCardProps) => (
  <Card
    className={cn(
      "bg-gradient-to-right flex items-center justify-evenly gap-4 border p-8 lg:gap-16",
      className
    )}
  >
    <Center>
      <Image src={imgSrc} alt="" width={imgWidth} height={imgHeight} />
    </Center>
    <div>
      <CardTitle variant="black" className="mb-2">
        {title}
      </CardTitle>
      <p className="mb-8 text-md">{children}</p>
      <ButtonLink
        href={href}
        variant="outline"
        isSecondary
        customEventOptions={{
          eventCategory,
          eventAction: "use cases",
          eventName,
        }}
      >
        {action} <ChevronNext />
      </ButtonLink>
    </div>
  </Card>
)

export default BentoCard

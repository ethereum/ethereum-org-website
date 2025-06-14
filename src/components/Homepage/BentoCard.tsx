import { HTMLAttributes } from "react"
import { type StaticImageData } from "next/image"

import { Image, ImageProps } from "@/components/Image"
import { ButtonLink } from "@/components/ui/buttons/Button"

import { cn } from "@/lib/utils/cn"

import { ChevronNext } from "../Chevron"
import { Card, CardTitle } from "../ui/card"
import { Center } from "../ui/flex"

export type BentoCardProps = HTMLAttributes<HTMLDivElement> & {
  action: string
  href: string
  img: StaticImageData & Pick<ImageProps, "sizes">
  title: string
  eventName: string
  eventCategory: string
}

const BentoCard = ({
  action,
  children,
  className,
  href,
  img,
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
    <Center className="max-md:!max-h-[13.75rem] max-md:!w-auto">
      <Image alt="" {...img} />
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

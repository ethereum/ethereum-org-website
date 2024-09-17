import { HTMLAttributes } from "react"
import { type StaticImageData } from "next/image"

import { TwImage } from "@/components/Image"
import { ButtonLink } from "@/components/ui/buttons/Button"

import { cn } from "@/lib/utils/cn"

import { ChevronNext } from "../Chevron"
import { Card, CardTitle } from "../ui/card"
import { Center } from "../ui/flex"

export type BentoCardProps = HTMLAttributes<HTMLDivElement> & {
  action: string
  href: string
  imgSrc: StaticImageData
  imgWidth?: number
  imgHeight?: number
  title: string
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
}: BentoCardProps) => (
  <Card
    className={cn(
      "bg-gradient-to-right group flex items-center justify-evenly gap-4 border p-8 lg:gap-16",
      className
    )}
  >
    <Center
      className={cn(
        "[&_img]:duration-500",
        "group-hover:[&_img]:scale-105 group-hover:[&_img]:delay-300 group-hover:[&_img]:duration-500"
      )}
    >
      <TwImage src={imgSrc} alt="" width={imgWidth} height={imgHeight} />
    </Center>
    <div>
      <CardTitle variant="black" className="mb-2">
        {title}
      </CardTitle>
      <p className="mb-8 text-md">{children}</p>
      <ButtonLink href={href} variant="outline" isSecondary>
        {action}
        <ChevronNext />
      </ButtonLink>
    </div>
  </Card>
)

export default BentoCard

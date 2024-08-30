import { HTMLAttributes } from "react"
import { type StaticImageData } from "next/image"
import { MdChevronRight } from "react-icons/md"

import { TwImage } from "@/components/Image"
import { ButtonLink } from "@/components/ui/buttons/Button"

import { cn } from "@/lib/utils/cn"

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
  <div
    className={cn(
      "bg-gradient-to-right flex items-center justify-evenly gap-4 rounded-2xl border p-8 lg:gap-16",
      className
    )}
  >
    <div className="mb-6 grid place-items-center">
      <TwImage src={imgSrc} alt="" width={imgWidth} height={imgHeight} />
    </div>
    <div>
      <h3 className="mb-2 text-3xl font-black">{title}</h3>
      <p className="mb-8 text-md">{children}</p>
      <ButtonLink href={href} variant="outline">
        {action} <MdChevronRight />
      </ButtonLink>
    </div>
  </div>
)

export default BentoCard

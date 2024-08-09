import { HTMLAttributes } from "react"
import NextImage from "next/image"
import { type StaticImageData } from "next/image"
import { MdChevronRight } from "react-icons/md"

import { cn } from "@/lib/utils/cn"

import { ButtonLink } from "../../../tailwind/ui/buttons/Button"

export type BentoBoxProps = HTMLAttributes<HTMLDivElement> & {
  action: string
  href: string
  imgSrc: StaticImageData
  imgWidth?: number
  title: string
}

const BentoBox = ({
  action,
  children,
  className,
  href,
  imgSrc,
  imgWidth,
  title,
}: BentoBoxProps) => (
  <div
    className={cn(
      "bg-gradient-to-right flex items-center justify-evenly gap-16 rounded-2xl border p-8",
      className
    )}
  >
    <div className="grid place-items-center">
      <NextImage src={imgSrc} alt="" width={imgWidth} />
    </div>
    <div>
      <h3 className="mb-2 text-3xl font-black">{title}</h3>
      <p className="mb-8">{children}</p>
      <ButtonLink
        linkProps={{ href: href }}
        className="!border-body !text-body" // TODO: Check this override
        variant="outline"
      >
        {action} <MdChevronRight />
      </ButtonLink>
    </div>
  </div>
)

export default BentoBox

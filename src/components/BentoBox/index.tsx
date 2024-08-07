import { HTMLAttributes } from "react"
import NextImage from "next/image"
import { type StaticImageData } from "next/image"
import { MdChevronRight } from "react-icons/md"

import { cn } from "@/lib/utils/cn"

import { ButtonLink } from "../../../tailwind/ui/buttons/Button"

type BentoBoxProps = HTMLAttributes<HTMLDivElement> & {
  title: string
  action: string
  imgSrc: StaticImageData
  href: string
}

const BentoBox = ({
  title,
  children,
  action,
  href,
  imgSrc,
  className,
}: BentoBoxProps) => (
  <div className={cn("flex gap-16 rounded-2xl border p-8", className)}>
    <div className="grid w-full place-items-center">
      <NextImage src={imgSrc} alt="" />
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

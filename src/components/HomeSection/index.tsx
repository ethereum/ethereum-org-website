import NextImage, { type StaticImageData } from "next/image"
import type { ReactNode } from "react"

import { cn } from "@/lib/utils/cn"

type HomeSectionProps = {
  tag: string
  title: ReactNode
  imgSrc?: StaticImageData // TODO: Revert to required before prod
  imageLast?: boolean
  className?: string
  children?: ReactNode
}

const HomeSection = ({
  tag,
  title,
  imgSrc,
  imageLast,
  className,
  children,
}: HomeSectionProps) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-x-32 gap-y-8 px-6 lg:grid-cols-3",
        imageLast && "md:flex-row-reverse",
        className
      )}
    >
      <NextImage
        className="min-h-full rounded-4xl object-cover object-center"
        src={imgSrc || ""}
        alt=""
      />
      <div className="lg:col-span-2">
        <div className="w-fit rounded-full bg-primary-low-contrast px-4 py-0 text-sm uppercase text-primary">
          {tag}
        </div>
        <h2 className="mt-2 text-5xl font-black">{title}</h2>
        {children}
      </div>
    </div>
  )
}

export default HomeSection

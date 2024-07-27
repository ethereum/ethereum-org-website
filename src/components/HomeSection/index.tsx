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
        "grid grid-flow-dense grid-cols-1 lg:grid-cols-2 xl:grid-cols-3",
        "gap-8 xl:gap-16",
        className
      )}
    >
      <NextImage
        className={cn(
          "col-span-1",
          "col-span-1 min-h-full rounded-4xl object-cover object-center",
          imageLast && "md:col-start-3"
        )}
        src={imgSrc || ""}
        alt=""
      />
      <div
        className={cn(
          "col-span-1 xl:col-span-2",
          imageLast && "md:col-start-3"
        )}
      >
        <div className="w-fit rounded-full bg-primary-low-contrast px-4 py-0 text-sm uppercase text-primary">
          {tag}
        </div>
        <h2 className="mt-2 text-5xl font-black xl:text-7xl">{title}</h2>
        {children}
      </div>
    </div>
  )
}

export default HomeSection

import { cva, type VariantProps } from "class-variance-authority"
import type { ReactElement } from "react"

import type { CommonHeroProps } from "@/lib/types"

import Breadcrumbs from "@/components/Breadcrumbs"
import { Image } from "@/components/Image"

import { cn } from "@/lib/utils/cn"
import { breakpointAsNumber, screens } from "@/lib/utils/screen"

import { CallToAction } from "../CallToAction"

const variants = cva("flex flex-col border-b [--pad:--spacing(8)]", {
  variants: {
    variant: {
      reverse: "flex-col-reverse",
    },
    imageYPad: {
      none: "**:[img]:py-0",
    },
  },
})

export type ContentHeroProps = Omit<
  CommonHeroProps,
  "heroImg" | "header" | "blurDataURL"
> &
  Partial<Pick<CommonHeroProps, "blurDataURL" | "heroImg">> &
  VariantProps<typeof variants>

const ContentHero = ({
  breadcrumbs,
  heroImg,
  buttons,
  title,
  description,
  blurDataURL,
  variant,
  imageYPad,
  className,
}: ContentHeroProps) => {
  if (blurDataURL && heroImg) heroImg.blurDataURL = blurDataURL

  return (
    <div
      className={cn(
        variants({ variant, imageYPad }),
        heroImg ? "lg:flex-row-reverse" : "lg:flex-row",
        className
      )}
    >
      {heroImg && (
        <div className="grid flex-1 place-items-center lg:relative">
          <Image
            className={cn(
              "object-contain lg:absolute lg:inset-0 lg:size-full",
              "py-8 pe-(--pad) max-lg:h-[max(--spacing(75),33vh)] max-lg:px-(--pad)",
              variant === "reverse"
                ? "max-lg:pt-[calc(var(--pad)/2)]"
                : "max-lg:pb-[calc(var(--pad)/2)]"
            )}
            src={heroImg}
            alt=""
            preload
            sizes={`(max-width: ${screens.lg}) 100vw, (max-width: ${screens["2xl"]}) 50vw, ${breakpointAsNumber["2xl"] / 2}px`}
          />
        </div>
      )}
      <div
        className={cn(
          "max-w-3xl flex-1 space-y-8",
          "p-(--pad) lg:px-[calc(var(--pad)*1.5)] lg:py-[calc(var(--pad)*2)]"
        )}
      >
        <Breadcrumbs {...breadcrumbs} />
        <div className="space-y-[0.33lh]">
          <h1 className="font-black lg:text-7xl">{title}</h1>
          <div className="space-y-[0.5lh] text-lg">
            {typeof description === "string" ? (
              <p>{description}</p>
            ) : (
              description
            )}
          </div>
          {buttons && (
            <div className="mt-[1.5lh] flex flex-col gap-4 md:flex-row">
              {buttons.map((button, idx) => {
                if (!button) return
                // If it's a React element, render it directly
                if (typeof button === "object" && "type" in button) {
                  return <div key={idx}>{button as ReactElement<unknown>}</div>
                }
                // Otherwise, render as button props
                return <CallToAction key={idx} index={idx} {...button} />
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ContentHero

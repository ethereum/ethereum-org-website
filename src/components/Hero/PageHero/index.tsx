import { isValidElement, type ReactElement, type ReactNode } from "react"
import { cva, type VariantProps } from "class-variance-authority"

import type { CommonHeroProps } from "@/lib/types"

import Breadcrumbs, { type BreadcrumbsProps } from "@/components/Breadcrumbs"
import { Image } from "@/components/Image"

import { cn } from "@/lib/utils/cn"
import { breakpointAsNumber, screens } from "@/lib/utils/screen"

import { CallToAction } from "../CallToAction"

const variants = cva("flex flex-col border-b [--pad:--spacing(8)]", {
  variants: {
    variant: {
      "no-divider": "border-none",
    },
  },
})

type EyebrowProps =
  /**
   * Breadcrumbs to render. Pass a `BreadcrumbsProps` object to use the
   * standardized `Breadcrumbs` component, or a fully custom `Breadcrumb`
   * element when the slug-derived links don't map to real routes.
   */
  | { breadcrumbs: BreadcrumbsProps | ReactNode; header?: never }
  /**
   * Heading can be passed instead of breadcrumb to render an h1 in the same
   * location, converting the title prop to use an h2.
   */
  | { breadcrumbs?: never; header: string }

export type PageHeroProps = Omit<
  CommonHeroProps,
  "heroImg" | "header" | "blurDataURL" | "breadcrumbs"
> &
  Partial<Pick<CommonHeroProps, "blurDataURL" | "heroImg">> &
  VariantProps<typeof variants> &
  EyebrowProps

const PageHero = ({
  breadcrumbs,
  header,
  heroImg,
  buttons,
  title,
  description,
  blurDataURL,
  variant,
  className,
}: PageHeroProps) => {
  if (blurDataURL && heroImg) heroImg.blurDataURL = blurDataURL

  const PrimaryHeading = header ? "h2" : "h1"

  const Eyebrow = () => {
    if (header) {
      return (
        <h1 className="text-base font-normal text-body-medium uppercase">
          {header}
        </h1>
      )
    }
    if (isValidElement(breadcrumbs)) {
      return breadcrumbs
    }
    return <Breadcrumbs {...(breadcrumbs as BreadcrumbsProps)} />
  }

  return (
    <div
      className={cn(
        variants({ variant }),
        heroImg ? "lg:flex-row-reverse" : "lg:flex-row",
        className
      )}
    >
      {heroImg && (
        <div className="grid flex-1 place-items-center lg:relative">
          <Image
            className={cn(
              "object-contain lg:absolute lg:inset-0 lg:size-full",
              "py-8 pe-(--pad) max-lg:h-[max(--spacing(75),33vh)] max-lg:px-(--pad) max-lg:pb-[calc(var(--pad)/2)]"
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
        <Eyebrow />

        <div className="space-y-[0.33lh]">
          <PrimaryHeading className="text-3xl font-black lg:text-6xl">
            {title}
          </PrimaryHeading>
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

export default PageHero

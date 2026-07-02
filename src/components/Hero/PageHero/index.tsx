import { isValidElement, type ReactElement, type ReactNode } from "react"
import { cva, type VariantProps } from "class-variance-authority"

import type { CommonHeroProps } from "@/lib/types"

import Breadcrumbs, { type BreadcrumbsProps } from "@/components/Breadcrumbs"
import { Image } from "@/components/Image"

import { cn } from "@/lib/utils/cn"
import { breakpointAsNumber, screens } from "@/lib/utils/screen"

import { CallToAction } from "../CallToAction"

const variants = cva("flex border-b", {
  variants: {
    variant: {
      "no-divider": "border-none",
    },
  },
})

/**
 * The hero aside is either a decorative image or an arbitrary component, never
 * both. `heroImg` stacks *above* the text on mobile; `heroComponent` folds
 * *below* it. Either may be omitted for a text-only hero.
 */
type HeroMediaProps =
  | {
      /** Decorative hero image. Stacks *above* the text on mobile. */
      heroImg?: CommonHeroProps["heroImg"]
      /** Blur placeholder data URL applied to `heroImg` on prerender. */
      blurDataURL?: CommonHeroProps["blurDataURL"]
      heroComponent?: never
    }
  | {
      /**
       * A component rendered in the hero aside, in place of `heroImg`. Folds
       * *below* the text on mobile while sitting beside it on desktop.
       */
      heroComponent?: ReactNode
      heroImg?: never
      blurDataURL?: never
    }

export type PageHeroProps = Omit<
  CommonHeroProps,
  "heroImg" | "header" | "blurDataURL" | "breadcrumbs"
> &
  VariantProps<typeof variants> & {
    /**
     * Breadcrumbs to render. Pass a `BreadcrumbsProps` object to use the
     * standardized `Breadcrumbs` component, or a fully custom `Breadcrumb`
     * element when the slug-derived links don't map to real routes.
     */
    breadcrumbs: BreadcrumbsProps | ReactNode
    /**
     * Optional content rendered between the breadcrumbs and the title, e.g. a
     * status indicator or tag.
     */
    eyebrow?: ReactNode
  } & HeroMediaProps

const PageHero = ({
  breadcrumbs,
  eyebrow,
  heroImg,
  heroComponent,
  title,
  description,
  buttons,
  blurDataURL,
  variant,
  className,
}: PageHeroProps) => {
  if (blurDataURL && heroImg) heroImg.blurDataURL = blurDataURL

  return (
    <div
      className={cn(
        variants({ variant }),
        // Both the image and the component render _after_ the text, landing at
        // the end (right) on desktop. On mobile the column stacks the aside
        // _below_ the text, except an image is lifted _above_ it via reverse.
        heroImg ? "max-lg:flex-col-reverse" : "max-lg:flex-col",
        className
      )}
    >
      <div
        className={cn(
          "max-w-3xl flex-1 px-page py-hero lg:pt-hero-2x",
          description && "lg:mb-hero-2x"
        )}
      >
        <div className="mb-space-2x">
          {isValidElement(breadcrumbs) ? (
            breadcrumbs
          ) : (
            <Breadcrumbs {...(breadcrumbs as BreadcrumbsProps)} />
          )}
        </div>

        {eyebrow && <div className="mb-space-2x">{eyebrow}</div>}

        <h1 className="text-4xl font-black not-last:mb-space lg:text-6xl">
          {title}
        </h1>

        {description && (
          <div className="space-y-[0.5lh] text-lg not-last:mb-space-3x">
            {typeof description === "string" ? (
              <p>{description}</p>
            ) : (
              description
            )}
          </div>
        )}

        {buttons && (
          <div className="flex flex-col gap-4 md:flex-row">
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

      {heroImg && (
        <div className="grid flex-1 place-items-center lg:relative">
          <Image
            className="object-contain p-page max-lg:max-h-64 max-lg:w-auto max-lg:max-w-full lg:absolute lg:inset-0 lg:size-full lg:ps-0"
            src={heroImg}
            alt=""
            preload
            sizes={`(max-width: ${screens.lg}) 100vw, (max-width: ${screens["2xl"]}) 50vw, ${breakpointAsNumber["2xl"] / 2}px`}
          />
        </div>
      )}

      {heroComponent && (
        <div className="flex-1 px-page pb-hero lg:pt-hero-2x">
          {heroComponent}
        </div>
      )}
    </div>
  )
}

export default PageHero

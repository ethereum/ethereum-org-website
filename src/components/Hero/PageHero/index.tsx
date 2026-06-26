import { isValidElement, type ReactElement, type ReactNode } from "react"
import { cva, type VariantProps } from "class-variance-authority"

import type { CommonHeroProps } from "@/lib/types"

import Breadcrumbs, { type BreadcrumbsProps } from "@/components/Breadcrumbs"
import { Image } from "@/components/Image"

import { cn } from "@/lib/utils/cn"
import { breakpointAsNumber, screens } from "@/lib/utils/screen"

import { CallToAction } from "../CallToAction"

const variants = cva(
  cn(
    "flex flex-col border-b",
    "[--space:--spacing(4)] lg:[--space:--spacing(6)]" // Base spacing relative to primary header font-size
  ),
  {
    variants: {
      variant: {
        "no-divider": "border-none",
      },
    },
  }
)

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
  EyebrowProps & {
    /**
     * Optional element overlaid on top of `heroImg` (e.g. a live data
     * widget). Rendered as a sibling of the image inside its container,
     * which becomes positioned (`relative`) so the overlay can be absolutely
     * placed. Has no effect without `heroImg`.
     */
    imageOverlay?: ReactNode
  }

const PageHero = ({
  breadcrumbs,
  header,
  heroImg,
  title,
  description,
  buttons,
  blurDataURL,
  variant,
  className,
  imageOverlay,
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
        <div
          className={cn(
            "grid flex-1 place-items-center",
            imageOverlay ? "relative" : "lg:relative"
          )}
        >
          <Image
            className={cn(
              "object-contain max-lg:max-h-64 max-lg:w-auto max-lg:max-w-full lg:absolute lg:inset-0 lg:size-full",
              "p-page lg:ps-0"
            )}
            src={heroImg}
            alt=""
            preload
            sizes={`(max-width: ${screens.lg}) 100vw, (max-width: ${screens["2xl"]}) 50vw, ${breakpointAsNumber["2xl"] / 2}px`}
          />
          {imageOverlay}
        </div>
      )}
      <div
        className={cn(
          "max-w-3xl flex-1 px-page py-hero lg:pt-hero-2x",
          description && "lg:mb-hero-2x"
        )}
      >
        <div className="mb-space-2x">
          <Eyebrow />
        </div>

        <PrimaryHeading className="text-4xl font-black not-last:mb-space lg:text-6xl">
          {title}
        </PrimaryHeading>

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
    </div>
  )
}

export default PageHero

import * as React from "react"
import { cva, VariantProps } from "class-variance-authority"
import { Slot } from "@radix-ui/react-slot"

import Emoji from "@/components/Emoji"

import { cn } from "@/lib/utils/cn"
import { isExternal } from "@/lib/utils/url"

import { ChevronNext } from "../Chevron"

import { Button, type ButtonProps } from "./buttons/Button"
import { ArrowNext } from "./arrow"
import { BaseLink, ExternalLinkIcon, LinkProps } from "./Link"

const cardVariants = cva(
  cn(
    "flex flex-col",
    "[--banner-radius:--spacing(1)] rounded-[calc(var(--card-pad)+var(--banner-radius))]",
    "text-body no-underline hover:text-body",
    "transition-all duration-300",
    "**:data-[label=card-header]:pb-0 **:data-[label=card-footer]:pt-0"
  ),
  {
    variants: {
      variant: {
        base: "bg-background-highlight",
        nested: "bg-background",
        ghost: "[--banner-radius:--spacing(4)]",
        "header-bar": cn(
          "overflow-hidden *:data-[label=card-header]:bg-background-highlight border",
          "[--card-pad:--spacing(5)]! **:data-[label=card-header]:flex **:data-[label=card-header]:items-center **:data-[label=card-header]:gap-4 **:data-[label=card-header]:border-b",
          "**:data-[label=card-header]:pb-(--card-pad) **:data-[label=card-footer]:pt-(--card-pad)"
        ),
      },
      size: {
        lg: "[--card-pad:--spacing(6)] md:[--card-pad:--spacing(8)] [--content-space:--spacing(8)] [--banner-radius:--spacing(1.5)]",
        base: "[--card-pad:--spacing(4)] md:[--card-pad:--spacing(6)] [--content-space:1lh]",
        md: "[--card-pad:--spacing(4)] [--content-space:--spacing(4)]",
        sm: "[--card-pad:--spacing(2.5)] [--content-space:--spacing(2.5)]",
        xs: "[--card-pad:--spacing(0)] [--content-space:--spacing(1)]",
      },
      hoverLift: { true: "hover-lift-base" },
      border: { true: "ring ring-border" },
      // Set internally from `href` -- names the link-group and drives the
      // hover affordance below. Not a public prop (omitted from CardProps).
      interactive: { true: "group/link", false: "" },
    },
    compoundVariants: [
      // Ghost link cards fill with the highlight bg on hover, no outline...
      {
        interactive: true,
        variant: "ghost",
        class: "hover:bg-background-highlight",
      },
      // ...every other link card keeps the primary outline ring.
      {
        interactive: true,
        variant: ["base", "nested", "header-bar"],
        class: "ring ring-transparent hover:ring-primary-hover",
      },
      // ...but a `border` link card keeps its border visible at rest (this must
      // come after the rule above so `ring-border` wins over `ring-transparent`).
      {
        interactive: true,
        border: true,
        variant: ["base", "nested", "header-bar"],
        class: "ring-border",
      },
    ],
    defaultVariants: {
      variant: "base",
      size: "base",
    },
  }
)

export type CardProps = React.HTMLAttributes<HTMLElement> &
  Pick<LinkProps, "href" | "customEventOptions"> &
  Omit<VariantProps<typeof cardVariants>, "interactive">

const Card = React.forwardRef<HTMLDivElement | HTMLAnchorElement, CardProps>(
  (
    {
      className,
      href,
      customEventOptions,
      variant,
      size,
      hoverLift,
      border,
      ...props
    },
    ref
  ) => {
    const classes = cn(
      cardVariants({
        variant,
        size,
        // Link cards (href) always lift; non-link cards opt in via the prop.
        hoverLift: !!href || hoverLift,
        border,
        interactive: !!href,
      }),
      className
    )
    if (href) {
      return (
        <BaseLink
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={classes}
          customEventOptions={customEventOptions}
          hideArrow
          // Fake CTA components surface the external arrow (via data-external), not BaseLink.
          data-external={isExternal(href) || undefined}
          {...props}
        />
      )
    }
    return (
      <div
        ref={ref as React.Ref<HTMLDivElement>}
        className={cn(classes, "group")}
        {...props}
      />
    )
  }
)
Card.displayName = "Card"

const childSpacingVariants = cva("", {
  variants: {
    spacing: {
      lg: "[--content-space:--spacing(4)] md:[--content-space:--spacing(6)]",
      md: "[--content-space:--spacing(4)]",
      sm: "[--content-space:--spacing(2.5)]",
      xs: "[--content-space:--spacing(1)]",
      none: "[--content-space:--spacing(0)]",
    },
  },
})

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-label="card-header"
    className={cn("p-(--card-pad)", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> &
    VariantProps<typeof childSpacingVariants>
>(({ className, spacing, ...props }, ref) => (
  <div
    ref={ref}
    data-label="card-content"
    className={cn(
      childSpacingVariants({ spacing }),
      "flex-1 space-y-(--content-space) p-(--card-pad)",
      "text-body-medium **:data-[label=card-title]:text-body **:[:is(h2,h3,h4,h5,h6,strong)]:text-body",
      className
    )}
    {...props}
  />
))
CardContent.displayName = "CardContent"

const buttonVariants = cva("gap-4", {
  variants: {
    buttons: {
      full: "flex flex-col *:[button]:w-full *:[button]:text-center *:data-[label=button-link]:w-full *:data-[label=button-link]:text-center",
      compact:
        "*:[button]:w-fit *:data-[label=button-link]:w-fit flex flex-wrap",
      responsive: cn(
        "@container flex flex-wrap",
        "*:[button]:w-full *:data-[label=button-link]:w-full",
        "@lg:*:[button]:w-fit @lg:*:data-[label=button-link]:w-fit"
      ),
      inherit: "",
    },
  },
  defaultVariants: {
    buttons: "responsive",
  },
})

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof buttonVariants>
>(({ className, buttons, ...props }, ref) => (
  <div
    ref={ref}
    data-label="card-footer"
    className={cn(buttonVariants({ buttons }), "p-(--card-pad)", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

/**
 * Presentational `<div>` mirror of `Button` (via `asChild`) for the single CTA of an
 * `href` Card, where a real `Button`/`ButtonLink` would nest interactive content in the
 * card's anchor. Hover rides the card's `group/link`. See the design-system skill.
 */
type CardButtonFakeProps = React.HTMLAttributes<HTMLDivElement> &
  Pick<ButtonProps, "variant" | "size" | "isSecondary"> & {
    withChevron?: boolean
    hideArrow?: boolean
  }

const CardButtonFake = React.forwardRef<HTMLDivElement, CardButtonFakeProps>(
  (
    {
      className,
      variant,
      size,
      isSecondary,
      children,
      withChevron,
      hideArrow,
      ...props
    },
    ref
  ) => (
    <Button asChild variant={variant} size={size} isSecondary={isSecondary}>
      <div ref={ref} data-label="button-link" className={className} {...props}>
        {children}
        {/* External NE arrow: only on external Cards (data-external on group/link). */}
        {!hideArrow && (
          <ExternalLinkIcon className="hidden group-data-external/link:inline-block" />
        )}
        {/* Optional chevron; external Cards show the NE arrow instead unless hideArrow. */}
        {withChevron && (
          <ChevronNext
            className={cn(
              "size-5",
              !hideArrow && "group-data-external/link:hidden"
            )}
          />
        )}
      </div>
    </Button>
  )
)
CardButtonFake.displayName = "CardButtonFake"

/**
 * Presentational `<div>` mirror of a text link for the single CTA of an `href` Card,
 * where a real link would nest an anchor in the card's anchor. Underline and trailing-icon
 * logic ride the card's `group/link` and mirror `CardButtonFake`. See the design-system skill.
 */
type CardLinkFakeProps = React.HTMLAttributes<HTMLDivElement> & {
  withForwardArrow?: boolean
  hideArrow?: boolean
}

const CardLinkFake = React.forwardRef<HTMLDivElement, CardLinkFakeProps>(
  ({ className, withForwardArrow, hideArrow, children, ...props }, ref) => (
    <div
      ref={ref}
      data-label="card-link"
      className={cn(
        "block w-fit text-primary no-underline",
        "group-hover/link:text-primary-hover group-focus/link:text-primary-hover",
        className
      )}
      {...props}
    >
      <span className="group-hover/link:underline group-focus/link:underline">
        {children}
      </span>
      {/* External NE arrow: only on external Cards (data-external on group/link). */}
      {!hideArrow && (
        <ExternalLinkIcon className="hidden group-data-external/link:inline-block" />
      )}
      {/* Optional forward arrow; external Cards show the NE arrow instead unless hideArrow. */}
      {withForwardArrow && (
        <span className={cn(!hideArrow && "group-data-external/link:hidden")}>
          &nbsp;
          <ArrowNext className="mb-1 inline size-[1em]" />
        </span>
      )}
    </div>
  )
)
CardLinkFake.displayName = "CardLinkFake"

const CardEmoji = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { text: string }
>(({ className, text, ...props }, ref) => (
  <div
    ref={ref}
    data-label="card-emoji"
    className={cn("size-12", className)}
    {...props}
  >
    <Emoji text={text} className="text-5xl" />
  </div>
))
CardEmoji.displayName = "CardEmoji"

const CardIconContainer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    data-label="card-icon"
    className={cn("text-primary *:size-12", className)}
    {...props}
  >
    {children}
  </div>
))
CardIconContainer.displayName = "CardIconContainer"

const cardBannerVariants = cva(
  cn(
    "overflow-hidden rounded-(--banner-radius)",
    "[&_img]:size-full [&_img]:duration-300"
  ),
  {
    variants: {
      background: {
        "accent-a": "bg-tint-accent-a",
        primary: "bg-tint-primary",
        body: "bg-tint-body",
        none: "",
      },
      size: {
        full: "",
        lg: "h-56 w-full self-stretch",
        base: "h-48 w-full self-stretch",
        sm: "h-36 w-full self-stretch",
        thumbnail: "size-16 shrink-0",
        "thumbnail-lg": "size-32 shrink-0",
      },
      fit: {
        cover: "[&_img]:object-cover",
        contain: "relative isolate [&_img]:object-contain",
      },
      zoom: {
        true: "group-hover/link:[&_img]:scale-110 group-hover/link:[&_img]:duration-300 group-focus/link:[&_img]:scale-110 group-focus/link:[&_img]:duration-300",
      },
    },
    defaultVariants: {
      background: "body",
      size: "base",
      fit: "cover",
    },
  }
)

type CardBannerProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof cardBannerVariants>

const CardBanner = React.forwardRef<HTMLDivElement, CardBannerProps>(
  ({ className, background, size, fit, zoom, children, ...props }, ref) => {
    // When fit="contain", auto-generate blurred background from single child image
    const renderContent = () => {
      if (
        fit === "contain" &&
        background !== "none" &&
        React.Children.count(children) === 1
      ) {
        const child = React.Children.only(children)
        if (React.isValidElement<{ className?: string }>(child)) {
          // Blurred background
          const blurredBg = React.cloneElement(child, {
            className: cn(
              child.props.className,
              "absolute inset-0 -z-10 scale-110 !object-cover blur-xl"
            ),
            "aria-hidden": true,
          } as React.HTMLAttributes<HTMLElement>)
          // Sharp foreground
          const sharpFg = React.cloneElement(child, {
            className: cn(child.props.className, "!object-contain"),
          })
          return (
            <>
              {blurredBg}
              {sharpFg}
            </>
          )
        }
      }
      return children
    }

    return (
      <div
        ref={ref}
        data-label="card-banner"
        className={cn(
          cardBannerVariants({ background, size, fit, zoom }),
          className
        )}
        {...props}
      >
        {renderContent()}
      </div>
    )
  }
)
CardBanner.displayName = "CardBanner"

const titleVariants = cva("text-pretty text-2xl", {
  variants: {
    size: {
      sm: "text-lg",
      lg: "text-3xl",
    },
    spacing: {
      quarter:
        "[&:has(+[data-label=card-paragraph])]:mb-[calc(var(--content-space)_/_4)]",
      none: "[&:has(+[data-label=card-paragraph])]:mb-0",
      inherit: "",
    },
  },

  defaultVariants: {
    spacing: "quarter",
  },
})

const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement> &
    VariantProps<typeof titleVariants> & {
      asChild?: boolean
    }
>(({ asChild, className, size: variant, spacing, ...props }, ref) => {
  const Comp = asChild ? Slot : "h3"
  return (
    <Comp
      ref={ref}
      data-label="card-title"
      className={cn(titleVariants({ size: variant, spacing }), className)}
      {...props}
    />
  )
})
CardTitle.displayName = "CardTitle"

const paragraphVariants = cva("text-body-medium", {
  variants: {
    variant: {
      uppercase: "uppercase",
      subtitle: "italic",
    },
    textColor: {
      body: "text-body!",
    },
    size: {
      sm: "text-sm",
    },
  },
})

const CardParagraph = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement> &
    VariantProps<typeof paragraphVariants>
>(({ className, variant, size, textColor, ...props }, ref) => (
  <p
    ref={ref}
    data-label="card-paragraph"
    className={cn(paragraphVariants({ variant, size, textColor }), className)}
    {...props}
  />
))
CardParagraph.displayName = "CardParagraph"

export {
  Card,
  CardBanner,
  CardButtonFake,
  CardContent,
  CardEmoji,
  CardFooter,
  CardHeader,
  CardIconContainer,
  CardLinkFake,
  CardParagraph,
  CardTitle,
}

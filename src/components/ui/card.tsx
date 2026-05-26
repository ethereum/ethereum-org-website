import * as React from "react"
import { cva, VariantProps } from "class-variance-authority"
import { Slot } from "@radix-ui/react-slot"

import Emoji from "@/components/Emoji"

import { cn } from "@/lib/utils/cn"

import { BaseLink, LinkProps } from "./Link"

const cardVariants = cva(
  cn(
    "[--banner-radius:--spacing(1)] rounded-[calc(var(--card-pad)+var(--banner-radius))]",
    "text-body no-underline hover:text-body",
    "transition-all duration-300 hover:transition-all hover:duration-300"
  ),
  {
    variants: {
      background: {
        base: "bg-background-highlight",
        nested: "bg-background",
        none: "[--banner-radius:--spacing(4)]",
        // TODO: Confirm gradient
        gradient:
          "bg-card-gradient dark:bg-linear-to-br dark:from-transparent dark:to-primary/10",
        "header-bar":
          "overflow-hidden *:data-[label=card-header]:bg-background-highlight border",
        "radial-a": "bg-radial-a",
      },
      spacing: {
        lg: "[--card-pad:--spacing(6)] md:[--card-pad:--spacing(8)] [--content-space:--spacing(8)] [--banner-radius:--spacing(1.5)]",
        base: "[--card-pad:--spacing(4)] md:[--card-pad:--spacing(6)] [--content-space:1lh]",
        md: "[--card-pad:--spacing(4)] [--content-space:--spacing(4)]",
        sm: "[--card-pad:--spacing(2.5)] [--content-space:--spacing(2.5)]",
        xs: "[--card-pad:--spacing(0)] [--content-space:--spacing(1)]",
      },
      hoverEffect: {
        lift: "shadow-md hover:shadow-lg scale-100 hover:scale-[1.0075]",
      },
    },
    defaultVariants: {
      background: "base",
      spacing: "base",
    },
  }
)

const orientationVariants = cva("", {
  variants: {
    orientation: {
      col: "flex flex-col",
      row: "flex",
      unset: "",
    },
  },
  defaultVariants: { orientation: "col" },
})

export type CardProps = React.HTMLAttributes<HTMLDivElement> &
  Pick<LinkProps, "href" | "customEventOptions"> &
  VariantProps<typeof cardVariants> &
  VariantProps<typeof orientationVariants>

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      href,
      customEventOptions,
      background,
      spacing,
      orientation,
      hoverEffect,
      ...props
    },
    ref
  ) => {
    if (href) {
      return (
        <BaseLink
          href={href}
          className={cn(
            cardVariants({ background, spacing, hoverEffect }),
            orientationVariants({ orientation }),
            className,
            "group/link"
          )}
          customEventOptions={customEventOptions}
          hideArrow
        >
          <div
            ref={ref}
            className={cn(orientationVariants({ orientation }), "flex-1")}
            {...props}
          />
        </BaseLink>
      )
    }
    return (
      <div
        ref={ref}
        className={cn(
          cardVariants({ background, spacing, hoverEffect }),
          orientationVariants({ orientation }),
          className,
          "group"
        )}
        {...props}
      />
    )
  }
)
Card.displayName = "Card"

const childSpacingVariants = cva("", {
  variants: {
    spacing: {
      base: "data-[label=card-header]:pb-0 data-[label=card-footer]:pt-0",
      lg: "[--content-space:--spacing(4)] md:[--content-space:--spacing(6)]",
      md: "[--content-space:--spacing(4)]",
      sm: "[--content-space:--spacing(2.5)]",
      xs: "[--content-space:--spacing(1)]",
      inherit: "",
    },
  },
  defaultVariants: {
    spacing: "base",
  },
})

const headerVariants = cva("", {
  variants: {
    variant: {
      bar: "[--card-pad:--spacing(5)] flex items-center gap-4 border-b",
    },
  },
})

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> &
    VariantProps<typeof childSpacingVariants> &
    VariantProps<typeof headerVariants>
>(({ className, variant, spacing, ...props }, ref) => (
  <div
    ref={ref}
    data-label="card-header"
    className={cn(
      childSpacingVariants({ spacing }),
      headerVariants({ variant }),
      "p-(--card-pad)",
      className
    )}
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
      "text-body-medium **:data-[label=card-title]:text-body **:[strong]:text-body",
      className
    )}
    {...props}
  />
))
CardContent.displayName = "CardContent"

const buttonVariants = cva("", {
  variants: {
    buttons: {
      full: "*:[button]:w-full *:[button]:text-center *:data-[label=button-link]:w-full *:data-[label=button-link]:text-center",
      compact: "*:[button]:w-fit *:data-[label=button-link]:w-fit",
      inherit: "",
    },
  },
  defaultVariants: {
    buttons: "full",
  },
})

const footerVariants = cva("", {
  variants: {
    rounded: {
      fit: "*:rounded-(--banner-radius)",
    },
  },
})

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> &
    VariantProps<typeof childSpacingVariants> &
    VariantProps<typeof buttonVariants> &
    VariantProps<typeof footerVariants>
>(({ className, spacing, buttons, rounded, ...props }, ref) => (
  <div
    ref={ref}
    data-label="card-footer"
    className={cn(
      childSpacingVariants({ spacing }),
      buttonVariants({ buttons }),
      footerVariants({ rounded }),
      "p-(--card-pad)",
      className
    )}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

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

const cardBannerVariants = cva(
  cn(
    "overflow-hidden rounded-(--banner-radius)",
    "[&_img]:size-full [&_img]:duration-300"
  ),
  {
    variants: {
      background: {
        "accent-a":
          "bg-linear-to-b from-accent-a/5 to-accent-a/10 dark:from-accent-a/10 dark:to-accent-a/20",
        "accent-b":
          "bg-linear-to-b from-accent-b/5 to-accent-b/10 dark:from-accent-b/10 dark:to-accent-b/20",
        "accent-c":
          "bg-linear-to-b from-accent-c/5 to-accent-c/10 dark:from-accent-c/10 dark:to-accent-c/20",
        primary:
          "bg-linear-to-b from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20",
        body: "bg-linear-to-b from-body/5 to-body/10 dark:from-body/10 dark:to-body/20",
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
        false: "",
      },
    },
    defaultVariants: {
      background: "body",
      size: "base",
      fit: "cover",
      zoom: true,
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

const titleVariants = cva(
  "group-hover/link:underline group-focus/link:underline",
  {
    variants: {
      variant: {
        semibold: "text-lg font-semibold",
        bold: "text-2xl font-bold",
        black: "text-3xl font-black",
      },
      spacing: {
        half: "[&:has(+[data-label=card-paragraph])]:mb-[calc(var(--content-space)_/_2)]",
        quarter:
          "[&:has(+[data-label=card-paragraph])]:mb-[calc(var(--content-space)_/_4)]",
        none: "[&:has(+[data-label=card-paragraph])]:mb-0",
        inherit: "",
      },
    },

    defaultVariants: {
      variant: "bold",
      spacing: "half",
    },
  }
)

const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement> &
    VariantProps<typeof titleVariants> & {
      asChild?: boolean
    }
>(({ asChild, className, variant, spacing, ...props }, ref) => {
  const Comp = asChild ? Slot : "h3"
  return (
    <Comp
      ref={ref}
      data-label="card-title"
      className={cn(titleVariants({ variant, spacing }), className)}
      {...props}
    />
  )
})
CardTitle.displayName = "CardTitle"

const paragraphVariants = cva("", {
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
  CardContent,
  CardEmoji,
  CardFooter,
  CardHeader,
  CardParagraph,
  CardTitle,
}

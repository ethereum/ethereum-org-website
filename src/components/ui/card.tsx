import * as React from "react"
import { cva, VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils/cn"

import { BaseLink, LinkProps } from "./Link"

const cardVariants = cva("rounded-2xl text-body no-underline hover:text-body", {
  variants: {},
})

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> &
    Pick<LinkProps, "href" | "customEventOptions"> &
    VariantProps<typeof cardVariants>
>(({ className, href, customEventOptions, ...props }, ref) => {
  if (href) {
    return (
      <BaseLink
        href={href}
        className={cn(cardVariants({ className }), "group/link")}
        customEventOptions={customEventOptions}
        hideArrow
      >
        <div ref={ref} {...props} />
      </BaseLink>
    )
  }
  return (
    <div
      ref={ref}
      className={cn(cardVariants({ className }), "group")}
      {...props}
    />
  )
})
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const cardBannerVariants = cva(
  cn(
    "overflow-hidden rounded-2xl",
    "[&_img]:size-full [&_img]:object-cover [&_img]:duration-200",
    "group-hover/link:[&_img]:scale-110 group-hover/link:[&_img]:duration-200 group-focus/link:[&_img]:scale-110 group-focus/link:[&_img]:duration-200"
  ),
  {
    variants: {
      background: {
        "accent-a":
          "bg-gradient-to-b from-accent-a/5 to-accent-a/10 dark:from-accent-a/10 dark:to-accent-a/20",
        "accent-b":
          "bg-gradient-to-b from-accent-b/5 to-accent-b/10 dark:from-accent-b/10 dark:to-accent-b/20",
        "accent-c":
          "bg-gradient-to-b from-accent-c/5 to-accent-c/10 dark:from-accent-c/10 dark:to-accent-c/20",
        primary:
          "bg-gradient-to-b from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20",
        body: "bg-gradient-to-b from-body/5 to-body/10 dark:from-body/10 dark:to-body/20",
        none: "",
      },
      size: {
        full: "h-48 w-full self-stretch",
        thumbnail: "size-16",
      },
    },
    defaultVariants: {
      background: "body",
      size: "full",
    },
  }
)

const CardBanner = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof cardBannerVariants>
>(({ className, background, size, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(cardBannerVariants({ background, size }), className)}
    {...props}
  />
))
CardBanner.displayName = "CardBanner"

const titleVariants = cva(
  "group-hover/link:underline group-focus/link:underline",
  {
    variants: {
      variant: {
        bold: "text-2xl font-bold",
        black: "text-3xl font-black",
      },
    },
    defaultVariants: {
      variant: "bold",
    },
  }
)

const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement> & VariantProps<typeof titleVariants>
>(({ className, variant, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(titleVariants({ variant, className }))}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const paragraphVariants = cva("", {
  variants: {
    variant: {
      base: "text-body",
      light: "text-body-medium",
      uppercase: "uppercase text-body-medium",
      subtitle: "italic",
    },
    size: {
      base: "",
      sm: "text-sm",
    },
  },
  defaultVariants: {
    variant: "base",
    size: "base",
  },
})

const CardParagraph = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement> &
    VariantProps<typeof paragraphVariants>
>(({ className, variant, size, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(paragraphVariants({ variant, size, className }))}
    {...props}
  />
))
CardParagraph.displayName = "CardParagraph"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("space-y-2.5 p-2.5", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export {
  Card,
  CardBanner,
  CardContent,
  CardFooter,
  CardHeader,
  CardParagraph,
  CardTitle,
}

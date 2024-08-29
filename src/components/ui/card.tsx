import * as React from "react"
import { cva, VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils/cn"

import { BaseLink } from "./Link"

const titleVariants = cva("group-hover:underline", {
  variants: {
    variant: {
      normal: "font-normal text-lg",
      strong: "text-2xl font-bold",
    },
  },
  defaultVariants: {
    variant: "strong",
  },
})

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  href?: string
}
const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, href, ...props }, ref) => {
    if (href) {
      return (
        <BaseLink
          href={href}
          className={cn(
            "group rounded-2xl text-body no-underline hover:text-body",
            className
          )}
          hideArrow
        >
          <div ref={ref} {...props} />
        </BaseLink>
      )
    }
    return (
      <div
        ref={ref}
        className={cn("group rounded-2xl", className)}
        {...props}
      />
    )
  }
)
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

const CardBanner = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "h-48 w-full self-stretch overflow-hidden rounded-2xl",
      "bg-gradient-to-b from-accent-a/10 to-accent-a/0 dark:from-accent-a/15 dark:to-accent-a/5",
      "[&_img]:size-full [&_img]:object-cover [&_img]:duration-200 group-hover:[&_img]:scale-110 group-hover:[&_img]:duration-200",
      className
    )}
    {...props}
  />
))
CardBanner.displayName = "CardBanner"

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

const CardSubTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("text-sm italic", className)} {...props} />
))
CardSubTitle.displayName = "CardSubTitle"

const CardHighlight = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm uppercase text-accent-a", className)}
    {...props}
  />
))
CardHighlight.displayName = "CardHighlight"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-body-medium", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

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
  CardDescription,
  CardFooter,
  CardHeader,
  CardHighlight,
  CardSubTitle,
  CardTitle,
}

import React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { Image, type ImageProps } from "@/components/Image"

import { cn } from "@/lib/utils/cn"

import Emoji from "../Emoji"

type AsProp = { as?: "h3" | "h4" }

const variants = cva(
  cn(
    "@container/callout flex flex-col *:flex-1",
    "@max-3xl/callout:has-[[data-label=callout-banner]]:*:mt-24", // Banner adjustment margin top (reserves space for image overlap when a banner is present)
    "*:[--callout-padding:--spacing(8)] *:@3xl/callout:[--callout-padding:--spacing(12)]", // Callout padding variable
    "[--content-font-size:var(--text-base)]"
  ),
  {
    variants: {
      variant: {
        large: cn(
          "**:data-[label=callout-content]:@3xl/callout:w-[inherit]",
          "[--title-font-size:var(--text-2xl)] *:@3xl/callout:[--title-font-size:var(--text-3xl)]",
          "[--content-font-size:var(--text-xl)]"
        ),
        medium: "*:@3xl/callout:[--title-font-size:var(--text-3xl)]",
        small:
          "[--title-font-size:var(--text-xl)] *:@3xl/callout:[--title-font-size:var(--text-2xl)]",
      },
    },
    defaultVariants: {
      variant: "large",
    },
  }
)

const CalloutRoot = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof variants>
>(({ className, variant, children, ...props }, ref) => (
  <aside
    ref={ref}
    className={cn("min-h-full", variants({ variant }), className)}
    {...props}
  >
    <div
      className={cn(
        "flex flex-col @3xl/callout:flex-row-reverse",
        "rounded-2xl bg-linear-to-r from-accent-a/10 to-accent-c/10 dark:from-accent-a/20 dark:to-accent-c-hover/20"
      )}
    >
      {children}
    </div>
  </aside>
))
CalloutRoot.displayName = "CalloutRoot"

const CalloutBanner = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-label="callout-banner"
    className={cn(
      "grid place-items-center px-(--callout-padding) @3xl/callout:flex-2",
      "@max-3xl/callout:-mt-24 @max-3xl/callout:md:[aside:not(:only-child)_&]:min-h-64",
      "*:[img]:max-h-64 *:[img]:object-contain",
      className
    )}
    {...props}
  />
))
CalloutBanner.displayName = "CalloutBanner"

const CalloutEmoji = React.forwardRef<
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
CalloutEmoji.displayName = "CalloutEmoji"

const CalloutContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-label="callout-content"
    className={cn(
      "@container/content flex flex-col gap-4 p-(--callout-padding)",
      "flex-1 @3xl/callout:flex-3",
      className
    )}
    {...props}
  />
))
CalloutContent.displayName = "CalloutContent"

const CalloutButtons = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "mt-auto flex flex-wrap gap-4 pt-4 max-sm:flex-col",
      "*:w-full *:text-center sm:*:w-fit", // Button styling
      className
    )}
    {...props}
  />
))
CalloutButtons.displayName = "CalloutButtons"

const CalloutTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement> & AsProp
>(({ as, className, ...props }, ref) => {
  const Comp = as || "h2"
  return (
    <Comp
      ref={ref}
      className={cn("[font-size:var(--title-font-size,inherit)]", className)}
      {...props}
    />
  )
})
CalloutTitle.displayName = "CalloutTitle"

const CalloutDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    data-label="description"
    className={cn(
      "[font-size:var(--content-font-size,inherit)] text-body-medium",
      className
    )}
    {...props}
  />
))
CalloutDescription.displayName = "CalloutDescription"

type BannerProp =
  | { image?: ImageProps["src"]; emoji?: never }
  | { image?: never; emoji?: string }

export type CalloutProps = React.HTMLAttributes<HTMLDivElement> & {
  title: string
  description: string
  alt?: string
} & VariantProps<typeof variants> &
  AsProp &
  BannerProp

const Callout = ({
  image,
  emoji,
  as,
  title,
  description,
  alt = "",
  children,
  ...props
}: CalloutProps) => (
  <CalloutRoot {...props}>
    {image && (
      <CalloutBanner>
        <Image
          src={image}
          alt={alt}
          sizes="(min-width: 768px) 400px, calc(100vw - 64px)"
        />
      </CalloutBanner>
    )}
    <CalloutContent>
      {emoji && <CalloutEmoji text={emoji} />}

      <CalloutTitle as={as}>{title}</CalloutTitle>
      <CalloutDescription>{description}</CalloutDescription>

      {children && <CalloutButtons>{children}</CalloutButtons>}
    </CalloutContent>
  </CalloutRoot>
)

export {
  CalloutBanner,
  CalloutButtons,
  CalloutContent,
  CalloutDescription,
  CalloutRoot,
  CalloutTitle,
}

export default Callout

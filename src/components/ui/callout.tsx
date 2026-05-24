import React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { Image, type ImageProps } from "@/components/Image"

import { cn } from "@/lib/utils/cn"

import Emoji from "../Emoji"

type AsProp = { as?: "h3" | "h4" }

const variants = cva(
  cn(
    "rounded-2xl p-8 sm:p-12",
    "flex flex-col lg:flex-row-reverse",
    "from-accent-a/10 to-accent-c/10 dark:from-accent-a/20 dark:to-accent-c-hover/20 bg-linear-to-r",
    "**:data-[label=description]:text-body-medium"
  ),
  {
    variants: {
      variant: {
        large: cn(
          "**:data-[label=callout-content]:flex **:data-[label=callout-content]:w-full **:data-[label=callout-content]:flex-shrink-0 **:data-[label=callout-content]:flex-grow **:data-[label=callout-content]:basis-1/2 **:data-[label=callout-content]:flex-col **:data-[label=callout-content]:justify-center **:data-[label=callout-content]:sm:ps-4 **:data-[label=callout-content]:lg:w-[inherit] **:data-[label=callout-content]:lg:ps-8",
          "**:is(h2,h3,h4):mb-8 **:is(h2,h3,h4):text-2xl **:is(h2,h3,h4):leading-xs **:is(h2,h3,h4):sm:text-[2rem]",
          "**:data-[label=description]:mb-8 **:data-[label=description]:w-[90%] **:data-[label=description]:text-xl"
        ),
        medium: cn(
          "**:data-[label=callout-content]:space-y-8",
          "**:is(h2,h3,h4):mb-8 **:is(h2,h3,h4):text-2xl **:is(h2,h3,h4):leading-xs **:is(h2,h3,h4):sm:text-[2rem]",
          "**:data-[label=description]:text-inherit"
        ),
        small: cn(
          "**:data-[label=callout-content]:space-y-4",
          "**:is(h2,h3,h4):text-xl **:is(h2,h3,h4):text-body **:is(h2,h3,h4):md:text-2xl",
          "**:img:max-w-64"
        ),
      },
    },
    defaultVariants: {
      variant: "large",
    },
  }
)

const CalloutRoot = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement> & VariantProps<typeof variants>
>(({ className, variant, ...props }, ref) => (
  <aside
    ref={ref}
    className={cn(variants({ variant }), className)}
    {...props}
  />
))
CalloutRoot.displayName = "CalloutRoot"

const CalloutBanner = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex", className)} {...props} />
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
    className={cn("flex flex-col", className)}
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
      "flex flex-wrap gap-4 max-sm:flex-col",
      "*:w-full *:text-center sm:*:w-fit",
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
  return <Comp ref={ref} className={className} {...props} />
})
CalloutTitle.displayName = "CalloutTitle"

const CalloutDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    data-label="description"
    className={cn("flex-1", className)}
    {...props}
  />
))
CalloutDescription.displayName = "CalloutDescription"

type BannerProp =
  | { image?: ImageProps["src"]; emoji?: never }
  | { image?: never; emoji?: string }

export type CalloutProps = React.HTMLAttributes<HTMLDivElement> & {
  imageWidth?: number
  title: string
  description: string
  alt?: string
} & VariantProps<typeof variants> &
  AsProp &
  BannerProp

const Callout = ({
  image,
  emoji,
  imageWidth,
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
          width={imageWidth}
          className="mx-auto -my-24 object-contain max-lg:mb-0"
          sizes="(max-width: 991px) calc(100vw - 128px), 600px"
        />
      </CalloutBanner>
    )}
    <CalloutContent>
      {emoji && <CalloutEmoji text={emoji} />}

      <CalloutTitle>{title}</CalloutTitle>
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

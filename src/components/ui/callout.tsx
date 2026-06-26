import React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { Image, type ImageProps } from "@/components/Image"

import { cn } from "@/lib/utils/cn"

type AsProp = { as?: "h3" | "h4" }

const variants = cva(
  cn(
    "@container/callout flex flex-col *:flex-1",
    "@max-3xl/callout:has-[[data-label=callout-banner]]:*:mt-24", // Banner adjustment margin top (reserves space for image overlap when a banner is present)
    "*:[--callout-padding:--spacing(8)] *:@3xl/callout:[--callout-padding:--spacing(12)]", // Callout padding variable
    "[--spacing-unit:0.25lh]" // Default spacing unit
  ),
  {
    variants: {
      variant: {
        base: cn(
          "**:data-[label=callout-content]:@3xl/callout:w-[inherit]",
          "[--title-font-size:var(--text-2xl)] *:@3xl/callout:[--title-font-size:var(--text-3xl)]",
          "[--content-font-size:var(--text-lg)] *:@3xl/callout:[--content-font-size:var(--text-xl)]"
        ),
        sm: cn(
          "[--title-font-size:var(--text-xl)] *:@3xl/callout:[--title-font-size:var(--text-2xl)]",
          "[--content-font-size:var(--text-base)] *:@3xl/callout:[--content-font-size:var(--text-lg)]"
        ),
      },
    },
    defaultVariants: {
      variant: "base",
    },
  }
)

const CalloutRoot = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof variants>
>(({ className, variant, children, ...props }, ref) => (
  <aside ref={ref} className={cn(variants({ variant }), className)} {...props}>
    <div className="flex flex-col rounded-base bg-linear-secondary @3xl/callout:flex-row-reverse">
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
      "grid place-items-center @max-3xl/callout:px-(--callout-padding) @3xl/callout:flex-2",
      "@max-3xl/callout:-mt-24 @max-3xl/callout:md:[aside:not(:only-child)_&]:min-h-64",
      "*:[img]:max-h-64 *:[img]:object-contain",
      className
    )}
    {...props}
  />
))
CalloutBanner.displayName = "CalloutBanner"

const CalloutMain = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-label="callout-main"
    className={cn(
      "@container/content flex flex-col p-(--callout-padding)",
      "gap-[calc(var(--spacing-unit)*4)]",
      "flex-1 @3xl/callout:flex-3",
      className
    )}
    {...props}
  />
))
CalloutMain.displayName = "CalloutMain"

const CalloutContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-label="callout-content"
    className={cn("flex flex-col gap-(--spacing-unit)", className)}
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
      "mt-auto flex flex-wrap gap-4 @max-md/content:flex-col",
      "**:w-full **:text-center @md/content:*:w-fit", // Button styling
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

export type CalloutProps = React.HTMLAttributes<HTMLDivElement> & {
  title: string
  description: string
  alt?: string
  image?: ImageProps["src"]
} & VariantProps<typeof variants> &
  AsProp

const Callout = ({
  image,
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
    <CalloutMain>
      <CalloutContent>
        <CalloutTitle as={as}>{title}</CalloutTitle>
        <CalloutDescription>{description}</CalloutDescription>
      </CalloutContent>
      {children && <CalloutButtons>{children}</CalloutButtons>}
    </CalloutMain>
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

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils/cn"

// TODO: Add to design system
const variants = cva("w-full scroll-mt-24", {
  variants: {
    variant: {
      responsiveFlex: "flex flex-col gap-8 md:flex-row lg:gap-16",
    },
  },
})

const Section = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof variants>
>(({ className, variant, ...props }, ref) => (
  <section
    ref={ref}
    className={cn(variants({ variant, className }))}
    {...props}
  />
))
Section.displayName = "Section"

const SectionBanner = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "w-full overflow-hidden rounded-4xl md:max-w-96 lg:max-w-128",
      "bg-gradient-to-b from-accent-a/10 to-accent-a/0 dark:from-accent-a/15 dark:to-accent-a/5",
      "[&_img]:min-h-full [&_img]:object-cover [&_img]:object-center",
      className
    )}
    {...props}
  />
))
SectionBanner.displayName = "SectionBanner"

const SectionHeader = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn(
      "mb-4 mt-2 text-5xl font-black lg:mb-6 lg:text-6xl",
      className
    )}
    {...props}
  />
))
SectionHeader.displayName = "SectionHeader"

const SectionTag = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "w-fit rounded-full bg-primary-low-contrast px-4 py-0.5 text-sm uppercase text-primary",
      className
    )}
    {...props}
  />
))
SectionTag.displayName = "SectionTag"

const SectionContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("w-full space-y-2", className)} {...props} />
))
SectionContent.displayName = "SectionContent"

export { Section, SectionBanner, SectionContent, SectionHeader, SectionTag }

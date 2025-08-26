"use client"

import { type BaseHTMLAttributes, type ElementRef, forwardRef } from "react"
import { Slot } from "@radix-ui/react-slot"

import { cn } from "@/lib/utils/cn"
import { MatomoEventOptions, trackCustomEvent } from "@/lib/utils/matomo"

type LinkBoxElement = ElementRef<"div">

type LinkBoxProps = BaseHTMLAttributes<HTMLDivElement> & { asChild?: boolean }

const LinkBox = forwardRef<LinkBoxElement, LinkBoxProps>(
  ({ asChild, className, ...props }, ref) => {
    const Comp = asChild ? Slot : "div"
    return (
      <Comp ref={ref} className={cn("relative z-10", className)} {...props} />
    )
  }
)

LinkBox.displayName = "LinkBox"

type LinkOverlayElement = ElementRef<"a">

type LinkOverlayProps = BaseHTMLAttributes<HTMLAnchorElement> & {
  asChild?: boolean
  matomoEvent?: MatomoEventOptions
}

const LinkOverlay = forwardRef<LinkOverlayElement, LinkOverlayProps>(
  ({ asChild, className, matomoEvent, ...props }, ref) => {
    const Comp = asChild ? Slot : "a"

    return (
      <Comp
        ref={ref}
        className={cn(
          "before:absolute before:left-0 before:top-0 before:z-0 before:block before:h-full before:w-full before:cursor-pointer before:content-['']",
          className
        )}
        onClick={() => matomoEvent && trackCustomEvent(matomoEvent)}
        {...props}
      />
    )
  }
)

LinkOverlay.displayName = "LinkOverlay"

export { LinkBox, LinkOverlay }

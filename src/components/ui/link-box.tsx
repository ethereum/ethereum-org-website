import {
  type BaseHTMLAttributes,
  type ElementRef,
  type ElementType,
  forwardRef,
} from "react"
import { Slot } from "@radix-ui/react-slot"

import { cn } from "@/lib/utils/cn"

type LinkBoxElement = ElementRef<"div">

type LinkBoxProps = BaseHTMLAttributes<HTMLDivElement> & { as?: ElementType }

const LinkBox = forwardRef<LinkBoxElement, LinkBoxProps>(
  ({ as: Comp = "div", className, ...props }, ref) => {
    return (
      <Comp ref={ref} className={cn("relative z-10", className)} {...props} />
    )
  }
)

LinkBox.displayName = "LinkBox"

type LinkOverlayElement = ElementRef<"a">

type LinkOverlayProps = BaseHTMLAttributes<HTMLAnchorElement> & {
  asChild?: boolean
}

const LinkOverlay = forwardRef<LinkOverlayElement, LinkOverlayProps>(
  ({ asChild, className, ...props }, ref) => {
    const Comp = asChild ? Slot : "a"

    return (
      <Comp
        ref={ref}
        className={cn(
          "before:absolute before:left-0 before:top-0 before:z-0 before:block before:h-full before:w-full before:cursor-pointer before:content-['']",
          className
        )}
        {...props}
      />
    )
  }
)

LinkOverlay.displayName = "LinkOverlay"

export { LinkBox, LinkOverlay }

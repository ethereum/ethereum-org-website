import * as React from "react"
import upperCase from "lodash/upperCase"
import * as AvatarPrimitive from "@radix-ui/react-avatar"

import { cn } from "@/lib/utils/cn"

import { Center } from "./flex"
import { BaseLink, type LinkProps } from "./Link"
import { LinkBox, LinkOverlay } from "./link-box"

type AvatarBaseProps = React.ComponentProps<typeof AvatarPrimitive.Root>

const AvatarBase = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  AvatarBaseProps
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className
    )}
    {...props}
  />
))
AvatarBase.displayName = AvatarPrimitive.Root.displayName

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, alt = "", ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    alt={alt}
    {...props}
  />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "bg-muted flex h-full w-full items-center justify-center rounded-full",
      className
    )}
    {...props}
  />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

export type AvatarProps = AvatarBaseProps &
  Required<Pick<LinkProps, "href">> & {
    label?: string
    /**
     * @default "row"
     */
    direction?: "column" | "row"
    name: string
    src: string
  }

const Avatar = React.forwardRef<
  React.ElementRef<"span"> | React.ElementRef<"div">,
  AvatarProps
>((props, ref) => {
  const { href, src, name, label, direction = "row" } = props

  const commonLinkProps = {
    href,
  }

  const fallbackInitials = upperCase(
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
  )

  if (label) {
    const _direction: "flex-col-reverse" | "flex-row-reverse" =
      direction === "row" ? "flex-row-reverse" : "flex-col-reverse"

    const _ref = ref as React.ForwardedRef<HTMLDivElement>
    return (
      <LinkBox
        // !! Inconsistent strategy, using `as` prop instead of `asChild` bool
        as={Center}
        ref={_ref}
        className={cn(_direction, "gap-x-1 gap-y-0")}
      >
        <LinkOverlay
          asChild
          className="z-overlay inline-flex items-center gap-1 p-1 no-underline"
          data-peer
        >
          <BaseLink {...commonLinkProps}>{label}</BaseLink>
        </LinkOverlay>
        <AvatarBase>
          <AvatarImage src={src} />
          <AvatarFallback>{fallbackInitials}</AvatarFallback>
        </AvatarBase>
      </LinkBox>
    )
  }

  return (
    <AvatarBase ref={ref} asChild>
      <BaseLink {...commonLinkProps}>
        <AvatarImage src={src} />
        <AvatarFallback>{fallbackInitials}</AvatarFallback>
      </BaseLink>
    </AvatarBase>
  )
})
Avatar.displayName = "Avatar"

export { Avatar, AvatarBase, AvatarFallback, AvatarImage }

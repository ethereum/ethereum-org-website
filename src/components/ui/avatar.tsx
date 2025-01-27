import * as React from "react"
import upperCase from "lodash/upperCase"
import { tv, type VariantProps } from "tailwind-variants"
import * as AvatarPrimitive from "@radix-ui/react-avatar"

import { cn } from "@/lib/utils/cn"

import { Center } from "./flex"
import { BaseLink, type LinkProps } from "./Link"
import { LinkBox, LinkOverlay } from "./link-box"

const avatarStyles = tv({
  slots: {
    container:
      "relative shrink-0 flex overflow-hidden rounded-full focus:outline-4 focus:-outline-offset-1 focus:rounded-full active:shadow-none [&_img]:hover:opacity-70 border border-transparent active:border-primary-hover justify-center items-center",
    fallback: "bg-body text-body-inverse",
  },
  variants: {
    size: {
      xs: {
        container:
          "size-6 hover:shadow-[2px_2px_0_var(--avatar-base-shadow-color)] peer-hover:shadow-[2px_2px_0_var(--avatar-base-shadow-color)]",
        fallback: "text-2xs",
      },
      sm: {
        container:
          "size-8 hover:shadow-[2px_2px_0_var(--avatar-base-shadow-color)] peer-hover:shadow-[2px_2px_0_var(--avatar-base-shadow-color)]",
        fallback: "text-sm",
      },
      md: {
        container:
          "size-12 hover:shadow-[4px_4px_0_var(--avatar-base-shadow-color)] peer-hover:shadow-[4px_4px_0_var(--avatar-base-shadow-color)]",
        fallback: "text-lg",
      },
      lg: {
        container:
          "size-16 hover:shadow-[4px_4px_0_var(--avatar-base-shadow-color)] peer-hover:shadow-[4px_4px_0_var(--avatar-base-shadow-color)]",
        fallback: "text-2xl",
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
})

type AvatarVariantProps = VariantProps<typeof avatarStyles>

const AvatarStylesContext =
  React.createContext<ReturnType<typeof avatarStyles>>(avatarStyles())

const useAvatarStyles = () => React.useContext(AvatarStylesContext)

type AvatarBaseProps = React.ComponentProps<typeof AvatarPrimitive.Root> &
  AvatarVariantProps

const AvatarBase = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  AvatarBaseProps
>(({ className, size, ...props }, ref) => (
  <AvatarStylesContext.Provider value={avatarStyles({ size })}>
    <AvatarPrimitive.Root
      ref={ref}
      style={
        {
          "--avatar-base-shadow-color": "hsl(var(--primary-low-contrast))",
        } as React.CSSProperties
      }
      className={avatarStyles({ size }).container({ className })}
      {...props}
    />
  </AvatarStylesContext.Provider>
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
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback> &
    VariantProps<typeof avatarStyles>
>(({ className, ...props }, ref) => {
  const { fallback } = useAvatarStyles()
  return (
    <AvatarPrimitive.Fallback
      ref={ref}
      className={cn(
        "flex h-full w-full items-center justify-center rounded-full",
        fallback(),
        className
      )}
      {...props}
    />
  )
})
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
    dataTest?: string
  }

const Avatar = React.forwardRef<
  React.ElementRef<"span"> | React.ElementRef<"div">,
  AvatarProps
>((props, ref) => {
  const {
    href,
    src,
    name,
    size,
    label,
    className,
    direction = "row",
    dataTest,
  } = props

  const commonLinkProps = {
    href,
    className: "not-[:hover]:no-underline",
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
          className={cn(
            "peer z-overlay inline-flex items-center gap-1 p-1",
            size !== "md" ? "text-xs" : "text-sm"
          )}
        >
          <BaseLink {...commonLinkProps}>{label}</BaseLink>
        </LinkOverlay>
        <AvatarBase size={size}>
          <AvatarImage src={src} />
          <AvatarFallback>{fallbackInitials}</AvatarFallback>
        </AvatarBase>
      </LinkBox>
    )
  }

  return (
    <AvatarBase ref={ref} size={size} className={className} asChild>
      <BaseLink title={dataTest} {...commonLinkProps}>
        <AvatarImage src={src} />
        <AvatarFallback>{fallbackInitials}</AvatarFallback>
      </BaseLink>
    </AvatarBase>
  )
})
Avatar.displayName = "Avatar"

type AvatarGroupProps = AvatarVariantProps &
  React.HTMLAttributes<HTMLDivElement> & {
    children: React.ReactNode
    max?: number
  }
/**
 * Chakra v2 component as reference: https://github.com/chakra-ui/chakra-ui/blob/v2/packages/components/src/avatar/avatar-group.tsx
 */
const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  (props, ref) => {
    const { children, max, size, className, ...rest } = props

    const validChildren = React.Children.toArray(children).filter((child) =>
      React.isValidElement(child)
    ) as React.ReactElement[]

    /**
     * The visible avatars from max
     */
    const childrenWithinMax =
      max != null ? validChildren.slice(0, max) : validChildren
    /**
     * Number of hidden avatars from max
     */
    const hiddenCount = max != null ? validChildren.length - max : 0

    /**
     * Reversed children to handle implied z-index
     */
    const reversedChildren = childrenWithinMax.reverse()

    const clonedChildren = reversedChildren.map((child, idx) => {
      const isFirst = idx === 0
      return React.cloneElement(child, {
        className: cn(isFirst ? "me-0" : "-me-2"),
        size,
      })
    })

    const { container, fallback } = avatarStyles({ size })

    return (
      <div
        ref={ref}
        role="group"
        className={cn("flex flex-row-reverse", className)}
        {...rest}
      >
        {hiddenCount > 0 && (
          <span
            className={cn("-ms-2", container(), fallback())}
          >{`+${hiddenCount}`}</span>
        )}
        {clonedChildren}
      </div>
    )
  }
)

AvatarGroup.displayName = "AvatarGroup"

export { Avatar, AvatarBase, AvatarFallback, AvatarGroup, AvatarImage }

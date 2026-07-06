"use client"

import * as React from "react"
import { type VariantProps } from "class-variance-authority"
import { Slot } from "@radix-ui/react-slot"

import type { MatomoEventOptions } from "@/lib/types"

import { cn } from "@/lib/utils/cn"
import { trackCustomEvent } from "@/lib/utils/matomo"
import { scrollIntoView } from "@/lib/utils/scrollIntoView"

import { BaseLink, type LinkProps } from "../Link"

import { buttonVariants } from "./button-variants"

export const checkIsSecondary = ({
  variant,
  isSecondary,
}: {
  variant: ButtonVariantProps["variant"]
  isSecondary: boolean
}) => {
  // These two variants do not have secondary styling, so prevent overrides
  return {
    "data-secondary":
      !["solid", "link"].includes(variant || "solid") && isSecondary,
  }
}

type ButtonVariantProps = VariantProps<typeof buttonVariants>

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonVariantProps {
  asChild?: boolean
  /**
   * Set string value that matches the `id` attribute value used
   * on another element in a given page. Selecting the button will then
   * trigger a scroll to that element.
   */
  toId?: string
  /**
   * Custom theme prop. If true, `body` color is used instead of
   * `primary` color in the theming.
   *
   * `NOTE`: Does not apply to the `Solid` or `Link` variants
   */
  isSecondary?: boolean
  customEventOptions?: MatomoEventOptions
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      isSecondary = false,
      onClick,
      toId,
      customEventOptions,
      ...props
    },
    ref
  ) => {
    const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      toId && scrollIntoView("#" + toId)
      customEventOptions && trackCustomEvent(customEventOptions)

      onClick?.(e)
    }

    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        onClick={handleOnClick}
        {...checkIsSecondary({
          variant,
          isSecondary,
        })}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export type ButtonLinkProps = Omit<LinkProps, "href"> &
  Pick<ButtonProps, "size" | "variant" | "isSecondary"> & {
    href: string
    buttonProps?: Omit<ButtonProps, "size" | "variant">
    customEventOptions?: MatomoEventOptions
  }

const ButtonLink = React.forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  (
    {
      size,
      variant,
      isSecondary,
      buttonProps,
      onClick,
      customEventOptions,
      children,
      className,
      ...linkProps
    },
    ref
  ) => {
    return (
      <Button
        asChild
        size={size}
        variant={variant}
        isSecondary={isSecondary}
        {...buttonProps}
      >
        <BaseLink
          data-label="button-link"
          ref={ref}
          className={cn(
            "no-underline hover:no-underline [&_[data-label='arrow']]:ms-0",
            className
          )}
          activeClassName=""
          customEventOptions={customEventOptions}
          onClick={onClick}
          {...linkProps}
        >
          {children}
        </BaseLink>
      </Button>
    )
  }
)
ButtonLink.displayName = "ButtonLink"

export { Button, ButtonLink, type ButtonVariantProps, buttonVariants }

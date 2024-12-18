import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "@radix-ui/react-slot"

import { cn } from "@/lib/utils/cn"
import { type MatomoEventOptions, trackCustomEvent } from "@/lib/utils/matomo"
import { scrollIntoView } from "@/lib/utils/scrollIntoView"

import { BaseLink, type LinkProps } from "../Link"

const buttonVariants = cva(
  cn(
    // Sizing and positioning classes:
    "inline-flex gap-2 items-center justify-center rounded border border-solid transition [&>svg]:flex-shrink-0",
    // Base default styling is "outline" pattern, primary color for text, border matches, no bg
    "text-primary border-current",
    // Hover: Default hover adds box-shadow, text (border) to --primary-hover
    "hover:!text-primary-hover hover:shadow-[4px_4px_theme('colors.primary.low-contrast')]",
    // Focus: Add 4px outline to all buttons, --primary-hover
    "focus-visible:outline focus-visible:outline-primary-hover focus-visible:outline-4 focus-visible:-outline-offset-1",
    // Active: text (border) to --primary-hover instead of primary, hide shadow
    "active:text-primary-hover active:shadow-none",
    // Disabled: Pointer events none, text (border) to --disabled
    "disabled:pointer-events-none disabled:text-disabled",
    // isSecondary: Switch text (border) to --body instead of --primary
    "[&[data-secondary='true']]:text-body"
  ),
  {
    variants: {
      variant: {
        solid: cn(
          "text-white bg-primary-action !border-transparent",
          "hover:!text-white hover:bg-primary-action-hover", // Hover
          "active:bg-primary-action-hover", // Active
          "disabled:bg-disabled disabled:text-background" // Disabled
        ),
        outline: "", // Base styling
        ghost: "border-transparent hover:shadow-none",
        link: "border-transparent hover:shadow-none underline py-0 px-1 active:text-primary",
      },
      size: {
        lg: "text-lg py-3 px-8 [&>svg]:text-2xl rounded-lg focus-visible:rounded-lg",
        md: "min-h-10.5 px-4 py-2 [&>svg]:text-2xl",
        sm: "text-xs min-h-[31px] py-1.5 px-2 [&>svg]:text-md",
      },
    },
    defaultVariants: {
      variant: "solid",
      size: "md",
    },
  }
)

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
      toId && scrollIntoView(toId)
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

type ButtonLinkProps = Omit<LinkProps, "href"> &
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
    const handleClick: React.MouseEventHandler<HTMLAnchorElement> = (
      ...args
    ) => {
      customEventOptions && trackCustomEvent(customEventOptions)
      onClick?.(...args)
    }
    return (
      <Button
        asChild
        size={size}
        variant={variant}
        isSecondary={isSecondary}
        {...buttonProps}
      >
        <BaseLink
          ref={ref}
          className={cn("no-underline hover:no-underline", className)}
          activeClassName=""
          {...linkProps}
          onClick={handleClick}
        >
          {children}
        </BaseLink>
      </Button>
    )
  }
)
ButtonLink.displayName = "ButtonLink"

export {
  Button,
  ButtonLink,
  type ButtonLinkProps,
  type ButtonVariantProps,
  buttonVariants,
}

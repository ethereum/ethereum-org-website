import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "@radix-ui/react-slot"

import { cn } from "@/lib/utils/cn"
import { type MatomoEventOptions, trackCustomEvent } from "@/lib/utils/matomo"
import { scrollIntoView } from "@/lib/utils/scrollIntoView"

import { BaseLink, type LinkProps } from "../Link"

const buttonVariants = cva(
  "pointer inline-flex gap-2 items-center justify-center rounded border border-solid border-current text-primary transition focus-visible:outline focus-visible:outline-4 focus-visible:outline-primary-hover focus-visible:-outline-offset-1 disabled:text-disabled disabled:pointer-events-none hover:text-primary-hover [&[data-secondary='true']]:text-body [&>svg]:flex-shrink-0",
  {
    variants: {
      variant: {
        solid:
          "text-background bg-primary border-transparent disabled:bg-disabled disabled:text-background hover:text-background hover:bg-primary-hover hover:shadow-button-hover active:shadow-none",
        outline: "hover:shadow-button-hover active:shadow-none",
        "outline-color":
          "hover:shadow-button-hover active:shadow-none border-primary",
        ghost: "border-transparent",
        link: "border-transparent font-bold underline py-0 px-1 active:text-primary",
      },
      size: {
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

type ButtonLinkProps = Omit<LinkProps, "onClick"> & {
  buttonProps?: ButtonProps
  customEventOptions?: MatomoEventOptions
}

const ButtonLink = React.forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  ({ buttonProps, customEventOptions, children, ...linkProps }, ref) => {
    const handleClick = () => {
      customEventOptions && trackCustomEvent(customEventOptions)
    }
    return (
      <Button asChild {...buttonProps}>
        <BaseLink
          ref={ref}
          className="no-underline hover:no-underline"
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

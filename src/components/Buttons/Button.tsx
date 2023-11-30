import {
  Button as ChakraButton,
  ButtonProps as ChakraButtonProps,
  forwardRef,
} from "@chakra-ui/react"

import { scrollIntoView } from "@/lib/utils/scrollIntoView"

export const checkIsSecondary = ({
  variant,
  isSecondary,
}: {
  variant?: string
  isSecondary?: boolean
}) => {
  // These two variants do not have secondary styling, so prevent overrides
  return {
    "data-secondary":
      !["solid", "link"].includes(variant || "solid") && isSecondary,
  }
}

export type ButtonProps = ChakraButtonProps & {
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
}

const Button = forwardRef<ButtonProps, "button">(
  ({ toId, onClick, isSecondary, ...props }, ref) => {
    const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (toId) {
        scrollIntoView(toId)
      }

      onClick?.(e)
    }

    return (
      <ChakraButton
        ref={ref}
        onClick={handleOnClick}
        {...checkIsSecondary({
          variant: props.variant?.toString(),
          isSecondary,
        })}
        {...props}
      />
    )
  }
)

export default Button

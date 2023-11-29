import React from "react"
import {
  Button as ChakraButton,
  ButtonProps,
  forwardRef,
} from "@chakra-ui/react"

import { scrollIntoView } from "../../utils/scrollIntoView"
import { type MatomoEventOptions, trackCustomEvent } from "../../utils/matomo"

export const checkIsSecondary = (props: {
  variant?: string
  isSecondary?: boolean
}) => {
  const { variant, isSecondary } = props
  // These two variants do not have secondary styling, so prevent overrides
  return {
    "data-secondary":
      !["solid", "link"].includes(variant || "solid") && isSecondary,
  }
}

export interface IProps extends ButtonProps {
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

const Button = forwardRef<IProps, "button">((props, ref) => {
  const { toId, onClick, isSecondary, customEventOptions, ...rest } = props

  const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    toId && scrollIntoView(toId)
    customEventOptions && trackCustomEvent(customEventOptions)

    onClick?.(e)
  }

  return (
    <ChakraButton
      ref={ref}
      onClick={handleOnClick}
      {...checkIsSecondary({ variant: rest.variant?.toString(), isSecondary })}
      {...rest}
    />
  )
})

export default Button

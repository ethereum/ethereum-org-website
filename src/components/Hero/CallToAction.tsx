import * as React from "react"
import Button, { IProps as ButtonProps } from "../Button"
import { MatomoEventOptions, trackCustomEvent } from "../../utils/matomo"

type CallToActionProps = Omit<ButtonProps, "children"> & {
  content: React.ReactNode
  matomo: MatomoEventOptions
  index: React.Key
}

export function CallToAction(props: CallToActionProps) {
  const { content, matomo, index, ...rest } = props

  const handleClick = () => trackCustomEvent(matomo)

  const buttonProps: ButtonProps = {
    variant: index === 0 ? "solid" : "outline",
    isSecondary: index !== 0,
    flex: { base: 1, md: "initial" },
  }

  return (
    <Button onClick={handleClick} {...buttonProps} {...rest}>
      {content}
    </Button>
  )
}

/**
 * Props to be passed to through the hero component. `index` prop not used here.
 */
export type CTAParentProps = Omit<CallToActionProps, "index">

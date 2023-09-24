import * as React from "react"
import Button, { IProps as ButtonProps } from "../Button"
import { MatomoEventOptions, trackCustomEvent } from "../../utils/matomo"

export type CallToActionProps = Omit<ButtonProps, "children" | "content"> & {
  content: React.ReactNode
  matomo: MatomoEventOptions
}

export function CallToAction(props: CallToActionProps & { index: React.Key }) {
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

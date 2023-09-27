import * as React from "react"
import { MatomoEventOptions, trackCustomEvent } from "../../utils/matomo"
import { Button, type IButtonProps } from "../Buttons"

export type CallToActionProps = Omit<IButtonProps, "children" | "content"> & {
  content: React.ReactNode
  matomo: MatomoEventOptions
}

export function CallToAction(props: CallToActionProps & { index: React.Key }) {
  const { content, matomo, index, ...rest } = props

  const handleClick = () => trackCustomEvent(matomo)

  const buttonProps: IButtonProps = {
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

import type { ReactNode } from "react"

import { Button, type ButtonProps } from "@/components/Buttons"

import { type MatomoEventOptions, trackCustomEvent } from "@/lib/utils/matomo"

export type CallToActionProps = Omit<
  ButtonProps,
  "children" | "content" | "variant" | "isSecondary"
> & {
  content: ReactNode
  matomo: MatomoEventOptions
  index: number
}

export const CallToAction = ({
  content,
  matomo,
  index,
  ...props
}: CallToActionProps) => {
  const handleClick = () => trackCustomEvent(matomo)

  const buttonProps: ButtonProps = {
    variant: index === 0 ? "solid" : "outline",
    isSecondary: index !== 0,
    flex: { base: 1, md: "initial" },
  }

  return (
    <Button onClick={handleClick} {...buttonProps} {...props}>
      {content}
    </Button>
  )
}

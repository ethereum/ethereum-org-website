import type { ReactNode } from "react"
import { type MatomoEventOptions, trackCustomEvent } from "@/lib/utils/matomo"
import { Button, type IButtonProps as ButtonProps } from "@/components/Buttons"

export type CallToActionProps = Omit<ButtonProps, "children" | "content"> & {
  content: ReactNode
  matomo: MatomoEventOptions
}

export function CallToAction({
  content,
  matomo,
  key: index,
  ...props
}: CallToActionProps) {
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

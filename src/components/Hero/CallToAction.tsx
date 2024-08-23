import type { ReactNode } from "react"

import { Button, type ButtonProps } from "@/components/ui/buttons/Button"

import { cn } from "@/lib/utils/cn"
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
    className: cn("flex-[1] md:flex-[initial]", props?.className),
  }

  return (
    <Button onClick={handleClick} {...buttonProps} {...props}>
      {content}
    </Button>
  )
}

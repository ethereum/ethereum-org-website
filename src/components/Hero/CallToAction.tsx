import type { ReactNode } from "react"

import {
  Button,
  ButtonLink,
  type ButtonProps,
} from "@/components/ui/buttons/Button"

import { cn } from "@/lib/utils/cn"
import { type MatomoEventOptions, trackCustomEvent } from "@/lib/utils/matomo"

export type CallToActionProps = Omit<
  ButtonProps,
  "children" | "content" | "variant" | "isSecondary"
> & {
  content: ReactNode
  matomo?: MatomoEventOptions
  index: number
  href?: string
}

export const CallToAction = ({
  content,
  matomo,
  index,
  className,
  href,
  ...props
}: CallToActionProps) => {
  const handleClick = () => matomo && trackCustomEvent(matomo)

  const buttonProps: ButtonProps = {
    variant: index === 0 ? "solid" : "outline",
    isSecondary: index !== 0,
    className: cn("flex-[1] md:flex-[initial]", className),
  }

  if (href) {
    return (
      <ButtonLink
        href={href}
        buttonProps={{ onClick: handleClick, ...buttonProps, ...props }}
      >
        {content}
      </ButtonLink>
    )
  }

  return (
    <Button onClick={handleClick} {...buttonProps} {...props}>
      {content}
    </Button>
  )
}

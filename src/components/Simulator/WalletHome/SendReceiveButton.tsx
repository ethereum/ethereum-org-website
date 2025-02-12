import { type ReactNode } from "react"
import type { IconType } from "react-icons/lib"

import { Button } from "@/components/ui/buttons/Button"

import { cn } from "@/lib/utils/cn"

import { ClickAnimation } from "../ClickAnimation"
import { PulseAnimation } from "../PulseAnimation"

type SendReceiveButtonProps = {
  icon: IconType
  isHighlighted: boolean
  isDisabled: boolean
  onClick?: () => void
  isAnimated?: boolean
  children: ReactNode
}

export const SendReceiveButton = ({
  children,
  icon: Icon,
  isHighlighted,
  isDisabled,
  onClick,
  isAnimated,
}: SendReceiveButtonProps) => (
  <Button
    variant="ghost"
    className="group flex-col items-center gap-4"
    data-group
    disabled={isDisabled}
    onClick={onClick}
  >
    <div
      className={cn(
        "relative grid aspect-square w-10 place-items-center rounded-full bg-primary group-hover:bg-primary-hover md:w-16",
        isHighlighted
          ? "group-disabled:bg-primary"
          : "group-disabled:bg-body-light"
      )}
    >
      {!isDisabled && isAnimated && <PulseAnimation type="circle" />}
      <Icon className="size-4 text-background md:size-6" />
    </div>
    <div className="relative">
      <p
        className={cn(
          "relative text-center font-bold text-primary group-hover:text-primary-hover",
          isHighlighted
            ? "group-disabled:text-primary"
            : "group-disabled:text-body-medium"
        )}
      >
        {children}
      </p>
      {!isDisabled && isAnimated && (
        <ClickAnimation below>click!</ClickAnimation>
      )}
    </div>
  </Button>
)

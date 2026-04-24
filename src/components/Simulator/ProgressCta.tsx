import React, { type ComponentPropsWithoutRef } from "react"
import { motion } from "motion/react"
import { useTranslations } from "next-intl"

import { cn } from "@/lib/utils/cn"

import { Button, type ButtonProps } from "../ui/buttons/Button"
import { Flex } from "../ui/flex"

import { ClickAnimation } from "./ClickAnimation"
import { PulseAnimation } from "./PulseAnimation"

const MotionFlex = motion.create(Flex)

type ProgressCtaProps = ComponentPropsWithoutRef<typeof MotionFlex> &
  Pick<ButtonProps, "disabled"> & {
    isAnimated?: boolean
    progressStepper: () => void
  }
export const ProgressCta = ({
  isAnimated = false,
  progressStepper,
  disabled,
  children,
  className,
  ...flexProps
}: ProgressCtaProps) => {
  const t = useTranslations("component-wallet-simulator")
  return (
    <MotionFlex
      className={cn("absolute bottom-0 w-full px-6 py-10", className)}
      initial={{ opacity: 1 }}
      {...flexProps}
    >
      <Button
        className="relative w-full"
        onClick={progressStepper}
        disabled={disabled}
      >
        <>
          {children}
          {isAnimated && <PulseAnimation type="full-button" />}
          {isAnimated && <ClickAnimation>{t("sim-click")}</ClickAnimation>}
        </>
      </Button>
    </MotionFlex>
  )
}

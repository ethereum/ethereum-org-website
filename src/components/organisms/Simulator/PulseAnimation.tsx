import React from "react"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils/cn"

import {
  BASE_ANIMATION_DELAY_SEC,
  CIRCLE,
  FULL_BUTTON,
  NARROW_BUTTON,
} from "./constants"
import type { PulseOption } from "./types"

type PulseAnimationProps = {
  type: PulseOption
}
export const PulseAnimation = ({ type = CIRCLE }: PulseAnimationProps) => {
  const scaleX = type === FULL_BUTTON ? 1.1 : type === NARROW_BUTTON ? 1.2 : 1.5
  const scaleY = type === FULL_BUTTON ? 1.7 : type === NARROW_BUTTON ? 1.5 : 1.5
  const insetClass = type === NARROW_BUTTON ? "-inset-1" : "inset-0"
  const borderRadiusClass = type === FULL_BUTTON ? "rounded" : "rounded-full"
  const delay = type === NARROW_BUTTON ? 0 : BASE_ANIMATION_DELAY_SEC
  return (
    <motion.div
      className={cn(
        "absolute border-2 border-primary",
        insetClass,
        borderRadiusClass
      )}
      initial={{ scale: 1 }}
      animate={{ scaleX, scaleY, opacity: [0, 1, 0] }}
      transition={{
        duration: BASE_ANIMATION_DELAY_SEC,
        repeat: Infinity,
        ease: "easeOut",
        delay,
      }}
    />
  )
}

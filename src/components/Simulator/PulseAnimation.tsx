import React from "react"
import { motion } from "framer-motion"
import { Box } from "@chakra-ui/react"

import {
  BASE_ANIMATION_DELAY_SEC,
  CIRCLE,
  FULL_BUTTON,
  NARROW_BUTTON,
} from "./constants"
import type { PulseOption } from "./types"

const MotionBox = motion(Box)

type PulseAnimationProps = {
  type: PulseOption
}
export const PulseAnimation = ({ type = CIRCLE }: PulseAnimationProps) => {
  const scaleX = type === FULL_BUTTON ? 1.1 : type === NARROW_BUTTON ? 1.2 : 1.5
  const scaleY = type === FULL_BUTTON ? 1.7 : type === NARROW_BUTTON ? 1.5 : 1.5
  const inset = type === NARROW_BUTTON ? -1 : 0
  const borderRadius = type === FULL_BUTTON ? "base" : "full"
  const delay = type === NARROW_BUTTON ? 0 : BASE_ANIMATION_DELAY_SEC
  return (
    <MotionBox
      position="absolute"
      inset={inset}
      borderRadius={borderRadius}
      border="2px"
      borderColor="primary.base"
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

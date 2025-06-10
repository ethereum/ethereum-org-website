import { type ReactNode, useEffect, useState } from "react"
import { motion, type Transition } from "framer-motion"

import { cn } from "@/lib/utils/cn"

import { createIconBase } from "../icons/icon-base"
import { Flex } from "../ui/flex"

const MotionFlex = motion(Flex)

const DownArrowLong = motion(
  createIconBase({
    displayName: "DownArrowLong",
    viewBox: "0 0 8 24",
    className: "fill-current",
    children: (
      <path d="M3.64645 23.3536C3.84171 23.5488 4.15829 23.5488 4.35355 23.3536L7.53553 20.1716C7.7308 19.9763 7.7308 19.6597 7.53553 19.4645C7.34027 19.2692 7.02369 19.2692 6.82843 19.4645L4 22.2929L1.17157 19.4645C0.976312 19.2692 0.659729 19.2692 0.464467 19.4645C0.269205 19.6597 0.269205 19.9763 0.464467 20.1716L3.64645 23.3536ZM3.5 2.18557e-08L3.5 23L4.5 23L4.5 -2.18557e-08L3.5 2.18557e-08Z" />
    ),
  })
)

type ClickAnimationProps = {
  children: ReactNode
  below?: boolean
  delay?: number
}
export const ClickAnimation = ({
  below,
  delay = 5000,
  children,
}: ClickAnimationProps) => {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const timeout = setTimeout(() => setVisible(true), delay)
    return () => clearTimeout(timeout)
  }, [delay])
  const transition: Transition = {
    duration: 2.5,
    times: [0, 0.25, 0.5],
    repeat: Infinity,
  }
  const topClass = below ? "top-[calc(100%_+_0.5rem)]" : "top-auto"
  const bottomClass = below ? "bottom-auto" : "bottom-[calc(100%_+_1rem)]"
  const y = below ? [0, 20, 0] : [0, -20, 0]
  const directionClass = below ? "flex-col-reverse" : "flex-col"
  const rotate = below ? 180 : 0
  return visible ? (
    <MotionFlex
      className={cn(
        "absolute inset-x-0 justify-center text-primary",
        topClass,
        bottomClass
      )}
      animate={{ opacity: [0, 1] }} // Fade in once
      data-testid="click-animation-el"
    >
      <MotionFlex
        className={cn("items-center", directionClass)}
        animate={{ y }} // Slide up and down
        transition={transition}
      >
        <p className="m-0 text-xs lowercase italic">{children}</p>
        <DownArrowLong
          initial={{ scaleY: 1, rotate }}
          animate={{ scaleY: [1, 1.25, 1] }} // Arrow scales up and down
          transition={transition}
        />
      </MotionFlex>
    </MotionFlex>
  ) : null
}

import React, { useEffect, useState } from "react"
import { motion, type Transition } from "framer-motion"
import { createIcon, Flex, Text, TextProps } from "@chakra-ui/react"

const MotionFlex = motion(Flex)

const DownArrowLong = motion(
  createIcon({
    displayName: "DownArrowLong",
    viewBox: "0 0 8 24",
    defaultProps: { fill: "currentColor" },
    path: (
      <path d="M3.64645 23.3536C3.84171 23.5488 4.15829 23.5488 4.35355 23.3536L7.53553 20.1716C7.7308 19.9763 7.7308 19.6597 7.53553 19.4645C7.34027 19.2692 7.02369 19.2692 6.82843 19.4645L4 22.2929L1.17157 19.4645C0.976312 19.2692 0.659729 19.2692 0.464467 19.4645C0.269205 19.6597 0.269205 19.9763 0.464467 20.1716L3.64645 23.3536ZM3.5 2.18557e-08L3.5 23L4.5 23L4.5 -2.18557e-08L3.5 2.18557e-08Z" />
    ),
  })
)

type ClickAnimationProps = Pick<TextProps, "children"> & {
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
  const top = below ? "calc(100% + 0.5rem)" : "auto"
  const bottom = below ? "auto" : "calc(100% + 1rem)"
  const y = below ? [0, 20, 0] : [0, -20, 0]
  const direction = below ? "column-reverse" : "column"
  const transformOrigin = below ? { bottom: 0 } : { top: 0 }
  const rotate = below ? 180 : 0
  return visible ? (
    <MotionFlex
      animate={{ opacity: [0, 1] }} // Fade in once
      position="absolute"
      top={top}
      justify="center"
      bottom={bottom}
      insetInline={0}
      color="primary.base"
    >
      <MotionFlex
        direction={direction}
        alignItems="center"
        animate={{ y }} // Slide up and down
        transition={transition}
      >
        <Text fontSize="xs" fontStyle="italic" textTransform="lowercase" m={0}>
          {children}
        </Text>
        <DownArrowLong
          transformOrigin={transformOrigin}
          initial={{ scaleY: 1, rotate }}
          animate={{ scaleY: [1, 1.25, 1] }} // Arrow scales up and down
          transition={transition}
        />
      </MotionFlex>
    </MotionFlex>
  ) : null
}

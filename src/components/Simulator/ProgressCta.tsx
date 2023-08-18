import React from "react"
import { Flex, createIcon, Button, Text } from "@chakra-ui/react"
import { motion } from "framer-motion"
import type { SimulatorStateProps } from "../../interfaces"

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

const ctaLabelsByStep = [
  "Install a wallet",
  "Open wallet",
  "Create account",
  "I understand",
  "Next",
]

export const ProgressCta: React.FC<SimulatorStateProps> = ({ state }) => {
  const { progressStepper, step } = state
  const ctaLabel = ctaLabelsByStep[step]
  const transition = {
    duration: 2,
    times: [0, 0.25, 0.5],
    repeat: Infinity,
    repeatDelay: 0.5,
  } as const
  return (
    <MotionFlex
      bg="background.highlight"
      py={10}
      px={6}
      position="absolute"
      w="full"
      bottom="0"
      initial={{ opacity: 1 }}
    >
      <MotionFlex
        position="absolute"
        direction="column"
        alignItems="center"
        top={-4}
        insetInline={0}
        color="primary.base"
        initial={{ y: -4 }}
        animate={{ y: [-4, -24, -4] }}
        transition={transition}
      >
        <Text fontSize="xs" fontStyle="italic" textTransform="lowercase" m={0}>
          click!
        </Text>
        <DownArrowLong
          transformOrigin={{ top: 0 }}
          initial={{ scaleY: 1 }}
          animate={{ scaleY: [1, 1.5, 1] }}
          transition={transition}
        />
      </MotionFlex>
      <Button w="full" onClick={progressStepper}>
        {ctaLabel}
      </Button>
    </MotionFlex>
  )
}

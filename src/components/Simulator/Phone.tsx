import React from "react"
import {
  Box,
  type BoxProps,
  createIcon,
  Flex,
  type FlexProps,
  Grid,
  Icon,
  Text,
} from "@chakra-ui/react"
import { MdArrowDownward } from "react-icons/md"
import Button from "../Button"
import { motion } from "framer-motion"
import type { ControllerProps } from "../../interfaces"

const MotionFlex = motion(Flex)
const DownArrowLong = createIcon({
  displayName: "DownArrowLong",
  viewBox: "0 0 8 24",
  defaultProps: { fill: "currentColor" },
  path: (
    <path d="M3.64645 23.3536C3.84171 23.5488 4.15829 23.5488 4.35355 23.3536L7.53553 20.1716C7.7308 19.9763 7.7308 19.6597 7.53553 19.4645C7.34027 19.2692 7.02369 19.2692 6.82843 19.4645L4 22.2929L1.17157 19.4645C0.976312 19.2692 0.659729 19.2692 0.464467 19.4645C0.269205 19.6597 0.269205 19.9763 0.464467 20.1716L3.64645 23.3536ZM3.5 2.18557e-08L3.5 23L4.5 23L4.5 -2.18557e-08L3.5 2.18557e-08Z" />
  ),
})

export const HomeScreen: React.FC<FlexProps> = (props) => {
  const ICON_COUNT = 9 as const
  return (
    <Flex
      px={4}
      py={8}
      maxW="full"
      gap={5}
      justify="space-between"
      flexWrap="wrap"
      {...props}
    >
      {Array(ICON_COUNT)
        .fill(0)
        .map((_, i) => (
          <Grid
            key={i}
            minW="44px"
            aspectRatio={1}
            borderRadius="xl"
            placeItems="center"
            bg="body.light"
            _last={{
              border: "2px dashed",
              borderColor: "primary.hover",
              bg: "none",
              strokeDasharray: "5, 5",
            }}
          >
            {/* Insert down-arrow icon */}
            {i === ICON_COUNT - 1 && (
              <Icon as={MdArrowDownward} color="primary.hover" />
            )}
          </Grid>
        ))}
    </Flex>
  )
}

export const ProgressCta: React.FC = () => {
  return (
    <Flex
      bg="background.highlight"
      py={10}
      px={6}
      position="absolute"
      w="full"
      bottom="0"
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
        transition={{
          duration: 2,
          times: [0, 0.25, 0.5],
          repeat: Infinity,
          repeatDelay: 0.5,
        }}
      >
        <Text fontSize="xs" fontStyle="italic" textTransform="lowercase" m={0}>
          click!
        </Text>
        <DownArrowLong />
      </MotionFlex>
      <Button w="full">Create a wallet!</Button>
    </Flex>
  )
}

interface PhoneProps extends Pick<BoxProps, "children">, ControllerProps {}
export const Phone: React.FC<PhoneProps> = ({ children, controller }) => (
  <Box w={{ base: "min(100%, 300px)", md: 286 }} mx="auto">
    <Box
      h={{ base: 420, md: 600 }}
      w="full"
      border="8px"
      borderColor="body.medium"
      borderRadius="3xl"
      bg="background.base"
      position="relative"
      zIndex={1}
      overflow="hidden"
    >
      {/* {children} */}
      <HomeScreen />
      <ProgressCta />
    </Box>
    <Box
      h={6}
      w="full"
      borderRadius="100%"
      position="relative"
      filter="blur(14px)"
      bg="body.base"
      opacity={0.5}
      zIndex={-1}
    />
  </Box>
)

import { Grid, Flex, Spinner, Icon, Text, Box } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import { PiCheckThin } from "react-icons/pi"
import { SimulatorStateProps } from "../../interfaces"
import { motion } from "framer-motion"

const MotionBox = motion(Box)

interface IProps extends SimulatorStateProps {
  generateNewWords: () => void
}
export const GeneratingKeys: React.FC<IProps> = ({
  state,
  generateNewWords,
}) => {
  const [loading, setLoading] = useState<boolean>(true)
  const { progressStepper } = state
  useEffect(generateNewWords, [])

  // Show spinner for defined number of milliseconds, switching "loading" state to false when complete
  const SPINNER_DURATION = 2100 as const
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false)
    }, SPINNER_DURATION)
    return () => {
      clearTimeout(timeout)
    }
  }, [])

  // After loading is complete, delay before calling progressStepper
  const DELAY_DURATION = 1600 as const
  useEffect(() => {
    if (loading) return
    const timeout = setTimeout(progressStepper, DELAY_DURATION)
    return () => {
      clearTimeout(timeout)
    }
  }, [loading])

  const ICON_SIZE = "4.5rem" as const
  return (
    <Grid placeItems="center" h="full" bg="background.highlight">
      <Flex direction="column" alignItems="center" pt={8} gap={4}>
        {loading ? (
          <Spinner w={ICON_SIZE} h={ICON_SIZE} />
        ) : (
          <MotionBox
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring" }}
          >
            <Icon
              as={PiCheckThin}
              w={ICON_SIZE}
              h={ICON_SIZE}
              transform="rotate(-10deg)"
            />
          </MotionBox>
        )}
        <Text textAlign="center" px={{ base: 4, md: 8 }}>
          {loading ? "Generating your recovery phrase" : "Account created"}
        </Text>
      </Flex>
    </Grid>
  )
}

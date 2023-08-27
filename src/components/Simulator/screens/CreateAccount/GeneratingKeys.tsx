import { Grid, Flex, Spinner, Icon, Text } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import { PiCheckThin } from "react-icons/pi"
import { SimulatorStateProps } from "../../interfaces"
import { motion } from "framer-motion"
import { ProgressCta } from "../.."

interface IProps extends SimulatorStateProps {
  generateNewWords: () => void
}
export const GeneratingKeys: React.FC<IProps> = ({
  state,
  generateNewWords,
}) => {
  const [loading, setLoading] = useState<boolean>(true)
  const [complete, setComplete] = useState<boolean>(false)

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
  const DELAY_DURATION = 1350 as const
  const BUTTON_FADE_DURATION = 250 as const
  useEffect(() => {
    if (loading) return
    const timeout = setTimeout(() => setComplete(true), DELAY_DURATION)
    return () => {
      clearTimeout(timeout)
    }
  }, [loading])

  const ICON_SIZE = "4.5rem" as const
  return (
    <Grid placeItems="center" h="full" bg="background.highlight">
      <Flex direction="column" alignItems="center" pt={8} gap={4}>
        {loading ? (
          <motion.div
            key="spinner"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Spinner w={ICON_SIZE} h={ICON_SIZE} />
          </motion.div>
        ) : (
          <motion.div
            key="checkmark"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.25 }}
          >
            <Icon
              as={PiCheckThin}
              w={ICON_SIZE}
              h={ICON_SIZE}
              transform="rotate(-10deg)"
            />
          </motion.div>
        )}

        <Text textAlign="center" px={{ base: 4, md: 8 }}>
          {loading ? "Generating your recovery phrase" : "Account created"}
          {complete && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: BUTTON_FADE_DURATION * 1e-3 }}
            >
              <ProgressCta state={state} insetInline={0} />
            </motion.div>
          )}
        </Text>
      </Flex>
    </Grid>
  )
}

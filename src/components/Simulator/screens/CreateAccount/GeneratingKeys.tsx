import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { PiCheckThin } from "react-icons/pi"
import { Flex, Grid, Icon, Spinner, Text } from "@chakra-ui/react"

import type { PhoneScreenProps } from "@/lib/types"

import { ProgressCta } from "../../ProgressCta"

import {
  BUTTON_DELAY_DURATION,
  BUTTON_FADE_DURATION,
  SPINNER_SIZE,
  WORD_GENERATION_SPINNER_DURATION,
} from "./constants"

type GeneratingKeysProps = PhoneScreenProps & {
  generateNewWords: () => void
}
export const GeneratingKeys = ({
  nav,
  ctaLabel,
  generateNewWords,
}: GeneratingKeysProps) => {
  const { progressStepper } = nav
  const [loading, setLoading] = useState(true)
  const [complete, setComplete] = useState(false)

  useEffect(() => generateNewWords(), [generateNewWords])

  // Show spinner for defined number of milliseconds, switching "loading" state to false when complete
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false)
    }, WORD_GENERATION_SPINNER_DURATION)
    return () => {
      clearTimeout(timeout)
    }
  }, [])

  // After loading is complete, delay before calling progressStepper
  useEffect(() => {
    if (loading) return
    const timeout = setTimeout(() => setComplete(true), BUTTON_DELAY_DURATION)
    return () => {
      clearTimeout(timeout)
    }
  }, [loading])

  return (
    <Grid placeItems="center" h="full" bg="background.highlight">
      <Flex direction="column" alignItems="center" gap={4}>
        {loading ? (
          <motion.div
            key="spinner"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Spinner w={SPINNER_SIZE} h={SPINNER_SIZE} />
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
              w={SPINNER_SIZE}
              h={SPINNER_SIZE}
              transform="rotate(-10deg)"
            />
          </motion.div>
        )}

        <Text textAlign="center" px={{ base: 4, md: 8 }}>
          {loading
            ? "Generating example recovery phrase"
            : "Example account created"}
        </Text>
        {complete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: BUTTON_FADE_DURATION * 1e-3 }}
            style={{ position: "absolute", bottom: 0, width: "100%" }}
          >
            <ProgressCta
              className="inset-x-0"
              progressStepper={progressStepper}
            >
              {ctaLabel}
            </ProgressCta>
          </motion.div>
        )}
      </Flex>
    </Grid>
  )
}

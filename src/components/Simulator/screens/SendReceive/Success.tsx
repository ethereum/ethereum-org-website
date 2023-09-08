import { Grid, Flex, Icon, Text, Spinner } from "@chakra-ui/react"
import { motion } from "framer-motion"
import React, { useEffect, useState } from "react"
import { PiCheckThin } from "react-icons/pi"

const ICON_SIZE = "4.5rem" as const

export const Success = () => {
  const [loading, setLoading] = useState(true)

  // Show spinner for defined number of milliseconds, switching "loading" state to false when complete
  const SPINNER_DURATION = 1000 as const
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false)
    }, SPINNER_DURATION)
    return () => {
      clearTimeout(timeout)
    }
  }, [])

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
          {loading ? "Sending transaction" : "Transaction successfully sent"}
        </Text>
      </Flex>
    </Grid>
  )
}

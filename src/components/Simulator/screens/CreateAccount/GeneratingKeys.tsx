import { Grid, Flex, Spinner, Icon, Text } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import { PiCheckThin } from "react-icons/pi"
import { SimulatorStateProps } from "../../../../interfaces"

export const GeneratingKeys: React.FC<SimulatorStateProps> = ({ state }) => {
  const [loading, setLoading] = useState<boolean>(true)
  const { progressStepper } = state

  // Show spinner for 2100ms, switching "loading" state to false when complete
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false)
    }, 2100)
    return () => {
      clearTimeout(timeout)
    }
  }, [])

  // After loading is complete, wait another 1600ms before calling progressStepper
  useEffect(() => {
    if (loading) return
    const timeout = setTimeout(progressStepper, 1600)
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
          <Icon
            as={PiCheckThin}
            w={ICON_SIZE}
            h={ICON_SIZE}
            transform="rotate(-10deg)"
          />
        )}
        <Text textAlign="center" px={{ base: 4, md: 8 }}>
          {loading ? "Generating your recovery phrase" : "Account created"}
        </Text>
      </Flex>
    </Grid>
  )
}

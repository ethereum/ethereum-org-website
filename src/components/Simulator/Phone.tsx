import React, { useEffect } from "react"
import { Box, Flex, Grid, Icon, Spinner, Text } from "@chakra-ui/react"
import type { SimulatorStateProps } from "../../interfaces"
import { EthGlyphIcon, HomeScreen, ProgressCta } from "./"

const GeneratingKeysComponent: React.FC<SimulatorStateProps> = ({ state }) => {
  const { progressStepper } = state
  useEffect(() => {
    const timeout = setTimeout(progressStepper, 2100)
    return () => {
      clearTimeout(timeout)
    }
  }, [])
  return (
    <Grid placeItems="center" h="full">
      <Flex direction="column" alignItems="center" pt={8} gap={4}>
        <Spinner w="4.5rem" h="4.5rem" />
        <Text textAlign="center" px={{ base: 4, md: 8 }}>
          Generating your recovery phrase
        </Text>
      </Flex>
    </Grid>
  )
}
export const Phone: React.FC<SimulatorStateProps> = ({ state }) => {
  const { pathId, step } = state

  const screenData = {
    "create-account": [
      <>
        <HomeScreen state={state} />
        <ProgressCta state={state} />
      </>,
      <>
        <HomeScreen state={state} />
        <ProgressCta state={state} />
      </>,
      <>
        <Flex direction="column" alignItems="center" pt={8}>
          <Icon
            as={EthGlyphIcon}
            color="body.base"
            height="190px"
            w="auto"
            my={4}
          />
          <Text
            fontSize="2xl"
            textAlign="center"
            px={{ base: 4, md: 8 }}
            lineHeight={8}
          >
            Welcome to{" "}
            <Text as="span" fontWeight="bold">
              wallet simulator
            </Text>
          </Text>
        </Flex>
        <ProgressCta state={state} />
      </>,
      <GeneratingKeysComponent state={state} />,
      <>
        <Box py={8} px={{ base: 4, md: 8 }}>
          <Text fontSize="2xl" lineHeight={8} fontWeight="bold">
            Recovery phrase
          </Text>
          <Text>Ethereum accounts are controlled by recovery phrase.</Text>
          <Text>
            Any person knowing this secret recovery phrase can make transactions
            on behalf of your account.
          </Text>
          <Text>
            Wallet app providers do not have access to your account. Only you
            have.
          </Text>
        </Box>
        <ProgressCta state={state} />
      </>,
    ],
  }

  const screen = screenData[pathId][step]
  return (
    <Box as="figure" w={{ base: "min(100%, 300px)", md: 286 }} mx="auto">
      {/* Phone frame */}
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
        {screen}
      </Box>
      {/* Phone drop shadow */}
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
}

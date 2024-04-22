import React from "react"
import { motion } from "framer-motion"
import { PiCheckThin } from "react-icons/pi"
import { Box, Flex, Grid, Icon, Text, TextProps } from "@chakra-ui/react"

import { EthGlyphIcon } from "../../icons"

type SliderProps = Pick<TextProps, "children"> & {
  isConnected: boolean
  displayUrl: string
}
export const Slider = ({ isConnected, displayUrl, children }: SliderProps) => {
  const ICON_SIZE = "4.5rem" as const
  return (
    <>
      <Box
        key="backdrop"
        as={motion.div}
        position="absolute"
        inset={0}
        bg="blackAlpha.300"
        backdropFilter="blur(2px)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      <motion.div
        key="slider"
        style={{ position: "absolute", height: "360px", width: "100%" }}
        initial={{ bottom: "-100%" }}
        animate={{ bottom: 0 }}
        exit={{ bottom: "-100%" }}
        transition={{ duration: 0.75, ease: "easeOut" }}
      >
        <Flex
          direction="column"
          alignItems="center"
          px={6}
          py={8}
          h="full"
          w="full"
          bg="background.base"
          borderTopRadius="2xl"
        >
          {isConnected ? (
            <Flex direction="column" alignItems="center" pt={8} gap={4}>
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
              <motion.div
                key="text"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15 }}
              >
                <Text textAlign="center" px={{ base: 4, md: 8 }}>
                  You&apos;re logged in!
                </Text>
              </motion.div>
            </Flex>
          ) : (
            <>
              <Text textAlign="center" fontWeight="bold" fontSize="lg" mb={4}>
                Connect account?
              </Text>
              {/* URL Pill */}
              <Flex
                bg="blackAlpha.200"
                px={2}
                py={1}
                borderRadius="full"
                fontSize="xs"
                alignItems="center"
                gap={2}
                mb={6}
              >
                <Grid
                  borderRadius="full"
                  bg="body.base"
                  w={5}
                  h={5}
                  placeItems="center"
                >
                  <Icon
                    as={EthGlyphIcon}
                    color="background.base"
                    fontSize="sm"
                  />
                </Grid>
                <Text mb={0} me={0.5}>
                  {displayUrl}
                </Text>
              </Flex>
              {/* Information */}
              <Text>{children}</Text>
            </>
          )}
        </Flex>
      </motion.div>
    </>
  )
}

import React from "react"
import { motion } from "framer-motion"
import { Flex, Icon, Text } from "@chakra-ui/react"

import { EthGlyphIcon } from "../../icons"

const MotionFlex = motion(Flex)

export const WelcomeScreen = () => (
  <MotionFlex
    direction="column"
    alignItems="center"
    pt={16}
    h="full"
    bg="background.highlight"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.8 }}
  >
    <Icon
      as={EthGlyphIcon}
      color="body.base"
      height={{ base: "110px", md: "190px" }}
      w="auto"
      my={4}
    />
    <Text
      fontSize="2xl"
      textAlign="center"
      px={{ base: 4, md: 8 }}
      lineHeight={8}
    >
      Welcome to
      <Text as="span" display="block" fontWeight="bold">
        wallet simulator
      </Text>
    </Text>
  </MotionFlex>
)

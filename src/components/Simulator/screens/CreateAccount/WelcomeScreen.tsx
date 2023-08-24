import { Flex, Icon, Text } from "@chakra-ui/react"
import { motion } from "framer-motion"
import React from "react"
import { EthGlyphIcon } from "../../icons"

const MotionFlex = motion(Flex)

export const WelcomeScreen: React.FC = () => (
  <MotionFlex
    direction="column"
    alignItems="center"
    pt={8}
    h="full"
    bg="background.highlight"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
  >
    <Icon as={EthGlyphIcon} color="body.base" height="190px" w="auto" my={4} />
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
  </MotionFlex>
)

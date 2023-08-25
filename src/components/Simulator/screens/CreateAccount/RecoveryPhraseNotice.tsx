import { Box, Text } from "@chakra-ui/react"
import React from "react"
import { motion } from "framer-motion"

const MotionBox = motion(Box)
export const RecoveryPhraseNotice: React.FC = () => (
  <MotionBox
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.25 }}
    py={8}
    px={{ base: 4, md: 8 }}
    h="full"
    bg="background.highlight"
    fontSize={{ base: "sm", md: "md" }}
  >
    <Text fontSize={{ base: "xl", md: "2xl" }} lineHeight={8} fontWeight="bold">
      Recovery phrase
    </Text>
    <Text>Ethereum accounts are controlled by recovery phrase.</Text>
    <Text>
      Any person knowing this secret recovery phrase can make transactions on
      behalf of your account.
    </Text>
    <Text>
      Wallet app providers do not have access to your account—only you do.
    </Text>
  </MotionBox>
)

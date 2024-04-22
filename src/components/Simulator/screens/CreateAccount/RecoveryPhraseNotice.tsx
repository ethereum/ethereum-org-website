import React from "react"
import { motion } from "framer-motion"
import { Box, Text } from "@chakra-ui/react"

const MotionBox = motion(Box)

export const RecoveryPhraseNotice = () => (
  <MotionBox
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.25 }}
    py={8}
    px={{ base: 4, md: 8 }}
    h="full"
    bg="background.highlight"
    fontSize={{ base: "sm", md: "md" }}
    sx={{ p: { mb: { base: 4, md: 6 } } }}
  >
    <Text fontSize={{ base: "xl", md: "2xl" }} lineHeight={8} fontWeight="bold">
      Recovery phrase
    </Text>
    <Text>
      Any person knowing this <strong>secret</strong> recovery phrase can make
      transactions on behalf of your account.
    </Text>
    <Text>
      Wallet app providers do not have access to your account—only you do.
    </Text>
    <Text fontWeight="bold">You must back it up safely.</Text>
  </MotionBox>
)

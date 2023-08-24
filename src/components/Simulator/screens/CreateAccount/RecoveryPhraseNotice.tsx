import { Box, Text } from "@chakra-ui/react"
import React from "react"

export const RecoveryPhraseNotice: React.FC = () => (
  <Box py={8} px={{ base: 4, md: 8 }} h="full" bg="background.highlight">
    <Text fontSize="2xl" lineHeight={8} fontWeight="bold">
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
  </Box>
)

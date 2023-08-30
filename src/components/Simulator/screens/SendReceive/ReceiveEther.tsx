import {
  Popover,
  PopoverTrigger,
  Button,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  useBreakpointValue,
} from "@chakra-ui/react"

import React from "react"
import { Box, Flex, Icon, Text } from "@chakra-ui/react"
import { motion } from "framer-motion"
import { QrCodeEthereumOrg } from "../../icons"

const MotionBox = motion(Box)

export const ReceiveEther = () => {
  const SPACING = useBreakpointValue({ base: 3, md: 5 })
  const QR_SIZE = useBreakpointValue({ base: 100, md: 150 })
  return (
    <MotionBox
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
      py={{ base: 6, md: 8 }}
      px={{ base: 4, md: 6 }}
      h="full"
      bg="background.highlight"
      fontSize={{ base: "sm", md: "md" }}
    >
      <Text
        fontSize={{ base: "xl", md: "2xl" }}
        fontWeight="bold"
        mb={{ base: 3, md: 6 }}
      >
        Receive assets
      </Text>
      <Text mb={SPACING}>
        Share this QR code containing your address with others
      </Text>
      {/* QR Code */}
      <Flex justify="center" mb={SPACING}>
        <Icon
          as={QrCodeEthereumOrg}
          w={QR_SIZE}
          h={QR_SIZE}
          color="body.base"
          p={3}
          bg="background.base"
          borderRadius="base"
        />
      </Flex>
      <Flex
        borderRadius="base"
        border="1px"
        borderColor="body.light"
        px={3}
        py={2}
        gap={2}
        position="relative"
        w="100%"
        justify="space-between"
        alignItems="center"
        mb={SPACING}
      >
        <Box>
          <Text color="body.medium" m={0} fontSize="xs">
            Your Ethereum address
          </Text>
          <Text m={0} fontSize="sm">
            0x8235...755e
          </Text>
        </Box>
        <Popover placement="top-start">
          <PopoverTrigger>
            <Button
              fontSize="xs"
              fontWeight="bold"
              color="body.base"
              bg="body.light"
              borderRadius="10px"
              h="fit-content"
              py={1.5}
              px={2}
            >
              Copy
            </Button>
          </PopoverTrigger>
          <PopoverContent
            bg="background.highlight"
            p={4}
            w="20ch"
            borderRadius="base"
            boxShadow="tooltip"
          >
            <PopoverArrow bg="background.highlight" />
            <PopoverBody>
              <Text m={0}>
                This is just a demo account! Try this with your own wallet when
                your finished here.
              </Text>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Flex>
      <Text m={0} fontSize="xs" lineHeight={1.7}>
        Use this address for receiving tokens and NFTs on Ethereum network.
      </Text>
    </MotionBox>
  )
}

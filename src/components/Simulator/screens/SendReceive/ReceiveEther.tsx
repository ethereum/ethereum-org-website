import {
  Popover,
  PopoverTrigger,
  Button,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  useBreakpointValue,
  Image,
  useColorModeValue,
} from "@chakra-ui/react"
import React from "react"
import { Box, Flex, Text } from "@chakra-ui/react"
import { motion } from "framer-motion"
import { graphql, useStaticQuery } from "gatsby"
import { getImage } from "gatsby-plugin-image"
import { FAKE_DEMO_ADDRESS } from "../../constants"
import { NotificationPopover } from "../../NotificationPopover"
import GatsbyImage from "../../../GatsbyImage"

const MotionBox = motion(Box)

export const ReceiveEther = () => {
  const images = useStaticQuery(graphql`
    {
      qrLight: file(relativePath: { eq: "qr-code-ethereum-org-light.png" }) {
        childImageSharp {
          gatsbyImageData(
            width: 128
            height: 128
            layout: FIXED
            placeholder: BLURRED
            quality: 100
          )
        }
      }
      qrDark: file(relativePath: { eq: "qr-code-ethereum-org-dark.png" }) {
        childImageSharp {
          gatsbyImageData(
            width: 128
            height: 128
            layout: FIXED
            placeholder: BLURRED
            quality: 100
          )
        }
      }
    }
  `)

  const qrImage = useColorModeValue(
    getImage(images.qrLight),
    getImage(images.qrDark)
  )

  const SPACING = { base: 3, md: 5 }
  const QR_SIZE = { base: "80px", md: "120px" }
  return (
    <MotionBox
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
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
        Show this QR code containing your account address to the sender
      </Text>
      {/* QR Code */}
      <NotificationPopover
        title="Example walkthrough"
        content="Share QR containing your address (public identifier) from your own wallet when finished here"
        placement="top"
      >
        <Box w="fit-content" mx="auto" mb={SPACING} p={3} bg="background.base">
          <Image
            as={GatsbyImage}
            image={qrImage}
            maxW={QR_SIZE}
            maxH={QR_SIZE}
            p={3}
            borderRadius="base"
          />
        </Box>
      </NotificationPopover>
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
            {FAKE_DEMO_ADDRESS}
          </Text>
        </Box>
        <NotificationPopover
          title="Example walkthrough"
          content="Share your address (public identifier) from your own wallet when finished here"
          placement="top-start"
        >
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
        </NotificationPopover>
      </Flex>
      <Text m={0} fontSize="xs" lineHeight={1.7}>
        Use this address for receiving tokens and NFTs on the Ethereum network.
      </Text>
    </MotionBox>
  )
}

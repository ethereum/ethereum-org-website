import { Box, Flex, Grid, Icon, Text } from "@chakra-ui/react"
import React from "react"
import { FaQrcode } from "react-icons/fa"
import { PiPaperPlaneRightFill } from "react-icons/pi"
import { EthTokenIcon, DaiTokenIcon, UniTokenIcon } from "./icons"

export const NewWalletPreview: React.FC = () => (
  <Flex
    direction="column"
    alignItems="center"
    h="full"
    w="full"
    bg="background.base"
  >
    <Flex
      direction="column"
      flex={1}
      py={8}
      px={6}
      justify="space-between"
      w="full"
    >
      <Box>
        <Text textAlign="center" color="body.medium" mb={{ base: 2, md: 4 }}>
          Your total
        </Text>
        <Text
          textAlign="center"
          fontSize={{ base: "3xl", md: "5xl" }}
          fontWeight="bold"
        >
          $0
        </Text>
      </Box>
      <Flex justify="space-around" w="full">
        <Flex direction="column" alignItems="center" gap={4}>
          <Grid
            w={{ base: 10, md: 16 }}
            aspectRatio={1}
            bg="primary.base"
            placeItems="center"
            borderRadius="full"
          >
            <Icon
              as={PiPaperPlaneRightFill}
              w={{ base: 4, md: 6 }}
              h={{ base: 4, md: 6 }}
              fill="white"
            />
          </Grid>
          <Text fontWeight="bold" color="primary.base" m={0}>
            Send
          </Text>
        </Flex>
        <Flex direction="column" alignItems="center" gap={4}>
          <Grid
            w={{ base: 10, md: 16 }}
            aspectRatio={1}
            bg="primary.base"
            placeItems="center"
            borderRadius="full"
          >
            <Icon
              as={FaQrcode}
              w={{ base: 4, md: 6 }}
              h={{ base: 4, md: 6 }}
              fill="white"
            />
          </Grid>
          <Text fontWeight="bold" color="primary.base" m={0}>
            Receive
          </Text>
        </Flex>
      </Flex>
    </Flex>
    <Flex
      direction="column"
      flex={1}
      py={8}
      gap={8}
      px={6}
      justify="space-between"
      w="full"
      bg="background.highlight"
    >
      <Flex gap={6}>
        <Text fontWeight="bold">Crypto</Text>
        <Text>NFTs</Text>
      </Flex>
      <Flex direction="column" w="full" gap={4}>
        <Flex gap={4}>
          <EthTokenIcon />
          <Text flex={1} fontWeight="semibold">
            Ether
          </Text>
          <Box textAlign="end" lineHeight={1.5}>
            <Text fontWeight="semibold" m={0}>
              $0
            </Text>
            <Text fontWeight="semibold" m={0} color="body.medium">
              0 ETH
            </Text>
          </Box>
        </Flex>
        <Flex gap={4}>
          <DaiTokenIcon />
          <Text flex={1} fontWeight="semibold">
            DAI
          </Text>
          <Box textAlign="end" lineHeight={1.5}>
            <Text fontWeight="semibold" m={0}>
              $0
            </Text>
            <Text fontWeight="semibold" m={0} color="body.medium">
              0 DAI
            </Text>
          </Box>
        </Flex>
        <Flex gap={4}>
          <UniTokenIcon />
          <Text flex={1} fontWeight="semibold">
            Uniswap
          </Text>
          <Box textAlign="end" lineHeight={1.5}>
            <Text fontWeight="semibold" m={0}>
              $0
            </Text>
            <Text fontWeight="semibold" m={0} color="body.medium">
              0 UNI
            </Text>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  </Flex>
)

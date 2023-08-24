import { Flex, Grid, Icon, Text } from "@chakra-ui/react"
import React from "react"
import { FaQrcode } from "react-icons/fa"
import { PiPaperPlaneRightFill } from "react-icons/pi"

export const SendReceiveButtons: React.FC = () => (
  <Flex justify="space-around" w="full" gap={4}>
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
)

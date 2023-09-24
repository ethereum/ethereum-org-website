import React from "react"
import { Box, type FlexProps, Text, Icon, Flex, Grid } from "@chakra-ui/react"
import { BsTriangle } from "react-icons/bs"
import { PiMagnifyingGlass } from "react-icons/pi"
import { IoEllipsisHorizontalSharp } from "react-icons/io5"
import { NFTSupportIcon } from "../../../icons/wallets/NFTSupportIcon"

export const Browser: React.FC<FlexProps> = (props) => {
  return (
    <Flex direction="column" h="full" bg="body.light" {...props}>
      <Box bg="background.highlight" w="full" px={3} pt={9} pb={3}>
        <Box bg="background.base" w="full" borderRadius="base" px={3} py={2}>
          <Text color="disabled">Search or enter address</Text>
        </Box>
      </Box>
      <Box p={8} flex={1}>
        <Flex direction="column" alignItems="center" gap={2} w="fit-content">
          <Grid
            placeItems="center"
            w={16}
            h={16}
            bg="background.highlight"
            borderRadius="lg"
          >
            <Icon as={NFTSupportIcon} fontSize="4xl" />
          </Grid>
          <Text>NFT Market</Text>
        </Flex>
      </Box>
      <Flex
        bg="background.highlight"
        w="full"
        px={3}
        pb={9}
        pt={4}
        justify="space-around"
        fontSize="xl"
        color="disabled"
      >
        <Icon as={BsTriangle} transform="rotate(-90deg)" />
        <Icon as={BsTriangle} transform="rotate(90deg)" />
        <Icon as={PiMagnifyingGlass} />
        <Icon as={IoEllipsisHorizontalSharp} />
      </Flex>
    </Flex>
  )
}

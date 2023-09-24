import React from "react"
import {
  Box,
  type FlexProps,
  Text,
  Icon,
  Flex,
  Grid,
  Button,
} from "@chakra-ui/react"
import { BsTriangle } from "react-icons/bs"
import { PiMagnifyingGlass } from "react-icons/pi"
import { IoEllipsisHorizontalSharp } from "react-icons/io5"
import { NFTSupportIcon } from "../../../icons/wallets/NFTSupportIcon"

interface IProps extends FlexProps {
  progressStepper: () => void
}
export const Browser: React.FC<IProps> = ({ progressStepper, ...props }) => {
  return (
    <Flex direction="column" h="full" bg="body.light" {...props}>
      <Box bg="background.highlight" w="full" px={3} pt={9} pb={3}>
        <Box bg="background.base" w="full" borderRadius="base" px={3} py={2}>
          <Text color="disabled">Search or enter address</Text>
        </Box>
      </Box>
      <Box p={8} flex={1}>
        <Button
          variant="ghost"
          display="flex"
          flexDirection="column"
          alignItems="center"
          data-group
          onClick={progressStepper}
          gap={4}
          p={0}
        >
          <Grid
            bg="background.highlight"
            borderRadius="lg"
            placeItems="center"
            w={16}
            h={16}
            _groupHover={{ bg: "primary.hover" }}
          >
            <Icon
              as={NFTSupportIcon}
              color="body.base"
              w={10}
              h={10}
              _groupHover={{ color: "background.base" }}
            />
          </Grid>
          <Box position="relative">
            <Text
              fontWeight="bold"
              color="body.base"
              textAlign="center"
              m={0}
              _groupHover={{ color: "primary.hover" }}
            >
              NFT Market
            </Text>
          </Box>
        </Button>
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

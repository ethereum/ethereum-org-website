import React from "react"
import { GrMenu } from "react-icons/gr"
import {
  Box,
  type BoxProps,
  Flex,
  Icon,
  Text,
  useColorModeValue,
} from "@chakra-ui/react"

import { FAKE_DEMO_ADDRESS } from "../../constants"
import { EthGlyphIcon } from "../../icons"
import { NotificationPopover } from "../../NotificationPopover"

type Web3AppProps = BoxProps & {
  displayUrl: string
  appName?: string
}
export const Web3App = ({
  displayUrl,
  appName,
  children,
  ...boxProps
}: Web3AppProps) => {
  const bg = useColorModeValue("#e8e8e8", "#171717")

  return (
    <Box h="full" w="full" bg="background.highlight" {...boxProps}>
      <Box p={1} bg={bg}>
        <Text textAlign="center" fontSize="xs" m={0}>
          {displayUrl}
        </Text>
      </Box>
      <NotificationPopover
        title="Example walkthrough"
        content="Try out a real Ethereum application when finished here"
      >
        <Flex p={6} fontSize="4xl" gap={3} alignItems="center">
          <Icon as={EthGlyphIcon} />
          <Box flex={1} cursor="default">
            {appName && (
              <>
                <Text fontSize="md" fontWeight="bold">
                  {appName}
                </Text>
                <Text fontSize="sm">{FAKE_DEMO_ADDRESS}</Text>
              </>
            )}
          </Box>
          <Icon as={GrMenu} sx={{ path: { stroke: "body.base" } }} />
        </Flex>
      </NotificationPopover>
      {children}
    </Box>
  )
}

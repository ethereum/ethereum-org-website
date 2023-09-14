import {
  Box,
  type BoxProps,
  Icon,
  Text,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react"
import React from "react"
import { GrMenu } from "react-icons/gr"
import { EthGlyphIcon } from "../../icons"
import { NotificationPopover } from "../../NotificationPopover"

interface IProps extends BoxProps {}
export const Web3App: React.FC<IProps> = ({ children, ...boxProps }) => {
  const bg = useColorModeValue("#e8e8e8", "#171717")

  return (
    <Box h="full" w="full" bg="background.highlight" {...boxProps}>
      <Box p={1} bg={bg}>
        <Text textAlign="center" fontSize="xs" m={0}>
          app.example.com
        </Text>
      </Box>
      <NotificationPopover
        title="Example walkthrough"
        content="Try out a real Ethereum application when finished here"
      >
        <Flex p={6} fontSize="4xl" justify="space-between">
          <Icon as={EthGlyphIcon} />
          <Icon as={GrMenu} sx={{ path: { stroke: "body.base" } }} />
        </Flex>
      </NotificationPopover>
      <>{children}</>
    </Box>
  )
}

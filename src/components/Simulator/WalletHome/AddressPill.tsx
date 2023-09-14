import { Flex, type FlexProps, Icon, Text } from "@chakra-ui/react"
import React from "react"
import { MdContentCopy } from "react-icons/md"
import { FAKE_DEMO_ADDRESS } from "../constants"
import { NotificationPopover } from "../NotificationPopover"

interface IProps extends Omit<FlexProps, "children"> {
  children?: Pick<FlexProps, "children">
}
export const AddressPill: React.FC<IProps> = ({ children, ...btnProps }) => (
  <NotificationPopover
    title="Example walkthrough"
    content="Share your address (public identifier) from your own wallet when finished here"
  >
    <Flex
      gap={2}
      align="center"
      borderRadius="full"
      bg="background.highlight"
      color="disabled"
      border="1px"
      borderColor="border"
      py={1}
      px={2}
      alignSelf="center"
      fontSize="xs"
      {...btnProps}
    >
      <Text m={0}>{children ?? FAKE_DEMO_ADDRESS}</Text>
      <Icon as={MdContentCopy} w={4} fontSize="lg" />
    </Flex>
  </NotificationPopover>
)

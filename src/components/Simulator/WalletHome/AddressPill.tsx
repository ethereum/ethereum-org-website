import React from "react"
import { MdContentCopy } from "react-icons/md"
import { Flex, type FlexProps, Icon, Text } from "@chakra-ui/react"

import { FAKE_DEMO_ADDRESS } from "../constants"
import { NotificationPopover } from "../NotificationPopover"

type AddressPillProps = Omit<FlexProps, "children">

export const AddressPill = ({ ...btnProps }: AddressPillProps) => (
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
      <Text m={0}>{FAKE_DEMO_ADDRESS}</Text>
      <Icon as={MdContentCopy} w={4} fontSize="lg" />
    </Flex>
  </NotificationPopover>
)

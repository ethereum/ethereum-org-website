import React from "react"
import { MdContentCopy } from "react-icons/md"

import { Flex, type FlexProps } from "@/components/ui/flex"

import { FAKE_DEMO_ADDRESS } from "../constants"
import { NotificationPopover } from "../NotificationPopover"

type AddressPillProps = Omit<FlexProps, "children">

export const AddressPill = ({ ...btnProps }: AddressPillProps) => (
  <NotificationPopover
    title="Example walkthrough"
    content="Share your address (public identifier) from your own wallet when finished here"
  >
    <Flex
      className="gap-2 self-center rounded-full border border-border bg-background-highlight px-2 py-1 text-center text-xs text-disabled"
      {...btnProps}
    >
      <p>{FAKE_DEMO_ADDRESS}</p>
      <MdContentCopy className="w-4 text-lg leading-none" />
    </Flex>
  </NotificationPopover>
)

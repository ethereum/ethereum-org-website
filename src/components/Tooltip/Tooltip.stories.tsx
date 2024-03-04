import * as React from "react"
import { RiInformationLine } from "react-icons/ri"
import { Box, HStack } from "@chakra-ui/react"
import { Meta, StoryObj } from "@storybook/react"

import InlineLink from "../Link"
import Translation from "../Translation"

// TODO: remove `index` when we delete the old tooltip
import TooltipComponent from "./index"

type TooltipType = typeof TooltipComponent

const TooltipContent = () => (
  <div>
    <Translation id="data-provided-by" />{" "}
    <InlineLink to="https://defillama.com/">defillama</InlineLink>
  </div>
)

const meta = {
  title: "Molecules / Overlay Content / Tooltip",
  component: TooltipComponent,
  args: {
    content: <TooltipContent />,
    children: (
      <Box as="span">
        <RiInformationLine />
      </Box>
    ),
  },
} satisfies Meta<TooltipType>

export default meta

type Story = StoryObj<typeof meta>

export const Tooltip: Story = {
  render: (args) => (
    <HStack>
      <TooltipComponent {...args} />
    </HStack>
  ),
}

// for chromatic visual testing
export const AlwaysOpen: Story = {
  args: {
    isOpen: true,
  },
}

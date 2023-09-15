import * as React from "react"
import { Meta, StoryObj } from "@storybook/react"
import { HStack, Text } from "@chakra-ui/react"
import { RiInformationLine } from "react-icons/ri"
import TooltipComponent from "."
import InlineLink from "../Link"

type TooltipType = typeof TooltipComponent

const meta = {
  title: "Molecules / Overlay Content / Tooltip",
  component: TooltipComponent,
} satisfies Meta<TooltipType>

export default meta

type Story = StoryObj<typeof meta>

const TooltipContent = () => (
  <div>
    <Text m={0}>Lorem, ipsum dolor.</Text>
    <InlineLink to="/?path=/story/molecules-overlay-content-tooltip--tooltip">
      link
    </InlineLink>
  </div>
)

export const Tooltip: Story = {
  args: {
    content: "text here",
    children: <RiInformationLine />,
  },
  render: (args) => (
    <HStack>
      <TooltipComponent {...args} />
      <TooltipComponent {...args} content={<TooltipContent />} />
    </HStack>
  ),
}

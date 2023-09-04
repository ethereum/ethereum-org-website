import * as React from "react"
import { Meta, StoryObj } from "@storybook/react"
import { Icon } from "@chakra-ui/react"
import TooltipComponent from "."

type TooltipType = typeof TooltipComponent

const meta = {
  title: "Molecules / Overlay Content / Tooltip",
  component: TooltipComponent,
} satisfies Meta<TooltipType>

export default meta

type Story = StoryObj<typeof meta>

export const Tooltip: Story = {
  args: {
    content: "text here",
    children: <Icon fill="text" name="info" />,
  },
}

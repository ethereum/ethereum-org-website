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

type Story = StoryObj<TooltipType>

export const Tooltip: Story = {
  render: () => (
    <TooltipComponent content="Text here">
      <Icon fill="'text" name="info" />
    </TooltipComponent>
  ),
}

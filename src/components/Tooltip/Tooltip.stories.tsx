import * as React from "react"
import { Meta, StoryObj } from "@storybook/react"
import { Icon } from "@chakra-ui/react"
import TooltipComponent from "."

type TooltipType = typeof TooltipComponent

const meta: Meta<TooltipType> = {
  title: "Molecules / Overlay Content / Tooltip",
  component: TooltipComponent,
}

export default meta

type Story = StoryObj<TooltipType>

export const Tooltip: Story = {
  render: () => (
    <TooltipComponent content="Text here">
      <Icon fill="'text" name="info" />
    </TooltipComponent>
  ),
}

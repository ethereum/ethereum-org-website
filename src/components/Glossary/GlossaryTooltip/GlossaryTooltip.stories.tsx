import { Meta, StoryObj } from "@storybook/react"

import GlossaryTooltipComponent from "."

const meta = {
  title: "Molecules / Overlay Content / Glossary Tooltip",
  component: GlossaryTooltipComponent,
  args: {
    termKey: "big-endian",
    children: "big-endian",
  },
} satisfies Meta<typeof GlossaryTooltipComponent>

export default meta

type Story = StoryObj<typeof meta>

export const Basic: Story = {}

// for chromatic story snapshot showing the rendered popover
export const OnOpen: Story = {
  args: {
    isOpen: true,
  },
}

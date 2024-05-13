import { Meta, StoryObj } from "@storybook/react"

import GlossaryTooltipComponent from "."

const meta = {
  title: "Molecules / Overlay Content / Glossary Tooltip",
  component: GlossaryTooltipComponent,
} satisfies Meta<typeof GlossaryTooltipComponent>

export default meta

export const GlossaryTooltip: StoryObj<typeof meta> = {
  args: {
    termKey: "big-endian",
    children: "big-endian",
  },
}

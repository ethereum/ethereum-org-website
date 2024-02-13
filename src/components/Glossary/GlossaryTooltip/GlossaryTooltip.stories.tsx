import React from "react"
import { Meta, StoryFn } from "@storybook/react"

import GlossaryTooltip from "."

export default {
  component: GlossaryTooltip,
} as Meta<typeof GlossaryTooltip>

export const Basic: StoryFn<typeof GlossaryTooltip> = () => (
  <GlossaryTooltip termKey="big-endian">big-endian</GlossaryTooltip>
)

import React from "react"
import { Meta, StoryFn } from "@storybook/react"

import GlossaryDefinition from "."

export default {
  component: GlossaryDefinition,
} as Meta<typeof GlossaryDefinition>

export const Basic: StoryFn<typeof GlossaryDefinition> = () => (
  <GlossaryDefinition term="51%-attack" />
)

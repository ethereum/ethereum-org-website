import type { Meta, StoryObj } from "@storybook/react/*"

import { InitialWordDisplay as Component } from "../InitialWordDisplay"

const meta = {
  title:
    "Molecules / Display Content / Simulator / CreateAccount Screen / InitialWordDisplay",
  component: Component,
} satisfies Meta<typeof Component>

export default meta

export const InitialWordDisplay: StoryObj<typeof meta> = {
  args: {
    words: ["fake", "none", "nope", "back", "stop", "halt", "cease"],
  },
}

import type { Meta, StoryObj } from "@storybook/react/*"

import { PhoneDecorator } from "@/components/Simulator/__stories__/PhoneDecorator"

import { InitialWordDisplay as Component } from "../InitialWordDisplay"

const meta = {
  title:
    "Molecules / Display Content / Simulator / CreateAccount Screen / InitialWordDisplay",
  component: Component,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [PhoneDecorator],
} satisfies Meta<typeof Component>

export default meta

export const InitialWordDisplay: StoryObj<typeof meta> = {
  args: {
    words: ["fake", "none", "nope", "back", "stop", "halt", "cease"],
  },
}

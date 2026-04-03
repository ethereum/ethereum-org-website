import type { Meta, StoryObj } from "@storybook/nextjs"

import { PhoneDecorator } from "@/components/Simulator/__stories__/PhoneDecorator"

import { WelcomeScreen as Component } from "../WelcomeScreen"

const meta = {
  title:
    "Molecules / Display Content / Simulator / CreateAccount Screen / WelcomeScreen",
  component: Component,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [PhoneDecorator],
} satisfies Meta<typeof Component>

export default meta

export const WelcomeScreen: StoryObj<typeof meta> = {}

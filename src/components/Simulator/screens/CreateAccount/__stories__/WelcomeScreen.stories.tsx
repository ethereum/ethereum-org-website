import type { Meta, StoryObj } from "@storybook/react/*"

import { WelcomeScreen as Component } from "../WelcomeScreen"

const meta = {
  title:
    "Molecules / Display Content / Simulator / CreateAccount Screen / WelcomeScreen",
  component: Component,
} satisfies Meta<typeof Component>

export default meta

export const WelcomeScreen: StoryObj<typeof meta> = {}

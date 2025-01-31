import type { Meta, StoryObj } from "@storybook/react"

import { WalletBalance as Component } from "../WalletBalance"

const meta = {
  title: "Molecules / Display Content / Simulator / WalletHome / WalletBalance",
  component: Component,
} satisfies Meta<typeof Component>

export default meta

export const WalletBalance: StoryObj<typeof meta> = {}

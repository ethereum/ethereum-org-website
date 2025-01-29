import type { Meta, StoryObj } from "@storybook/react"

import { AddressPill as AddressPillComponent } from "../AddressPill"

const meta = {
  title: "Molecules / Display Content / Simulator / WalletHome / AddressPill",
  component: AddressPillComponent,
} satisfies Meta<typeof AddressPillComponent>

export default meta

export const AddressPill: StoryObj<typeof meta> = {}

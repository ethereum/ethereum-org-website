import { within } from "storybook/test"
import type { Meta, StoryObj } from "@storybook/nextjs"

import VaultInterfaceDiagram from "."

const meta = {
  title: "Components / Data Viz / Diagrams / VaultInterface",
  component: VaultInterfaceDiagram,
  tags: ["autodocs"],
  args: { fig: 1 },
  parameters: {
    layout: "padded",
    // No Chromatic snapshots: the anatomy and shell stories cover the visuals.
    chromatic: { disableSnapshot: true, modes: { lg: { viewport: "lg" } } },
    docs: {
      description: {
        component:
          "Interactive replacement for `map-of-erc-4626.png` on `/developers/docs/standards/tokens/erc-4626/`, used in markdown as `<VaultInterfaceDiagram />`. For deposit, mint, withdraw or redeem: the account's limit (`max*`, per account, never reverts), the preview (same for every account, fees included, rounds in the vault's favor), the call (emits `Deposit` or `Withdraw`) and a conversion at the new rate (no fees, rounds down). Shares the `TokenVault` drawing with the three ERC-7540 page figures.",
      },
    },
  },
} satisfies Meta<typeof VaultInterfaceDiagram>

export default meta

type Story = StoryObj<typeof meta>

export const Idle: Story = {}

export const Step1Limit: Story = { args: { initialStep: 1 } }

export const Step2Quote: Story = { args: { initialStep: 2 } }

export const Step3Call: Story = { args: { initialStep: 3 } }

export const Step4Convert: Story = { args: { initialStep: 4 } }

export const Mint: Story = { args: { initialPreset: "mint", initialStep: 2 } }

export const Withdraw: Story = {
  args: { initialPreset: "withdraw", initialStep: 3 },
}

export const Redeem: Story = {
  args: { initialPreset: "redeem", initialStep: 4 },
}

export const Dark: Story = {
  globals: { theme: "dark" },
  args: { initialStep: 3 },
}

export const Rtl: Story = {
  globals: { locale: "ar" },
  args: { initialStep: 2 },
}

export const Mobile: Story = {
  globals: { viewport: { value: "base", isRotated: false } },
  args: { initialStep: 1 },
  parameters: {
    chromatic: {
      modes: { lg: { disable: true }, base: { viewport: "base" } },
    },
  },
}

/** Focusing a label highlights its part and shows its definition in the status line. */
export const HoverPart: Story = {
  args: { initialStep: 2 },
  play: async ({ canvasElement }) => {
    const label = await within(canvasElement).findByText("Exchange rate")
    label.focus()
  },
}

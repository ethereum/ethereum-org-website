import { within } from "storybook/test"
import type { Meta, StoryObj } from "@storybook/nextjs"

import { VaultDepositDiagram } from "."

const meta = {
  title: "Components / Data Viz / Diagrams / VaultDeposit",
  component: VaultDepositDiagram,
  tags: ["autodocs"],
  args: { fig: 1 },
  parameters: {
    layout: "padded",
    // No Chromatic snapshots: the anatomy and shell stories cover the visuals.
    chromatic: { disableSnapshot: true, modes: { lg: { viewport: "lg" } } },
    docs: {
      description: {
        component:
          "Interactive replacement for `erc-4626-sync-flow.svg` on `/developers/docs/standards/tokens/erc-7540/`, used in markdown as `<VaultDepositDiagram />`. An ERC-4626 deposit: the investor calls `deposit` (1), the vault takes the assets (2) and mints the shares in the same transaction (3). Set beside `AsyncVaultDiagram`, on the same `TokenVault` drawing.",
      },
    },
  },
} satisfies Meta<typeof VaultDepositDiagram>

export default meta

type Story = StoryObj<typeof meta>

export const Idle: Story = {}

export const Step1Call: Story = { args: { initialStep: 1 } }

export const Step2Assets: Story = { args: { initialStep: 2 } }

export const Step3Shares: Story = { args: { initialStep: 3 } }

export const Dark: Story = {
  globals: { theme: "dark" },
  args: { initialStep: 3 },
}

export const Rtl: Story = {
  globals: { locale: "ar" },
  args: { initialStep: 3 },
}

export const Mobile: Story = {
  globals: { viewport: { value: "base", isRotated: false } },
  args: { initialStep: 3 },
  parameters: {
    chromatic: {
      modes: { lg: { disable: true }, base: { viewport: "base" } },
    },
  },
}

/** Focusing a label highlights its part and shows its definition in the status line. */
export const HoverPart: Story = {
  args: { initialStep: 3 },
  play: async ({ canvasElement }) => {
    const label = await within(canvasElement).findByText("Shares")
    label.focus()
  },
}

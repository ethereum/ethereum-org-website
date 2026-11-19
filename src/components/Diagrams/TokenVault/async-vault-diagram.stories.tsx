import { within } from "storybook/test"
import type { Meta, StoryObj } from "@storybook/nextjs"

import { AsyncVaultDiagram } from "."

const meta = {
  title: "Components / Data Viz / Diagrams / AsyncVault",
  component: AsyncVaultDiagram,
  tags: ["autodocs"],
  args: { fig: 2 },
  parameters: {
    layout: "padded",
    // No Chromatic snapshots: the anatomy and shell stories cover the visuals.
    chromatic: { disableSnapshot: true, modes: { lg: { viewport: "lg" } } },
    docs: {
      description: {
        component:
          "Interactive replacement for `erc-7540-async-flow.svg` on `/developers/docs/standards/tokens/erc-7540/`, used in markdown as `<AsyncVaultDiagram />`. An ERC-7540 request: the investor calls `requestDeposit` or `requestRedeem` (1), the vault works with its strategy (2), fulfills the request at the rate it has then (3), and the investor claims with `deposit` or `redeem` in a second transaction (4).",
      },
    },
  },
} satisfies Meta<typeof AsyncVaultDiagram>

export default meta

type Story = StoryObj<typeof meta>

export const Idle: Story = {}

export const Step1Request: Story = { args: { initialStep: 1 } }

export const Step2Invest: Story = { args: { initialStep: 2 } }

export const Step3Fulfill: Story = { args: { initialStep: 3 } }

export const Step4Claim: Story = { args: { initialStep: 4 } }

export const Redeem: Story = {
  args: { initialPreset: "redeem", initialStep: 3 },
}

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
  args: { initialStep: 2 },
  play: async ({ canvasElement }) => {
    const label = await within(canvasElement).findByText("Strategy")
    label.focus()
  },
}

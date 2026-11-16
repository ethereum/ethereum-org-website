import { within } from "storybook/test"
import type { Meta, StoryObj } from "@storybook/nextjs"

import { VaultRequestDiagram } from "."

const meta = {
  title: "Components / Data Viz / Diagrams / VaultRequest",
  component: VaultRequestDiagram,
  tags: ["autodocs"],
  args: { fig: 3 },
  parameters: {
    layout: "padded",
    // No Chromatic snapshots: the anatomy and shell stories cover the visuals.
    chromatic: { disableSnapshot: true, modes: { lg: { viewport: "lg" } } },
    docs: {
      description: {
        component:
          "Interactive replacement for `request-lifecycle.svg` on `/developers/docs/standards/tokens/erc-7540/`, used in markdown as `<VaultRequestDiagram />`. One ERC-7540 request through pending (1), claimable (2) and claimed (3), with what `pending*Request` and `claimable*Request` return at each state.",
      },
    },
  },
} satisfies Meta<typeof VaultRequestDiagram>

export default meta

type Story = StoryObj<typeof meta>

export const Idle: Story = {}

export const Step1Pending: Story = { args: { initialStep: 1 } }

export const Step2Claimable: Story = { args: { initialStep: 2 } }

export const Step3Claimed: Story = { args: { initialStep: 3 } }

export const Redeem: Story = {
  args: { initialPreset: "redeem", initialStep: 2 },
}

export const Dark: Story = {
  globals: { theme: "dark" },
  args: { initialStep: 2 },
}

export const Rtl: Story = {
  globals: { locale: "ar" },
  args: { initialStep: 2 },
}

export const Mobile: Story = {
  globals: { viewport: { value: "base", isRotated: false } },
  args: { initialStep: 2 },
  parameters: {
    chromatic: {
      modes: { lg: { disable: true }, base: { viewport: "base" } },
    },
  },
}

/** Focusing a label highlights its part and shows its definition in the status line. */
export const HoverPart: Story = {
  args: { initialStep: 1 },
  play: async ({ canvasElement }) => {
    const label = await within(canvasElement).findByText("Pending")
    label.focus()
  },
}

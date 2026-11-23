import { within } from "storybook/test"
import type { Meta, StoryObj } from "@storybook/nextjs"

import RollupCostDiagram from "."

const meta = {
  title: "Components / Data Viz / Diagrams / RollupCost",
  component: RollupCostDiagram,
  tags: ["autodocs"],
  args: { fig: 1 },
  parameters: {
    layout: "padded",
    // No Chromatic snapshots: the anatomy and shell stories cover the visuals.
    chromatic: { disableSnapshot: true, modes: { lg: { viewport: "lg" } } },
    docs: {
      description: {
        component:
          'The rollup "carpool" on `/layer-2/learn/`, rendered by the page under the rollups paragraph. A flat 2D drawing, not isometric: choose 1, 10, 100 or 1,000 transactions; they fill the seats of a batch on layer 2 (1), the batch is posted to layer 1 as one transaction (2) and its cost is split between the users (3), leaving a small layer 2 cost each. Costs are illustrative units from `model.ts`.',
      },
    },
  },
} satisfies Meta<typeof RollupCostDiagram>

export default meta

type Story = StoryObj<typeof meta>

export const Idle: Story = {}

export const Step1Gather: Story = { args: { initialStep: 1 } }

export const Step2Post: Story = { args: { initialStep: 2 } }

export const Step3Split: Story = { args: { initialStep: 3 } }

export const Alone: Story = { args: { initialPreset: 1, initialStep: 3 } }

export const TenTransactions: Story = {
  args: { initialPreset: 10, initialStep: 3 },
}

export const ThousandTransactions: Story = {
  args: { initialPreset: 1000, initialStep: 3 },
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
  args: { initialStep: 3 },
  play: async ({ canvasElement }) => {
    const label = await within(canvasElement).findByText("Layer 2 cost")
    label.focus()
  },
}

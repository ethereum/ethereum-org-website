import { within } from "storybook/test"
import type { Meta, StoryObj } from "@storybook/nextjs"

import OptimisticRollupDiagram from "."

const meta = {
  title: "Components / Data Viz / Diagrams / OptimisticRollup",
  component: OptimisticRollupDiagram,
  tags: ["autodocs"],
  args: { fig: 1 },
  parameters: {
    layout: "padded",
    // No Chromatic snapshots: the anatomy and shell stories cover the visuals.
    chromatic: { disableSnapshot: true, modes: { lg: { viewport: "lg" } } },
    docs: {
      description: {
        component:
          "Interactive figure for `/developers/docs/scaling/optimistic-rollups/`, used in markdown as `<OptimisticRollupDiagram />`. Layer 2 (transactions, sequencer) sits behind Ethereum (rollup contracts with the batch and state root, the bond, an L1 account, the challenger). The sequencer executes the batch (1) and posts its data and state root with a bond (2). Honest batch: a challenger re-executes and agrees (3), the 7-day challenge window, drawn as day cells along L1's front edge, elapses (4), and the root is final so withdrawals complete (5). Invalid state root: the challenger disputes on day 2 (3), bisection narrows an 8-step toy trace to one step in 3 rounds (4), and L1 re-executes it, deleting the root and slashing the bond (5). The bond and withdrawal are value, so they flow orange.",
      },
    },
  },
} satisfies Meta<typeof OptimisticRollupDiagram>

export default meta

type Story = StoryObj<typeof meta>

export const Idle: Story = {}

export const Step1Execute: Story = { args: { initialStep: 1 } }

export const Step2Post: Story = { args: { initialStep: 2 } }

export const Step3Check: Story = { args: { initialStep: 3 } }

export const Step4Elapse: Story = { args: { initialStep: 4 } }

export const Step5Finalize: Story = { args: { initialStep: 5 } }

export const InvalidChallenge: Story = {
  args: { initialPreset: "invalid", initialStep: 3 },
}

export const InvalidBisect: Story = {
  args: { initialPreset: "invalid", initialStep: 4 },
}

export const InvalidProve: Story = {
  args: { initialPreset: "invalid", initialStep: 5 },
}

export const Dark: Story = {
  globals: { theme: "dark" },
  args: { initialPreset: "invalid", initialStep: 5 },
}

export const Rtl: Story = {
  globals: { locale: "ar" },
  args: { initialStep: 3 },
}

export const Mobile: Story = {
  globals: { viewport: { value: "base", isRotated: false } },
  args: { initialStep: 3 },
}

/** Focusing a label highlights its part and shows its definition in the status line. */
export const HoverPart: Story = {
  args: { initialStep: 2 },
  play: async ({ canvasElement }) => {
    const label = await within(canvasElement).findByText("Sequencer")
    label.focus()
  },
}

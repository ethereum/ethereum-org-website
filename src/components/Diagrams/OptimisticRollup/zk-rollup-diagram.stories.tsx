import { within } from "storybook/test"
import type { Meta, StoryObj } from "@storybook/nextjs"

import { ZkRollupDiagram } from "."

const meta = {
  title: "Components / Data Viz / Diagrams / ZkRollup",
  component: ZkRollupDiagram,
  tags: ["autodocs"],
  args: { fig: 1 },
  parameters: {
    layout: "padded",
    // No Chromatic snapshots: the anatomy and shell stories cover the visuals.
    chromatic: { disableSnapshot: true, modes: { lg: { viewport: "lg" } } },
    docs: {
      description: {
        component:
          "Interactive figure for `/developers/docs/scaling/zk-rollups/`, used in markdown as `<ZkRollupDiagram />`. The companion to `OptimisticRollupDiagram`, on the same rig: Layer 2 (transactions, sequencer, prover) sits behind Ethereum (rollup contract with the batch and state root, verifier contract, an L1 account). The sequencer executes the batch (1), the prover generates a validity proof (2), and the operator posts the data, state root and proof to L1 (3). Valid batch: the verifier contract accepts the proof (4) and the root is recorded and final at once, so withdrawals complete (5). Invalid state transition: no valid proof exists for the wrong root, the verifier rejects the one posted (4) and the call reverts, leaving the root unrecorded (5). There is no bond or challenge window.",
      },
    },
  },
} satisfies Meta<typeof ZkRollupDiagram>

export default meta

type Story = StoryObj<typeof meta>

export const Idle: Story = {}

export const Step1Execute: Story = { args: { initialStep: 1 } }

export const Step2Prove: Story = { args: { initialStep: 2 } }

export const Step3Post: Story = { args: { initialStep: 3 } }

export const Step4Verify: Story = { args: { initialStep: 4 } }

export const Step5Finalize: Story = { args: { initialStep: 5 } }

export const InvalidProve: Story = {
  args: { initialPreset: "invalid", initialStep: 2 },
}

export const InvalidReject: Story = {
  args: { initialPreset: "invalid", initialStep: 4 },
}

export const InvalidRevert: Story = {
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
    const label = await within(canvasElement).findByText("Prover")
    label.focus()
  },
}

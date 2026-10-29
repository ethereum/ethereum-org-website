import { within } from "storybook/test"
import type { Meta, StoryObj } from "@storybook/nextjs"

import BlockStateDiagram from "."

const meta = {
  title: "Components / Data Viz / Diagrams / BlockState",
  component: BlockStateDiagram,
  tags: ["autodocs"],
  args: { fig: 1 },
  parameters: {
    layout: "padded",
    // Only key states snapshot (opted in per story): idle, final,
    // failure end state, dark, RTL and mobile.
    chromatic: { disableSnapshot: true, modes: { lg: { viewport: "lg" } } },
    docs: {
      description: {
        component:
          "Interactive replacement for `tx-block.png` on `/developers/docs/blocks/`, used in markdown as `<BlockStateDiagram />`. A sibling of `TxApply`: where that one shows one transaction in detail, this shows a block's ordered list. Three transactions apply to world state t one at a time (steps 1-3), each to the state the previous one left (Bob can only afford transaction 2 because transaction 1 paid him), then the result is world state t+1 (step 4). The `revert` scenario makes transaction 2's contract call revert: its value transfer is undone, but it still pays its fee, bumps Bob's nonce and stays in the block. Balances add up exactly: amounts are whole gwei in `model.ts`, with the sums in its header comment. Step stories set `initialStep` so each snapshot is a deterministic end state.",
      },
    },
  },
} satisfies Meta<typeof BlockStateDiagram>

export default meta

type Story = StoryObj<typeof meta>

export const Idle: Story = {
  parameters: { chromatic: { disableSnapshot: false } },
}

export const Step1Tx1: Story = { args: { initialStep: 1 } }

export const Step2Tx2: Story = { args: { initialStep: 2 } }

export const Step3Tx3: Story = { args: { initialStep: 3 } }

export const Step4Seal: Story = {
  args: { initialStep: 4 },
  parameters: { chromatic: { disableSnapshot: false } },
}

export const RevertStep2: Story = {
  args: { initialPreset: "revert", initialStep: 2 },
}

export const RevertEnd: Story = {
  args: { initialPreset: "revert", initialStep: 4 },
  parameters: { chromatic: { disableSnapshot: false } },
}

export const Dark: Story = {
  globals: { theme: "dark" },
  args: { initialStep: 2 },
  parameters: { chromatic: { disableSnapshot: false } },
}

export const DarkRevert: Story = {
  globals: { theme: "dark" },
  args: { initialPreset: "revert", initialStep: 4 },
}

export const Rtl: Story = {
  globals: { locale: "ar" },
  args: { initialPreset: "revert", initialStep: 2 },
  parameters: { chromatic: { disableSnapshot: false } },
}

export const Mobile: Story = {
  globals: { viewport: { value: "base", isRotated: false } },
  args: { initialStep: 2 },
  parameters: {
    chromatic: {
      disableSnapshot: false,
      modes: { lg: { disable: true }, base: { viewport: "base" } },
    },
  },
}

/** Focusing a label highlights its part and shows its definition in the status line. */
export const HoverPart: Story = {
  args: { initialStep: 2, fig: 1 },
  play: async ({ canvasElement }) => {
    const label = await within(canvasElement).findByText("Block")
    label.focus()
  },
}

export const HoverPartDark: Story = {
  ...HoverPart,
  globals: { theme: "dark" },
}

import { within } from "storybook/test"
import type { Meta, StoryObj } from "@storybook/nextjs"

import TxApplyDiagram from "."

const meta = {
  title: "Components / Data Viz / Diagrams / TxApply",
  component: TxApplyDiagram,
  tags: ["autodocs"],
  args: { fig: 1 },
  parameters: {
    layout: "padded",
    chromatic: { modes: { lg: { viewport: "lg" } } },
    docs: {
      description: {
        component:
          "Interactive replacement for `tx.png` on `/developers/docs/transactions/`, used in markdown as `<TxApplyDiagram />`. Applying a transaction moves the world state from t to t+1, using the page's own example: Bob sends Alice 1 ETH (step 2), the 0.0042 ETH fee splits into 0.00399 ETH burned and a 0.00021 ETH tip to the validator (step 3), and Bob's nonce goes up by one (step 4). The fee adds up exactly: amounts are whole gwei in `model.ts`. Six objects: plate, sender, recipient, transaction slip, value pipe (with the tip branch) and the burn mark. Built on `InteractiveDiagram` and the anatomy primitives; step stories set `initialStep` so each snapshot is a deterministic end state.",
      },
    },
  },
} satisfies Meta<typeof TxApplyDiagram>

export default meta

type Story = StoryObj<typeof meta>

export const Idle: Story = {}

export const Step1Submit: Story = { args: { initialStep: 1 } }

export const Step2Value: Story = { args: { initialStep: 2 } }

export const Step3Fee: Story = { args: { initialStep: 3 } }

export const Step4Commit: Story = { args: { initialStep: 4 } }

export const Dark: Story = {
  globals: { theme: "dark" },
  args: { initialStep: 3 },
}

export const DarkEnd: Story = {
  globals: { theme: "dark" },
  args: { initialStep: 4 },
}

export const Rtl: Story = {
  globals: { locale: "ar" },
  args: { initialStep: 3 },
}

export const Mobile: Story = {
  globals: { viewport: { value: "base", isRotated: false } },
  args: { initialStep: 3 },
  parameters: { chromatic: { modes: { base: { viewport: "base" } } } },
}

export const ReducedMotion: Story = {
  args: { initialStep: 3 },
  parameters: {
    chromatic: { prefersReducedMotion: "reduce" },
    docs: {
      description: {
        story:
          "With reduced motion the pipe flows are static and readouts jump to their values; the primary action still steps through with longer reading time.",
      },
    },
  },
}

/** Focusing a label highlights its part and shows its definition in the status line. */
export const HoverPart: Story = {
  args: { initialStep: 3, fig: 1 },
  play: async ({ canvasElement }) => {
    const label = await within(canvasElement).findByText("Sender")
    label.focus()
  },
}

export const HoverPartDark: Story = {
  ...HoverPart,
  globals: { theme: "dark" },
}

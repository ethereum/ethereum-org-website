import { within } from "storybook/test"
import type { Meta, StoryObj } from "@storybook/nextjs"

import GasEvmDiagram from "."

const meta = {
  title: "Components / Data Viz / Diagrams / GasEvm",
  component: GasEvmDiagram,
  tags: ["autodocs"],
  args: { fig: 1 },
  parameters: {
    layout: "padded",
    chromatic: { modes: { lg: { viewport: "lg" } } },
    docs: {
      description: {
        component:
          "Interactive replacement for `gas.png` on `/developers/docs/gas/` and `/developers/docs/evm/`, used in markdown as `<GasEvmDiagram />`. The transaction first pays 21,000 gas of intrinsic cost (step 1), then the program counter steps through seven opcodes: each draws its cost from the gas supply (a pulse along the pipe, stronger for SSTORE) and changes the stack, memory or storage. Stack and memory sit on the EVM's plinth (volatile machine state); storage stands apart on the plate (persistent world state). Built on `InteractiveDiagram` and the shared anatomy primitives; everything reads from `model.ts`. Step stories set `initialStep` so each snapshot is a deterministic end state.",
      },
    },
  },
} satisfies Meta<typeof GasEvmDiagram>

export default meta

type Story = StoryObj<typeof meta>

export const Idle: Story = {}

export const Step0Intrinsic: Story = { args: { initialStep: 0 } }

export const Step1Push1A: Story = { args: { initialStep: 1 } }

export const Step2Push1B: Story = { args: { initialStep: 2 } }

export const Step3Mstore: Story = { args: { initialStep: 3 } }

export const Step4Push1C: Story = { args: { initialStep: 4 } }

export const Step5Push1D: Story = { args: { initialStep: 5 } }

export const Step6Sstore: Story = { args: { initialStep: 6 } }

export const Step7Stop: Story = { args: { initialStep: 7 } }

export const OutOfGasIdle: Story = { args: { initialPreset: "out-of-gas" } }

export const OutOfGasStep0Intrinsic: Story = {
  args: { initialPreset: "out-of-gas", initialStep: 0 },
}

export const OutOfGasStep1Push1A: Story = {
  args: { initialPreset: "out-of-gas", initialStep: 1 },
}

export const OutOfGasStep2Push1B: Story = {
  args: { initialPreset: "out-of-gas", initialStep: 2 },
}

export const OutOfGasStep3Mstore: Story = {
  args: { initialPreset: "out-of-gas", initialStep: 3 },
}

export const OutOfGasStep4Push1C: Story = {
  args: { initialPreset: "out-of-gas", initialStep: 4 },
}

export const OutOfGasStep5Push1D: Story = {
  args: { initialPreset: "out-of-gas", initialStep: 5 },
}

export const OutOfGasStep6Reverted: Story = {
  args: { initialPreset: "out-of-gas", initialStep: 6 },
  parameters: {
    docs: {
      description: {
        story:
          "SSTORE needs 22,100 gas but only 18,982 is left: all 40,000 gas is consumed and the write is reverted.",
      },
    },
  },
}

export const Dark: Story = {
  globals: { theme: "dark" },
  args: { initialStep: 6 },
}

export const DarkOutOfGas: Story = {
  globals: { theme: "dark" },
  args: { initialPreset: "out-of-gas", initialStep: 6 },
}

export const Rtl: Story = {
  globals: { locale: "ar" },
  args: { initialStep: 3 },
}

export const Mobile: Story = {
  globals: { viewport: { value: "base", isRotated: false } },
  args: { initialStep: 6 },
  parameters: { chromatic: { modes: { base: { viewport: "base" } } } },
}

export const ReducedMotion: Story = {
  args: { initialStep: 6 },
  parameters: {
    chromatic: { prefersReducedMotion: "reduce" },
    docs: {
      description: {
        story:
          "With reduced motion the pipe pulses are static and readouts jump to their values; Run still steps through with longer reading time.",
      },
    },
  },
}

/** Focusing a label highlights its part and shows its definition in the status line. */
export const HoverPart: Story = {
  args: { initialStep: 6, fig: 1 },
  play: async ({ canvasElement }) => {
    const label = await within(canvasElement).findByText("Gas supply")
    label.focus()
  },
}

export const HoverPartDark: Story = {
  ...HoverPart,
  globals: { theme: "dark" },
}

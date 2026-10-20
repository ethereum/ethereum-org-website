import { pickBy } from "lodash"
import { within } from "storybook/test"
import type { Meta, StoryObj } from "@storybook/nextjs"

import { viewportModes } from "@/storybook/modes"

import GasTxDiagram from "."

const meta = {
  title: "Components / Data Viz / Diagrams / GasTx",
  component: GasTxDiagram,
  tags: ["autodocs"],
  args: { fig: 1 },
  parameters: {
    layout: "padded",
    chromatic: {
      modes: pickBy(viewportModes, (args) =>
        ["base", "lg"].includes(args.viewport)
      ),
    },
    docs: {
      description: {
        component:
          'Interactive replacement for `gas-tx.png` on `/developers/docs/transactions/` and `/developers/docs/gas/`, used in markdown as `<GasTxDiagram />`. Drawn as a fuel rig: a pump (externally owned account) fills a tank to the gas limit, a feed pipe carries the message to an engine (contract account) that burns fuel per operation, and unused fuel flows back through a meter; out of gas, the engine stalls and the contract shows a Reverted tag.\n\n`GasTxPlayer` renders the figure and the controls panel in one `DiagramStage` card (panel on the inline-end side from a 46rem container width, stacked below it when narrower): presets, Send and step buttons, caption and readout. The isometric drawing (`gas-rig.tsx`) is lazy-loaded with `next/dynamic`. Everything reads from the plain-TS model in `model.ts`. Colours come from the `--anatomy-*` tokens in `anatomy-tokens.ts`, mapped to the site\'s semantic tokens.\n\nStep stories set `initialStep` so each snapshot is a deterministic end state. Chromatic runs with `prefersReducedMotion: "reduce"` globally.',
      },
    },
  },
} satisfies Meta<typeof GasTxDiagram>

export default meta

type Story = StoryObj<typeof meta>

export const LightCall: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Idle: the complete diagram before **Send transaction**. Limit 100,000, used 46,000, 54,000 returned.",
      },
    },
  },
}

export const HeavyCall: Story = { args: { initialPreset: "heavy" } }

export const OutOfGas: Story = {
  args: { initialPreset: "out-of-gas" },
  parameters: {
    docs: {
      description: {
        story:
          "All 100,000 gas is consumed, state changes are reverted, and the refund lane stays dimmed: nothing is returned.",
      },
    },
  },
}

export const Step1Enter: Story = { args: { initialStep: 0 } }

export const Step2Reserve: Story = { args: { initialStep: 1 } }

export const Step3Execute: Story = { args: { initialStep: 2 } }

export const Step4Return: Story = { args: { initialStep: 3 } }

export const Step3OutOfGas: Story = {
  args: { initialPreset: "out-of-gas", initialStep: 2 },
}

export const Step4Reverted: Story = {
  args: { initialPreset: "out-of-gas", initialStep: 3 },
}

export const Dark: Story = {
  globals: { theme: "dark" },
  args: { initialStep: 2 },
}

export const DarkReverted: Story = {
  globals: { theme: "dark" },
  args: { initialPreset: "out-of-gas", initialStep: 3 },
}

export const Rtl: Story = {
  globals: { locale: "ar" },
  args: { initialStep: 3 },
  parameters: {
    docs: {
      description: {
        story:
          "Arabic: the rig, its labels and the controls panel mirror, so the flow runs from the inline-start (right) side. Strings fall back to English until the intl pipeline translates the namespace.",
      },
    },
  },
}

export const Mobile: Story = {
  globals: { viewport: { value: "base", isRotated: false } },
  args: { initialStep: 3 },
  parameters: {
    docs: {
      description: {
        story:
          "At phone width the controls panel sits under the illustration inside the same card, and labels that wouldn't fit on one line are dropped (the status line, legend and figcaption carry the meaning).",
      },
    },
  },
}

export const ReducedMotion: Story = {
  args: { initialStep: 2 },
  parameters: {
    chromatic: { prefersReducedMotion: "reduce" },
    docs: {
      description: {
        story:
          "With `prefers-reduced-motion: reduce` nothing moves: the transaction slip doesn't drop, pipe flows and the exhaust are static, and the tank and meter jump to their end state, and **Send transaction** still steps through the cycle with longer reading time. Emulate it in your browser's dev tools to try it here.",
      },
    },
  },
}

/** Focusing a label highlights its part and shows its definition in the status line. */
export const HoverPart: Story = {
  args: { initialStep: 3, fig: 1 },
  play: async ({ canvasElement }) => {
    const label = await within(canvasElement).findByText("Gas supply")
    label.focus()
  },
}

export const HoverPartDark: Story = {
  ...HoverPart,
  globals: { theme: "dark" },
}

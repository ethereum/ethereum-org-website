import { pickBy } from "lodash"
import type { Meta, StoryObj } from "@storybook/nextjs"

import { viewportModes } from "@/storybook/modes"

import GasTxDiagram from "."

const meta = {
  title: "Components / Data Viz / Diagrams / GasTx",
  component: GasTxDiagram,
  tags: ["autodocs"],
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
          'Interactive replacement for `gas-tx.png` on `/developers/docs/transactions/` and `/developers/docs/gas/`, used in markdown as `<GasTxDiagram />`. The drawing is a Server Component; `GasTxPlayer` is the client island (presets, playback, readout, caption). Everything reads from the plain-TS model in `model.ts`, so the drawing, numbers and screen-reader text cannot disagree.\n\nThe step stories set `initialStep` so each snapshot is a deterministic end state. Chromatic runs with `prefersReducedMotion: "reduce"` globally, which is the motion-free path the diagram supports.',
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
          "Arabic: the grid and connectors mirror, so the flow runs from the inline-start (right) side. Strings fall back to English until the intl pipeline translates the namespace.",
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
          "Below `md` the layout stacks vertically and the lanes turn into downward/upward connectors.",
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
          "With `prefers-reduced-motion: reduce` nothing moves: the travelling dot is hidden, the flame and dash flow jump to their end state, and **Send transaction** still steps through the cycle with longer reading time. Emulate it in your browser's dev tools to try it here.",
      },
    },
  },
}

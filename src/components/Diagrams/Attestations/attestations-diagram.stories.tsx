import { within } from "storybook/test"
import type { Meta, StoryObj } from "@storybook/nextjs"

import AttestationsDiagram from "."

const meta = {
  title: "Components / Data Viz / Diagrams / Attestations",
  component: AttestationsDiagram,
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
          "Interactive replacement for `attestation_schematic.png` on `/developers/docs/consensus-mechanisms/pos/attestations/`, used in markdown as `<AttestationsDiagram />`. The page's five stages for two small committees (three validators plus an aggregator each, one validator offline): generation (1), propagation on the committee subnets (2), aggregation with aggregation bits (3), propagation of the aggregates through the beacon nodes (4), and inclusion by the proposer (5). Scenarios contrast inclusion in the next slot (delay 1) with a missed slot (delay 2); only step 5 differs. Messages flow blue, not orange: orange is reserved for gas. Step stories set `initialStep` so each snapshot is a deterministic end state.",
      },
    },
  },
} satisfies Meta<typeof AttestationsDiagram>

export default meta

type Story = StoryObj<typeof meta>

export const Idle: Story = {
  parameters: { chromatic: { disableSnapshot: false } },
}

export const Step1Generate: Story = { args: { initialStep: 1 } }

export const Step2Propagate: Story = { args: { initialStep: 2 } }

export const Step3Aggregate: Story = { args: { initialStep: 3 } }

export const Step4Broadcast: Story = { args: { initialStep: 4 } }

export const Step5Include: Story = {
  args: { initialStep: 5 },
  parameters: { chromatic: { disableSnapshot: false } },
}

export const MissedSlot: Story = {
  args: { initialPreset: "missed", initialStep: 5 },
  parameters: { chromatic: { disableSnapshot: false } },
}

export const Dark: Story = {
  globals: { theme: "dark" },
  args: { initialStep: 3 },
  parameters: { chromatic: { disableSnapshot: false } },
}

export const DarkEnd: Story = {
  globals: { theme: "dark" },
  args: { initialStep: 5 },
}

export const Rtl: Story = {
  globals: { locale: "ar" },
  args: { initialStep: 3 },
  parameters: { chromatic: { disableSnapshot: false } },
}

export const Mobile: Story = {
  globals: { viewport: { value: "base", isRotated: false } },
  args: { initialStep: 3 },
  parameters: {
    chromatic: {
      disableSnapshot: false,
      modes: { lg: { disable: true }, base: { viewport: "base" } },
    },
  },
}

/** Focusing a label highlights its part and shows its definition in the status line. */
export const HoverPart: Story = {
  args: { initialStep: 3, fig: 1 },
  play: async ({ canvasElement }) => {
    const label = await within(canvasElement).findByText("Aggregators")
    label.focus()
  },
}

export const HoverPartDark: Story = {
  ...HoverPart,
  globals: { theme: "dark" },
}

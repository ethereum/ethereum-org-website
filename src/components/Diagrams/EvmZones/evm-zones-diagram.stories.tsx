import { within } from "storybook/test"
import type { Meta, StoryObj } from "@storybook/nextjs"

import EvmZonesDiagram from "."

const meta = {
  title: "Components / Data Viz / Diagrams / EvmZones",
  component: EvmZonesDiagram,
  tags: ["autodocs"],
  args: { fig: 1 },
  parameters: {
    layout: "padded",
    // Only key states snapshot (opted in per story): idle, final,
    // dark, RTL and mobile.
    chromatic: { disableSnapshot: true, modes: { lg: { viewport: "lg" } } },
    docs: {
      description: {
        component:
          "Interactive replacement for `evm.png` on `/developers/docs/evm/`, used in markdown as `<EvmZonesDiagram />`. The same objects as the EVM gas diagram, grouped into the original's three zones without text boxes: the EVM's plinth is machine state (volatile: gas available, stack, memory, and the program counter as the lit code cell), the code strip on the EVM is the virtual ROM (immutable), and storage stands on the world-state plate (persistent). One call: code loaded (1), the call runs (2), a storage slot is written (3), the call ends and only the storage write remains (4). Pointing at or focusing a part (or its label) shows its definition and zone in the status line.",
      },
    },
  },
} satisfies Meta<typeof EvmZonesDiagram>

export default meta

type Story = StoryObj<typeof meta>

export const Idle: Story = {
  parameters: { chromatic: { disableSnapshot: false } },
}

export const Step1Load: Story = { args: { initialStep: 1 } }

export const Step2Run: Story = { args: { initialStep: 2 } }

export const Step3Store: Story = { args: { initialStep: 3 } }

export const Step4End: Story = {
  args: { initialStep: 4 },
  parameters: { chromatic: { disableSnapshot: false } },
}

export const Dark: Story = {
  globals: { theme: "dark" },
  args: { initialStep: 3 },
  parameters: { chromatic: { disableSnapshot: false } },
}

export const DarkEnd: Story = {
  globals: { theme: "dark" },
  args: { initialStep: 4 },
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
    const label = await within(canvasElement).findByText("EVM code")
    label.focus()
  },
}

export const HoverPartDark: Story = {
  ...HoverPart,
  globals: { theme: "dark" },
}

import type { Meta, StoryObj } from "@storybook/nextjs"

import EvmZonesDiagram from "."

const meta = {
  title: "Components / Data Viz / Diagrams / EvmZones",
  component: EvmZonesDiagram,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    chromatic: { modes: { lg: { viewport: "lg" } } },
    docs: {
      description: {
        component:
          "Interactive replacement for `evm.png` on `/developers/docs/evm/`, used in markdown as `<EvmZonesDiagram />`. The same objects as the EVM gas diagram, grouped into the original's three zones without text boxes: the EVM's plinth is machine state (volatile: gas available, stack, memory, and the program counter as the lit code cell), the code strip on the EVM is the virtual ROM (immutable), and storage stands on the world-state plate (persistent). One call: code loaded (1), the call runs (2), a storage slot is written (3), the call ends and only the storage write remains (4). Each label's tooltip gives the part's definition and its zone.",
      },
    },
  },
} satisfies Meta<typeof EvmZonesDiagram>

export default meta

type Story = StoryObj<typeof meta>

export const Idle: Story = {}

export const Step1Load: Story = { args: { initialStep: 1 } }

export const Step2Run: Story = { args: { initialStep: 2 } }

export const Step3Store: Story = { args: { initialStep: 3 } }

export const Step4End: Story = { args: { initialStep: 4 } }

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

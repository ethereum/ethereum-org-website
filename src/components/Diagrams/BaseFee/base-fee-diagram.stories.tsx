import { within } from "storybook/test"
import type { Meta, StoryObj } from "@storybook/nextjs"

import BaseFeeDiagram from "."

const meta = {
  title: "Components / Data Viz / Diagrams / BaseFee",
  component: BaseFeeDiagram,
  tags: ["autodocs"],
  args: { fig: 1 },
  parameters: {
    layout: "padded",
    // No Chromatic snapshots: the anatomy and shell stories cover the visuals.
    chromatic: { disableSnapshot: true, modes: { lg: { viewport: "lg" } } },
    docs: {
      description: {
        component:
          "EIP-1559 base fee on `/developers/docs/gas/`, used in markdown as `<BaseFeeDiagram />`. A flat 2D chart, not isometric: eight blocks as gas bars against the gas limit and dashed target, and the base fee as steps above them. Each step builds one block and shows the base fee it sets for the next (up to 12.5% up or down). Bars are draggable, and the panel's stepper edits the current block. Presets: a demand spike (the page's table), cooling off and on target.",
      },
    },
  },
} satisfies Meta<typeof BaseFeeDiagram>

export default meta

type Story = StoryObj<typeof meta>

export const Idle: Story = {}

export const Step1: Story = { args: { initialStep: 1 } }

export const Step3: Story = { args: { initialStep: 3 } }

export const Step8: Story = { args: { initialStep: 8 } }

export const CoolingOff: Story = {
  args: { initialPreset: "cooling", initialStep: 8 },
}

export const OnTarget: Story = {
  args: { initialPreset: "target", initialStep: 8 },
}

export const Dark: Story = {
  globals: { theme: "dark" },
  args: { initialStep: 8 },
}

export const Rtl: Story = {
  globals: { locale: "ar" },
  args: { initialStep: 4 },
}

export const Mobile: Story = {
  globals: { viewport: { value: "base", isRotated: false } },
  args: { initialStep: 4 },
  parameters: {
    chromatic: {
      modes: { lg: { disable: true }, base: { viewport: "base" } },
    },
  },
}

/** Focusing a label highlights its part and shows its definition in the status line. */
export const HoverPart: Story = {
  args: { initialStep: 3 },
  play: async ({ canvasElement }) => {
    const label = await within(canvasElement).findByText("Target")
    label.focus()
  },
}

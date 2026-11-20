import { within } from "storybook/test"
import type { Meta, StoryObj } from "@storybook/nextjs"

import { ColumnSubnetsDiagram } from "."

const meta = {
  title: "Components / Data Viz / Diagrams / ColumnSubnets",
  component: ColumnSubnetsDiagram,
  tags: ["autodocs"],
  args: { fig: 2 },
  parameters: {
    layout: "padded",
    // No Chromatic snapshots: the anatomy and shell stories cover the visuals.
    chromatic: { disableSnapshot: true, modes: { lg: { viewport: "lg" } } },
    docs: {
      description: {
        component:
          "Interactive replacement for `subnets.png` on `/roadmap/fusaka/peerdas/`, used in markdown as `<ColumnSubnetsDiagram />`. A flat 2D drawing: the extended blob matrix (16 drawn columns for the real 128), a subnet per column (column n on subnet n, 0-127) and three nodes. Choose a node: A (no validators, custody 4), B (validators, custody 8) or C (supernode, all 128). Steps: custody from the node ID (1), sampling at least 8 columns (2), and a supernode rebuilding the missing half (3). Column numbers are real `get_custody_groups` outputs for example node IDs.",
      },
    },
  },
} satisfies Meta<typeof ColumnSubnetsDiagram>

export default meta

type Story = StoryObj<typeof meta>

export const Idle: Story = {}

export const Step1Custody: Story = { args: { initialStep: 1 } }

export const Step2Sample: Story = { args: { initialStep: 2 } }

export const Step3Rebuild: Story = { args: { initialStep: 3 } }

export const ValidatorNode: Story = {
  args: { initialPreset: "b", initialStep: 2 },
}

export const Supernode: Story = {
  args: { initialPreset: "c", initialStep: 1 },
}

export const Dark: Story = {
  globals: { theme: "dark" },
  args: { initialStep: 2 },
}

export const Rtl: Story = {
  globals: { locale: "ar" },
  args: { initialStep: 2 },
}

export const Mobile: Story = {
  globals: { viewport: { value: "base", isRotated: false } },
  args: { initialStep: 2 },
  parameters: {
    chromatic: {
      modes: { lg: { disable: true }, base: { viewport: "base" } },
    },
  },
}

/** Focusing a label highlights its part and shows its definition in the status line. */
export const HoverPart: Story = {
  args: { initialStep: 1 },
  play: async ({ canvasElement }) => {
    const label = await within(canvasElement).findByText("Subnets")
    label.focus()
  },
}

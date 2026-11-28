import { within } from "storybook/test"
import type { Meta, StoryObj } from "@storybook/nextjs"

import VendingMachineDiagram from "."

const meta = {
  title: "Components / Data Viz / Diagrams / VendingMachine",
  component: VendingMachineDiagram,
  tags: ["autodocs"],
  args: { fig: 1 },
  parameters: {
    layout: "padded",
    // No Chromatic snapshots: the anatomy and shell stories cover the visuals.
    chromatic: { disableSnapshot: true, modes: { lg: { viewport: "lg" } } },
    docs: {
      description: {
        component:
          "Beginner figure for the vending-machine section of `/smart-contracts/`, used in markdown as `<VendingMachineDiagram />`. A flat front view, not isometric: choose a cupcake (1), pay (2), the machine checks its rules, paid at least the price and in stock (3), then releases the cupcake or undoes the purchase and returns the money (4). The rules mirror `purchase()` in the Solidity example on `/developers/docs/smart-contracts/`.",
      },
    },
  },
} satisfies Meta<typeof VendingMachineDiagram>

export default meta

type Story = StoryObj<typeof meta>

export const Idle: Story = {}

export const Step1Choose: Story = { args: { initialStep: 1 } }

export const Step2Pay: Story = { args: { initialStep: 2 } }

export const Step3Check: Story = { args: { initialStep: 3 } }

export const Step4Released: Story = { args: { initialStep: 4 } }

export const NotEnoughMoney: Story = {
  args: { initialPreset: "short", initialStep: 4 },
}

export const SoldOut: Story = {
  args: { initialPreset: "sold-out", initialStep: 4 },
}

export const Dark: Story = {
  globals: { theme: "dark" },
  args: { initialPreset: "short", initialStep: 4 },
}

export const Rtl: Story = {
  globals: { locale: "ar" },
  args: { initialStep: 3 },
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
  args: { initialStep: 2 },
  play: async ({ canvasElement }) => {
    const label = await within(canvasElement).findByText("Coin slot")
    label.focus()
  },
}

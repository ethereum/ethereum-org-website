import { within } from "storybook/test"
import type { Meta, StoryObj } from "@storybook/nextjs"

import WebErasDiagram from "."

const meta = {
  title: "Components / Data Viz / Diagrams / WebEras",
  component: WebErasDiagram,
  tags: ["autodocs"],
  args: { fig: 1 },
  parameters: {
    layout: "padded",
    // No Chromatic snapshots: the anatomy and shell stories cover the visuals.
    chromatic: { disableSnapshot: true, modes: { lg: { viewport: "lg" } } },
    docs: {
      description: {
        component:
          "Interactive replacement for `web1.png`, `web2.png` and `web3.png` on `/web3/`, used in markdown as `<WebErasDiagram />`. A flat beginner drawing: people and a web server (web1), a platform's central servers and advertisers (web2), or a network of nodes and accounts people control (web3). Choose an era, then step through the same three questions: who stores your data (1), who can lock you out (2) and where the money goes (3).",
      },
    },
  },
} satisfies Meta<typeof WebErasDiagram>

export default meta

type Story = StoryObj<typeof meta>

export const Idle: Story = {}

export const Step1Data: Story = { args: { initialStep: 1 } }

export const Step2Access: Story = { args: { initialStep: 2 } }

export const Step3Money: Story = { args: { initialStep: 3 } }

export const Web2: Story = { args: { initialPreset: "web2", initialStep: 2 } }

export const Web3: Story = { args: { initialPreset: "web3", initialStep: 2 } }

export const Dark: Story = {
  globals: { theme: "dark" },
  args: { initialPreset: "web3", initialStep: 3 },
}

export const Rtl: Story = {
  globals: { locale: "ar" },
  args: { initialPreset: "web2", initialStep: 2 },
}

export const Mobile: Story = {
  globals: { viewport: { value: "base", isRotated: false } },
  args: { initialPreset: "web3", initialStep: 1 },
  parameters: {
    chromatic: {
      modes: { lg: { disable: true }, base: { viewport: "base" } },
    },
  },
}

/** Focusing a label highlights its part and shows its definition in the status line. */
export const HoverPart: Story = {
  args: { initialPreset: "web2" },
  play: async ({ canvasElement }) => {
    const label = await within(canvasElement).findByText("Platform")
    label.focus()
  },
}

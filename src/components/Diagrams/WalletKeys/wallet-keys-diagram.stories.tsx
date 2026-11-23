import { within } from "storybook/test"
import type { Meta, StoryObj } from "@storybook/nextjs"

import WalletKeysDiagram from "."

const meta = {
  title: "Components / Data Viz / Diagrams / WalletKeys",
  component: WalletKeysDiagram,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    // No Chromatic snapshots: the anatomy and shell stories cover the visuals.
    chromatic: { disableSnapshot: true, modes: { lg: { viewport: "lg" } } },
    docs: {
      description: {
        component:
          "Beginner figure on `/wallets/`: a recovery phrase makes a private key, the private key a public key, and the public key an address, each arrow one-way. Three views: make the keys, who can see this (secret vs safe to share), and try going backward (every reverse arrow blocked). A flat 2D drawing with made-up, truncated hex values.",
      },
    },
  },
} satisfies Meta<typeof WalletKeysDiagram>

export default meta

type Story = StoryObj<typeof meta>

export const Idle: Story = {}

export const Step1PrivateKey: Story = { args: { initialStep: 1 } }

export const Step2PublicKey: Story = { args: { initialStep: 2 } }

export const Step3Address: Story = { args: { initialStep: 3 } }

export const WhoCanSeeThis: Story = {
  args: { initialPreset: "visibility", initialStep: 3 },
}

export const TryGoingBackward: Story = {
  args: { initialPreset: "backward", initialStep: 3 },
}

export const Dark: Story = {
  globals: { theme: "dark" },
  args: { initialPreset: "visibility", initialStep: 2 },
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
  args: { initialStep: 3 },
  play: async ({ canvasElement }) => {
    const label = await within(canvasElement).findByText("Address")
    label.focus()
  },
}

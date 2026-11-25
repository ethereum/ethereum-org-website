import { within } from "storybook/test"
import type { Meta, StoryObj } from "@storybook/nextjs"

import MerkleProofDiagram from "."

const meta = {
  title: "Components / Data Viz / Diagrams / MerkleProof",
  component: MerkleProofDiagram,
  tags: ["autodocs"],
  args: { fig: 1 },
  parameters: {
    layout: "padded",
    // No Chromatic snapshots: the anatomy and shell stories cover the visuals.
    chromatic: { disableSnapshot: true, modes: { lg: { viewport: "lg" } } },
    docs: {
      description: {
        component:
          "Interactive replacement for `tree.png` and `proof-c.png` on the Merkle proofs tutorial, used in markdown as `<MerkleProofDiagram />`. A flat drawing of the article's eight-leaf tree in the shared diagram shell: the value to prove and its proof (1), combined with one sibling hash per level (2-4), then the computed root compared with the stored `merkleRoot` (5). Hashes are real keccak256 values precomputed with the article's `pairHash`; the \"Changed C\" preset shows the check failing.",
      },
    },
  },
} satisfies Meta<typeof MerkleProofDiagram>

export default meta

type Story = StoryObj<typeof meta>

export const Idle: Story = {}

export const Step1Value: Story = { args: { initialStep: 1 } }

export const Step2FirstLevel: Story = { args: { initialStep: 2 } }

export const Step3SecondLevel: Story = { args: { initialStep: 3 } }

export const Step4CandidateRoot: Story = { args: { initialStep: 4 } }

export const Step5Compare: Story = { args: { initialStep: 5 } }

export const ProveF: Story = { args: { initialPreset: "f", initialStep: 5 } }

export const Tampered: Story = {
  args: { initialPreset: "tampered", initialStep: 5 },
}

export const Dark: Story = {
  globals: { theme: "dark" },
  args: { initialStep: 3 },
}

export const DarkTampered: Story = {
  globals: { theme: "dark" },
  args: { initialPreset: "tampered", initialStep: 5 },
}

export const Rtl: Story = {
  globals: { locale: "ar" },
  args: { initialStep: 4 },
}

export const Mobile: Story = {
  globals: { viewport: { value: "base", isRotated: false } },
  args: { initialStep: 5 },
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
    const label = await within(canvasElement).findByText("Proof")
    label.focus()
  },
}

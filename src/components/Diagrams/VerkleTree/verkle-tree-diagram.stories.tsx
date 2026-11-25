import { within } from "storybook/test"
import type { Meta, StoryObj } from "@storybook/nextjs"

import VerkleTreeDiagram from "."

const meta = {
  title: "Components / Data Viz / Diagrams / VerkleTree",
  component: VerkleTreeDiagram,
  tags: ["autodocs"],
  args: { fig: 1 },
  parameters: {
    layout: "padded",
    // No Chromatic snapshots: the anatomy and shell stories cover the visuals.
    chromatic: { disableSnapshot: true, modes: { lg: { viewport: "lg" } } },
    docs: {
      description: {
        component:
          "Interactive replacement for `verkle.png` on `/roadmap/verkle-trees/`, used in markdown as `<VerkleTreeDiagram />`. A flat (not isometric) drawing in the shared diagram shell. Verkle: the key's 31-byte stem routes down the stem tree (1) to the stem's extension node, a commitment to (1, stem, C1, C2) (2); the 1-byte suffix picks C1 (suffixes 0-127) or C2 (128-255) (3); the 32-byte value is stored as value_lower and value_upper (4); the proof carries one commitment per level plus one opening proof (5). Merkle: the same lookup in a hexary Patricia trie, whose proof carries 15 sibling hashes per level. Facts follow EIP-6800.",
      },
    },
  },
} satisfies Meta<typeof VerkleTreeDiagram>

export default meta

type Story = StoryObj<typeof meta>

export const Idle: Story = {}

export const Step1Stem: Story = { args: { initialStep: 1 } }

export const Step2Extension: Story = { args: { initialStep: 2 } }

export const Step3Suffix: Story = { args: { initialStep: 3 } }

export const Step4Value: Story = { args: { initialStep: 4 } }

export const Step5Proof: Story = { args: { initialStep: 5 } }

export const MerklePath: Story = {
  args: { initialPreset: "merkle", initialStep: 1 },
}

export const MerkleProof: Story = {
  args: { initialPreset: "merkle", initialStep: 3 },
}

export const Dark: Story = {
  globals: { theme: "dark" },
  args: { initialStep: 5 },
}

export const DarkMerkle: Story = {
  globals: { theme: "dark" },
  args: { initialPreset: "merkle", initialStep: 3 },
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
    const label = await within(canvasElement).findByText("Suffix tree")
    label.focus()
  },
}

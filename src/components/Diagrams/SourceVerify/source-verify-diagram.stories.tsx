import { within } from "storybook/test"
import type { Meta, StoryObj } from "@storybook/nextjs"

import SourceVerifyDiagram from "."

const meta = {
  title: "Components / Data Viz / Diagrams / SourceVerify",
  component: SourceVerifyDiagram,
  tags: ["autodocs"],
  args: { fig: 1 },
  parameters: {
    layout: "padded",
    // No Chromatic snapshots: the anatomy and shell stories cover the visuals.
    chromatic: { disableSnapshot: true, modes: { lg: { viewport: "lg" } } },
    docs: {
      description: {
        component:
          "Interactive replacement for `source-code-verification.png` on `/developers/docs/smart-contracts/verifying/`, used in markdown as `<SourceVerifyDiagram />`. The verifier recompiles the published sources with their settings (1), reads the deployed code with `eth_getCode` (2), compares the code without the metadata hash (3), then the metadata hashes (4). Scenarios: the same sources (exact match), an edited comment (match: same code, different metadata hash) and edited code (not verified). Match names follow Sourcify's current terms.",
      },
    },
  },
} satisfies Meta<typeof SourceVerifyDiagram>

export default meta

type Story = StoryObj<typeof meta>

export const Idle: Story = {}

export const Step1Compile: Story = { args: { initialStep: 1 } }

export const Step2Fetch: Story = { args: { initialStep: 2 } }

export const Step3Compare: Story = { args: { initialStep: 3 } }

export const Step4Metadata: Story = { args: { initialStep: 4 } }

export const EditedComment: Story = {
  args: { initialPreset: "comment", initialStep: 4 },
}

export const EditedCode: Story = {
  args: { initialPreset: "code", initialStep: 3 },
}

export const EditedCodeMetadata: Story = {
  args: { initialPreset: "code", initialStep: 4 },
}

export const Dark: Story = {
  globals: { theme: "dark" },
  args: { initialPreset: "comment", initialStep: 4 },
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
    const label = await within(canvasElement).findByText("Metadata hash")
    label.focus()
  },
}

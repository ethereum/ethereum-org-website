import { within } from "storybook/test"
import type { Meta, StoryObj } from "@storybook/nextjs"

import { KeyDerivationDiagram } from "."

const meta = {
  title: "Components / Data Viz / Diagrams / KeyDerivation",
  component: KeyDerivationDiagram,
  tags: ["autodocs"],
  args: { fig: 2 },
  parameters: {
    layout: "padded",
    // No Chromatic snapshots: the anatomy and shell stories cover the visuals.
    chromatic: { disableSnapshot: true, modes: { lg: { viewport: "lg" } } },
    docs: {
      description: {
        component:
          "Interactive replacement for `multiple-keys.png` on `/developers/docs/consensus-mechanisms/pos/keys/`, used in markdown as `<KeyDerivationDiagram />`. The `ValidatorKeysDiagram` drawing with a mnemonic in the wallet's place: the mnemonic becomes the master key m, a node where the paths branch (1); m's paths derive one withdrawal key per validator at `m/12381/3600/i/0` (2); a short pipe from each withdrawal key derives its validator's signing key at `m/12381/3600/i/0/0` (3, EIP-2334); one mnemonic backs up every key (4). The PNG's one-withdrawal-key-per-two-validators tree predates EIP-2334 and isn't reproduced. Path readout rows are `code` rows, so they may wrap.",
      },
    },
  },
} satisfies Meta<typeof KeyDerivationDiagram>

export default meta

type Story = StoryObj<typeof meta>

export const Idle: Story = {}

export const Step1Seed: Story = { args: { initialStep: 1 } }

export const Step2WithdrawalKeys: Story = { args: { initialStep: 2 } }

export const Step3SigningKeys: Story = { args: { initialStep: 3 } }

export const Step4Validators: Story = { args: { initialStep: 4 } }

export const Dark: Story = {
  globals: { theme: "dark" },
  args: { initialStep: 3 },
}

export const Rtl: Story = {
  globals: { locale: "ar" },
  args: { initialStep: 3 },
}

export const Mobile: Story = {
  globals: { viewport: { value: "base", isRotated: false } },
  args: { initialStep: 3 },
}

/** Focusing a label highlights its part and shows its definition in the status line. */
export const HoverPart: Story = {
  args: { initialStep: 3 },
  play: async ({ canvasElement }) => {
    const label = await within(canvasElement).findByText("Withdrawal keys")
    label.focus()
  },
}

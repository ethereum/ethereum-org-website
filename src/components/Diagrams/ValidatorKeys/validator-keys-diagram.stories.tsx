import { within } from "storybook/test"
import type { Meta, StoryObj } from "@storybook/nextjs"

import ValidatorKeysDiagram from "."

const meta = {
  title: "Components / Data Viz / Diagrams / ValidatorKeys",
  component: ValidatorKeysDiagram,
  tags: ["autodocs"],
  args: { fig: 1 },
  parameters: {
    layout: "padded",
    // No Chromatic snapshots: the anatomy and shell stories cover the visuals.
    chromatic: { disableSnapshot: true, modes: { lg: { viewport: "lg" } } },
    docs: {
      description: {
        component:
          "Interactive replacement for `validator-key-schematic.png` on `/developers/docs/consensus-mechanisms/pos/keys/`, used in markdown as `<ValidatorKeysDiagram />`. One wallet deposits 32 ETH for each of three validators (1), the beacon chain activates them (2), each signs with its own signing key (3), and step 4 follows the withdrawal credentials: `0x00` (each withdrawal key, a slab on the plate beside its validator, signs a `BLSToExecutionChange` for the beacon chain; the withdrawal address link appears only then), `0x01` (excess balance swept to the wallet) or `0x02` (rewards compound on each validator's balance up to 2048 ETH). `0x01` and `0x02` have no BLS withdrawal key, so the slabs are hidden. Deposits and swept ETH flow orange as value, as in TxApply. Shares its drawing with `KeyDerivationDiagram`; figure differences live in the model's view, not the rig.",
      },
    },
  },
} satisfies Meta<typeof ValidatorKeysDiagram>

export default meta

type Story = StoryObj<typeof meta>

export const Idle: Story = {}

export const Step1Deposit: Story = { args: { initialStep: 1 } }

export const Step2Activate: Story = { args: { initialStep: 2 } }

export const Step3Sign: Story = { args: { initialStep: 3 } }

export const Step4Withdraw: Story = { args: { initialStep: 4 } }

export const AddressCredentials: Story = {
  args: { initialPreset: "address", initialStep: 4 },
}

export const CompoundingCredentials: Story = {
  args: { initialPreset: "compounding", initialStep: 4 },
}

export const Dark: Story = {
  globals: { theme: "dark" },
  args: { initialStep: 4 },
}

export const Rtl: Story = {
  globals: { locale: "ar" },
  args: { initialStep: 2 },
}

export const Mobile: Story = {
  globals: { viewport: { value: "base", isRotated: false } },
  args: { initialStep: 2 },
}

/** Focusing a label highlights its part and shows its definition in the status line. */
export const HoverPart: Story = {
  args: { initialStep: 3 },
  play: async ({ canvasElement }) => {
    const label = await within(canvasElement).findByText("Signing keys")
    label.focus()
  },
}

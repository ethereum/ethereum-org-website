import { within } from "storybook/test"
import type { Meta, StoryObj } from "@storybook/nextjs"

import AccountsDiagram from "."

const meta = {
  title: "Components / Data Viz / Diagrams / Accounts",
  component: AccountsDiagram,
  tags: ["autodocs"],
  args: { fig: 1 },
  parameters: {
    layout: "padded",
    // Only key states snapshot (opted in per story): idle, final,
    // failure end state, dark, RTL and mobile.
    chromatic: { disableSnapshot: true, modes: { lg: { viewport: "lg" } } },
    docs: {
      description: {
        component:
          "Interactive replacement for `accounts.png` on `/developers/docs/accounts/`, used in markdown as `<AccountsDiagram />`. Reads left to right like the original: the address leads into the account state, a stack of four slabs (nonce, balance, storageRoot, codeHash), and the two hash slabs pipe out to the account storage (a tank) and the EVM code (a block). Steps: the address (1), nonce and balance (2), storageRoot and storage (3), codeHash and code (4). Presets compare an externally owned account (the page's example address; empty storage, so the empty trie root; no code, so the hash of empty input) with a contract account (made-up values, nonce 1 per EIP-161). The balance shows in ETH in the readout and in exact wei in the step caption.",
      },
    },
  },
} satisfies Meta<typeof AccountsDiagram>

export default meta

type Story = StoryObj<typeof meta>

export const Idle: Story = {
  parameters: { chromatic: { disableSnapshot: false } },
}

export const Step1Address: Story = { args: { initialStep: 1 } }

export const Step2State: Story = { args: { initialStep: 2 } }

export const Step3Storage: Story = { args: { initialStep: 3 } }

export const Step4Code: Story = {
  args: { initialStep: 4 },
  parameters: { chromatic: { disableSnapshot: false } },
}

export const ContractIdle: Story = { args: { initialPreset: "contract" } }

export const ContractStorage: Story = {
  args: { initialPreset: "contract", initialStep: 3 },
}

export const ContractCode: Story = {
  args: { initialPreset: "contract", initialStep: 4 },
}

export const Dark: Story = {
  globals: { theme: "dark" },
  args: { initialPreset: "contract", initialStep: 3 },
  parameters: { chromatic: { disableSnapshot: false } },
}

export const DarkEoa: Story = {
  globals: { theme: "dark" },
  args: { initialStep: 4 },
}

export const Rtl: Story = {
  globals: { locale: "ar" },
  args: { initialPreset: "contract", initialStep: 2 },
  parameters: { chromatic: { disableSnapshot: false } },
}

export const Mobile: Story = {
  globals: { viewport: { value: "base", isRotated: false } },
  args: { initialPreset: "contract", initialStep: 4 },
  parameters: {
    chromatic: {
      disableSnapshot: false,
      modes: { lg: { disable: true }, base: { viewport: "base" } },
    },
  },
}

/** Focusing a label highlights its part and shows its definition in the status line. */
export const HoverPart: Story = {
  args: { initialPreset: "contract", initialStep: 3 },
  play: async ({ canvasElement }) => {
    const label = await within(canvasElement).findByText("Account state")
    label.focus()
  },
}

export const HoverPartDark: Story = {
  ...HoverPart,
  globals: { theme: "dark" },
}

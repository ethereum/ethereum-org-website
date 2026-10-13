import { CodeXml, Database, User } from "lucide-react"
import type { Meta, StoryObj } from "@storybook/nextjs"

import { DiagramNode } from "./diagram-node"

const meta = {
  title: "Components / Data Viz / Diagrams / Node",
  component: DiagramNode,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    chromatic: { disableSnapshot: true },
    docs: {
      description: {
        component:
          'A box in a devdocs diagram. `tone="entity"` (blue) is an actor or account; `tone="state"` (orange) is data or state; `tone="chip"` is a sub-box nested inside another node. Text wraps instead of clipping, so give it a grid cell, not a fixed width.\n\nPass `definition` to make the node a focusable Tooltip trigger. When the node has children, only the label becomes the trigger, so nested nodes and badges keep their own tooltips.',
      },
    },
  },
  args: { label: "Externally owned account" },
} satisfies Meta<typeof DiagramNode>

export default meta

type Story = StoryObj<typeof meta>

export const Entity: Story = {}

export const State: Story = { args: { tone: "state", label: "Account state" } }

export const WithDefinition: Story = {
  args: {
    definition:
      "An account controlled by a private key. It pays for the gas and gets any unused gas back.",
  },
}

export const Variants: Story = {
  parameters: { chromatic: { disableSnapshot: false } },
  render: () => (
    <div className="grid max-w-3xl grid-cols-2 gap-4 md:grid-cols-3">
      <DiagramNode label="Transaction" />
      <DiagramNode tone="state" label="Nonce" />
      <DiagramNode icon={<Database />} label="Account storage" />
      <DiagramNode shape="circle" icon={<User />} label="You" />
      <DiagramNode shape="pill" tone="state" label="Validator 0" />
      <DiagramNode label="Contract account" className="gap-3">
        <DiagramNode
          tone="chip"
          layout="inline"
          icon={<CodeXml />}
          label="EVM code"
        />
      </DiagramNode>
    </div>
  ),
}

export const LongLabels: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "German-length strings in narrow cells wrap and hyphenate rather than overflow.",
      },
    },
  },
  render: () => (
    <div className="grid w-80 grid-cols-2 gap-3">
      <DiagramNode label="Extern kontrolliertes Konto" />
      <DiagramNode tone="state" label="Speicher-Hashwert des Kontos" />
    </div>
  ),
}

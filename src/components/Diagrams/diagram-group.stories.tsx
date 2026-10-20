import type { Meta, StoryObj } from "@storybook/nextjs"

import { DiagramGroup } from "./diagram-group"
import { DiagramNode } from "./diagram-node"

const meta = {
  title: "Components / Data Viz / Diagrams / Group",
  component: DiagramGroup,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    chromatic: { disableSnapshot: true },
    docs: {
      description: {
        component:
          'Container for related nodes. `variant="outlined"` is a neutral grey scope boundary ("World state"); `variant="dashed"` groups related nodes and takes a `tone` (orange `state` or blue `entity`). The optional `title` is a bold mono `<p>`, never a heading, so diagrams stay out of the page outline.',
      },
    },
  },
  args: {
    title: "World state",
    children: (
      <div className="grid grid-cols-2 gap-3">
        <DiagramNode label="Externally owned account" />
        <DiagramNode label="Contract account" />
      </div>
    ),
  },
} satisfies Meta<typeof DiagramGroup>

export default meta

type Story = StoryObj<typeof meta>

export const Outlined: Story = {}

export const Variants: Story = {
  parameters: { chromatic: { disableSnapshot: false } },
  render: () => (
    <div className="flex max-w-xl flex-col gap-6">
      <DiagramGroup variant="outlined" title="World state">
        <DiagramNode label="Account" />
      </DiagramGroup>
      <DiagramGroup variant="dashed" tone="state" title="Account state">
        <div className="flex flex-col gap-2">
          <DiagramNode tone="state" label="Nonce" />
          <DiagramNode tone="state" label="Balance" />
        </div>
      </DiagramGroup>
      <DiagramGroup variant="dashed" tone="entity" title="Local node">
        <DiagramNode label="Consensus client" />
      </DiagramGroup>
    </div>
  ),
}

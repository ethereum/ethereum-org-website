import type { Meta, StoryObj } from "@storybook/nextjs"

import { DiagramConnector, DiagramElbow } from "./diagram-connector"
import { DiagramNode } from "./diagram-node"

const meta = {
  title: "Components / Data Viz / Diagrams / Connector",
  component: DiagramConnector,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    chromatic: { disableSnapshot: true },
    docs: {
      description: {
        component:
          'Grey line between two diagram cells: solid for calls, dashed for messages and flows. It stretches to fill its own grid/flex lane, so no coordinates or JS measuring are involved. `start`/`end` follow reading direction and mirror in RTL. `orientation="responsive"` is vertical below `md` and horizontal from `md`.\n\n`lineClassName` and `tokenClassName` are the animation hooks: a one-shot `stroke-dashoffset` flow on the line, and a travelling dot. Both are inert under `prefers-reduced-motion`.\n\n`DiagramElbow` draws a static rounded L with logical borders, for trees and bends. It is not animatable.',
      },
    },
  },
} satisfies Meta<typeof DiagramConnector>

export default meta

type Story = StoryObj<typeof meta>

export const Inline: Story = {
  args: { label: "Message", line: "dashed" },
  render: (args) => (
    <div className="grid max-w-xl grid-cols-[1fr_1.5fr_1fr] items-center gap-2">
      <DiagramNode label="Sender" />
      <DiagramConnector {...args} />
      <DiagramNode label="Contract" />
    </div>
  ),
}

export const Variants: Story = {
  parameters: { chromatic: { disableSnapshot: false } },
  render: () => (
    <div className="flex max-w-xl flex-col gap-6">
      <DiagramConnector />
      <DiagramConnector line="dashed" />
      <DiagramConnector arrow="start" line="dashed" />
      <DiagramConnector arrow="both" label="Engine API" />
      <DiagramConnector arrow="none" />
      <DiagramConnector line="dashed" label="web3.eth" />
      <DiagramConnector line="dashed" label="Message" labelPlacement="before" />
      <div className="flex h-32 gap-8">
        <DiagramConnector orientation="block" />
        <DiagramConnector orientation="block" arrow="start" line="dashed" />
        <DiagramConnector orientation="block" arrow="both" label="Gossip" />
      </div>
    </div>
  ),
}

export const Elbows: Story = {
  parameters: { chromatic: { disableSnapshot: false } },
  render: () => (
    <div className="grid max-w-md grid-cols-2 gap-8">
      <DiagramElbow from="top" to="end" className="h-16" />
      <DiagramElbow from="top" to="start" className="h-16" line="dashed" />
      <DiagramElbow from="bottom" to="end" className="h-16" />
      <DiagramElbow from="bottom" to="start" className="h-16" arrow="none" />
    </div>
  ),
}

export const TravellingToken: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`tokenClassName="block"` shows the dot permanently; diagrams instead pass a `group-data-[...]` class so it only appears (and animates once) during its step. Chromatic snapshots run with reduced motion, so the dot is hidden there.',
      },
    },
  },
  render: () => (
    <div className="flex max-w-xl flex-col gap-6">
      <DiagramConnector line="dashed" tokenClassName="block" />
      <DiagramConnector line="dashed" arrow="start" tokenClassName="block" />
    </div>
  ),
}

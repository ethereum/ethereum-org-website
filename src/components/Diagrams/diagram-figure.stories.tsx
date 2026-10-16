import type { Meta, StoryObj } from "@storybook/nextjs"

import { DiagramConnector } from "./diagram-connector"
import { DiagramFigure } from "./diagram-figure"
import { DiagramNode } from "./diagram-node"

const meta = {
  title: "Components / Data Viz / Diagrams / Figure",
  component: DiagramFigure,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    chromatic: { disableSnapshot: true },
    docs: {
      description: {
        component:
          "The `<figure>` shell every diagram uses: the drawing, a screen-reader-only `description` linked with `aria-describedby`, and a visible `caption` (`<figcaption>`). The description must narrate the whole flow -- it is the text alternative for the drawing.",
      },
    },
  },
  args: {
    caption: "A transaction moves the world state from t to t+1.",
    description:
      "World state at time t, an arrow labelled transaction, then world state at time t plus one.",
    children: (
      <div className="grid grid-cols-[1fr_1.5fr_1fr] items-center gap-2">
        <DiagramNode label="World state (t)" />
        <DiagramConnector line="dashed" label="Transaction" />
        <DiagramNode label="World state (t+1)" />
      </div>
    ),
  },
} satisfies Meta<typeof DiagramFigure>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: { chromatic: { disableSnapshot: false } },
}

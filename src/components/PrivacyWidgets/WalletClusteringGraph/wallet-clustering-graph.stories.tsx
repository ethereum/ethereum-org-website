import { Meta, StoryObj } from "@storybook/nextjs"

import { langViewportModes, variantMode } from "../../../../.storybook/modes"

import WalletClusteringGraph from "./wallet-clustering-graph-client"

const meta = {
  title: "Components / Privacy / WalletClusteringGraph",
  component: WalletClusteringGraph,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    chromatic: { modes: variantMode },
    docs: {
      description: {
        component:
          "Seven addresses joined into one cluster, one heuristic at a time, then named through a public ENS record. Labels are HTML placed by percentage, so their size never comes from string length; the SVG mirrors in RTL.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="max-w-4xl">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof WalletClusteringGraph>

export default meta

type Story = StoryObj<typeof meta>

export const Initial: Story = {
  parameters: { chromatic: { modes: langViewportModes } },
}

export const AfterTwoHeuristics: Story = {
  args: { initialStep: 2 },
}

export const Clustered: Story = {
  args: { initialStep: 4 },
}

export const Named: Story = {
  args: { initialStep: 5 },
}

export const LessonVariant: Story = {
  args: { variant: "lesson", initialStep: 1 },
}

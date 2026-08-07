import type { Meta, StoryObj } from "@storybook/nextjs"

import { PieChart } from "."

const meta = {
  title: "Molecules / Display Content / PieChart",
  component: PieChart,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof PieChart>

export default meta

type Story = StoryObj<typeof meta>

// Real client-diversity data (developers/docs/nodes-and-clients/client-diversity)
export const ExecutionClients: Story = {
  args: {
    data: [
      { name: "Geth", value: 41 },
      { name: "Nethermind", value: 38 },
      { name: "Besu", value: 16 },
      { name: "Erigon", value: 3 },
      { name: "Reth", value: 2 },
    ],
  },
}

export const ConsensusClients: Story = {
  args: {
    data: [
      { name: "Lighthouse", value: 42.71 },
      { name: "Prysm", value: 30.91 },
      { name: "Teku", value: 13.86 },
      { name: "Nimbus", value: 8.74 },
      { name: "Lodestar", value: 2.67 },
      { name: "Grandine", value: 1.04 },
      { name: "Other", value: 0.07 },
    ],
  },
}

export const FewSlices: Story = {
  args: {
    data: [
      { name: "Client A", value: 60 },
      { name: "Client B", value: 30 },
      { name: "Client C", value: 10 },
    ],
  },
}

export const LongLabels: Story = {
  args: {
    data: [
      { name: "A very long client name that should truncate", value: 50 },
      { name: "Another extremely verbose client label here", value: 30 },
      { name: "Short", value: 20 },
    ],
  },
}

export const WithTitleAndDescription: Story = {
  args: {
    title: "Execution client diversity",
    description: "Share of nodes by execution-layer client",
    data: [
      { name: "Geth", value: 41 },
      { name: "Nethermind", value: 38 },
      { name: "Besu", value: 16 },
      { name: "Erigon", value: 3 },
      { name: "Reth", value: 2 },
    ],
  },
}

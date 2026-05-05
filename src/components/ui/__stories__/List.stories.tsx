import type { Meta, StoryObj } from "@storybook/nextjs"

import { List, ListItem, OrderedList, UnorderedList } from "../list"

const meta = {
  title: "UI / List",
  component: List,
  parameters: {
    docs: {
      description: {
        component:
          "Prose lists. `UnorderedList` (alias of `List`) renders a `<ul>`, `OrderedList` renders an `<ol>`. Wrap items in `ListItem` for consistent spacing. Both lists use `asChild` via `Slot` to inherit semantics from the parent element.",
      },
    },
  },
} satisfies Meta<typeof List>

export default meta

type Story = StoryObj<typeof meta>

export const Unordered: Story = {
  render: () => (
    <UnorderedList className="list-disc">
      <ListItem>Smart contracts run on the EVM.</ListItem>
      <ListItem>Validators secure the network.</ListItem>
      <ListItem>Layer 2 rollups scale throughput.</ListItem>
    </UnorderedList>
  ),
}

export const Ordered: Story = {
  render: () => (
    <OrderedList className="list-decimal">
      <ListItem>Connect a wallet.</ListItem>
      <ListItem>Pick a layer 2 network.</ListItem>
      <ListItem>Bridge ETH to start transacting.</ListItem>
    </OrderedList>
  ),
}

export const Nested: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Nested lists pick up `mt-3` between parent `ListItem` and the nested list via the `[&_ol]:mt-3 [&_ul]:mt-3` selector on `ListItem`.",
      },
    },
  },
  render: () => (
    <UnorderedList className="list-disc">
      <ListItem>
        Layer 1
        <UnorderedList className="list-disc">
          <ListItem>Ethereum mainnet</ListItem>
        </UnorderedList>
      </ListItem>
      <ListItem>
        Layer 2
        <OrderedList className="list-decimal">
          <ListItem>Arbitrum One</ListItem>
          <ListItem>Base</ListItem>
          <ListItem>OP Mainnet</ListItem>
        </OrderedList>
      </ListItem>
    </UnorderedList>
  ),
}

export const PlainList: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Without an explicit `list-*` class the markers are hidden, leaving plain stacked items.",
      },
    },
  },
  render: () => (
    <List>
      <ListItem>First entry</ListItem>
      <ListItem>Second entry</ListItem>
      <ListItem>Third entry</ListItem>
    </List>
  ),
}

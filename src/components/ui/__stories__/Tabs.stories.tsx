import type { Meta, StoryObj } from "@storybook/nextjs"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../tabs"

const meta = {
  title: "UI / Primitives / Tabs",
  component: Tabs,
  parameters: {
    chromatic: { disableSnapshot: true },
    docs: {
      description: {
        component:
          "Tabbed navigation built on Radix Tabs. Wrap with `Tabs`, render labels in `TabsList` + `TabsTrigger`, and one `TabsContent` per tab keyed by `value`. Active state is driven by `value`/`defaultValue` on the root.",
      },
    },
  },
} satisfies Meta<typeof Tabs>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="overview" className="w-[480px]">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="details">Details</TabsTrigger>
        <TabsTrigger value="history">History</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        Overview content. Switch tabs to see other panels.
      </TabsContent>
      <TabsContent value="details">
        Details content. Each tab has its own panel.
      </TabsContent>
      <TabsContent value="history">
        History content. Panels are siblings keyed by `value`.
      </TabsContent>
    </Tabs>
  ),
}

export const WithDisabledTab: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Mark a tab unavailable with `disabled`. Disabled triggers are skipped during keyboard navigation.",
      },
    },
  },
  render: () => (
    <Tabs defaultValue="active" className="w-[480px]">
      <TabsList>
        <TabsTrigger value="active">Active</TabsTrigger>
        <TabsTrigger value="archived">Archived</TabsTrigger>
        <TabsTrigger value="deleted" disabled>
          Deleted
        </TabsTrigger>
      </TabsList>
      <TabsContent value="active">Showing active items.</TabsContent>
      <TabsContent value="archived">Showing archived items.</TabsContent>
      <TabsContent value="deleted">Deleted items are not shown.</TabsContent>
    </Tabs>
  ),
}

export const ManyPanels: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "The tab list scrolls horizontally on overflow (`overflow-x-auto`).",
      },
    },
  },
  render: () => (
    <Tabs defaultValue="ethereum" className="w-[640px]">
      <TabsList>
        <TabsTrigger value="ethereum">Ethereum</TabsTrigger>
        <TabsTrigger value="arbitrum">Arbitrum</TabsTrigger>
        <TabsTrigger value="base">Base</TabsTrigger>
        <TabsTrigger value="op">OP Mainnet</TabsTrigger>
        <TabsTrigger value="zksync">zkSync Era</TabsTrigger>
        <TabsTrigger value="linea">Linea</TabsTrigger>
        <TabsTrigger value="scroll">Scroll</TabsTrigger>
      </TabsList>
      <TabsContent value="ethereum">Ethereum mainnet.</TabsContent>
      <TabsContent value="arbitrum">Arbitrum One details.</TabsContent>
      <TabsContent value="base">Base details.</TabsContent>
      <TabsContent value="op">OP Mainnet details.</TabsContent>
      <TabsContent value="zksync">zkSync Era details.</TabsContent>
      <TabsContent value="linea">Linea details.</TabsContent>
      <TabsContent value="scroll">Scroll details.</TabsContent>
    </Tabs>
  ),
}

import type { Meta, StoryObj } from "@storybook/nextjs"

import { ScrollArea, ScrollBar } from "../scroll-area"

const meta = {
  title: "UI / Primitives / ScrollArea",
  component: ScrollArea,
  parameters: {
    docs: {
      description: {
        component:
          "Custom-styled scroll viewport built on Radix ScrollArea. Vertical scrollbar is wired by default; for horizontal scrolling, render an additional `ScrollBar orientation='horizontal'`.",
      },
    },
  },
} satisfies Meta<typeof ScrollArea>

export default meta

type Story = StoryObj<typeof meta>

const NETWORKS = [
  "Ethereum",
  "Arbitrum One",
  "Base",
  "OP Mainnet",
  "zkSync Era",
  "Linea",
  "Scroll",
  "Polygon zkEVM",
  "Mantle",
  "Mode",
  "Blast",
  "Manta Pacific",
  "Taiko",
  "Zora",
  "Fraxtal",
  "Lisk",
  "Cyber",
  "Mint",
  "Re.al",
  "Redstone",
]

export const VerticalScroll: Story = {
  render: () => (
    <ScrollArea className="h-[200px] w-[280px] rounded-md border p-4">
      <ul className="space-y-2 text-sm">
        {NETWORKS.map((network) => (
          <li key={network}>{network}</li>
        ))}
      </ul>
    </ScrollArea>
  ),
}

export const HorizontalScroll: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Render an explicit `ScrollBar orientation='horizontal'` and wrap content in a single-row flex container wider than the viewport.",
      },
    },
  },
  render: () => (
    <ScrollArea className="w-[480px] rounded-md border whitespace-nowrap">
      <div className="flex gap-4 p-4">
        {NETWORKS.map((network) => (
          <div
            key={network}
            className="shrink-0 rounded-md border bg-background-highlight px-4 py-2 text-sm"
          >
            {network}
          </div>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  ),
}

export const ShortContent: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "When content fits the viewport, the scrollbar is not visible. Useful as a sanity check for the `overflow-hidden` framing.",
      },
    },
  },
  render: () => (
    <ScrollArea className="h-[200px] w-[280px] rounded-md border p-4">
      <p className="text-sm">
        Short content does not trigger the scrollbar. The viewport keeps its
        rounded corners thanks to `rounded-[inherit]` on the inner viewport.
      </p>
    </ScrollArea>
  ),
}

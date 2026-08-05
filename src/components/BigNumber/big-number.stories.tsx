import type { Meta, StoryObj } from "@storybook/nextjs"

import { HStack } from "@/components/ui/flex"

import BigNumber from "."

const meta = {
  title: "Components / Data Viz / BigNumber",
  component: BigNumber,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    chromatic: { disableSnapshot: true },
    docs: {
      description: {
        component:
          "A single headline statistic with its caption, and optionally its provenance. When `sourceName`/`sourceUrl`/`lastUpdated` are supplied it renders an info tooltip attributing the figure -- pass them whenever the number comes from an external feed, since an unattributed statistic is the thing readers challenge.\n\nAn async server component: it awaits the locale to format `lastUpdated`. The `default` variant flexes to fill a row of siblings; `light` is the compact treatment for denser contexts.",
      },
    },
  },
} satisfies Meta<typeof BigNumber>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    value: "1,048,576",
    children: "Active validators securing the network",
  },
}

export const WithSource: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "With attribution, an info icon appears next to the caption; the tooltip carries the source link and the formatted last-updated date.",
      },
    },
  },
  args: {
    value: "1,048,576",
    children: "Active validators securing the network",
    sourceName: "beaconcha.in",
    sourceUrl: "https://beaconcha.in",
    lastUpdated: "2026-08-01T00:00:00.000Z",
  },
}

export const LightVariant: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`variant="light"` drops the responsive size bump and mutes the caption -- for denser groupings where the figure shouldn\'t dominate.',
      },
    },
  },
  args: {
    variant: "light",
    value: "32 ETH",
    children: "Required to run a solo validator",
  },
}

export const InARow: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "The `default` variant is `flex-1`, so siblings share a row evenly without width props.",
      },
    },
  },
  args: { children: "Active validators" },
  render: () => (
    <HStack className="w-full items-stretch gap-4">
      <BigNumber value="1,048,576">Active validators</BigNumber>
      <BigNumber value="32 ETH">Stake per validator</BigNumber>
      <BigNumber value="~12s">Slot time</BigNumber>
    </HStack>
  ),
}

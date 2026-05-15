import { Meta, StoryObj } from "@storybook/nextjs"

import InlineLink from "@/components/ui/Link"

import BannerNotification from "."

const meta = {
  title: "Components / Callouts / BannerNotification",
  component: BannerNotification,
  parameters: {
    chromatic: { disableSnapshot: true },
    layout: "fullscreen",
    docs: {
      description: {
        component:
          'Pre-unification visual reference for the existing `BannerNotification`. Renders a full-width primary-action bar at the top of the layout when `shouldShow` is true; returns an empty fragment otherwise. Consumed via `BaseLayout`. Slated to become `variant="notification"` on the unified `Callout` per #18133.',
      },
    },
  },
} satisfies Meta<typeof BannerNotification>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    shouldShow: true,
    children: (
      <span>
        Ethereum 10-year anniversary --{" "}
        <InlineLink href="/10-year-anniversary/">read the timeline</InlineLink>
      </span>
    ),
  },
}

export const WithIcon: Story = {
  args: {
    shouldShow: true,
    children: (
      <span>
        New: explore the layer-2 ecosystem on{" "}
        <InlineLink href="/layer-2/">our updated hub</InlineLink>.
      </span>
    ),
  },
}

export const Hidden: Story = {
  args: {
    shouldShow: false,
    children: <span>This banner is hidden because shouldShow is false.</span>,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Renders an empty fragment when `shouldShow` is false -- the banner is fully suppressed without taking layout space.",
      },
    },
  },
}

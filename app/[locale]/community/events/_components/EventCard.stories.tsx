import type { Meta, StoryObj } from "@storybook/nextjs"

import type { EventItem } from "@/lib/types"

import { VStack } from "@/components/ui/flex"

import EventCard from "./EventCard"

const meta = {
  title: "Molecules / Community / EventCard",
  component: EventCard,
  decorators: [
    (Story) => (
      <div className="max-w-[720px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof EventCard>

export default meta

type Story = StoryObj<typeof meta>

const baseEvent: EventItem = {
  id: "devconnect-buenos-aires",
  title: "Devconnect Buenos Aires",
  logoImage: "https://avatars.githubusercontent.com/u/6250754?v=4",
  bannerImage: "https://avatars.githubusercontent.com/u/6250754?v=4",
  startTime: "2026-11-17T09:00:00Z",
  endTime: "2026-11-22T18:00:00Z",
  location: "Buenos Aires, Argentina",
  link: "#",
  tags: ["conference"],
  eventTypes: ["conference"],
  eventTypesLabels: ["Conference"],
  isOnline: false,
  continent: "south-america",
  discord: null,
  telegram: null,
  twitter: null,
  farcaster: null,
}

const brokenEvent: EventItem = {
  ...baseEvent,
  id: "broken-image-event",
  logoImage: "https://placehold.co/404error",
  bannerImage: "https://placehold.co/404error",
}

export const Grid: Story = {
  args: {
    event: baseEvent,
    variant: "grid",
    showTypeTag: true,
  },
}

export const GridBrokenImageFallback: Story = {
  args: {
    event: brokenEvent,
    variant: "grid",
    showTypeTag: true,
  },
}

export const Highlight: Story = {
  args: {
    event: baseEvent,
    variant: "highlight",
  },
}

export const HighlightBrokenImageFallback: Story = {
  args: {
    event: brokenEvent,
    variant: "highlight",
  },
}

export const FallbackComparison: Story = {
  args: {
    event: brokenEvent,
    variant: "grid",
    showTypeTag: true,
  },
  render: () => (
    <VStack className="gap-6">
      <EventCard event={baseEvent} variant="grid" showTypeTag />
      <EventCard event={brokenEvent} variant="grid" showTypeTag />
      <EventCard event={baseEvent} variant="highlight" />
      <EventCard event={brokenEvent} variant="highlight" />
    </VStack>
  ),
}

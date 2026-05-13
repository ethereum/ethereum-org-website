import type { Meta, StoryObj } from "@storybook/nextjs"

import {
  Avatar,
  AvatarBase,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
} from "../avatar"
import { HStack, VStack } from "../flex"

const SAMPLE = {
  name: "Sam Richards",
  src: "https://avatars.githubusercontent.com/u/8097623?v=4",
  href: "#",
}

const meta = {
  title: "UI / Avatar",
  component: Avatar,
  args: SAMPLE,
  parameters: {
    docs: {
      description: {
        component:
          "User avatar built on Radix Avatar. `Avatar` is the high-level component (link + image + fallback + optional label). The lower-level `AvatarBase` + `AvatarImage` + `AvatarFallback` primitives are exposed for custom compositions. `AvatarGroup` stacks avatars with overlap and an optional `max` cap.",
      },
    },
  },
} satisfies Meta<typeof Avatar>

export default meta

type Story = StoryObj<typeof meta>

export const Sizes: Story = {
  parameters: { chromatic: { disableSnapshot: true } },
  args: SAMPLE,
  render: (args) => (
    <HStack className="items-center gap-4">
      {(["xs", "sm", "md", "lg"] as const).map((size) => (
        <Avatar key={size} size={size} {...args} />
      ))}
    </HStack>
  ),
}

export const WithLabel: Story = {
  parameters: { chromatic: { disableSnapshot: true } },
  args: {
    ...SAMPLE,
    href: "https://github.com/samajammin",
    label: "samajammin",
  },
  parameters: {
    docs: {
      description: {
        story:
          "When `label` is provided, the avatar renders alongside the label inside a `LinkBox`. `direction: 'row'` (default) is horizontal; `'column'` stacks vertically.",
      },
    },
  },
  render: (args) => (
    <HStack className="items-start gap-12">
      <VStack className="gap-4">
        {(["md", "sm", "xs"] as const).map((size, idx) => (
          <Avatar key={idx} size={size} {...args} />
        ))}
      </VStack>
      <VStack className="gap-4">
        {(["md", "sm", "xs"] as const).map((size, idx) => (
          <Avatar key={idx} size={size} direction="column" {...args} />
        ))}
      </VStack>
    </HStack>
  ),
}

export const Group: Story = {
  args: SAMPLE,
  parameters: {
    docs: {
      description: {
        story:
          "`AvatarGroup` overlaps avatars and renders a `+N` overflow fallback when `max` is exceeded.",
      },
    },
  },
  render: (args) => (
    <VStack className="items-start gap-4">
      {(["sm", "md"] as const).map((size) => (
        <AvatarGroup key={size} size={size} max={3}>
          <Avatar dataTest="one" {...args} />
          <Avatar dataTest="two" {...args} />
          <Avatar dataTest="three" {...args} />
          <Avatar {...args} />
        </AvatarGroup>
      ))}
    </VStack>
  ),
}

export const BrokenImageFallback: Story = {
  args: {
    ...SAMPLE,
    src: "https://placehold.co/404error",
  },
  parameters: {
    docs: {
      description: {
        story:
          "When the image fails to load, `Avatar` swaps to `AvatarImage` (which then falls back to `AvatarFallback` rendering the user's initials).",
      },
    },
  },
  render: (args) => (
    <HStack className="items-center gap-4">
      {(["xs", "sm", "md", "lg"] as const).map((size) => (
        <Avatar key={size} size={size} {...args} />
      ))}
    </HStack>
  ),
}

export const BasePrimitives: Story = {
  parameters: {
    chromatic: { disableSnapshot: true },
    docs: {
      description: {
        story:
          "`AvatarBase`, `AvatarImage`, and `AvatarFallback` exposed for custom compositions. Combine them when the high-level `Avatar` does not fit the use case.",
      },
    },
  },
  render: () => (
    <HStack className="items-center gap-4">
      <AvatarBase size="md">
        <AvatarImage src="https://avatars.githubusercontent.com/u/8097623?v=4" />
        <AvatarFallback>SR</AvatarFallback>
      </AvatarBase>
      <AvatarBase size="md">
        <AvatarImage src="" />
        <AvatarFallback>SR</AvatarFallback>
      </AvatarBase>
    </HStack>
  ),
}

export const FallbackOnly: Story = {
  parameters: {
    chromatic: { disableSnapshot: true },
    docs: {
      description: {
        story: "`AvatarFallback` rendered without an image source.",
      },
    },
  },
  render: () => (
    <HStack className="items-center gap-4">
      {(["xs", "sm", "md", "lg"] as const).map((size) => (
        <AvatarBase key={size} size={size}>
          <AvatarFallback>SR</AvatarFallback>
        </AvatarBase>
      ))}
    </HStack>
  ),
}

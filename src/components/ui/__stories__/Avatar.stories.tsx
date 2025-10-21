import type { Meta, StoryObj } from "@storybook/react"

import { Avatar, AvatarGroup } from "../avatar"
import { HStack, VStack } from "../flex"

const meta = {
  title: "Atoms / Media & Icons / Avatars",
  component: Avatar,
} satisfies Meta<typeof Avatar>

export default meta

type Story = StoryObj<typeof meta>

export const Single: Story = {
  args: {
    name: "Sam Richards",
    src: "https://avatars.githubusercontent.com/u/8097623?v=4",
    href: "#",
  },
  render: (args) => (
    <VStack className="gap-4">
      {(["lg", "md", "sm", "xs"] as const).map((size) => (
        <Avatar key={size} size={size} {...args} />
      ))}
    </VStack>
  ),
}

export const Group: Story = {
  args: {
    name: "Sam Richards",
    src: "https://avatars.githubusercontent.com/u/8097623?v=4",
    href: "#",
  },
  render: (args) => (
    <VStack className="gap-4">
      {(["sm", "xs"] as const).map((size) => (
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

export const WithUsername: Story = {
  args: {
    name: "Sam Richards",
    src: "https://avatars.githubusercontent.com/u/8097623?v=4",
    href: "https://github.com/samajammin",
    label: "samajammin",
  },
  render: (args) => (
    <HStack className="gap-4">
      <VStack>
        {(["md", "sm", "xs"] as const).map((size, idx) => (
          <Avatar key={idx} size={size} {...args} />
        ))}
      </VStack>
      <VStack>
        {(["md", "sm", "xs"] as const).map((size, idx) => (
          <Avatar key={idx} size={size} direction="column" {...args} />
        ))}
      </VStack>
    </HStack>
  ),
}

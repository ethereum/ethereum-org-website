import * as React from "react"
import { AvatarGroup, HStack, VStack } from "@chakra-ui/react"
import { Meta, StoryObj } from "@storybook/react"

import Avatar from "."

const meta = {
  title: "Atoms / Media & Icons / Avatars",
  component: Avatar,
} satisfies Meta<typeof Avatar>

export default meta

type Story = StoryObj<typeof meta>

export const Single: Story = {
  args: {
    name: "Dan Abrahmov",
    src: "https://bit.ly/dan-abramov",
    href: "#",
  },
  render: (args) => (
    <VStack spacing={4}>
      {["lg", "md", "sm", "xs"].map((size) => (
        <Avatar key={size} size={size} {...args} />
      ))}
    </VStack>
  ),
}

export const Group: Story = {
  args: {
    name: "Dan Abrahmov",
    src: "https://bit.ly/dan-abramov",
    href: "#",
  },
  render: (args) => (
    <VStack spacing={4}>
      {["sm", "xs"].map((size) => (
        <AvatarGroup key={size} size={size} max={3}>
          <Avatar {...args} />
          <Avatar {...args} />
          <Avatar {...args} />
          <Avatar {...args} />
        </AvatarGroup>
      ))}
    </VStack>
  ),
}

export const WithUsername: Story = {
  args: {
    name: "Dan Abrahmov",
    src: "https://bit.ly/dan-abramov",
    href: "#",
    label: "daneabrahmov",
  },
  render: (args) => (
    <HStack spacing={16}>
      <VStack>
        {["md", "sm"].map((size, idx) => (
          <Avatar key={idx} size={size} {...args} />
        ))}
      </VStack>
      <VStack>
        {["md", "sm"].map((size, idx) => (
          <Avatar key={idx} size={size} direction="column" {...args} />
        ))}
      </VStack>
    </HStack>
  ),
}

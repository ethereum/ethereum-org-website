import * as React from "react"
import { Meta, StoryObj } from "@storybook/react"
import { VStack, AvatarGroup, HStack } from "@chakra-ui/react"
import Avatar from "."

type AvatarType = typeof Avatar

const meta: Meta<AvatarType> = {
  title: "Atoms / Media & Icons / Avatars",
  component: Avatar,
}

export default meta

type Story = StoryObj<AvatarType>

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
        {["md", "sm"].map((size) => (
          <Avatar size={size} {...args} />
        ))}
      </VStack>
      <VStack>
        {["md", "sm"].map((size) => (
          <Avatar size={size} direction="column" {...args} />
        ))}
      </VStack>
    </HStack>
  ),
}

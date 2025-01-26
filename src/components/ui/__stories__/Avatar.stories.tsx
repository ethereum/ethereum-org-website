import type { Meta, StoryObj } from "@storybook/react"

import { Avatar } from "../avatar"
import { HStack, VStack } from "../flex"

const meta = {
  title: "Atoms / Media & Icons / UI Avatars",
  component: Avatar,
} satisfies Meta<typeof Avatar>

export default meta

type Story = StoryObj<typeof meta>

export const Single: Story = {
  args: {
    name: "dan abrahmov",
    src: "https://bit.ly/dan-abramov",
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

export const WithUsername: Story = {
  args: {
    name: "Dan Abrahmov",
    src: "http://bit.ly/dan-abramov",
    href: "http://bit.ly/dan-abramov",
    label: "daneabrahmov",
  },
  render: (args) => (
    <HStack className="gap-4">
      <VStack>
        {(["md", "sm"] as const).map((size, idx) => (
          <Avatar key={idx} size={size} {...args} />
        ))}
      </VStack>
      <VStack>
        {(["md", "sm"] as const).map((size, idx) => (
          <Avatar key={idx} size={size} direction="column" {...args} />
        ))}
      </VStack>
    </HStack>
  ),
}

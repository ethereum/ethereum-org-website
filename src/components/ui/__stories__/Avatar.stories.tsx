import type { Meta, StoryObj } from "@storybook/react"

import { Avatar } from "../avatar"
import { HStack } from "../flex"

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
  render: (args) => <Avatar {...args} />,
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
      <Avatar {...args} />
      <Avatar {...args} direction="column" />
    </HStack>
  ),
}

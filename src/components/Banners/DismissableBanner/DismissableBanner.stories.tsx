import React from "react"
import { FaInfoCircle } from "react-icons/fa"
import { Button, Center, Icon, Text } from "@chakra-ui/react"
import { Meta, StoryObj } from "@storybook/react"

import DismissableBanner from "."

const meta = {
  title: "DismissableBanner",
  component: DismissableBanner,
  parameters: {
    chromatic: { disableSnapshot: false },
  },
} satisfies Meta<typeof DismissableBanner>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  args: {
    storageKey: "dismissable-banner-1",
    children: <Center>This is a dismissable banner notification.</Center>,
  },
  render: (args) => <DismissableBanner {...args} />,
}

export const WithLongText: Story = {
  args: {
    storageKey: "dismissable-banner-5",
    children: (
      <Center>
        <Text>
          This is a dismissable banner with a very long text content to see how
          it handles overflow and wrapping. It should be able to manage the text
          properly without breaking the layout.
        </Text>
      </Center>
    ),
  },
  render: (args) => <DismissableBanner {...args} />,
}

export const WithIcon: Story = {
  args: {
    storageKey: "dismissable-banner-6",
    children: (
      <Center>
        <Icon as={FaInfoCircle} mr={2} />
        This banner includes an icon.
      </Center>
    ),
  },
  render: (args) => <DismissableBanner {...args} />,
}

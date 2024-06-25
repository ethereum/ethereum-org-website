import React from "react"
import { FaInfoCircle } from "react-icons/fa"
import { Center, Container, Icon, Text } from "@chakra-ui/react"
import { Meta, StoryObj } from "@storybook/react"

import DismissableBanner from "."

const meta = {
  title: "Molecules / Navigation / DismissableBanner",
  component: DismissableBanner,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <Container mx="auto" maxW="1504px">
        <Story />
      </Container>
    ),
  ],
} satisfies Meta<typeof DismissableBanner>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  args: {
    storageKey: "dismissable-banner-1",
    children: <Text>This is a dismissable banner notification.</Text>,
  },
}

export const WithLongText: Story = {
  args: {
    storageKey: "dismissable-banner-2",
    children: (
      <Text>
        This is a dismissable banner with a very long text content to see how it
        handles overflow and wrapping. It should be able to manage the text
        properly without breaking the layout.
      </Text>
    ),
  },
}

export const WithIcon: Story = {
  args: {
    storageKey: "dismissable-banner-3",
    children: (
      <Center>
        <Icon as={FaInfoCircle} mr={2} />
        This banner includes an icon.
      </Center>
    ),
  },
}

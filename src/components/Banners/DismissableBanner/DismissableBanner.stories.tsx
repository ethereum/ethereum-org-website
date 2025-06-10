import React from "react"
import { FaInfoCircle } from "react-icons/fa"
import { Meta, StoryObj } from "@storybook/react"

import { Center } from "@/components/ui/flex"

import DismissableBanner from "."

const meta = {
  title: "Molecules / Navigation / DismissableBanner",
  component: DismissableBanner,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div className="mx-auto max-w-[1504px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DismissableBanner>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  args: {
    storageKey: "dismissable-banner-1",
    children: <p>This is a dismissable banner notification.</p>,
  },
}

export const WithLongText: Story = {
  args: {
    storageKey: "dismissable-banner-2",
    children: (
      <p>
        This is a dismissable banner with a very long text content to see how it
        handles overflow and wrapping. It should be able to manage the text
        properly without breaking the layout.
      </p>
    ),
  },
}

export const WithIcon: Story = {
  args: {
    storageKey: "dismissable-banner-3",
    children: (
      <Center>
        <FaInfoCircle className="me-2" />
        This banner includes an icon.
      </Center>
    ),
  },
}

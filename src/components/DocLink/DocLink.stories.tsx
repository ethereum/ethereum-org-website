import * as React from "react"
import { VStack } from "@chakra-ui/react"
import { Meta, StoryObj } from "@storybook/react"

import DocLink from "."

const meta = {
  title: "Molecules / Navigation / DocLink",
  component: DocLink,
  tags: ["autodocs"],
} satisfies Meta<typeof DocLink>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    href: "/history/",
    children: "History of Ethereum",
  },
  render: (args) => (
    <VStack spacing={4} align="stretch">
      <DocLink {...args} />
    </VStack>
  ),
}

export const ExternalLink: Story = {
  args: {
    href: "https://ethereum.org",
    children: "Ethereum Website",
    isExternal: true,
  },
  render: (args) => (
    <VStack spacing={4} align="stretch">
      <DocLink {...args} />
    </VStack>
  ),
}

export const MultipleLinks: Story = {
  args: {
    href: "#",
  },
  render: () => (
    <VStack spacing={4} align="stretch">
      <DocLink href="/history/">History of Ethereum</DocLink>
      <DocLink href="https://ethereum.org" isExternal>
        Ethereum Website
      </DocLink>
      <DocLink href="/developers/docs/intro-to-ethereum/">
        Introduction to Ethereum
      </DocLink>
    </VStack>
  ),
}

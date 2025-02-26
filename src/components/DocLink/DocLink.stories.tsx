import { Meta, StoryObj } from "@storybook/react"

import { VStack } from "../ui/flex"

import DocLink from "."

const meta = {
  title: "Molecules / Navigation / DocLink",
  component: DocLink,
} satisfies Meta<typeof DocLink>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    href: "/history/",
    children: "History of Ethereum",
  },
}

export const ExternalLink: Story = {
  args: {
    href: "https://ethereum.org",
    children: "Ethereum Website",
    isExternal: true,
  },
}

export const MultipleLinks: Story = {
  args: {
    href: "#",
  },
  render: () => (
    <VStack className="items-stretch gap-4">
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

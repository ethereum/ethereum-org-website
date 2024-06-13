import * as React from "react"
import { Stack } from "@chakra-ui/react"
import { Meta, StoryObj } from "@storybook/react"

import SideNav from "./"

const docsLinks = [
  {
    id: "docs-nav-readme",
    to: "/developers/docs/",
  },
  {
    id: "docs-nav-foundational-topics",
    path: "/developers/docs/",
    items: [
      {
        id: "docs-nav-intro-to-ethereum",
        to: "/developers/docs/intro-to-ethereum/",
        description: "docs-nav-intro-to-ethereum-description",
      },
      {
        id: "docs-nav-intro-to-ether",
        to: "/developers/docs/intro-to-ether/",
        description: "docs-nav-intro-to-ether-description",
      },
      {
        id: "docs-nav-intro-to-dapps",
        to: "/developers/docs/dapps/",
        description: "docs-nav-intro-to-dapps-description",
      },
      {
        id: "docs-nav-evm",
        to: "/developers/docs/evm/",
        description: "docs-nav-evm-description",
        items: [
          {
            id: "docs-nav-opcodes",
            to: "/developers/docs/evm/opcodes/",
          },
        ],
      },
    ],
  },
  {
    id: "docs-nav-ethereum-stack",
    path: "/developers/docs/",
    items: [
      {
        id: "docs-nav-intro-to-the-stack",
        to: "/developers/docs/ethereum-stack/",
        description: "docs-nav-intro-to-the-stack-description",
      },
      {
        id: "docs-nav-smart-contracts",
        to: "/developers/docs/smart-contracts/",
        description: "docs-nav-smart-contracts-description",
      },
    ],
  },
]

const meta = {
  title: "Molecules / Navigation / SideNav",
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <Stack minH="100vh" w="256px" position="relative">
        <Story />
      </Stack>
    ),
  ],
} satisfies Meta<typeof SideNav>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  // @ts-expect-error FIXME fix docsLinks type
  render: () => <SideNav path="/" docLinks={docsLinks} />,
}

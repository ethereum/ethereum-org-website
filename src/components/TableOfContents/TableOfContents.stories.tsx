import { Stack } from "@chakra-ui/react"
import { Meta, StoryObj } from "@storybook/react"

import { ToCItem } from "@/lib/types"

import TableOfContents from "./"

const tocItems: ToCItem[] = [
  {
    title: "The early Web",
    url: "#early-internet",
    items: [
      { title: "Web 1.0: Read-Only (1990-2004)", url: "#web1" },
      { title: "Web 2.0: Read-Write (2004-now)", url: "#web2" },
    ],
  },
  {
    title: "Web 3.0: Read-Write-Own",
    url: "#web3",
    items: [
      {
        title: "What is Web3?",
        url: "#what-is-web3",
        items: [{ title: "Core ideas of Web3", url: "#core-ideas" }],
      },
      {
        title: "Why is Web3 important?",
        url: "#why-is-web3-important",
        items: [
          { title: "Ownership", url: "#ownership" },
          {
            title: "Censorship resistance",
            url: "#censorship-resistance",
          },
          {
            title: "Decentralized autonomous organizations (DAOs)",
            url: "#daos",
          },
        ],
      },
      { title: "Identity", url: "#identity" },
      {
        title: "Native payments",
        url: "#native-payments",
        items: [
          { title: "Cryptocurrency", url: "#cryptocurrency" },
          { title: "Micropayments", url: "#micropayments" },
          { title: "Tokenization", url: "#tokenization" },
        ],
      },
    ],
  },
  {
    title: "Web3 limitations",
    url: "#web3-limitations",
    items: [
      { title: "Accessibility", url: "#accessibility" },
      { title: "User experience", url: "#user-experience" },
      { title: "Education", url: "#education" },
      {
        title: "Centralized infrastructure",
        url: "#centralized-infrastructure",
      },
    ],
  },
  {
    title: "A decentralized future",
    url: "#decentralized-future",
  },
  { title: "How can I get involved", url: "#get-involved" },
  { title: "Further reading", url: "#further-reading" },
]

const meta = {
  title: "Molecules / Navigation / TableOfContents",
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <Stack minH="100vh" position="relative">
        <Story />
      </Stack>
    ),
  ],
} satisfies Meta<typeof TableOfContents>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <TableOfContents items={tocItems} maxDepth={2} />,
}

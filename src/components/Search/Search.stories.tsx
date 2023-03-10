import * as React from "react"
import { Meta, StoryObj } from "@storybook/react"
import { Center } from "@chakra-ui/react"
import Search from "."

type SearchType = typeof Search

const meta: Meta<SearchType> = {
  title: "Search",
  component: Search,
  decorators: [
    (Story) => (
      <Center height="100vh">
        <Story />
      </Center>
    ),
  ],
}

export default meta

type Story = StoryObj<SearchType>

export const Basic: Story = {
  render: () => <Search />,
}

import { Meta, StoryObj } from "@storybook/react"

import LeftNavBar from "."

const meta: Meta<typeof LeftNavBar> = {
  title: "Molecules / Navigation / LeftNavBar",
  component: LeftNavBar,
  parameters: {
    layout: "centered",
  },
}

export default meta

type Story = StoryObj<typeof meta>

const mockTocItems = [
  {
    id: "section-1",
    title: "Section 1",
    url: "#section-1",
    items: [
      {
        id: "subsection-1",
        title: "Subsection 1",
        url: "#subsection-1",
      },
    ],
  },
  {
    id: "section-2",
    title: "Section 2",
    url: "#section-2",
  },
]

const mockDropdownLinks = {
  text: "More",
  ariaLabel: "More links",
  items: [
    { text: "Link 1", to: "/link1" },
    { text: "Link 2", to: "/link2" },
  ],
}

export const Default: Story = {
  args: {
    tocItems: mockTocItems,
  },
}

export const WithDropdown: Story = {
  args: {
    tocItems: mockTocItems,
    dropdownLinks: mockDropdownLinks,
  },
}

export const CustomMaxDepth: Story = {
  args: {
    tocItems: mockTocItems,
    maxDepth: 2,
  },
}

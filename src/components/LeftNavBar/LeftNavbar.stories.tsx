import { Meta, StoryObj } from "@storybook/react"

import LeftNavBarComponent from "."

const meta = {
  title: "Molecules / Navigation / LeftNavBar",
  component: LeftNavBarComponent,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div className="max-w-[496px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof LeftNavBarComponent>

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

export const LeftNavBar: Story = {
  args: {
    tocItems: mockTocItems,
    maxDepth: 2,
  },
}

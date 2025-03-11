import type { Meta, StoryObj } from "@storybook/react"

import RoadmapActionCardComponent from "."

const meta = {
  title: "Molecules / Display Content / RoadmapActionCard",
  component: RoadmapActionCardComponent,
  decorators: [
    (Story) => (
      <div className="max-w-[1008px]">
        <div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <Story />
          </div>
        </div>
      </div>
    ),
  ],
} satisfies Meta<typeof RoadmapActionCardComponent>

export default meta

export const RoadmapActionCard: StoryObj<typeof meta> = {
  args: {
    alt: "",
    href: "/roadmap/scaling",
    title: "Cheaper transactions",
    image: "scaling",
    description:
      "Rollups are too expensive and rely on centralized components, causing users to place too much trust in their operators. The roadmap includes fixes for both of these problems.",
    buttonText: "More on reducing fees",
  },
  render: (args) => (
    <>
      {Array.from({ length: 4 }).map((_, i) => (
        <RoadmapActionCardComponent key={i} {...args} />
      ))}
    </>
  ),
}

import { Box, SimpleGrid } from "@chakra-ui/react"
import type { Meta, StoryObj } from "@storybook/react"

import RoadmapActionCardComponent from "."

const meta = {
  title: "Molecules / Display Content / RoadmapActionCard",
  component: RoadmapActionCardComponent,
  decorators: [
    (Story) => (
      <Box maxW="1008px">
        <div>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
            <Story />
          </SimpleGrid>
        </div>
      </Box>
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

import { HStack } from "@chakra-ui/react"
import { Meta, StoryObj } from "@storybook/react"

import { langViewportModes } from "../../../../.storybook/modes"

import MdxHeroComponent from "./"

const meta = {
  title: "Organisms / Layouts / Hero",
  component: MdxHeroComponent,
  parameters: {
    layout: "none",
    chromatic: {
      modes: {
        ...langViewportModes,
      },
    },
  },
  decorators: [
    (Story) => (
      <HStack maxW="container.2xl" m="auto" height="100vh">
        <Story />
      </HStack>
    ),
  ],
} satisfies Meta<typeof MdxHeroComponent>

export default meta

export const MdxHero: StoryObj<typeof meta> = {
  args: {
    breadcrumbs: { slug: "/en/staking/solo/" },
    title: "Solo stake your Eth",
  },
}

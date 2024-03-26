import { HStack } from "@chakra-ui/react"
import { Meta, StoryObj } from "@storybook/react"

import MdxHeroComponent from "./"

type MdxHeroType = typeof MdxHeroComponent

const meta = {
  title: "Organisms / Layouts / Hero",
  parameters: {
    layout: "none",
  },
  decorators: [
    (Story) => (
      <HStack maxW="container.2xl" m="auto" height="100vh">
        <Story />
      </HStack>
    ),
  ],
} satisfies Meta<MdxHeroType>

export default meta

export const MdxHero: StoryObj<MdxHeroType> = {
  args: {
    breadcrumbs: { slug: "/en/staking/solo/" },
    title: "Solo stake your Eth",
  },
  render: (args) => <MdxHeroComponent {...args} />,
}

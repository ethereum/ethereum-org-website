import { Meta, StoryObj } from "@storybook/react"

import { HStack } from "@/components/ui/flex"

import { langViewportModes } from "@/storybook/modes"

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
      <HStack className="mx-auto h-[100vh] max-w-screen-2xl">
        <Story />
      </HStack>
    ),
  ],
} satisfies Meta<typeof MdxHeroComponent>

export default meta

export const MdxHero: StoryObj<typeof meta> = {
  args: {
    breadcrumbs: { slug: "/staking/solo/" },
    title: "Solo stake your Eth",
  },
}

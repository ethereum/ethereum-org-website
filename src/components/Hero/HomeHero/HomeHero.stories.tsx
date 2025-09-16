import { Meta, StoryObj } from "@storybook/react"

import { langViewportModes } from "@/storybook/modes"

import HomeHeroComponent from "."

const meta = {
  title: "Organisms / Layouts / Hero",
  component: HomeHeroComponent,
  parameters: {
    layout: "none",
    chromatic: {
      modes: {
        ...langViewportModes,
      },
    },
  },
} satisfies Meta<typeof HomeHeroComponent>

export default meta

export const HomeHero: StoryObj<typeof meta> = {
  render: () => <HomeHeroComponent />,
}

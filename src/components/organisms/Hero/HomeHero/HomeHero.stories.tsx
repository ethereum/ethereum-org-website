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
  // This story is disabled because HomeHero is a React Server Component
  // and Storybook's support for RSC is still experimental and not stable
  // render: () => <HomeHeroComponent />,
  render: () => <div>HomeHero</div>,
}

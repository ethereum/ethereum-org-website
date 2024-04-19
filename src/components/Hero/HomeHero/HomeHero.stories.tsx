import * as React from "react"
import { Meta, StoryObj } from "@storybook/react"

import { langViewportModes } from "../../../../.storybook/modes"
import homeHeroImg from "../../../../public/home/hero.png"

import HomeHeroComponent from "."

type HomeHeroType = typeof HomeHeroComponent

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
  argTypes: {
    heroImg: {
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<HomeHeroType>

export default meta

export const HomeHero: StoryObj<typeof meta> = {
  args: {
    heroImg: homeHeroImg,
  },
  render: (args) => <HomeHeroComponent {...args} />,
}

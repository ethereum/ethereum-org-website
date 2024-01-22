import * as React from "react"
import { Meta, StoryObj } from "@storybook/react"

import HomeHeroComponent from "."

type HomeHeroType = typeof HomeHeroComponent

const meta = {
  title: "Organisms / Layouts / Hero",
  component: HomeHeroComponent,
  parameters: {
    layout: "none",
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

import homeHeroImg from "../../../../public/home/hero.png"

export const HomeHero: StoryObj<typeof meta> = {
  args: {
    heroImg: homeHeroImg,
  },
  render: (args) => <HomeHeroComponent {...args} />,
}

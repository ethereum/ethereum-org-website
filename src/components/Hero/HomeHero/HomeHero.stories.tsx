import { Meta, StoryObj } from "@storybook/react"

import { langViewportModes } from "@/storybook/modes"

import HomeHeroComponent from "."

import homeHeroImg from "@/public/images/home/hero.png"

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
} satisfies Meta<typeof HomeHeroComponent>

export default meta

export const HomeHero: StoryObj<typeof meta> = {
  args: {
    heroImg: homeHeroImg,
  },
}

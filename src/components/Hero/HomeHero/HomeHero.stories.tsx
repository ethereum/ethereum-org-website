import { Meta, StoryObj } from "@storybook/react"

import HomeHeroComponent from "."

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
} satisfies Meta<typeof HomeHeroComponent>

export default meta

import homeHeroImg from "@/public/home/hero.png"

export const HomeHero: StoryObj<typeof meta> = {
  args: {
    heroImg: homeHeroImg,
  },
}

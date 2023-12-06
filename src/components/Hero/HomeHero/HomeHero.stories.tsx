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
    heroImgSrc: {
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<HomeHeroType>

export default meta

// TODO: Double-check correct way to mock Next.js image data
const mockImgData = "/home/hero.png"

export const HomeHero: StoryObj<typeof meta> = {
  args: { heroImgSrc: mockImgData },
  render: (args) => <HomeHeroComponent {...args} />,
}

import * as React from "react"
import { Meta, StoryObj } from "@storybook/react"
import HomeHeroComponent from "."
import { IGatsbyImageData } from "gatsby-plugin-image"

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

// Comes from the original compiled querying
const mockGatsbyImgData: IGatsbyImageData = {
  layout: "fullWidth",
  images: {
    fallback: {
      src: "/home/hero.png",
      sizes: "100vw",
    },
    sources: [
      {
        srcSet: "/home/hero.png",
        type: "image/webp",
        sizes: "100vw",
      },
    ],
  },
  width: 1,
  height: 1,
}

export const HomeHero: StoryObj<typeof meta> = {
  args: {
    heroImgSrc: mockGatsbyImgData,
  },
  render: (args) => <HomeHeroComponent {...args} />,
}

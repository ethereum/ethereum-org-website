import * as React from "react"
import { Meta, StoryObj } from "@storybook/react"
import HubHeroComponent, { HubHeroProps } from "./"
import { Box } from "@chakra-ui/react"
import { IGatsbyImageData } from "gatsby-plugin-image"
import { useTranslation } from "react-i18next"

type HubHeroType = typeof HubHeroComponent

const meta = {
  title: "Organisms / Layouts / Hero",
  component: HubHeroComponent,
  parameters: {
    layout: "none",
  },
  decorators: [
    (Story) => (
      <Box maxW="container.2xl" mx="auto">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta<HubHeroType>

export default meta

const mockGatsbyImgData: IGatsbyImageData = {
  layout: "fullWidth",
  images: {
    fallback: {
      src: "/heroes/learn-hub-hero.png",
      sizes: "100vw",
    },
    sources: [
      {
        srcSet: "/heroes/learn-hub-hero.png",
        type: "image/webp",
        sizes: "100vw",
      },
    ],
  },
  width: 1,
  height: 1,
}

export const HubHero: StoryObj<typeof meta> = {
  args: {
    title: "learn-hub",
    header: "hero-header",
    description: "hero-subtitle",
    heroImgSrc: mockGatsbyImgData,
  },
  render: (args) => {
    const { t } = useTranslation()
    const { title, header, description, ...rest } = args

    const buttons: HubHeroProps["buttons"] = [
      {
        content: t("hero-button-lets-get-started"),
        toId: "what-is-crypto-ethereum",
        matomo: {
          eventCategory: "learn hub hero buttons",
          eventAction: "click",
          eventName: "lets get started",
        },
      },
      {
        content: "Button",
        matomo: {
          eventCategory: "learn hub hero buttons",
          eventAction: "click",
          eventName: "lets get started",
        },
      },
    ]

    return (
      <HubHeroComponent
        title={t(title)}
        header={t(header)}
        description={t(description)}
        buttons={buttons}
        {...rest}
      />
    )
  },
}

import * as React from "react"
import { Meta, StoryObj } from "@storybook/react"
import ContentHeroComponent, { ContentHeroProps } from "."
import { IGatsbyImageData } from "gatsby-plugin-image"
import { useTranslation } from "gatsby-plugin-react-i18next"

type ContentHeroType = typeof ContentHeroComponent

const meta = {
  title: "Organisms / Layouts / Hero",
  component: ContentHeroComponent,
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
} satisfies Meta<ContentHeroType>

export default meta

// Comes from the original compiled querying
const mockGatsbyImgData: IGatsbyImageData = {
  layout: "constrained",
  images: {
    fallback: {
      src: "/mainnet.png",
      sizes: "100vw",
    },
    sources: [
      {
        srcSet: "/mainnet.png",
        type: "image/webp",
        sizes: "100vw",
      },
    ],
  },
  width: 1,
  height: 1,
}

export const ContentHero: StoryObj = {
  render: () => {
    const { t } = useTranslation()

    const buttons: ContentHeroProps["buttons"] = [
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
      <ContentHeroComponent
        breadcrumbs={{ slug: "/en/run-a-node/" }}
        heroImgSrc={mockGatsbyImgData}
        title={t("hero-header")}
        description={t("hero-subtitle")}
        buttons={buttons}
      />
    )
  },
}

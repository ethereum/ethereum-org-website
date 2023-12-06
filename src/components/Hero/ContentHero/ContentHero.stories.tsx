import { useTranslation } from "next-i18next"
import { Meta, StoryObj } from "@storybook/react"

import ContentHeroComponent, { ContentHeroProps } from "."

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

// TODO: Double-check correct way to mock Next.js image data
const mockImgData = "/mainnet.png"

export const ContentHero: StoryObj = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { t } = useTranslation("page-learn")

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
        heroImgSrc={mockImgData}
        title={t("hero-header")}
        description={t("hero-subtitle")}
        buttons={buttons}
      />
    )
  },
}

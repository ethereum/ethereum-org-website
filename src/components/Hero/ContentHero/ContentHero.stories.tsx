import { useTranslation } from "next-i18next"
import { Meta, StoryObj } from "@storybook/react"

import ContentHeroComponent, { ContentHeroProps } from "."

type ContentHeroType = typeof ContentHeroComponent

import contentHeroImg from "../../../../public/mainnet.png"

const meta = {
  title: "Organisms / Layouts / Hero",
  component: ContentHeroComponent,
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
} satisfies Meta<ContentHeroType>

export default meta

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
        heroImg={contentHeroImg}
        title={t("hero-header")}
        description={t("hero-subtitle")}
        buttons={buttons}
      />
    )
  },
}

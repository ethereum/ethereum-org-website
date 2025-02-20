import { useTranslations } from "next-intl"
import { Meta, StoryObj } from "@storybook/react"

import { langViewportModes } from "../../../../.storybook/modes"

import ContentHeroComponent, { ContentHeroProps } from "."

const meta = {
  title: "Organisms / Layouts / Hero",
  component: ContentHeroComponent,
  parameters: {
    layout: "none",
    chromatic: {
      modes: {
        ...langViewportModes,
      },
    },
  },
} satisfies Meta<typeof ContentHeroComponent>

export default meta

export const ContentHero: StoryObj = {
  parameters: {
    // Set asPath in mock router so the Breadcrums component can render
    // the "home" text with correct translation
    nextjs: {
      router: {
        asPath: "/en",
      },
    },
  },
  render: () => {
    const t = useTranslations("page-learn")

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
        breadcrumbs={{ slug: "/run-a-node/" }}
        heroImg="/images/upgrades/merge.png"
        // Can not properly hardcode this URL. So it's left blank
        blurDataURL=""
        title={t("hero-header")}
        description={t("hero-subtitle")}
        buttons={buttons}
      />
    )
  },
}

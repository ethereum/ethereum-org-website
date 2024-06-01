import { getI18n } from "react-i18next"
import { Meta, StoryObj } from "@storybook/react"

import { langViewportModes } from "../../../../.storybook/modes"

import ContentHeroComponent, { ContentHeroProps } from "."

type ContentHeroType = typeof ContentHeroComponent

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
    const { t } = getI18n()

    const buttons: ContentHeroProps["buttons"] = [
      {
        content: t("hero-button-lets-get-started", { ns: "page-learn" }),
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
        title={t("hero-header", { ns: "page-learn" })}
        description={t("hero-subtitle", { ns: "page-learn" })}
        heroImg="/upgrades/merge.png"
        // Can not properly hardcode this URL. So it's left blank
        blurDataURL=""
        buttons={buttons}
      />
    )
  },
}

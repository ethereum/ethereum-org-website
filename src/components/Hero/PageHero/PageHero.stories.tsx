import { useTranslations } from "next-intl"
import { Meta, StoryObj } from "@storybook/nextjs"

import { langViewportModes } from "@/storybook/modes"

import PageHeroComponent, { PageHeroProps } from "."

import heroImg from "@/public/images/upgrades/merge.png"

const meta = {
  title: "Organisms / Layouts / Hero",
  component: PageHeroComponent,
  parameters: {
    layout: "none",
    chromatic: {
      modes: {
        ...langViewportModes,
      },
    },
  },
} satisfies Meta<typeof PageHeroComponent>

export default meta

export const PageHero: StoryObj = {
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

    const buttons: PageHeroProps["buttons"] = [
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
      <PageHeroComponent
        breadcrumbs={{ slug: "/run-a-node/" }}
        heroImg={heroImg}
        title={t("hero-header")}
        description={t("hero-subtitle")}
        buttons={buttons}
      />
    )
  },
}

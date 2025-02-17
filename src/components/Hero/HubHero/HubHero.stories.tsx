import * as React from "react"
import { useTranslations } from "next-intl"
import { Box } from "@chakra-ui/react"
import { Meta, StoryObj } from "@storybook/react"

import { langViewportModes } from "../../../../.storybook/modes"

import HubHeroComponent, { type HubHeroProps } from "./"

import learnHubHeroImg from "@/public/images/heroes/learn-hub-hero.png"

const meta = {
  title: "Organisms / Layouts / Hero",
  component: HubHeroComponent,
  parameters: {
    layout: "none",
    chromatic: {
      modes: {
        ...langViewportModes,
      },
    },
  },
  decorators: [
    (Story) => (
      <Box maxW="container.2xl" mx="auto">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta<typeof HubHeroComponent>

export default meta

export const HubHero: StoryObj = {
  render: () => {
    const t = useTranslations()

    const buttons: HubHeroProps["buttons"] = [
      {
        content: t("page-learn.hero-button-lets-get-started"),
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
        title={t("common.learn-hub")}
        header={t("page-learn.hero-header")}
        description={t("page-learn.hero-subtitle")}
        heroImg={learnHubHeroImg}
        buttons={buttons}
      />
    )
  },
}

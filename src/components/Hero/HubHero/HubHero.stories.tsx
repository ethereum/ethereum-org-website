import * as React from "react"
import { useTranslation } from "next-i18next"
import { Box } from "@chakra-ui/react"
import { Meta, StoryObj } from "@storybook/react"

import HubHeroComponent from "./"

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

import { CommonHeroProps } from "@/lib/types"

import learnHubHeroImg from "../../../../public/heroes/learn-hub-hero.png"

export const HubHero: StoryObj<typeof meta> = {
  args: {
    title: "common:learn-hub",
    header: "page-learn:hero-header",
    description: "page-learn:hero-subtitle",
    heroImg: learnHubHeroImg,
  },

  render: ({ title, header, description, ...props }) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { t } = useTranslation()

    const buttons: CommonHeroProps["buttons"] = [
      {
        content: t("page-learn:hero-button-lets-get-started"),
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
        {...props}
      />
    )
  },
}

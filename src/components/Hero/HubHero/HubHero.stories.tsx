import * as React from "react"
import { Box } from "@chakra-ui/react"
import { Meta, StoryObj } from "@storybook/react"

import HubHeroComponent from "./"

import learnHubHeroImg from "@/public/heroes/learn-hub-hero.png"
import { getTranslation } from "@/storybook-utils"

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
} satisfies Meta<typeof HubHeroComponent>

export default meta

export const HubHero: StoryObj = {
  render: () => (
    <HubHeroComponent
      title={getTranslation("learn-hub", "common")}
      header={getTranslation("hero-header", "page-learn")}
      description={getTranslation("hero-subtitle", "page-learn")}
      heroImg={learnHubHeroImg}
      buttons={[
        {
          content: getTranslation("hero-button-lets-get-started", "page-learn"),
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
      ]}
    />
  ),
}

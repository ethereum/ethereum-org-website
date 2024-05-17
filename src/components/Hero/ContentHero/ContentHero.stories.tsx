import { Meta, StoryObj } from "@storybook/react"

import ContentHeroComponent from "."

import contentHeroImg from "@/public/mainnet.png"
import { getTranslation } from "@/storybook-utils"

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
} satisfies Meta<typeof ContentHeroComponent>

export default meta

const LEARN_NS = "page-learn"

export const ContentHero: StoryObj = {
  render: () => (
    <ContentHeroComponent
      breadcrumbs={{ slug: "/en/run-a-node/" }}
      heroImg={contentHeroImg}
      title={getTranslation("hero-header", LEARN_NS)}
      description={getTranslation("hero-subtitle", LEARN_NS)}
      buttons={[
        {
          content: getTranslation("hero-button-lets-get-started", LEARN_NS),
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

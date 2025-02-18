import type { CSSProperties } from "react"
import { Meta, StoryObj } from "@storybook/react"

import { screens } from "@/lib/utils/screen"

import { getTranslation } from "@/storybook-utils"

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
      <div
        style={{ "--hero-decorator-max-w": screens["2xl"] } as CSSProperties}
        className="mx-auto max-w-[var(--hero-decorator-max-w)]"
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof HubHeroComponent>

export default meta

export const HubHero: StoryObj = {
  render: () => {
    const buttons: HubHeroProps["buttons"] = [
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
    ]

    return (
      <HubHeroComponent
        title={getTranslation("learn-hub", "common")}
        header={getTranslation("hero-header", "page-learn")}
        description={getTranslation("hero-subtitle", "page-learn")}
        heroImg={learnHubHeroImg}
        buttons={buttons}
      />
    )
  },
}

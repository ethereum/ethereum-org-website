import React from "react"
import { Meta, StoryObj } from "@storybook/react"

import DismissableBanner from "../DismissableBanner"

import BugBountyBanner from "."

const meta = {
  component: BugBountyBanner,
  title: "BugBountyBanner",
} satisfies Meta<typeof BugBountyBanner>

export default meta

const bugBountyBannerStoryPageKey = "bugBountyBannerStoryPageKey"

export const BugBountyBannerStory: StoryObj<typeof meta> = {
  args: {},
  play: () => {
    localStorage.setItem(bugBountyBannerStoryPageKey, "false")
  },
  render: () => {
    return (
      <DismissableBanner storageKey={bugBountyBannerStoryPageKey}>
        <BugBountyBanner />
      </DismissableBanner>
    )
  },
}

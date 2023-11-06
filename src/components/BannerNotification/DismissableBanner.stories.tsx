import React from "react"
import { Meta, StoryObj } from "@storybook/react"

import DismissableBanner from "../Banners/DismissableBanner"

export default {
  component: DismissableBanner,
} as Meta<typeof DismissableBanner>

/**
 * Story taken from DismissableBanner component
 */
const dismissableBannerStoryPageKey = "dismissableBannerStoryPageKey"
const bannerText = "This is a dismissable banner"

export const DismissableBannerStory: StoryObj<typeof DismissableBanner> = {
  play: () => {
    localStorage.setItem(dismissableBannerStoryPageKey, "false")
  },
  render: () => {
    const children = <div>{bannerText}</div>
    return (
      <DismissableBanner storageKey={dismissableBannerStoryPageKey}>
        {children}
      </DismissableBanner>
    )
  },
}

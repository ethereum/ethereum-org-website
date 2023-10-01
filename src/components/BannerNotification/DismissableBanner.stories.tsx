import { Meta, StoryObj } from "@storybook/react"
import React from "react"
import DismissableBannerComponent from "../Banners/DismissableBanner"

const meta = {
  component: DismissableBannerComponent,
  title: "DismissableBanner",
} as Meta<typeof DismissableBannerComponent>

export default meta
/**
 * Story taken from DismissableBanner component
 */
const dismissableBannerStoryPageKey = "dismissableBannerStoryPageKey"
const bannerText = "This is a dismissable banner"

export const DismissableBanner: StoryObj<typeof meta> = {
  args: {
    children: <div>{bannerText}</div>,
    storageKey: dismissableBannerStoryPageKey,
  },
  play: () => {
    localStorage.setItem(dismissableBannerStoryPageKey, "false")
  },
}

import { Meta, StoryObj } from "@storybook/react"
import React from "react"
import BannerNotification from "."

export default {
  component: BannerNotification,
} as Meta<typeof BannerNotification>

/**
 * Story taken from PostMergeBanner component
 * and content from `../../content/developers/tutorials/hello-world-smart-contract-fullstack/index.md`
 */
export const PostMergeBanner: StoryObj<typeof BannerNotification> = {
  args: {
    shouldShow: true,
    justify: "center",
    textAlign: "center",
    sx: {
      "& p": {
        maxWidth: "100ch",
        m: 0,
        p: 0,
      },
      "& a": {
        textDecor: "underline",
      },
    },
    children: (
      <p>
        This tutorial is out of date after the merge and may not work. Please
        raise a PR if you would like to contribute.
      </p>
    ),
  },
}

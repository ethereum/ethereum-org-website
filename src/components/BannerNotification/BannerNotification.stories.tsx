import React from "react"
import { useTranslation } from "next-i18next"
import { Text } from "@chakra-ui/react"
import { Meta, StoryObj } from "@storybook/react"

import BannerNotification from "."

const meta = {
  title: "PostMergeBanner",
  component: BannerNotification,
} satisfies Meta<typeof BannerNotification>

export default meta

/**
 * Story taken from PostMergeBanner component
 * and content from `../../content/developers/tutorials/hello-world-smart-contract-fullstack/index.md`
 */

export const PostMergeBanner: StoryObj<typeof meta> = {
  args: {
    shouldShow: true,
  },
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { t } = useTranslation("page-upgrades")

    return (
      <BannerNotification {...args}>
        <Text>{t("page-upgrades-post-merge-banner-tutorial-ood")}</Text>
      </BannerNotification>
    )
  },
}

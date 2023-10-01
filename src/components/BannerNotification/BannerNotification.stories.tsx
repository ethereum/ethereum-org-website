import React from "react"
import { Text } from "@chakra-ui/react"
import { Meta, StoryObj } from "@storybook/react"
import { useTranslation } from "react-i18next"
import BannerNotification from "."

const meta = {
  title: "PostMergeBanner",
  component: BannerNotification,
} as Meta<typeof BannerNotification>

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
    const { t } = useTranslation()

    return (
      <BannerNotification {...args}>
        <Text>{t("page-upgrades-post-merge-banner-tutorial-ood")}</Text>
      </BannerNotification>
    )
  },
}

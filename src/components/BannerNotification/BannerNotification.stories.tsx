import React from "react"
import { Text } from "@chakra-ui/react"
import { Meta, StoryFn } from "@storybook/react"
import { useTranslation } from "react-i18next"
import BannerNotification from "."

export default {
  component: BannerNotification,
  args: {
    shouldShow: true,
  },
  decorators: [(Story) => <Story />],
} as Meta<typeof BannerNotification>

/**
 * Story taken from PostMergeBanner component
 * and content from `../../content/developers/tutorials/hello-world-smart-contract-fullstack/index.md`
 */
export const PostMergeBanner: StoryFn<typeof BannerNotification> = (args) => {
  const { t } = useTranslation()

  return (
    <BannerNotification {...args}>
      <Text m={0}>{t("page-upgrades-post-merge-banner-tutorial-ood")}</Text>
    </BannerNotification>
  )
}

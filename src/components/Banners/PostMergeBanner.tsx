import React from "react"
import { Text } from "@chakra-ui/react"

import BannerNotification from "../BannerNotification"
import Translation from "../Translation"

import { TranslationKey } from "../../utils/translations"

export interface IProps {
  translationString: TranslationKey
}

const PostMergeBanner: React.FC<IProps> = ({ translationString }) => (
  <BannerNotification
    shouldShow
    zIndex={1}
    textAlign="center"
    sx={{
      a: {
        "text-decoration": "underline",
      },
    }}
  >
    <Text maxW="100ch" p={0}>
      <Translation id={translationString} />
    </Text>
  </BannerNotification>
)

export default PostMergeBanner

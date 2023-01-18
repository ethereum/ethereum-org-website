import React from "react"
import BannerNotification from "../BannerNotification"
import Translation from "../Translation"

import { TranslationKey } from "../../utils/translations"
import { Center, Text } from "@chakra-ui/react"

export interface IProps {
  translationString: TranslationKey
}

const PostMergeBanner: React.FC<IProps> = ({ translationString }) => (
  <Center
    as={BannerNotification}
    shouldShow={true}
    zIndex={1}
    textAlign="center"
    sx={{
      a: {
        "text-decoration": "underline",
      },
    }}
  >
    <Text maxW="100ch" m={0} p={0}>
      <Translation id={translationString} />
    </Text>
  </Center>
)

export default PostMergeBanner

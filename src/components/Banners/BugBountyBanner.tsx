// Libraries
import React from "react"
import { Center, Text } from "@chakra-ui/react"

// Components
import BannerNotification from "../BannerNotification"

const BugBountyBanner: React.FC = () => (
  <BannerNotification shouldShow>
    <Center>
      <Text m={0} p={0}>
        All Shapella-related bounties currently receive a 2x bonus multiplier
        (up to 500,000 USD) until 5th of April 2023.
      </Text>
    </Center>
  </BannerNotification>
)

export default BugBountyBanner

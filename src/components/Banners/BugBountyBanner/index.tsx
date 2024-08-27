// Libraries
import React from "react"
import { Center, Text } from "@chakra-ui/react"

// Components
import BannerNotification from "@/components/Banners/BannerNotification"

const BugBountyBanner = () => (
  <BannerNotification shouldShow>
    <Center>
      <Text m={0} p={0}>
        All Dencun-related bounties currently receive a 2x bonus multiplier (up
        to 500,000 USD) up to two weeks before the scheduled mainnet hardfork.
      </Text>
    </Center>
  </BannerNotification>
)

export default BugBountyBanner

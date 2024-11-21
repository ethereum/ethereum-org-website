// Libraries
import React from "react"

// Components
import BannerNotification from "@/components/Banners/BannerNotification"
import { Center } from "@/components/ui/flex"

const BugBountyBanner = () => (
  <BannerNotification shouldShow>
    <Center>
      <p>
        All Dencun-related bounties currently receive a 2x bonus multiplier (up
        to 500,000 USD) up to two weeks before the scheduled mainnet hardfork.
      </p>
    </Center>
  </BannerNotification>
)

export default BugBountyBanner

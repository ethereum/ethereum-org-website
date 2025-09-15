// Libraries
import React from "react"

// Components
import BannerNotification from "@/components/Banners/BannerNotification"
import { Center } from "@/components/ui/flex"

const BugBountyBanner = () => (
  <BannerNotification shouldShow>
    <Center>
      <p>
        Pectra is now in scope. After the cantina competition until mainnet
        activation, Pectra issues have a 2x reward multiplier!
      </p>
    </Center>
  </BannerNotification>
)

export default BugBountyBanner

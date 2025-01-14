// Libraries
import React from "react"

// Components
import BannerNotification from "@/components/Banners/BannerNotification"
import { Center } from "@/components/ui/flex"

const BugBountyBanner = () => (
  <BannerNotification shouldShow>
    <Center>
      <p>
        The Ethereum Protocol Attackathon is live on <a href="https://immunefi.com/audit-competition/ethereum-protocol-attackathon/">Immunefi</a> until the 20th of January, with up to $1,500,000 in rewards!
      </p>
    </Center>
  </BannerNotification>
)

export default BugBountyBanner

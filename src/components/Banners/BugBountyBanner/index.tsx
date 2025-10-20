// Libraries
import React from "react"

// Components
import BannerNotification from "@/components/Banners/BannerNotification"
import { Center } from "@/components/ui/flex"

const BugBountyBanner = () => (
  <BannerNotification shouldShow>
    <Center>
      <p>
        Fusaka vulnerabilities are now part of the Bug Bounty Program!
      </p>
    </Center>
  </BannerNotification>
)

export default BugBountyBanner

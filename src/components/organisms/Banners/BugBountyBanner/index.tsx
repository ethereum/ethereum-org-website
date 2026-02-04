// Libraries
import React from "react"

import { Center } from "@/components/atoms/flex"
// Components
import BannerNotification from "@/components/organisms/Banners/BannerNotification"

const BugBountyBanner = () => (
  <BannerNotification shouldShow>
    <Center>
      <p>Fusaka vulnerabilities are now part of the Bug Bounty Program!</p>
    </Center>
  </BannerNotification>
)

export default BugBountyBanner

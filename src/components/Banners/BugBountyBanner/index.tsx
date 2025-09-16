// Libraries
import React from "react"

// Components
import BannerNotification from "@/components/Banners/BannerNotification"
import { Center } from "@/components/ui/flex"

const BugBountyBanner = () => (
  <BannerNotification shouldShow>
    <Center>
      <p>
        The Fusaka Contest is currently running on Sherlock with up to 2M USD in rewards!
      </p>
    </Center>
  </BannerNotification>
)

export default BugBountyBanner

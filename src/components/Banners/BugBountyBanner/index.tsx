// Libraries
import React from "react"

// Components
import BannerNotification from "@/components/Banners/BannerNotification"
import { Center } from "@/components/ui/flex"

const BugBountyBanner = () => (
  <BannerNotification shouldShow>
    <Center>
      <p>
        Prague code is now in scope! Join the Prague Audit Competition on {" "}
        <a href="https://cantina.xyz/competitions/9ab19e33-b73c-4384-83a8-b905f508ce5e">
          Cantina
        </a>{" "}
        on the 21 of February, with up to $2,000,000 in rewards!
      </p>
    </Center>
  </BannerNotification>
)

export default BugBountyBanner

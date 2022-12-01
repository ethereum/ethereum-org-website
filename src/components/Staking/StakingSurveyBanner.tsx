import React from "react"
import BannerNotification from "../BannerNotification"
import Link from "../Link"

const StakingSurveyBanner: React.FC = () => (
  <BannerNotification shouldShow>
    Researchers with EthStaker and the Ethereum Foundation are looking for
    anonymous feedback from stakers.
    <Link ms={2} to="https://stakingsurvey.paperform.co/">
      Take a quick survey here
    </Link>
  </BannerNotification>
)

export default StakingSurveyBanner

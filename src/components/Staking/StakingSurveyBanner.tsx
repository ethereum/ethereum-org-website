import React from "react"
import BannerNotification from "../BannerNotification"
import Link from "../Link"
import { Text } from "@chakra-ui/react"

const StakingSurveyBanner: React.FC = () => (
  <BannerNotification shouldShow>
    <Text m={0} textAlign="center">
      Researchers with EthStaker and the Ethereum Foundation are looking for
      anonymous feedback from stakers.{" "}
      <Link to="https://stakingsurvey.paperform.co/">
        Take a quick survey here
      </Link>
    </Text>
  </BannerNotification>
)

export default StakingSurveyBanner

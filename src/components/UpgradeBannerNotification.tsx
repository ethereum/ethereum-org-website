import React from "react"
import { Box } from "@chakra-ui/react"
import BannerNotification from "./BannerNotification"
import Emoji from "./Emoji"
import Link from "./Link"

const UpgradeBannerNotification: React.FC = () => (
  <BannerNotification shouldShow>
    <Emoji text=":megaphone:" mr={4} fontSize="2xl" flexShrink="0" />
    <Box>
      <b>We've deprecated our use of 'Eth1' and 'Eth2' terms.</b>{" "}
      <Link to="https://blog.ethereum.org/2022/01/24/the-great-eth2-renaming/">
        Read the full announcement
      </Link>
    </Box>
  </BannerNotification>
)

export default UpgradeBannerNotification

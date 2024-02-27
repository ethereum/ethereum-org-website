import React from "react"
import { Box } from "@chakra-ui/react"

import BannerNotification from "./BannerNotification"
import Emoji from "./Emoji"
import InlineLink from "./Link"

const UpgradeBannerNotification = () => (
  <BannerNotification shouldShow>
    <Emoji text=":megaphone:" me={4} fontSize="2xl" flexShrink="0" />
    <Box>
      <b>
        We&apos;ve deprecated our use of &apos;Eth1&apos; and &apos;Eth2&apos;
        terms.
      </b>{" "}
      <InlineLink to="https://blog.ethereum.org/2022/01/24/the-great-eth2-renaming/">
        Read the full announcement
      </InlineLink>
    </Box>
  </BannerNotification>
)

export default UpgradeBannerNotification

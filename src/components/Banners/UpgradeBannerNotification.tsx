import { Box } from "@chakra-ui/react"

import Emoji from "../Emoji"
import InlineLink from "../Link"

import BannerNotification from "./BannerNotification"

const UpgradeBannerNotification = () => (
  <BannerNotification shouldShow>
    <Emoji text=":megaphone:" me={4} fontSize="2xl" flexShrink="0" />
    <Box>
      <b>
        We&apos;ve deprecated our use of &apos;Eth1&apos; and &apos;Eth2&apos;
        terms.
      </b>{" "}
      <InlineLink href="https://blog.ethereum.org/2022/01/24/the-great-eth2-renaming/">
        Read the full announcement
      </InlineLink>
    </Box>
  </BannerNotification>
)

export default UpgradeBannerNotification

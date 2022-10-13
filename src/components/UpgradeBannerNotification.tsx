import React from "react"
import { chakra, Center } from "@chakra-ui/react"
import BannerNotification from "./BannerNotification"
import Emoji from "./Emoji"
import Link from "./Link"

const UpgradeBannerNotification: React.FC = () => (
  <BannerNotification justifyContent="center" shouldShow>
    <Emoji text=":megaphone:"  alignSelf="center" mr={4} flexShrink="0"/>
    <Center>
      <b>We've deprecated our use of 'Eth1' and 'Eth2' terms.</b>{" "}
      <Link to="https://blog.ethereum.org/2022/01/24/the-great-eth2-renaming/">
        Read the full announcement
      </Link>
    </Center>
  </BannerNotification>
)

export default UpgradeBannerNotification

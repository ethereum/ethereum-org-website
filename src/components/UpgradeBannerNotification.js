import React from "react"
import BannerNotification from "./BannerNotification"
import Emoji from "./Emoji"
import Link from "./Link"
import styled from "styled-components"

const StyledBannerNotification = styled(BannerNotification)`
  display: flex;
  justify-content: center;
`

const StyledEmoji = styled(Emoji)`
  margin-right: 1rem;
  flex-shrink: 0;
`

const UpgradeBannerNotification = () => (
  <StyledBannerNotification shouldShow>
    <StyledEmoji text=":megaphone:" />
    <div>
      <b>We've deprecated our use of 'Eth1' and 'Eth2' terms.</b>{" "}
      <Link to="https://blog.ethereum.org/2022/01/24/the-great-eth2-renaming/">
        More info.
      </Link>
    </div>
  </StyledBannerNotification>
)

export default UpgradeBannerNotification

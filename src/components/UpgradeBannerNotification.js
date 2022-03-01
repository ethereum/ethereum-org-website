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
  align-self: center;
  margin-right: 1rem;
  flex-shrink: 0;
`

const StyledBannerContent = styled.div`
  align-self: center;
`

const UpgradeBannerNotification = () => (
  <StyledBannerNotification shouldShow>
    <StyledEmoji text=":megaphone:" />
    <StyledBannerContent>
      <b>We've deprecated our use of 'Eth1' and 'Eth2' terms.</b>{" "}
      <Link to="https://blog.ethereum.org/2022/01/24/the-great-eth2-renaming/">
        Read the full announcement
      </Link>
    </StyledBannerContent>
  </StyledBannerNotification>
)

export default UpgradeBannerNotification

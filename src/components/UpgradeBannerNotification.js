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
      <b>Calling all node operators!</b> Time to upgrade your execution client
      to support the{" "}
      <Link to="/history/#arrow-glacier">Arrow Glacier upgrade</Link> set for
      block 13,773,000 (~Dec 8). See communications from your client developer
      team for further details.{" "}
      <Link to="https://blog.ethereum.org/2021/11/10/arrow-glacier-announcement/">
        Follow updates
      </Link>
    </div>
  </StyledBannerNotification>
)

export default UpgradeBannerNotification

// Libraries
import React from "react"
import styled from "@emotion/styled"

// Components
import BannerNotification from "../BannerNotification"
import Link from "../Link"

const StyledBannerNotification = styled(BannerNotification)`
  display: flex;
  z-index: 1;
  justify-content: center;
  p {
    max-width: 100ch;
    margin: 0;
    padding: 0;
  }
  a {
    text-decoration: underline;
  }
  text-align: center;
`

const BugBountyBanner: React.FC = () => (
  <StyledBannerNotification>
    <p>
      All Merge-related bounties currently receive a 4x bonus multiplier (up to
      1 million USD).{" "}
      <Link to="https://blog.ethereum.org/2022/08/24/mainnet-merge-announcement/">
        Learn more about the bonus
      </Link>
    </p>
  </StyledBannerNotification>
)

export default BugBountyBanner

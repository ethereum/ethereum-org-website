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
      All Shapella-related bounties currently receive a 2x bonus multiplier (up to
      500,000 USD) until 5th of April 2023.{" "}
    </p>
  </StyledBannerNotification>
)

export default BugBountyBanner

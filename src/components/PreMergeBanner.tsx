import React from "react"
import styled from "styled-components"
import BannerNotification from "./BannerNotification"
import Link from "./Link"

const StyledBannerNotification = styled(BannerNotification)`
  display: block;
  z-index: 1;
  a {
    text-decoration: underline;
  }
`

export interface IProps {
  className?: string
}

const PreMergeBanner: React.FC<IProps> = ({ className }) => (
  <StyledBannerNotification shouldShow className={className}>
    The Merge is approaching which comes with many changes to Ethereum. Some
    content on this page may be out-of-date related to these changes, and
    updates are coming soon.{" "}
    <Link to="/upgrades/merge/">Learn more about The Merge.</Link>
  </StyledBannerNotification>
)

export default PreMergeBanner

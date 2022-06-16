import React from "react"
import styled from "styled-components"
import BannerNotification from "./BannerNotification"
import Link from "./Link"
import Translations from "../Translations"

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

export interface IProps {
  announcementOnly?: boolean
  className?: string
}

const PreMergeBanner: React.FC<IProps> = ({
  announcementOnly = false,
  className,
  children,
}) => (
  <StyledBannerNotification shouldShow className={className}>
    <p>
      The Merge is approaching, and comes with changes to Ethereum.{" "}
      {!announcementOnly &&
        "Some content on this page may be out-of-date related to these changes, and updates are coming soon. "}
      {children} <Link to="/upgrades/merge/">Learn more about The Merge</Link>
    </p>
  </StyledBannerNotification>
)

export default PreMergeBanner

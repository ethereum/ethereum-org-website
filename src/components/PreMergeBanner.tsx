import React from "react"
import styled from "styled-components"
import BannerNotification from "./BannerNotification"
import Link from "./Link"
import Translation from "./Translation"

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
      <Translation id="page-upgrades-merge-banner-intro" />{" "}
      {!announcementOnly && (
        <Translation id="page-upgrades-merge-banner-content-outdated" />
      )}{" "}
      {children}{" "}
      <Link to="/upgrades/merge/">
        <Translation id="page-upgrades-merge-btn" />
      </Link>
    </p>
  </StyledBannerNotification>
)

export default PreMergeBanner

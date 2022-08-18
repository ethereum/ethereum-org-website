import React from "react"
import styled from "styled-components"
import BannerNotification from "../BannerNotification"
import Link from "../Link"
import Translation from "../Translation"

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

const PostMergeBanner: React.FC = () => (
  <StyledBannerNotification shouldShow>
    <p>
      <Translation id="page-upgrades-post-merge-banner" />
    </p>
  </StyledBannerNotification>
)

export default PostMergeBanner

import React from "react"
import styled from "@emotion/styled"
import BannerNotification from "../BannerNotification"
import Translation from "../Translation"

import { TranslationKey } from "../../utils/translations"

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
  translationString: TranslationKey
}

const PostMergeBanner: React.FC<IProps> = ({ translationString }) => (
  <StyledBannerNotification shouldShow={true}>
    <p>
      <Translation id={translationString} />
    </p>
  </StyledBannerNotification>
)

export default PostMergeBanner

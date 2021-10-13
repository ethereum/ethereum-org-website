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

export default () => (
  <StyledBannerNotification shouldShow>
    <StyledEmoji text=":megaphone:" />
    <div>
      <b>Calling all Beacon Chain node operators!</b> Time to upgrade your
      client to support the Altair upgrade set for{" "}
      <Link to="/history#altair">Oct 27</Link>. See communications from your
      client developer team for further details.{" "}
      <Link to="https://blog.ethereum.org/category/research-and-development/">
        Follow updates
      </Link>
    </div>
  </StyledBannerNotification>
)

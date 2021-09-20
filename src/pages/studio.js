import React from "react"
import styled from "styled-components"

import Link from "../components/Link"
import Emoji from "../components/Emoji"
import ButtonLink from "../components/ButtonLink"
import { Page, Content, Divider } from "../components/SharedStyledComponents"

const StyledPage = styled(Page)`
  margin-top: 4rem;
  margin-bottom: 4rem;
  max-width: ${(props) => props.theme.breakpoints.l};
  align-self: flex-start;
`

const H1 = styled.h1`
  font-size: 64px;
  font-style: normal;
  font-weight: 700;
  letter-spacing: 0px;
  text-align: left;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    font-size: 48px;
  }
`

const H2 = styled.h2`
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  letter-spacing: 0px;
  text-align: left;
`

const StudioRedirectPage = () => (
  <StyledPage>
    <Content>
      <Emoji size={6} mb={"2rem"} text=":sunset_over_buildings:" />
      <H1>We've sunset Studio</H1>
      <p>
        Ethereum Studio is no longer actively maintained. We'd like to thank the{" "}
        <Link to="https://superblocks.com/">Superblocks</Link>
        team and the many open source contributors who generously helped support
        this project.
      </p>
      <p>
        You can find the source code for this project here:
        <ul>
          <li>
            <Link to="https://github.com/SuperblocksHQ/ethereum-studio">
              Web IDE
            </Link>
          </li>
          <li>
            <Link to="https://github.com/SuperblocksHQ/studio-api-services-project">
              API server
            </Link>
          </li>
        </ul>
      </p>
      <Divider />
      <H2>What to use instead</H2>
      <p>
        We recommend using Remix as an alternative web IDE for your Solidity
        development. Additionally, we encourage you to consider{" "}
        <Link to="/developers/local-environment/">
          setting up a local development environment
        </Link>
        . Check out our developer portal for tools, documentation, and more.
      </p>
      <ButtonLink mr={"1rem"} isSecondary to="https://remix.ethereum.org">
        Use Remix
      </ButtonLink>
      <Link isSecondary to="/developers/">
        Developer portal
      </Link>
    </Content>
  </StyledPage>
)

export default StudioRedirectPage

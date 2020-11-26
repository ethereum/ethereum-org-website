import React from "react"
import styled from "styled-components"

import Link from "../components/Link"
import Icon from "../components/Icon"
import Emoji from "../components/Emoji"
import ButtonLink from "../components/ButtonLink"
import { Page, Content } from "../components/SharedStyledComponents"

const StyledPage = styled(Page)`
  margin-top: 4rem;
`

const H1 = styled.h1`
  font-size: 64px;
  font-style: normal;
  font-weight: 700;
  letter-spacing: 0px;
  text-align: left;
`

const StudioRedirectPage = () => {
  return (
    <StyledPage>
      <Content>
        <H1>
          We're sunsetting Studio <Emoji text=":sunset_over_buildings:" />
        </H1>
        <p>
          Try using search to find what you're looking for or{" "}
          <Link to="/en/">return home</Link>.
        </p>
        <ButtonLink to="https://studio.ethereum.org">Go to Studio</ButtonLink>
      </Content>
    </StyledPage>
  )
}

export default StudioRedirectPage

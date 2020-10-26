import React from "react"
import styled from "styled-components"

import Button from "../../components/Button"
import { Page, Subtitle } from "../../components/SharedStyledComponents"

// TODO delete once Page styles are merged in `deposit-address` branch
const StyledPage = styled(Page)`
  margin: 10rem 2rem 2rem;
`

const Intro = styled.div`
  max-width: 1000px;
  align-self: flex-start;
`

const H1 = styled.h1`
  font-weight: 800;
  font-size: 64px;
`

const Caption = styled.p`
  font-weight: 300;
  font-size: 32px;
  line-height: 140%;
`

const GetStartedPage = () => {
  return (
    <StyledPage>
      <Intro>
        <H1>Try Ethereum risk free</H1>
        <Caption>
          Ethereum is a global, open financial system and data-friendly
          internet. All you need to take part is a wallet – somewhere to manage
          your funds and log you in to all the services on Ethereum.
        </Caption>
        <p>
          Here, you can create a test wallet – an opportunity to try out some of
          Ethereum’s features without spending a penny.
        </p>
        <Button to="/get-started/wallet/">Create wallet</Button>
      </Intro>
    </StyledPage>
  )
}

export default GetStartedPage

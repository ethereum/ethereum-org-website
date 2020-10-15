import React from "react"
import styled from "styled-components"

import Button from "../../components/Button"
import { Page } from "../../components/SharedStyledComponents"

// TODO delete once Page styles are merged in `deposit-address` branch
const StyledPage = styled(Page)`
  margin: 10rem auto 0;
`

const GetStartedPage = () => {
  return (
    <StyledPage>
      <h1>Let's get started!</h1>
      <Button to="/get-started/create-wallet/">Create wallet</Button>
    </StyledPage>
  )
}

export default GetStartedPage

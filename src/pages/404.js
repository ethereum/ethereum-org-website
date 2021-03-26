import React from "react"
import styled from "styled-components"

import Translation from "../components/Translation"
import Link from "../components/Link"
import { Page, Content } from "../components/SharedStyledComponents"

const StyledPage = styled(Page)`
  margin-top: 4rem;
`

const NotFoundPage = () => (
  <StyledPage>
    <Content>
      <h1>
        <Translation id="page-404-not-found" />
      </h1>
      <p>
        <Translation id="page-404-copy" />
      </p>
      <p>
        <Link to="/">
          <Translation id="home" />
        </Link>
      </p>
    </Content>
  </StyledPage>
)

export default NotFoundPage

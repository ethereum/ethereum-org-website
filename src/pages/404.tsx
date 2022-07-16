import React from "react"
import styled from "styled-components"

import Link from "../components/Link"
import Translation from "../components/Translation"

import { Page, Content } from "../components/SharedStyledComponents"
import { PageProps } from "gatsby"

const StyledPage = styled(Page)`
  margin-top: 4rem;
`

const NotFoundPage = (props: PageProps) => (
  <StyledPage>
    <Content>
      <h1>
        <Translation id="we-couldnt-find-that-page" />
      </h1>
      <p>
        <Translation id="try-using-search" />{" "}
        <Link to="/">
          <Translation id="return-home" />
        </Link>
        .
      </p>
    </Content>
  </StyledPage>
)

export default NotFoundPage

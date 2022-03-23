import React from "react"
import styled from "styled-components"

import Link from "../components/Link"
import Translation from "../components/Translation"

import { Page, Content } from "../components/SharedStyledComponents"

const StyledPage = styled(Page)`
  margin-top: 4rem;
`

// TODO is there a way to translate this page?
const NotFoundPage = () => (
  <StyledPage>
    <Content>
      <h1>
        <Translation id="about-us" />
      </h1>
      <p>
        Try using search to find what you're looking for or{" "}
        <Link to="/">return home</Link>.
      </p>
    </Content>
  </StyledPage>
)

export default NotFoundPage

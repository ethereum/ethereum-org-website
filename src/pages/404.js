import React from "react"
import styled from "styled-components"

import Link from "../components/Link"
import { Page, Content } from "../components/SharedStyledComponents"

const StyledPage = styled(Page)`
  margin-top: 4rem;
`

// TODO is there a way to translate this page?
const NotFoundPage = () => (
  <StyledPage>
    <Content>
      <h1>Resource not found.</h1>
      <p>
        Try using search to find what you're looking for or{" "}
        <Link to="/en/">return home</Link>.
      </p>
    </Content>
  </StyledPage>
)

export default NotFoundPage

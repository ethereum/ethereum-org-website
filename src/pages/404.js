import React from "react"

import Link from "../components/Link"
import { PageContainer } from "../components/SharedStyledComponents"

const NotFoundPage = () => {
  return (
    <PageContainer>
      <h1>Resource not found.</h1>
      <p>
        Try using search to find what you're looking for or{" "}
        <Link to="/en/">return home</Link>.
      </p>
    </PageContainer>
  )
}

export default NotFoundPage

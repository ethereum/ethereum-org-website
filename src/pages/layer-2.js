// Libraries
import React from "react"

// Components
import PageMetadata from "../components/PageMetadata"
import { Page } from "../components/SharedStyledComponents"

const Layer2Page = () => {
  return (
    <Page>
      <PageMetadata
        title={"Layer 2"}
        description={"Introduction page to layer 2"}
      />
      <p>Hello World</p>
    </Page>
  )
}

export default Layer2Page

import React from "react"
import { graphql } from "gatsby"

import { Page } from "../../components/SharedStyledComponents"

const FindWalletPage = ({ data }) => {
  return (
    <Page>
      <p>Hello World</p>
    </Page>
  )
}

export default FindWalletPage

export const query = graphql`
  {
    hero: file(relativePath: { eq: "wallets/find-wallet-hero.png" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED, quality: 100)
      }
    }
  }
`

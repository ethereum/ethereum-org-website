import React, { useContext } from "react"
import { ThemeContext } from "styled-components"
import styled from "styled-components"
import Img from "gatsby-image"
import { graphql } from "gatsby"
import { useIntl } from "gatsby-plugin-intl"

import { translateMessageId } from "../../../utils/translations"

import Breadcrumbs from "../../../components/Breadcrumbs"
import PageMetadata from "../../../components/PageMetadata"
import Translation from "../../../components/Translation"
import { Content, Page } from "../../../components/SharedStyledComponents"

const TranslatorAcknowledgements = ({ data, location }) => {
  const intl = useIntl()
  const themeContext = useContext(ThemeContext)
  const isDarkTheme = themeContext.isDark

  return (
    <Page>
      <PageMetadata
        title={translateMessageId(
          "page-contributors-translation-program-acknowledgements-meta-title",
          intl
        )}
        description={translateMessageId(
          "page-contributors-translation-program-acknowledgements-meta-description",
          intl
        )}
      />
      <Content>
        <Breadcrumbs slug={location.pathname} />
        <div>
          <h1>
            <Translation id="page-contributors-translation-program-acknowledgements-acknowledgement-page-title" />
          </h1>
        </div>
      </Content>
    </Page>
  )
}

export default TranslatorAcknowledgements

export const query = graphql`
  query {
    ethereum: file(relativePath: { eq: "what-is-ethereum.png" }) {
      childImageSharp {
        fluid(maxWidth: 1440) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

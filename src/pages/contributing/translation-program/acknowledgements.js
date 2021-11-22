// Libraries
import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import { useIntl } from "gatsby-plugin-intl"
import styled from "styled-components"

// Components
import ActionCard from "../../../components/ActionCard"
import Breadcrumbs from "../../../components/Breadcrumbs"
import PageMetadata from "../../../components/PageMetadata"
import Translation from "../../../components/Translation"
import TranslationLeaderboard from "../../../components/TranslationLeaderboard"
import { Content, Page } from "../../../components/SharedStyledComponents"

// Utils
import { translateMessageId } from "../../../utils/translations"

// Styles
const TwoColumnContent = styled.div`
  display: flex;
  width: 100%;
  margin-right: 2rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column;
    align-items: flex-start;
    margin-left: 0rem;
    margin-right: 0rem;
  }
`

const LeftColumn = styled.div`
  margin-right: 2rem;
  width: 50%;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin: auto 0rem;
    width: 100%;
  }
`

const RightColumn = styled.div`
  margin-left: 2rem;
  width: 50%;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin: auto 0rem;
    width: 100%;
  }
`

const Image = styled(Img)`
  width: 100%;
  min-height: 380px;
  max-height: 500px;
  background-size: cover;
  background: no-repeat 50px;
`

const CentralActionCard = styled(ActionCard)`
  flex: none;
  margin: 2rem 0;
  .action-card-image-wrapper {
    padding: 1rem;
  }
  @media (min-width: ${(props) => props.theme.breakpoints.s}) {
    display: flex;

    .action-card-image-wrapper {
      min-width: 260px;
    }
    .action-card-content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-left: 1rem;

      p {
        margin-bottom: 0;
      }
    }
  }
`

const TranslatorAcknowledgements = ({ data, location }) => {
  const intl = useIntl()

  return (
    <Page>
      <PageMetadata
        title={translateMessageId(
          "page-contributing-translation-program-acknowledgements-meta-title",
          intl
        )}
        description={translateMessageId(
          "page-contributing-translation-program-acknowledgements-meta-description",
          intl
        )}
      />

      <Content>
        <Breadcrumbs slug={location.pathname} />
        <h1>
          <Translation id="page-contributing-translation-program-acknowledgements-acknowledgement-page-title" />
        </h1>
        <TwoColumnContent>
          <LeftColumn>
            <p>
              <Translation id="page-contributing-translation-program-acknowledgements-acknowledgement-page-1" />
            </p>
            <p>
              <Translation id="page-contributing-translation-program-acknowledgements-acknowledgement-page-2" />
            </p>
            <p>
              <Translation id="page-contributing-translation-program-acknowledgements-acknowledgement-page-3" />
            </p>
            <p>
              <Translation id="page-contributing-translation-program-acknowledgements-acknowledgement-page-4" />
            </p>
            <p>
              <Translation id="page-contributing-translation-program-acknowledgements-acknowledgement-page-5" />
            </p>
          </LeftColumn>
          <RightColumn>
            <Image
              fluid={data.dogeComputer.childImageSharp.fluid}
              alt={translateMessageId(
                "page-contributing-translation-program-acknowledgements-hero-image-alt",
                intl
              )}
            />
          </RightColumn>
        </TwoColumnContent>
      </Content>

      <Content>
        <h1>
          <Translation id="page-contributing-translation-program-acknowledgements-translation-leaderboard-title" />
        </h1>
        <TwoColumnContent>
          <LeftColumn>
            <TranslationLeaderboard />
          </LeftColumn>
          <RightColumn>
            <p>
              <Translation id="page-contributing-translation-program-acknowledgements-translation-leaderboard-1" />
            </p>
            <p>
              <Translation id="page-contributing-translation-program-acknowledgements-translation-leaderboard-2" />
            </p>
          </RightColumn>
        </TwoColumnContent>
      </Content>

      <Content>
        <h1>
          <Translation id="page-contributing-translation-program-acknowledgements-our-translators-title" />
        </h1>
        <p>
          <Translation id="page-contributing-translation-program-acknowledgements-our-translators-1" />
        </p>
        <p>
          <Translation id="page-contributing-translation-program-acknowledgements-our-translators-2" />
        </p>
        <p>
          <Translation id="page-contributing-translation-program-acknowledgements-our-translators-3" />
        </p>
        <p>
          <Translation id="page-contributing-translation-program-acknowledgements-our-translators-4" />
        </p>
        <CentralActionCard
          to="/contributing/translation-program/contributors/"
          title={translateMessageId(
            "page-contributing-translation-program-acknowledgements-our-translators-title",
            intl
          )}
          description={translateMessageId(
            "page-contributing-translation-program-acknowledgements-our-translators-cta",
            intl
          )}
          image={data.ethereum.childImageSharp.fixed}
        />
      </Content>
    </Page>
  )
}

export default TranslatorAcknowledgements

export const query = graphql`
  query {
    dogeComputer: file(relativePath: { eq: "doge-computer.png" }) {
      childImageSharp {
        fluid(maxWidth: 500) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    ethereum: file(relativePath: { eq: "what-is-ethereum.png" }) {
      childImageSharp {
        fixed(width: 220) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`

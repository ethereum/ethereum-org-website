import React from "react"
import { graphql } from "gatsby"
import { useIntl } from "gatsby-plugin-intl"
import styled from "styled-components"
import Img from "gatsby-image"

import { translateMessageId } from "../../utils/translations"
import Translation from "../../components/Translation"
import Breadcrumbs from "../../components/Breadcrumbs"
import ButtonLink from "../../components/ButtonLink"
import CalloutBanner from "../../components/CalloutBanner"
import InfoBanner from "../../components/InfoBanner"
import PageMetadata from "../../components/PageMetadata"
import WalletCompare from "../../components/WalletCompare"
import { Divider, Page } from "../../components/SharedStyledComponents"

const Subtitle = styled.div`
  font-size: 20px;
  line-height: 140%;
  text-align: center;
  color: ${(props) => props.theme.colors.text200};
`

const SubtitleTwo = styled.div`
  font-size: 20px;
  line-height: 140%;
  margin-bottom: 2rem;
  text-align: center;
  color: ${(props) => props.theme.colors.text300};
`

const HeroContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 1440px;
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  justify-content: center;
  @media (max-width: ${(props) => props.theme.breakpoints.xl}) {
    max-width: 100vw;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    flex-direction: column-reverse;
    margin-bottom: -1rem;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    flex-direction: column-reverse;
    margin-bottom: 0rem;
  }
`

const Hero = styled(Img)`
  position: absolute !important;
  z-index: -1;
  width: 100%;
  max-width: 1440px;
  @media (max-width: ${(props) => props.theme.breakpoints.xl}) {
    max-width: 100vw;
  }
  min-height: 300px;
  max-height: 400px;
  background-size: cover;
`

const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 3rem;
  margin-bottom: 6rem;
  text-align: center;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin: 2rem;
  }
`

const InfoBannerContainer = styled.div`
  margin-bottom: 2rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin-left: 2rem;
    margin-right: 2rem;
    margin-bottom: 1rem;
  }
`

const FindWalletPage = ({ location, data }) => {
  const intl = useIntl()
  return (
    <Page>
      <PageMetadata
        title={translateMessageId("page-find-wallet-meta-title", intl)}
        description={translateMessageId(
          "page-find-wallet-meta-description",
          intl
        )}
      />

      <HeroContainer>
        <Hero
          fluid={data.hero.childImageSharp.fluid}
          alt={translateMessageId("page-find-wallet-image-alt", intl)}
          loading="eager"
        />
        <Header>
          <Breadcrumbs slug={location.pathname} />
          <h1>
            <Translation id="page-find-wallet-title" />
          </h1>
          <Subtitle>
            <Translation id="page-find-wallet-description" />
          </Subtitle>
          <SubtitleTwo>
            <Translation id="page-find-wallet-desc-2" />
          </SubtitleTwo>
        </Header>
      </HeroContainer>
      <InfoBannerContainer>
        <InfoBanner emoji=":wave:">
          <Translation id="page-find-wallet-new-to-wallets" />{" "}
          <a href="/wallets/">
            <Translation id="page-find-wallet-new-to-wallets-link" />
          </a>
        </InfoBanner>
      </InfoBannerContainer>
      <WalletCompare location={location} />
      <Divider />
      <CalloutBanner
        title={translateMessageId("page-find-wallet-use-your-wallet", intl)}
        description={translateMessageId(
          "page-find-wallet-use-wallet-desc",
          intl
        )}
        image={data.dapps.childImageSharp.fluid}
        alt={translateMessageId(
          "page-index-sections-individuals-image-alt",
          intl
        )}
        maxImageWidth={600}
      >
        <div>
          <ButtonLink to="/dapps/">
            <Translation id="page-find-wallet-checkout-dapps" />
          </ButtonLink>
        </div>
      </CalloutBanner>
    </Page>
  )
}

export default FindWalletPage

export const query = graphql`
  query {
    hero: file(relativePath: { eq: "wallets/find-wallet-hero.png" }) {
      childImageSharp {
        fluid(maxWidth: 1440) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    dapps: file(relativePath: { eq: "doge-computer.png" }) {
      childImageSharp {
        fluid(maxWidth: 600) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

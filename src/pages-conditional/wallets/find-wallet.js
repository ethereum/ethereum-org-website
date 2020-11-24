import React from "react"
import { graphql } from "gatsby"
import { useIntl } from "gatsby-plugin-intl"
import styled from "styled-components"
import Img from "gatsby-image"

import { getDefaultMessage } from "../../utils/translations"
import Translation from "../../components/Translation"
import Breadcrumbs from "../../components/Breadcrumbs"
import ButtonLink from "../../components/ButtonLink"
import CalloutBanner from "../../components/CalloutBanner"
import InfoBanner from "../../components/InfoBanner"
import PageMetadata from "../../components/PageMetadata"
import WalletCompare from "../../components/WalletCompare"
import { Divider, Page } from "../../components/SharedStyledComponents"

// TODO move to shared?
const Title = styled.h1`
  font-weight: normal;
  font-size: 3rem;
  line-height: 140%;
  text-align: center;
  color: ${(props) => props.theme.colors.text};
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    font-size: 2rem;
  }
`

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
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin-left: 2rem;
    margin-right: 2rem;
    margin-top: -2rem;
  }
`

const FindWalletPage = ({ location, data }) => {
  const intl = useIntl()
  return (
    <Page>
      <PageMetadata
        title={intl.formatMessage({
          id: "page-find-wallet-meta-title",
          defaultMessage: getDefaultMessage("page-find-wallet-meta-title"),
        })}
        description={intl.formatMessage({
          id: "page-find-wallet-meta-description",
          defaultMessage: getDefaultMessage(
            "page-find-wallet-meta-description"
          ),
        })}
      />

      <HeroContainer>
        <Hero
          fluid={data.hero.childImageSharp.fluid}
          alt="Get ETH hero image"
          loading="eager"
        />
        <Header>
          <Breadcrumbs slug={location.pathname} />
          <Title>
            <Translation id="page-find-wallet-title" />
          </Title>
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
      <WalletCompare />
      <Divider />
      <CalloutBanner
        title={intl.formatMessage({
          id: "page-find-wallet-use-your-wallet",
          defaultMessage: getDefaultMessage("page-find-wallet-use-your-wallet"),
        })}
        description={intl.formatMessage({
          id: "page-find-wallet-use-wallet-desc",
          defaultMessage: getDefaultMessage("page-find-wallet-use-wallet-desc"),
        })}
        image={data.dapps.childImageSharp.fluid}
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

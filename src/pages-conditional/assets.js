import React, { useContext } from "react"
import { ThemeContext } from "styled-components"
import styled from "styled-components"
import Img from "gatsby-image"
import { graphql } from "gatsby"

import AssetDownload from "../components/AssetDownload"
import Link from "../components/Link"
// import EthVideo from "../components/EthVideo"
import { Page, Content } from "../components/SharedStyledComponents"

// import darkVideo from "../assets/ethereum-hero-dark.mp4"
// import lightVideo from "../assets/ethereum-hero-light.mp4"

const Image = styled(Img)`
  align-self: center;
  width: 100%;
  margin-bottom: 2rem;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    width: 60%;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    width: 100%;
  }
`

const HeroContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 2rem 0rem;
`

const Row = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin: 0 -1rem 2rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-wrap: wrap;
  }
`

const H2 = styled.h2`
  margin: 4.5rem 0 1.5rem;
  /* Needed to fix issues of header padding overlapping links */
  /* https://github.com/confluenza/confluenza/pull/17 */
  position: inherit !important;

  /* Prevent nav overlap */
  &:before {
    content: "";
    display: block;
    height: 120px;
    margin-top: -120px;
    visibility: hidden;
  }
`

const H3 = styled.h3`
  margin-bottom: 0;
`

const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 6rem;
  text-align: center;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin: 2rem;
  }
`

// const EthVideoAsset = styled(EthVideo)`
//   max-height: 400px;
//   max-width: 400px;
// `

const AssetsPage = ({ data }) => {
  const themeContext = useContext(ThemeContext)
  const isDarkTheme = themeContext.isDark
  const heroImage = isDarkTheme ? data.heroImageDark : data.heroImage
  return (
    <Page>
      <Content>
        <HeroContainer>
          <Header>
            <Image fixed={heroImage.childImageSharp.fixed} />
            <h1>ethereum.org assets</h1>
            <Link to="/assets/#illustrations">Illustrations</Link>
            <Link to="/assets/#historical">Historical artworks</Link>
            <Link to="/assets/#brand">Ethereum "brand" assets</Link>
          </Header>
        </HeroContainer>
        <H2 id="illustrations">Illustrations</H2>

        <Row>
          <AssetDownload
            title="ethereum.org hero"
            image={data.hero.childImageSharp}
            artistName="Liam Cobb"
            artistUrl="https://liamcobb.com/"
          />
        </Row>

        <Row>
          <AssetDownload
            title="Doge using dapps"
            image={data.doge.childImageSharp}
            artistName="William Tempest"
            artistUrl="https://cargocollective.com/willtempest"
          />
          <AssetDownload
            title="Building blocks"
            image={data.developers.childImageSharp}
            artistName="William Tempest"
            artistUrl="https://cargocollective.com/willtempest"
          />
          <AssetDownload
            title="Enterprise Ethereum"
            image={data.enterprise.childImageSharp}
            artistName="William Tempest"
            artistUrl="https://cargocollective.com/willtempest"
          />
        </Row>

        <Row>
          <AssetDownload
            title="Robot wallet"
            image={data.wallet.childImageSharp}
            artistName="William Tempest"
            artistUrl="https://cargocollective.com/willtempest"
          />
          <AssetDownload
            title="Robot wallet"
            image={data.wallet.childImageSharp}
            artistName="William Tempest"
            artistUrl="https://cargocollective.com/willtempest"
            shouldHide={true}
          />
        </Row>

        <Row>
          <AssetDownload
            title="Ethereum bazaar"
            image={data.whatIsEthereum.childImageSharp}
            artistName="Viktor Hachmang"
            artistUrl="http://viktorhachmang.nl/"
          />
          <AssetDownload
            title="Ether (ETH)"
            image={data.eth.childImageSharp}
            artistName="Viktor Hachmang"
            artistUrl="http://viktorhachmang.nl/"
          />
        </Row>

        <H2 id="historical">Historical artwork</H2>

        {/*
        <Row>
          <AssetDownload
            title="Ethereum gif (light)"
            artistName="Lili Lashka"
            artistUrl="https://www.impermanence.co/"
            src={lightVideo}
          >
            <EthVideoAsset videoSrc={lightVideo} />
          </AssetDownload>
          <AssetDownload
            title="Ethereum gif (dark)"
            artistName="Lili Lashka"
            artistUrl="https://www.impermanence.co/"
            src={darkVideo}
          >
            <EthVideoAsset videoSrc={darkVideo} />
          </AssetDownload>
        </Row>
  */}
        {/*
        <Row>
          <AssetDownload
            title="ETH gif (1)"
            image={data.ethGifCat.childImageSharp}
          />
          <AssetDownload
            title="ETH gif (2)"
            image={data.ethGifChalk.childImageSharp}
          />
          <AssetDownload
            title="ETH gif (3)"
            image={data.ethGifSun.childImageSharp}
          />
          <AssetDownload
            title="ETH gif (4)"
            image={data.ethGifWaves.childImageSharp}
          />
        </Row>
  */}

        <Row>
          {/* TODO artistUrl */}
          <AssetDownload
            title="ethereum.org hero"
            image={data.oldHero.childImageSharp}
            artistName="EthWorks & Alan Wu"
            artistUrl=""
          />
          <AssetDownload
            title="ethereum.org hero (dark)"
            image={data.oldHeroDark.childImageSharp}
            artistName="EthWorks & Alan Wu"
            artistUrl=""
          />
        </Row>

        <H2 id="brand">Ethereum brand assets</H2>

        <H3>Transparent background</H3>

        <Row>
          <AssetDownload
            title="ETH diamond (glyph)"
            image={data.ethDiamondGlyph.childImageSharp}
          />
          <AssetDownload
            title="ETH diamond (gray)"
            image={data.ethDiamondBlack.childImageSharp}
          />
          <AssetDownload
            title="ETH diamond (color)"
            image={data.ethDiamondColor.childImageSharp}
          />
          <AssetDownload
            title="ETH diamond (purple)"
            image={data.ethDiamondPurple.childImageSharp}
          />
        </Row>
        <Row>
          <AssetDownload
            title="ETH logo portrait (gray)"
            image={data.ethPortraitBlack.childImageSharp}
          />
          <AssetDownload
            title="ETH logo landscape (gray)"
            image={data.ethLandscapeBlack.childImageSharp}
          />
          <AssetDownload
            title="ETH wordmark (gray)"
            image={data.ethWordmarkBlack.childImageSharp}
          />
        </Row>
        <Row>
          <AssetDownload
            title="ETH logo portrait (purple)"
            image={data.ethPortraitPurple.childImageSharp}
          />
          <AssetDownload
            title="ETH logo landscape (purple)"
            image={data.ethLandscapePurple.childImageSharp}
          />
          <AssetDownload
            title="ETH wordmark (purple)"
            image={data.ethWordmarkPurple.childImageSharp}
          />
        </Row>

        {/* <Row>
          <AssetDownload
            title="Ethereum Foundation logo"
            image={data.efLogo.childImageSharp}
          />
          <AssetDownload
            title="Ethereum Foundation logo (white)"
            image={data.efLogoWhite.childImageSharp}
          />
        </Row> */}

        <H3>Solid background</H3>

        <Row>
          <AssetDownload
            title="ETH diamond (white)"
            image={data.ethDiamondBlackWhite.childImageSharp}
          />
          <AssetDownload
            title="ETH diamond (gray)"
            image={data.ethDiamondBlackGray.childImageSharp}
          />
          <AssetDownload
            title="ETH diamond (purple)"
            image={data.ethDiamondPurplePurple.childImageSharp}
          />
          <AssetDownload
            title="ETH diamond (white)"
            image={data.ethDiamondPurpleWhite.childImageSharp}
          />
        </Row>
        <Row>
          <AssetDownload
            title="ETH logo portrait (gray)"
            image={data.ethPortraitBlackGray.childImageSharp}
          />
          <AssetDownload
            title="ETH logo landscape (gray)"
            image={data.ethLandscapeBlackGray.childImageSharp}
          />
          <AssetDownload
            title="ETH wordmark (gray)"
            image={data.ethWordmarkBlackGray.childImageSharp}
          />
        </Row>
        <Row>
          <AssetDownload
            title="ETH logo portrait (purple)"
            image={data.ethPortraitPurplePurple.childImageSharp}
          />
          <AssetDownload
            title="ETH logo landscape (purple)"
            image={data.ethLandscapePurplePurple.childImageSharp}
          />
          <AssetDownload
            title="ETH wordmark (purple)"
            image={data.ethWordmarkPurplePurple.childImageSharp}
          />
        </Row>
        <Row>
          <AssetDownload
            title="ETH logo portrait (white)"
            image={data.ethPortraitPurpleWhite.childImageSharp}
          />
          <AssetDownload
            title="ETH logo landscape (white)"
            image={data.ethLandscapePurpleWhite.childImageSharp}
          />
          <AssetDownload
            title="ETH wordmark (white)"
            image={data.ethWordmarkPurpleWhite.childImageSharp}
          />
        </Row>
      </Content>
    </Page>
  )
}

export default AssetsPage

export const heroImage = graphql`
  fragment heroImage on File {
    childImageSharp {
      fluid(maxWidth: 1440) {
        ...GatsbyImageSharpFluid
      }
    }
  }
`
export const assetItem = graphql`
  fragment assetItem on File {
    childImageSharp {
      fluid(maxWidth: 1000) {
        ...GatsbyImageSharpFluid
      }
    }
  }
`

export const query = graphql`
  query {
    heroImage: file(relativePath: { eq: "assets/eth-diamond-black.png" }) {
      childImageSharp {
        fixed(width: 80) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    heroImageDark: file(relativePath: { eq: "assets/eth-diamond-purple.png" }) {
      childImageSharp {
        fixed(width: 80) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    hero: file(relativePath: { eq: "home/hero.png" }) {
      ...heroImage
    }
    developers: file(relativePath: { eq: "developers-eth-blocks.png" }) {
      ...assetItem
    }
    doge: file(relativePath: { eq: "doge-computer.png" }) {
      ...assetItem
    }
    enterprise: file(relativePath: { eq: "enterprise-eth.png" }) {
      ...assetItem
    }
    wallet: file(relativePath: { eq: "wallet.png" }) {
      ...assetItem
    }
    eth: file(relativePath: { eq: "eth.png" }) {
      ...assetItem
    }
    whatIsEthereum: file(relativePath: { eq: "what-is-ethereum.png" }) {
      ...assetItem
    }
    ethGifCat: file(relativePath: { eq: "eth-gif-cat.png" }) {
      ...assetItem
    }
    ethGifChalk: file(relativePath: { eq: "eth-gif-chalk.png" }) {
      ...assetItem
    }
    ethGifSun: file(relativePath: { eq: "eth-gif-sun.png" }) {
      ...assetItem
    }
    ethGifWaves: file(relativePath: { eq: "eth-gif-waves.png" }) {
      ...assetItem
    }
    oldHero: file(relativePath: { eq: "assets/hero.png" }) {
      ...heroImage
    }
    oldHeroDark: file(relativePath: { eq: "assets/hero-dark.png" }) {
      ...heroImage
    }
    efLogo: file(relativePath: { eq: "ef-logo.png" }) {
      ...assetItem
    }
    efLogoWhite: file(relativePath: { eq: "ef-logo-white.png" }) {
      ...assetItem
    }
    ethDiamondGlyph: file(
      relativePath: { eq: "assets/eth-diamond-glyph.png" }
    ) {
      ...assetItem
    }
    ethDiamondColor: file(
      relativePath: { eq: "assets/eth-diamond-rainbow.png" }
    ) {
      ...assetItem
    }
    ethDiamondPurple: file(
      relativePath: { eq: "assets/eth-diamond-purple.png" }
    ) {
      ...assetItem
    }
    ethDiamondPurplePurple: file(
      relativePath: { eq: "assets/eth-diamond-purple-purple.png" }
    ) {
      ...assetItem
    }
    ethDiamondBlackGray: file(
      relativePath: { eq: "assets/eth-diamond-black-gray.png" }
    ) {
      ...assetItem
    }
    ethDiamondBlackWhite: file(
      relativePath: { eq: "assets/eth-diamond-black-white.jpg" }
    ) {
      ...assetItem
    }
    ethDiamondPurpleWhite: file(
      relativePath: { eq: "assets/eth-diamond-purple-white.jpg" }
    ) {
      ...assetItem
    }
    ethPortraitBlackGray: file(
      relativePath: { eq: "assets/ethereum-logo-portrait-black-gray.png" }
    ) {
      ...assetItem
    }
    ethLandscapeBlackGray: file(
      relativePath: { eq: "assets/ethereum-logo-landscape-black-gray.png" }
    ) {
      ...assetItem
    }
    ethWordmarkBlackGray: file(
      relativePath: { eq: "assets/ethereum-wordmark-black-gray.png" }
    ) {
      ...assetItem
    }
    ethDiamondBlack: file(
      relativePath: { eq: "assets/eth-diamond-black.png" }
    ) {
      ...assetItem
    }
    ethPortraitBlack: file(
      relativePath: { eq: "assets/ethereum-logo-portrait-black.png" }
    ) {
      ...assetItem
    }
    ethLandscapeBlack: file(
      relativePath: { eq: "assets/ethereum-logo-landscape-black.png" }
    ) {
      ...assetItem
    }
    ethWordmarkBlack: file(
      relativePath: { eq: "assets/ethereum-wordmark-black.png" }
    ) {
      ...assetItem
    }
    ethPortraitPurple: file(
      relativePath: { eq: "assets/ethereum-logo-portrait-purple.png" }
    ) {
      ...assetItem
    }
    ethLandscapePurple: file(
      relativePath: { eq: "assets/ethereum-logo-landscape-purple.png" }
    ) {
      ...assetItem
    }
    ethWordmarkPurple: file(
      relativePath: { eq: "assets/ethereum-wordmark-purple.png" }
    ) {
      ...assetItem
    }
    ethPortraitPurplePurple: file(
      relativePath: { eq: "assets/ethereum-logo-portrait-purple-purple.png" }
    ) {
      ...assetItem
    }
    ethLandscapePurplePurple: file(
      relativePath: { eq: "assets/ethereum-logo-landscape-purple-purple.png" }
    ) {
      ...assetItem
    }
    ethWordmarkPurplePurple: file(
      relativePath: { eq: "assets/ethereum-wordmark-purple-purple.png" }
    ) {
      ...assetItem
    }
    ethPortraitPurpleWhite: file(
      relativePath: { eq: "assets/ethereum-logo-portrait-purple-white.png" }
    ) {
      ...assetItem
    }
    ethLandscapePurpleWhite: file(
      relativePath: { eq: "assets/ethereum-logo-landscape-purple-white.png" }
    ) {
      ...assetItem
    }
    ethWordmarkPurpleWhite: file(
      relativePath: { eq: "assets/ethereum-wordmark-purple-white.png" }
    ) {
      ...assetItem
    }
  }
`

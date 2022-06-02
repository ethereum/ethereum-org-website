import React, { useContext } from "react"
import { useIntl } from "gatsby-plugin-intl"
import { ThemeContext } from "styled-components"
import styled from "styled-components"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { graphql } from "gatsby"

import AssetDownload from "../components/AssetDownload"
import Link from "../components/Link"
import PageMetadata from "../components/PageMetadata"
import Translation from "../components/Translation"
import { Page, Content } from "../components/SharedStyledComponents"

import { translateMessageId } from "../utils/translations"
import getFilename from "../utils/getFilename"
import EthGlyphColoredSvg from "../assets/assets/eth-glyph-colored.svg"

const Image = styled(GatsbyImage)`
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

const AssetsPage = ({ data }) => {
  const intl = useIntl()
  const themeContext = useContext(ThemeContext)
  const isDarkTheme = themeContext.isDark
  const assetPageHeroImage = isDarkTheme
    ? data.ethDiamondPurpleHero
    : data.ethDiamondBlackHero
  return (
    <Page>
      <PageMetadata
        title={translateMessageId("page-assets-meta-title", intl)}
        description={translateMessageId("page-assets-meta-desc", intl)}
      />
      <Content>
        <HeroContainer>
          <Header>
            <Image
              image={getImage(assetPageHeroImage)}
              alt={translateMessageId("page-assets-eth-diamond-gray", intl)}
            />
            <h1>
              <Translation id="page-assets-h1" />
            </h1>
            <Link to="/assets/#illustrations">
              <Translation id="page-assets-illustrations" />
            </Link>
            <Link to="/assets/#historical">
              <Translation id="page-assets-historical-artwork" />
            </Link>
            <Link to="/assets/#brand">
              <Translation id="page-assets-ethereum-brand-assets" />
            </Link>
          </Header>
        </HeroContainer>
        <H2 id="illustrations">
          <Translation id="page-assets-illustrations" />
        </H2>

        <Row>
          <AssetDownload
            title={translateMessageId("page-assets-hero", intl)}
            alt={translateMessageId("page-assets-hero", intl)}
            image={data.hero}
            src={`/assets/${getFilename(data.hero.relativePath)}`}
            artistName="Liam Cobb"
            artistUrl="https://liamcobb.com/"
          />
        </Row>

        <Row>
          <AssetDownload
            title={translateMessageId("page-assets-doge", intl)}
            alt={translateMessageId("page-assets-doge", intl)}
            image={data.doge}
            src={`/assets/${getFilename(data.doge.relativePath)}`}
            artistName="William Tempest"
            artistUrl="https://cargocollective.com/willtempest"
          />
          <AssetDownload
            title={translateMessageId("page-assets-blocks", intl)}
            alt={translateMessageId("page-assets-blocks", intl)}
            image={data.developers}
            src={`/assets/${getFilename(data.developers.relativePath)}`}
            artistName="William Tempest"
            artistUrl="https://cargocollective.com/willtempest"
          />
          <AssetDownload
            title={translateMessageId("page-assets-enterprise", intl)}
            alt={translateMessageId("page-assets-enterprise", intl)}
            image={data.enterprise}
            src={`/assets/${getFilename(data.enterprise.relativePath)}`}
            artistName="William Tempest"
            artistUrl="https://cargocollective.com/willtempest"
          />
        </Row>

        <Row>
          <AssetDownload
            title={translateMessageId("page-assets-infrastructure", intl)}
            alt={translateMessageId("page-assets-infrastructure", intl)}
            image={data.infrastructure}
            src={`/assets/${getFilename(data.infrastructure.relativePath)}`}
            artistName="William Tempest"
            artistUrl="https://cargocollective.com/willtempest"
          />
          <AssetDownload
            title={translateMessageId("page-assets-finance", intl)}
            alt={translateMessageId("page-assets-finance", intl)}
            image={data.finance}
            src={`/assets/${getFilename(data.finance.relativePath)}`}
            artistName="William Tempest"
            artistUrl="https://cargocollective.com/willtempest"
          />
          <AssetDownload
            title={translateMessageId("page-assets-impact", intl)}
            alt={translateMessageId("page-assets-impact", intl)}
            image={data.impact}
            src={`/assets/${getFilename(data.impact.relativePath)}`}
            artistName="William Tempest"
            artistUrl="https://cargocollective.com/willtempest"
          />
        </Row>

        <Row>
          <AssetDownload
            title={translateMessageId("page-assets-future", intl)}
            alt={translateMessageId("page-assets-future", intl)}
            image={data.future}
            src={`/assets/${getFilename(data.future.relativePath)}`}
            artistName="William Tempest"
            artistUrl="https://cargocollective.com/willtempest"
          />
          <AssetDownload
            title={translateMessageId("page-assets-hackathon", intl)}
            alt={translateMessageId("page-assets-hackathon", intl)}
            image={data.hackathon}
            src={`/assets/${getFilename(data.hackathon.relativePath)}`}
            artistName="William Tempest"
            artistUrl="https://cargocollective.com/willtempest"
          />
        </Row>

        <Row>
          <AssetDownload
            title={translateMessageId("page-assets-robot", intl)}
            alt={translateMessageId("page-assets-robot", intl)}
            image={data.wallet}
            src={`/assets/${getFilename(data.wallet.relativePath)}`}
            artistName="William Tempest"
            artistUrl="https://cargocollective.com/willtempest"
          />
          <AssetDownload
            title={translateMessageId("page-assets-robot", intl)}
            alt={translateMessageId("page-assets-robot", intl)}
            image={data.wallet}
            src={`/assets/${getFilename(data.wallet.relativePath)}`}
            artistName="William Tempest"
            artistUrl="https://cargocollective.com/willtempest"
            shouldHide={true}
          />
        </Row>

        <Row>
          <AssetDownload
            title={translateMessageId("page-assets-bazaar", intl)}
            alt={translateMessageId("page-assets-bazaar", intl)}
            image={data.whatIsEthereum}
            src={`/assets/${getFilename(data.whatIsEthereum.relativePath)}`}
            artistName="Viktor Hachmang"
            artistUrl="http://viktorhachmang.nl/"
          />
          <AssetDownload
            title={translateMessageId("page-assets-eth", intl)}
            alt={translateMessageId("page-assets-eth", intl)}
            image={data.eth}
            src={`/assets/${getFilename(data.eth.relativePath)}`}
            artistName="Viktor Hachmang"
            artistUrl="http://viktorhachmang.nl/"
          />
        </Row>

        <Row>
          <AssetDownload
            title={translateMessageId("page-assets-mainnet", intl)}
            alt={translateMessageId("page-assets-mainnet", intl)}
            image={data.oldShip}
            src={`/assets/${getFilename(data.oldShip.relativePath)}`}
            artistName="Viktor Hachmang"
            artistUrl="https://viktorhachmang.nl"
          />
          <AssetDownload
            title={translateMessageId("page-assets-merge", intl)}
            alt={translateMessageId("page-assets-merge", intl)}
            image={data.merge}
            src={`/assets/${getFilename(data.merge.relativePath)}`}
            artistName="Viktor Hachmang"
            artistUrl="https://viktorhachmang.nl"
          />
        </Row>

        <Row>
          <AssetDownload
            title={translateMessageId("page-assets-beacon-chain", intl)}
            alt={translateMessageId("page-assets-beacon-chain", intl)}
            image={data.beaconChain}
            src={`/assets/${getFilename(data.beaconChain.relativePath)}`}
            artistName="Viktor Hachmang"
            artistUrl="http://viktorhachmang.nl/"
          />
          <AssetDownload
            title={translateMessageId("page-assets-sharding", intl)}
            alt={translateMessageId("page-assets-sharding", intl)}
            image={data.newRings}
            src={`/assets/${getFilename(data.newRings.relativePath)}`}
            artistName="Viktor Hachmang"
            artistUrl="https://viktorhachmang.nl"
          />
        </Row>

        <Row>
          <AssetDownload
            title={translateMessageId("page-assets-defi", intl)}
            alt={translateMessageId("page-assets-defi", intl)}
            image={data.defi}
            src={`/assets/${getFilename(data.defi.relativePath)}`}
            artistName="Patrick Atkins"
            artistUrl="https://www.patrickatkins.co.uk/"
          />
          <AssetDownload
            title={translateMessageId("page-assets-dao", intl)}
            alt={translateMessageId("page-assets-dao", intl)}
            image={data.dao}
            src={`/assets/${getFilename(data.dao.relativePath)}`}
            artistName="Patrick Atkins"
            artistUrl="https://www.patrickatkins.co.uk/"
          />
        </Row>

        <H2 id="historical">
          <Translation id="page-assets-historical-artwork" />
        </H2>

        <H2 id="brand">
          <Translation id="page-assets-ethereum-brand-assets" />
        </H2>

        <H3>
          <Translation id="page-assets-page-assets-transparent-background" />
        </H3>

        <Row>
          <AssetDownload
            title={translateMessageId("page-assets-eth-diamond-glyph", intl)}
            alt={translateMessageId("page-assets-eth-diamond-glyph", intl)}
            image={data.ethDiamondGlyph}
            src={`/assets/${getFilename(data.ethDiamondGlyph.relativePath)}`}
          />
          <AssetDownload
            title={translateMessageId("page-assets-eth-diamond-gray", intl)}
            alt={translateMessageId("page-assets-eth-diamond-gray", intl)}
            image={data.ethDiamondBlack}
            src={`/assets/${getFilename(data.ethDiamondBlack.relativePath)}`}
          />
          <AssetDownload
            title={translateMessageId("page-assets-eth-diamond-color", intl)}
            alt={translateMessageId("page-assets-eth-diamond-color", intl)}
            image={data.ethDiamondColor}
            src={`/assets/${getFilename(data.ethDiamondColor.relativePath)}`}
          />
        </Row>
        <Row>
          <AssetDownload
            title={translateMessageId("page-assets-eth-diamond-purple", intl)}
            alt={translateMessageId("page-assets-eth-diamond-purple", intl)}
            image={data.ethDiamondPurple}
            src={`/assets/${getFilename(data.ethDiamondPurple.relativePath)}`}
          />
          <AssetDownload
            title={translateMessageId("page-assets-eth-diamond-colored", intl)}
            alt={translateMessageId("page-assets-eth-diamond-colored", intl)}
            image={data.ethGlyphColored}
            src={`/assets/${getFilename(data.ethGlyphColored.relativePath)}`}
          />
          <AssetDownload
            title={translateMessageId(
              "page-assets-eth-diamond-colored-svg",
              intl
            )}
            alt={translateMessageId(
              "page-assets-eth-diamond-colored-svg",
              intl
            )}
            svg={EthGlyphColoredSvg}
          />
        </Row>
        <Row>
          <AssetDownload
            title={translateMessageId(
              "page-assets-eth-logo-portrait-gray",
              intl
            )}
            alt={translateMessageId("page-assets-eth-logo-portrait-gray", intl)}
            image={data.ethPortraitBlack}
            src={`/assets/${getFilename(data.ethPortraitBlack.relativePath)}`}
          />
          <AssetDownload
            title={translateMessageId(
              "page-assets-eth-logo-landscape-gray",
              intl
            )}
            alt={translateMessageId(
              "page-assets-eth-logo-landscape-gray",
              intl
            )}
            image={data.ethLandscapeBlack}
            src={`/assets/${getFilename(data.ethLandscapeBlack.relativePath)}`}
          />
          <AssetDownload
            title={translateMessageId("page-assets-eth-wordmark-gray", intl)}
            alt={translateMessageId("page-assets-eth-wordmark-gray", intl)}
            image={data.ethWordmarkBlack}
            src={`/assets/${getFilename(data.ethWordmarkBlack.relativePath)}`}
          />
        </Row>
        <Row>
          <AssetDownload
            title={translateMessageId(
              "page-assets-eth-logo-portrait-purple",
              intl
            )}
            alt={translateMessageId(
              "page-assets-eth-logo-portrait-purple",
              intl
            )}
            image={data.ethPortraitPurple}
            src={`/assets/${getFilename(data.ethPortraitPurple.relativePath)}`}
          />
          <AssetDownload
            title={translateMessageId(
              "page-assets-eth-logo-landscape-purple",
              intl
            )}
            alt={translateMessageId(
              "page-assets-eth-logo-landscape-purple",
              intl
            )}
            image={data.ethLandscapePurple}
            src={`/assets/${getFilename(data.ethLandscapePurple.relativePath)}`}
          />
          <AssetDownload
            title={translateMessageId("page-assets-eth-wordmark-purple", intl)}
            alt={translateMessageId("page-assets-eth-wordmark-purple", intl)}
            image={data.ethWordmarkPurple}
            src={`/assets/${getFilename(data.ethWordmarkPurple.relativePath)}`}
          />
        </Row>

        <H3>
          <Translation id="page-assets-page-assets-solid-background" />
        </H3>

        <Row>
          <AssetDownload
            title={translateMessageId("page-assets-eth-diamond-white", intl)}
            alt={translateMessageId("page-assets-eth-diamond-white", intl)}
            image={data.ethDiamondBlackWhite}
            src={`/assets/${getFilename(
              data.ethDiamondBlackWhite.relativePath
            )}`}
          />
          <AssetDownload
            title={translateMessageId("page-assets-eth-diamond-gray", intl)}
            alt={translateMessageId("page-assets-eth-diamond-gray", intl)}
            image={data.ethDiamondBlackGray}
            src={`/assets/${getFilename(
              data.ethDiamondBlackGray.relativePath
            )}`}
          />
          <AssetDownload
            title={translateMessageId("page-assets-eth-diamond-purple", intl)}
            alt={translateMessageId("page-assets-eth-diamond-purple", intl)}
            image={data.ethDiamondPurplePurple}
            src={`/assets/${getFilename(
              data.ethDiamondPurplePurple.relativePath
            )}`}
          />
          <AssetDownload
            title={translateMessageId("page-assets-eth-diamond-white", intl)}
            alt={translateMessageId("page-assets-eth-diamond-white", intl)}
            image={data.ethDiamondPurpleWhite}
            src={`/assets/${getFilename(
              data.ethDiamondPurpleWhite.relativePath
            )}`}
          />
        </Row>
        <Row>
          <AssetDownload
            title={translateMessageId(
              "page-assets-eth-logo-portrait-gray",
              intl
            )}
            alt={translateMessageId("page-assets-eth-logo-portrait-gray", intl)}
            image={data.ethPortraitBlackGray}
            src={`/assets/${getFilename(
              data.ethPortraitBlackGray.relativePath
            )}`}
          />
          <AssetDownload
            title={translateMessageId(
              "page-assets-eth-logo-landscape-gray",
              intl
            )}
            alt={translateMessageId(
              "page-assets-eth-logo-landscape-gray",
              intl
            )}
            image={data.ethLandscapeBlackGray}
            src={`/assets/${getFilename(
              data.ethLandscapeBlackGray.relativePath
            )}`}
          />
          <AssetDownload
            title={translateMessageId("page-assets-eth-wordmark-gray", intl)}
            alt={translateMessageId("page-assets-eth-wordmark-gray", intl)}
            image={data.ethWordmarkBlackGray}
            src={`/assets/${getFilename(
              data.ethWordmarkBlackGray.relativePath
            )}`}
          />
        </Row>
        <Row>
          <AssetDownload
            title={translateMessageId(
              "page-assets-eth-logo-portrait-purple",
              intl
            )}
            alt={translateMessageId(
              "page-assets-eth-logo-portrait-purple",
              intl
            )}
            image={data.ethPortraitPurplePurple}
            src={`/assets/${getFilename(
              data.ethPortraitPurplePurple.relativePath
            )}`}
          />
          <AssetDownload
            title={translateMessageId(
              "page-assets-eth-logo-landscape-purple",
              intl
            )}
            alt={translateMessageId(
              "page-assets-eth-logo-landscape-purple",
              intl
            )}
            image={data.ethLandscapePurplePurple}
            src={`/assets/${getFilename(
              data.ethLandscapePurplePurple.relativePath
            )}`}
          />
          <AssetDownload
            title={translateMessageId("page-assets-eth-wordmark-purple", intl)}
            alt={translateMessageId("page-assets-eth-wordmark-purple", intl)}
            image={data.ethWordmarkPurplePurple}
            src={`/assets/${getFilename(
              data.ethWordmarkPurplePurple.relativePath
            )}`}
          />
        </Row>
        <Row>
          <AssetDownload
            title={translateMessageId(
              "page-assets-eth-logo-portrait-white",
              intl
            )}
            alt={translateMessageId(
              "page-assets-eth-logo-portrait-white",
              intl
            )}
            image={data.ethPortraitPurpleWhite}
            src={`/assets/${getFilename(
              data.ethPortraitPurpleWhite.relativePath
            )}`}
          />
          <AssetDownload
            title={translateMessageId(
              "page-assets-eth-logo-landscape-white",
              intl
            )}
            alt={translateMessageId(
              "page-assets-eth-logo-landscape-white",
              intl
            )}
            image={data.ethLandscapePurpleWhite}
            src={`/assets/${getFilename(
              data.ethLandscapePurpleWhite.relativePath
            )}`}
          />
          <AssetDownload
            title={translateMessageId("page-assets-eth-wordmark-white", intl)}
            alt={translateMessageId("page-assets-eth-wordmark-white", intl)}
            image={data.ethWordmarkPurpleWhite}
            src={`/assets/${getFilename(
              data.ethWordmarkPurpleWhite.relativePath
            )}`}
          />
        </Row>
      </Content>
    </Page>
  )
}

export default AssetsPage

export const assetItem = graphql`
  fragment assetItem on File {
    relativePath
    childImageSharp {
      gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED, quality: 100)
    }
  }
`

export const query = graphql`
  {
    hero: file(relativePath: { eq: "home/hero.png" }) {
      ...assetItem
    }
    doge: file(relativePath: { eq: "doge-computer.png" }) {
      ...assetItem
    }
    developers: file(relativePath: { eq: "developers-eth-blocks.png" }) {
      ...assetItem
    }
    enterprise: file(relativePath: { eq: "enterprise-eth.png" }) {
      ...assetItem
    }
    wallet: file(relativePath: { eq: "wallet.png" }) {
      ...assetItem
    }
    hackathon: file(relativePath: { eq: "hackathon_transparent.png" }) {
      ...assetItem
    }
    impact: file(relativePath: { eq: "impact_transparent.png" }) {
      ...assetItem
    }
    future: file(relativePath: { eq: "future_transparent.png" }) {
      ...assetItem
    }
    finance: file(relativePath: { eq: "finance_transparent.png" }) {
      ...assetItem
    }
    infrastructure: file(
      relativePath: { eq: "infrastructure_transparent.png" }
    ) {
      ...assetItem
    }
    whatIsEthereum: file(relativePath: { eq: "what-is-ethereum.png" }) {
      ...assetItem
    }
    eth: file(relativePath: { eq: "eth.png" }) {
      ...assetItem
    }
    oldShip: file(relativePath: { eq: "upgrades/oldship.png" }) {
      ...assetItem
    }
    merge: file(relativePath: { eq: "upgrades/merge.png" }) {
      ...assetItem
    }
    beaconChain: file(relativePath: { eq: "upgrades/core.png" }) {
      ...assetItem
    }
    newRings: file(relativePath: { eq: "upgrades/newrings.png" }) {
      ...assetItem
    }
    defi: file(relativePath: { eq: "use-cases/defi.png" }) {
      ...assetItem
    }
    dao: file(relativePath: { eq: "use-cases/dao-2.png" }) {
      ...assetItem
    }
    ethDiamondBlackHero: file(
      relativePath: { eq: "assets/eth-diamond-black.png" }
    ) {
      childImageSharp {
        gatsbyImageData(
          width: 80
          layout: FIXED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    ethDiamondPurpleHero: file(
      relativePath: { eq: "assets/eth-diamond-purple.png" }
    ) {
      childImageSharp {
        gatsbyImageData(
          width: 80
          layout: FIXED
          placeholder: BLURRED
          quality: 100
        )
      }
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
    ethGlyphColored: file(
      relativePath: { eq: "assets/eth-glyph-colored.png" }
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

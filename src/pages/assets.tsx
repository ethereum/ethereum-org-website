// Libraries
import React from "react"
import { useIntl } from "react-intl"
import { useTheme } from "@emotion/react"
import styled from "@emotion/styled"
import { GatsbyImage } from "gatsby-plugin-image"
import { graphql, PageProps } from "gatsby"

// Assets
import EthGlyphColoredSvg from "../assets/assets/eth-glyph-colored.svg"
import MergePandaSvg from "../assets/home/merge-panda.svg"

// Components
import AssetDownload from "../components/AssetDownload"
import Link from "../components/Link"
import PageMetadata from "../components/PageMetadata"
import Translation from "../components/Translation"
import { Page, Content } from "../components/SharedStyledComponents"
import FeedbackCard from "../components/FeedbackCard"

// Types
import { Context } from "../types"

// Utils
import { translateMessageId } from "../utils/translations"
import { getImage } from "../utils/image"

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

const AssetsPage = ({ data }: PageProps<Queries.AssetsPageQuery, Context>) => {
  const intl = useIntl()
  const theme = useTheme()
  const isDarkTheme = theme.isDark
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
              image={getImage(assetPageHeroImage)!}
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
            artistName="Liam Cobb"
            artistUrl="https://liamcobb.com/"
          />
        </Row>
        <Row>
          <AssetDownload
            title={translateMessageId("page-assets-hero-panda", intl)}
            alt={translateMessageId("page-assets-hero-panda", intl)}
            image={data.heroPanda}
          />
          <AssetDownload
            title={translateMessageId("page-assets-merge-panda", intl)}
            alt={translateMessageId("page-assets-merge-panda", intl)}
            image={data.mergePanda}
          />
          <AssetDownload
            title={translateMessageId("page-assets-merge-panda-svg", intl)}
            alt={translateMessageId("page-assets-merge-panda-svg", intl)}
            svg={MergePandaSvg}
          />
        </Row>

        <Row>
          <AssetDownload
            title={translateMessageId("page-assets-doge", intl)}
            alt={translateMessageId("page-assets-doge", intl)}
            image={data.doge}
            artistName="William Tempest"
            artistUrl="https://cargocollective.com/willtempest"
          />
          <AssetDownload
            title={translateMessageId("page-assets-blocks", intl)}
            alt={translateMessageId("page-assets-blocks", intl)}
            image={data.developers}
            artistName="William Tempest"
            artistUrl="https://cargocollective.com/willtempest"
          />
          <AssetDownload
            title={translateMessageId("page-assets-enterprise", intl)}
            alt={translateMessageId("page-assets-enterprise", intl)}
            image={data.enterprise}
            artistName="William Tempest"
            artistUrl="https://cargocollective.com/willtempest"
          />
        </Row>

        <Row>
          <AssetDownload
            title={translateMessageId("page-assets-infrastructure", intl)}
            alt={translateMessageId("page-assets-infrastructure", intl)}
            image={data.infrastructure}
            artistName="William Tempest"
            artistUrl="https://cargocollective.com/willtempest"
          />
          <AssetDownload
            title={translateMessageId("page-assets-finance", intl)}
            alt={translateMessageId("page-assets-finance", intl)}
            image={data.finance}
            artistName="William Tempest"
            artistUrl="https://cargocollective.com/willtempest"
          />
          <AssetDownload
            title={translateMessageId("page-assets-impact", intl)}
            alt={translateMessageId("page-assets-impact", intl)}
            image={data.impact}
            artistName="William Tempest"
            artistUrl="https://cargocollective.com/willtempest"
          />
        </Row>

        <Row>
          <AssetDownload
            title={translateMessageId("page-assets-future", intl)}
            alt={translateMessageId("page-assets-future", intl)}
            image={data.future}
            artistName="William Tempest"
            artistUrl="https://cargocollective.com/willtempest"
          />
          <AssetDownload
            title={translateMessageId("page-assets-hackathon", intl)}
            alt={translateMessageId("page-assets-hackathon", intl)}
            image={data.hackathon}
            artistName="William Tempest"
            artistUrl="https://cargocollective.com/willtempest"
          />
        </Row>

        <Row>
          <AssetDownload
            title={translateMessageId("page-assets-robot", intl)}
            alt={translateMessageId("page-assets-robot", intl)}
            image={data.wallet}
            artistName="William Tempest"
            artistUrl="https://cargocollective.com/willtempest"
          />
          <AssetDownload
            title={translateMessageId("page-assets-robot", intl)}
            alt={translateMessageId("page-assets-robot", intl)}
            image={data.wallet}
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
            artistName="Viktor Hachmang"
            artistUrl="http://viktorhachmang.nl/"
          />
          <AssetDownload
            title={translateMessageId("page-assets-eth", intl)}
            alt={translateMessageId("page-assets-eth", intl)}
            image={data.eth}
            artistName="Viktor Hachmang"
            artistUrl="http://viktorhachmang.nl/"
          />
        </Row>

        <Row>
          <AssetDownload
            title={translateMessageId("page-assets-mainnet", intl)}
            alt={translateMessageId("page-assets-mainnet", intl)}
            image={data.oldShip}
            artistName="Viktor Hachmang"
            artistUrl="https://viktorhachmang.nl"
          />
          <AssetDownload
            title={translateMessageId("page-assets-merge", intl)}
            alt={translateMessageId("page-assets-merge", intl)}
            image={data.merge}
            artistName="Viktor Hachmang"
            artistUrl="https://viktorhachmang.nl"
          />
        </Row>

        <Row>
          <AssetDownload
            title={translateMessageId("page-assets-beacon-chain", intl)}
            alt={translateMessageId("page-assets-beacon-chain", intl)}
            image={data.beaconChain}
            artistName="Viktor Hachmang"
            artistUrl="http://viktorhachmang.nl/"
          />
          <AssetDownload
            title={translateMessageId("page-assets-sharding", intl)}
            alt={translateMessageId("page-assets-sharding", intl)}
            image={data.newRings}
            artistName="Viktor Hachmang"
            artistUrl="https://viktorhachmang.nl"
          />
        </Row>

        <Row>
          <AssetDownload
            title={translateMessageId("page-assets-defi", intl)}
            alt={translateMessageId("page-assets-defi", intl)}
            image={data.defi}
            artistName="Patrick Atkins"
            artistUrl="https://www.patrickatkins.co.uk/"
          />
          <AssetDownload
            title={translateMessageId("page-assets-dao", intl)}
            alt={translateMessageId("page-assets-dao", intl)}
            image={data.dao}
            artistName="Patrick Atkins"
            artistUrl="https://www.patrickatkins.co.uk/"
          />
        </Row>

        <Row>
          <AssetDownload
            title={translateMessageId("page-assets-leslie-the-rhino", intl)}
            alt={translateMessageId("page-assets-leslie-the-rhino", intl)}
            artistName="Tomo Saito"
            artistUrl="https://tomosaito.com/"
            image={data.leslieTheRhino}
          />
          <AssetDownload
            title={translateMessageId("page-assets-leslie-the-rhino", intl)}
            alt={translateMessageId("page-assets-leslie-the-rhino", intl)}
            artistName="Tomo Saito"
            artistUrl="https://tomosaito.com/"
            image={data.leslieTheRhino}
            shouldHide={true}
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
          />
          <AssetDownload
            title={translateMessageId("page-assets-eth-diamond-gray", intl)}
            alt={translateMessageId("page-assets-eth-diamond-gray", intl)}
            image={data.ethDiamondBlack}
          />
          <AssetDownload
            title={translateMessageId("page-assets-eth-diamond-color", intl)}
            alt={translateMessageId("page-assets-eth-diamond-color", intl)}
            image={data.ethDiamondColor}
          />
        </Row>
        <Row>
          <AssetDownload
            title={translateMessageId("page-assets-eth-diamond-purple", intl)}
            alt={translateMessageId("page-assets-eth-diamond-purple", intl)}
            image={data.ethDiamondPurple}
          />
          <AssetDownload
            title={translateMessageId("page-assets-eth-diamond-colored", intl)}
            alt={translateMessageId("page-assets-eth-diamond-colored", intl)}
            image={data.ethGlyphColored}
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
          />
          <AssetDownload
            title={translateMessageId("page-assets-eth-wordmark-gray", intl)}
            alt={translateMessageId("page-assets-eth-wordmark-gray", intl)}
            image={data.ethWordmarkBlack}
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
          />
          <AssetDownload
            title={translateMessageId("page-assets-eth-wordmark-purple", intl)}
            alt={translateMessageId("page-assets-eth-wordmark-purple", intl)}
            image={data.ethWordmarkPurple}
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
          />
          <AssetDownload
            title={translateMessageId("page-assets-eth-diamond-gray", intl)}
            alt={translateMessageId("page-assets-eth-diamond-gray", intl)}
            image={data.ethDiamondBlackGray}
          />
          <AssetDownload
            title={translateMessageId("page-assets-eth-diamond-purple", intl)}
            alt={translateMessageId("page-assets-eth-diamond-purple", intl)}
            image={data.ethDiamondPurplePurple}
          />
          <AssetDownload
            title={translateMessageId("page-assets-eth-diamond-white", intl)}
            alt={translateMessageId("page-assets-eth-diamond-white", intl)}
            image={data.ethDiamondPurpleWhite}
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
          />
          <AssetDownload
            title={translateMessageId("page-assets-eth-wordmark-gray", intl)}
            alt={translateMessageId("page-assets-eth-wordmark-gray", intl)}
            image={data.ethWordmarkBlackGray}
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
          />
          <AssetDownload
            title={translateMessageId("page-assets-eth-wordmark-purple", intl)}
            alt={translateMessageId("page-assets-eth-wordmark-purple", intl)}
            image={data.ethWordmarkPurplePurple}
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
          />
          <AssetDownload
            title={translateMessageId("page-assets-eth-wordmark-white", intl)}
            alt={translateMessageId("page-assets-eth-wordmark-white", intl)}
            image={data.ethWordmarkPurpleWhite}
          />
        </Row>
      </Content>
      <FeedbackCard />
    </Page>
  )
}

export default AssetsPage

export const assetItem = graphql`
  fragment assetItem on File {
    childImageSharp {
      gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED, quality: 100)
    }
  }
`

export const query = graphql`
  query AssetsPage {
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
    hero: file(relativePath: { eq: "home/hero.png" }) {
      ...assetItem
    }
    heroPanda: file(relativePath: { eq: "home/hero-panda.png" }) {
      ...assetItem
    }
    mergePanda: file(relativePath: { eq: "home/merge-panda.png" }) {
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
    leslieTheRhino: file(relativePath: { eq: "upgrades/upgrade_rhino.png" }) {
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
    # oldHero: file(relativePath: { eq: "assets/hero.png" }) {
    #   ...assetItem
    # }
    # oldHeroDark: file(relativePath: { eq: "assets/hero-dark.png" }) {
    #   ...assetItem
    # }
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

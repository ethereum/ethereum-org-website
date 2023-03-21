// Libraries
import React from "react"
import { useTranslation } from "gatsby-plugin-react-i18next"
import { GatsbyImage } from "gatsby-plugin-image"
import { graphql, PageProps } from "gatsby"
import {
  Box,
  Center,
  Flex,
  Heading,
  HeadingProps,
  Img,
  useTheme,
  VStack,
} from "@chakra-ui/react"

// Assets
import EthGlyphColoredSvg from "../assets/assets/eth-glyph-colored.svg"
import MergePandaSvg from "../assets/home/merge-panda.svg"

// Components
import AssetDownload from "../components/AssetDownload"
import Link from "../components/Link"
import PageMetadata from "../components/PageMetadata"
import Translation from "../components/Translation"
import FeedbackCard from "../components/FeedbackCard"

// Types
import type { ChildOnlyProp, Context } from "../types"

// Utils
import { getImage } from "../utils/image"

const Row = (props: ChildOnlyProp) => (
  <Flex
    wrap={{ base: "wrap", lg: "nowrap" }}
    justify="space-between"
    mx={-4}
    mb={8}
    {...props}
  />
)

const H2 = (prop: ChildOnlyProp & HeadingProps) => (
  <Heading
    fontSize={{ base: "2xl", md: "3xl" }}
    lineHeight={1.4}
    mt={16}
    mb={6}
    {...prop}
  />
)

const H3 = (prop: ChildOnlyProp) => (
  <Heading
    as="h3"
    fontSize={{ base: "xl", md: "2xl" }}
    lineHeight={1.4}
    mb={0}
    {...prop}
  />
)

const AssetsPage = ({ data }: PageProps<Queries.AssetsPageQuery, Context>) => {
  const { t } = useTranslation()
  const theme = useTheme()
  const isDarkTheme = theme.isDark
  const assetPageHeroImage = isDarkTheme
    ? data.ethDiamondPurpleHero
    : data.ethDiamondBlackHero
  return (
    <Flex direction="column" width="full">
      <PageMetadata
        title={t("page-assets-meta-title")}
        description={t("page-assets-meta-desc")}
      />
      <Box py={4} px={8}>
        <Flex direction="column" px={8} py={4}>
          <Center>
            <Img
              as={GatsbyImage}
              image={getImage(assetPageHeroImage)!}
              alt={t("page-assets-eth-diamond-gray")}
            />
          </Center>
          <Center>
            <h1>
              <Translation id="page-assets-h1" />
            </h1>
          </Center>
          <Center>
            <Link to="/assets/#illustrations">
              <Translation id="page-assets-illustrations" />
            </Link>
          </Center>
          <Center>
            <Link to="/assets/#historical">
              <Translation id="page-assets-historical-artwork" />
            </Link>
          </Center>
          <Center>
            <Link to="/assets/#brand">
              <Translation id="page-assets-ethereum-brand-assets" />
            </Link>
          </Center>
        </Flex>

        <H2 id="illustrations">
          <Translation id="page-assets-illustrations" />
        </H2>

        <Row>
          <AssetDownload
            title={t("page-assets-hero")}
            alt={t("page-assets-hero")}
            image={data.hero}
            artistName="Liam Cobb"
            artistUrl="https://liamcobb.com/"
          />
        </Row>
        <Row>
          <AssetDownload
            title={t("page-assets-hero-panda")}
            alt={t("page-assets-hero-panda")}
            image={data.heroPanda}
          />
          <AssetDownload
            title={t("page-assets-merge-panda")}
            alt={t("page-assets-merge-panda")}
            image={data.mergePanda}
          />
          <AssetDownload
            title={t("page-assets-merge-panda-svg")}
            alt={t("page-assets-merge-panda-svg")}
            svg={MergePandaSvg}
          />
        </Row>
        <Row>
          <AssetDownload
            title={t("page-assets-doge")}
            alt={t("page-assets-doge")}
            image={data.doge}
            artistName="William Tempest"
            artistUrl="https://cargocollective.com/willtempest"
          />
          <AssetDownload
            title={t("page-assets-blocks")}
            alt={t("page-assets-blocks")}
            image={data.developers}
            artistName="William Tempest"
            artistUrl="https://cargocollective.com/willtempest"
          />
          <AssetDownload
            title={t("page-assets-enterprise")}
            alt={t("page-assets-enterprise")}
            image={data.enterprise}
            artistName="William Tempest"
            artistUrl="https://cargocollective.com/willtempest"
          />
        </Row>
        <Row>
          <AssetDownload
            title={t("page-assets-infrastructure")}
            alt={t("page-assets-infrastructure")}
            image={data.infrastructure}
            artistName="William Tempest"
            artistUrl="https://cargocollective.com/willtempest"
          />
          <AssetDownload
            title={t("page-assets-finance")}
            alt={t("page-assets-finance")}
            image={data.finance}
            artistName="William Tempest"
            artistUrl="https://cargocollective.com/willtempest"
          />
          <AssetDownload
            title={t("page-assets-impact")}
            alt={t("page-assets-impact")}
            image={data.impact}
            artistName="William Tempest"
            artistUrl="https://cargocollective.com/willtempest"
          />
        </Row>
        <Row>
          <AssetDownload
            title={t("page-assets-future")}
            alt={t("page-assets-future")}
            image={data.future}
            artistName="William Tempest"
            artistUrl="https://cargocollective.com/willtempest"
          />
          <AssetDownload
            title={t("page-assets-hackathon")}
            alt={t("page-assets-hackathon")}
            image={data.hackathon}
            artistName="William Tempest"
            artistUrl="https://cargocollective.com/willtempest"
          />
        </Row>
        <Row>
          <AssetDownload
            title={t("page-assets-robot")}
            alt={t("page-assets-robot")}
            image={data.wallet}
            artistName="William Tempest"
            artistUrl="https://cargocollective.com/willtempest"
          />
          <AssetDownload
            title={t("page-assets-robot")}
            alt={t("page-assets-robot")}
            image={data.wallet}
            artistName="William Tempest"
            artistUrl="https://cargocollective.com/willtempest"
            shouldHide={true}
          />
        </Row>
        <Row>
          <AssetDownload
            title={t("page-assets-bazaar")}
            alt={t("page-assets-bazaar")}
            image={data.whatIsEthereum}
            artistName="Viktor Hachmang"
            artistUrl="http://viktorhachmang.nl/"
          />
          <AssetDownload
            title={t("page-assets-eth")}
            alt={t("page-assets-eth")}
            image={data.eth}
            artistName="Viktor Hachmang"
            artistUrl="http://viktorhachmang.nl/"
          />
        </Row>
        <Row>
          <AssetDownload
            title={t("page-assets-mainnet")}
            alt={t("page-assets-mainnet")}
            image={data.oldShip}
            artistName="Viktor Hachmang"
            artistUrl="https://viktorhachmang.nl"
          />
          <AssetDownload
            title={t("page-assets-merge")}
            alt={t("page-assets-merge")}
            image={data.merge}
            artistName="Viktor Hachmang"
            artistUrl="https://viktorhachmang.nl"
          />
        </Row>
        <Row>
          <AssetDownload
            title={t("page-assets-beacon-chain")}
            alt={t("page-assets-beacon-chain")}
            image={data.beaconChain}
            artistName="Viktor Hachmang"
            artistUrl="http://viktorhachmang.nl/"
          />
          <AssetDownload
            title={t("page-assets-sharding")}
            alt={t("page-assets-sharding")}
            image={data.newRings}
            artistName="Viktor Hachmang"
            artistUrl="https://viktorhachmang.nl"
          />
        </Row>
        <Row>
          <AssetDownload
            title={t("page-assets-defi")}
            alt={t("page-assets-defi")}
            image={data.defi}
            artistName="Patrick Atkins"
            artistUrl="https://www.patrickatkins.co.uk/"
          />
          <AssetDownload
            title={t("page-assets-dao")}
            alt={t("page-assets-dao")}
            image={data.dao}
            artistName="Patrick Atkins"
            artistUrl="https://www.patrickatkins.co.uk/"
          />
        </Row>
        <Row>
          <AssetDownload
            title={t("page-assets-leslie-the-rhino")}
            alt={t("page-assets-leslie-the-rhino")}
            artistName="Tomo Saito"
            artistUrl="https://tomosaito.com/"
            image={data.leslieTheRhino}
          />
          <AssetDownload
            title={t("page-assets-leslie-the-rhino")}
            alt={t("page-assets-leslie-the-rhino")}
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
            title={t("page-assets-eth-diamond-glyph")}
            alt={t("page-assets-eth-diamond-glyph")}
            image={data.ethDiamondGlyph}
          />
          <AssetDownload
            title={t("page-assets-eth-diamond-gray")}
            alt={t("page-assets-eth-diamond-gray")}
            image={data.ethDiamondBlack}
          />
          <AssetDownload
            title={t("page-assets-eth-diamond-color")}
            alt={t("page-assets-eth-diamond-color")}
            image={data.ethDiamondColor}
          />
        </Row>
        <Row>
          <AssetDownload
            title={t("page-assets-eth-diamond-purple")}
            alt={t("page-assets-eth-diamond-purple")}
            image={data.ethDiamondPurple}
          />
          <AssetDownload
            title={t("page-assets-eth-diamond-colored")}
            alt={t("page-assets-eth-diamond-colored")}
            image={data.ethGlyphColored}
          />
          <AssetDownload
            title={t("page-assets-eth-diamond-colored-svg")}
            alt={t("page-assets-eth-diamond-colored-svg")}
            svg={EthGlyphColoredSvg}
          />
        </Row>
        <Row>
          <AssetDownload
            title={t("page-assets-eth-logo-portrait-gray")}
            alt={t("page-assets-eth-logo-portrait-gray")}
            image={data.ethPortraitBlack}
          />
          <AssetDownload
            title={t("page-assets-eth-logo-landscape-gray")}
            alt={t("page-assets-eth-logo-landscape-gray")}
            image={data.ethLandscapeBlack}
          />
          <AssetDownload
            title={t("page-assets-eth-wordmark-gray")}
            alt={t("page-assets-eth-wordmark-gray")}
            image={data.ethWordmarkBlack}
          />
        </Row>
        <Row>
          <AssetDownload
            title={t("page-assets-eth-logo-portrait-purple")}
            alt={t("page-assets-eth-logo-portrait-purple")}
            image={data.ethPortraitPurple}
          />
          <AssetDownload
            title={t("page-assets-eth-logo-landscape-purple")}
            alt={t("page-assets-eth-logo-landscape-purple")}
            image={data.ethLandscapePurple}
          />
          <AssetDownload
            title={t("page-assets-eth-wordmark-purple")}
            alt={t("page-assets-eth-wordmark-purple")}
            image={data.ethWordmarkPurple}
          />
        </Row>
        <H3>
          <Translation id="page-assets-page-assets-solid-background" />
        </H3>
        <Row>
          <AssetDownload
            title={t("page-assets-eth-diamond-white")}
            alt={t("page-assets-eth-diamond-white")}
            image={data.ethDiamondBlackWhite}
          />
          <AssetDownload
            title={t("page-assets-eth-diamond-gray")}
            alt={t("page-assets-eth-diamond-gray")}
            image={data.ethDiamondBlackGray}
          />
          <AssetDownload
            title={t("page-assets-eth-diamond-purple")}
            alt={t("page-assets-eth-diamond-purple")}
            image={data.ethDiamondPurplePurple}
          />
          <AssetDownload
            title={t("page-assets-eth-diamond-white")}
            alt={t("page-assets-eth-diamond-white")}
            image={data.ethDiamondPurpleWhite}
          />
        </Row>
        <Row>
          <AssetDownload
            title={t("page-assets-eth-logo-portrait-gray")}
            alt={t("page-assets-eth-logo-portrait-gray")}
            image={data.ethPortraitBlackGray}
          />
          <AssetDownload
            title={t("page-assets-eth-logo-landscape-gray")}
            alt={t("page-assets-eth-logo-landscape-gray")}
            image={data.ethLandscapeBlackGray}
          />
          <AssetDownload
            title={t("page-assets-eth-wordmark-gray")}
            alt={t("page-assets-eth-wordmark-gray")}
            image={data.ethWordmarkBlackGray}
          />
        </Row>
        <Row>
          <AssetDownload
            title={t("page-assets-eth-logo-portrait-purple")}
            alt={t("page-assets-eth-logo-portrait-purple")}
            image={data.ethPortraitPurplePurple}
          />
          <AssetDownload
            title={t("page-assets-eth-logo-landscape-purple")}
            alt={t("page-assets-eth-logo-landscape-purple")}
            image={data.ethLandscapePurplePurple}
          />
          <AssetDownload
            title={t("page-assets-eth-wordmark-purple")}
            alt={t("page-assets-eth-wordmark-purple")}
            image={data.ethWordmarkPurplePurple}
          />
        </Row>
        <Row>
          <AssetDownload
            title={t("page-assets-eth-logo-portrait-white")}
            alt={t("page-assets-eth-logo-portrait-white")}
            image={data.ethPortraitPurpleWhite}
          />
          <AssetDownload
            title={t("page-assets-eth-logo-landscape-white")}
            alt={t("page-assets-eth-logo-landscape-white")}
            image={data.ethLandscapePurpleWhite}
          />
          <AssetDownload
            title={t("page-assets-eth-wordmark-white")}
            alt={t("page-assets-eth-wordmark-white")}
            image={data.ethWordmarkPurpleWhite}
          />
        </Row>
      </Box>
      <FeedbackCard />
    </Flex>
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
  query AssetsPage($languagesToFetch: [String!]!) {
    locales: allLocale(
      filter: {
        language: { in: $languagesToFetch }
        ns: { in: ["page-assets", "common"] }
      }
    ) {
      edges {
        node {
          ns
          data
          language
        }
      }
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

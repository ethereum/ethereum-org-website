import {
  Box,
  Center,
  Flex,
  Heading,
  SimpleGrid,
  type HeadingProps,
  type SimpleGridProps,
  useColorModeValue,
} from "@chakra-ui/react"
import { useTranslation } from "next-i18next"
import type { GetStaticProps } from "next/types"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

import AssetDownload from "@/components/AssetDownload"
import InlineLink from "@/components/Link"
import PageMetadata from "@/components/PageMetadata"
import FeedbackCard from "@/components/FeedbackCard"
import OldHeading from "@/components/OldHeading"
import { Image } from "@/components/Image"

import beaconChain from "@/public/upgrades/core.png"
import dao from "@/public/use-cases/dao-2.png"
import defi from "@/public/use-cases/defi.png"
import developers from "@/public/developers-eth-blocks.png"
import doge from "@/public/doge-computer.png"
import enterprise from "@/public/enterprise-eth.png"
import eth from "@/public/eth.png"
import ethDiamondBlack from "@/public/assets/eth-diamond-black.png"
import ethDiamondBlackGray from "@/public/assets/eth-diamond-black-gray.png"
// import ethDiamondBlackHero from "@/public/assets/eth-diamond-black.png"
import ethDiamondBlackWhite from "@/public/assets/eth-diamond-black-white.jpg"
import ethDiamondColor from "@/public/assets/eth-diamond-rainbow.png"
import ethDiamondGlyph from "@/public/assets/eth-diamond-glyph.png"
import ethDiamondPurple from "@/public/assets/eth-diamond-purple.png"
// import ethDiamondPurpleHero from "@/public/assets/eth-diamond-purple.png"
import ethDiamondPurplePurple from "@/public/assets/eth-diamond-purple-purple.png"
import ethDiamondPurpleWhite from "@/public/assets/eth-diamond-purple-white.jpg"
import ethGlyphColored from "@/public/assets/eth-glyph-colored.png"
import ethLandscapeBlack from "@/public/assets/ethereum-logo-landscape-black.png"
import ethLandscapeBlackGray from "@/public/assets/ethereum-logo-landscape-black-gray.png"
import ethLandscapePurple from "@/public/assets/ethereum-logo-landscape-purple.png"
import ethLandscapePurplePurple from "@/public/assets/ethereum-logo-landscape-purple-purple.png"
import ethLandscapePurpleWhite from "@/public/assets/ethereum-logo-landscape-purple-white.png"
import ethPortraitBlack from "@/public/assets/ethereum-logo-portrait-black.png"
import ethPortraitBlackGray from "@/public/assets/ethereum-logo-portrait-black-gray.png"
import ethPortraitPurple from "@/public/assets/ethereum-logo-portrait-purple.png"
import ethPortraitPurplePurple from "@/public/assets/ethereum-logo-portrait-purple-purple.png"
import ethWordmarkBlack from "@/public/assets/ethereum-wordmark-black.png"
import ethWordmarkBlackGray from "@/public/assets/ethereum-wordmark-black-gray.png"
import ethWordmarkPurple from "@/public/assets/ethereum-wordmark-purple.png"
import ethWordmarkPurplePurple from "@/public/assets/ethereum-wordmark-purple-purple.png"
import ethWordmarkPurpleWhite from "@/public/assets/ethereum-wordmark-purple-white.png"
import finance from "@/public/finance_transparent.png"
import future from "@/public/future_transparent.png"
import hackathon from "@/public/hackathon_transparent.png"
import hero from "@/public/home/hero.png"
import heroPanda from "@/public/home/hero-panda.png"
import impact from "@/public/impact_transparent.png"
import infrastructure from "@/public/infrastructure_transparent.png"
import merge from "@/public/upgrades/merge.png"
import mergePanda from "@/public/home/merge-panda.png"
import newRings from "@/public/upgrades/newrings.png"
import oldShip from "@/public/upgrades/oldship.png"
import wallet from "@/public/wallet.png"
import whatIsEthereum from "@/public/what-is-ethereum.png"
// import efLogo from "@/public/ef-logo.png"
// import efLogoWhite from "@/public/ef-logo-white.png"
// import ethGifCat from "@/public/eth-gif-cat.png"
// import ethGifChalk from "@/public/eth-gif-chalk.png"
// import ethGifSun from "@/public/eth-gif-sun.png"
// import ethGifWaves from "@/public/eth-gif-waves.png"
// import ethPortraitPurpleWhite from "@/public/assets/ethereum-logo-portrait-purple-white.png"
// import leslieTheRhino from "@/public/upgrades/upgrade_rhino.png"

import type { ChildOnlyProp } from "@/lib/types"
import { getRequiredNamespacesForPath } from "@/lib/utils/translations"

const Row = (props: SimpleGridProps) => (
  <SimpleGrid
    templateColumns="repeat(auto-fit, minmax(min(288px, 100%), 1fr))"
    mx={-4}
    mb={8}
    {...props}
  />
)

const H2 = (props: ChildOnlyProp & HeadingProps) => (
  <Heading
    fontSize={{ base: "2xl", md: "3xl" }}
    lineHeight={1.4}
    mt={16}
    mb={6}
    {...props}
  />
)

const H3 = (props: ChildOnlyProp) => (
  <OldHeading
    as="h3"
    fontSize={{ base: "xl", md: "2xl" }}
    lineHeight={1.4}
    mb={0}
    {...props}
  />
)

export const getStaticProps: GetStaticProps<{}, {}> = async (context) => {
  const { locale } = context
  // load i18n required namespaces for the given page
  const requiredNamespaces = getRequiredNamespacesForPath("/assets")
  return {
    props: await serverSideTranslations(locale!, requiredNamespaces),
  }
}

const AssetsPage = () => {
  const { t } = useTranslation("page-assets")
  const assetPageHeroImage = useColorModeValue(
    ethDiamondBlack,
    ethDiamondPurple
  )
  return (
    <Flex direction="column" width="full">
      <PageMetadata
        title={t("page-assets-meta-title")}
        description={t("page-assets-meta-desc")}
      />
      <Box py={4} px={8}>
        <Flex direction="column" px={8} py={4}>
          <Center>
            <Image
              src={assetPageHeroImage}
              alt={t("page-assets-eth-diamond-gray")}
              w="5rem"
            />
          </Center>
          <Center>
            <Heading as="h1" size="2xl" my={8}>
              {t("page-assets-h1")}
            </Heading>
          </Center>
          <Center>
            <InlineLink to="/assets/#illustrations">
              {t("page-assets-illustrations")}
            </InlineLink>
          </Center>
          <Center>
            <InlineLink to="/assets/#historical">
              {t("page-assets-historical-artwork")}
            </InlineLink>
          </Center>
          <Center>
            <InlineLink to="/assets/#brand">
              {t("page-assets-ethereum-brand-assets")}
            </InlineLink>
          </Center>
        </Flex>

        <H2 id="illustrations">{t("page-assets-illustrations")}</H2>

        <Row>
          <AssetDownload
            title={t("page-assets-hero")}
            alt={t("page-assets-hero")}
            image={hero}
            artistName="Liam Cobb"
            artistUrl="https://liamcobb.com/"
          />
        </Row>
        <Row>
          <AssetDownload
            title={t("page-assets-doge")}
            alt={t("page-assets-doge")}
            image={doge}
            artistName="William Tempest"
            artistUrl="https://cargocollective.com/willtempest"
          />
          <AssetDownload
            title={t("page-assets-blocks")}
            alt={t("page-assets-blocks")}
            image={developers}
            artistName="William Tempest"
            artistUrl="https://cargocollective.com/willtempest"
          />
          <AssetDownload
            title={t("page-assets-enterprise")}
            alt={t("page-assets-enterprise")}
            image={enterprise}
            artistName="William Tempest"
            artistUrl="https://cargocollective.com/willtempest"
          />
        </Row>
        <Row>
          <AssetDownload
            title={t("page-assets-infrastructure")}
            alt={t("page-assets-infrastructure")}
            image={infrastructure}
            artistName="William Tempest"
            artistUrl="https://cargocollective.com/willtempest"
          />
          <AssetDownload
            title={t("page-assets-finance")}
            alt={t("page-assets-finance")}
            image={finance}
            artistName="William Tempest"
            artistUrl="https://cargocollective.com/willtempest"
          />
          <AssetDownload
            title={t("page-assets-impact")}
            alt={t("page-assets-impact")}
            image={impact}
            artistName="William Tempest"
            artistUrl="https://cargocollective.com/willtempest"
          />
        </Row>
        <Row>
          <AssetDownload
            title={t("page-assets-future")}
            alt={t("page-assets-future")}
            image={future}
            artistName="William Tempest"
            artistUrl="https://cargocollective.com/willtempest"
          />
          <AssetDownload
            title={t("page-assets-hackathon")}
            alt={t("page-assets-hackathon")}
            image={hackathon}
            artistName="William Tempest"
            artistUrl="https://cargocollective.com/willtempest"
          />
          <AssetDownload
            title={t("page-assets-robot")}
            alt={t("page-assets-robot")}
            image={wallet}
            artistName="William Tempest"
            artistUrl="https://cargocollective.com/willtempest"
          />
        </Row>
        <Row>
          <AssetDownload
            title={t("page-assets-bazaar")}
            alt={t("page-assets-bazaar")}
            image={whatIsEthereum}
            artistName="Viktor Hachmang"
            artistUrl="http://viktorhachmang.nl/"
          />
          <AssetDownload
            title={t("page-assets-eth")}
            alt={t("page-assets-eth")}
            image={eth}
            artistName="Viktor Hachmang"
            artistUrl="http://viktorhachmang.nl/"
          />
        </Row>
        <Row>
          <AssetDownload
            title={t("page-assets-mainnet")}
            alt={t("page-assets-mainnet")}
            image={oldShip}
            artistName="Viktor Hachmang"
            artistUrl="https://viktorhachmang.nl"
          />
          <AssetDownload
            title={t("page-assets-merge")}
            alt={t("page-assets-merge")}
            image={merge}
            artistName="Viktor Hachmang"
            artistUrl="https://viktorhachmang.nl"
          />
        </Row>
        <Row>
          <AssetDownload
            title={t("page-assets-beacon-chain")}
            alt={t("page-assets-beacon-chain")}
            image={beaconChain}
            artistName="Viktor Hachmang"
            artistUrl="http://viktorhachmang.nl/"
          />
          <AssetDownload
            title={t("page-assets-sharding")}
            alt={t("page-assets-sharding")}
            image={newRings}
            artistName="Viktor Hachmang"
            artistUrl="https://viktorhachmang.nl"
          />
        </Row>
        <Row>
          <AssetDownload
            title={t("page-assets-defi")}
            alt={t("page-assets-defi")}
            image={defi}
            artistName="Patrick Atkins"
            artistUrl="https://www.patrickatkins.co.uk/"
          />
          <AssetDownload
            title={t("page-assets-dao")}
            alt={t("page-assets-dao")}
            image={dao}
            artistName="Patrick Atkins"
            artistUrl="https://www.patrickatkins.co.uk/"
          />
        </Row>
        <H2 id="historical">{t("page-assets-historical-artwork")}</H2>
        <H2 id="brand">{t("page-assets-ethereum-brand-assets")}</H2>
        <H3>{t("page-assets-page-assets-transparent-background")}</H3>
        <Row>
          <AssetDownload
            title={t("page-assets-eth-diamond-glyph")}
            alt={t("page-assets-eth-diamond-glyph")}
            image={ethDiamondGlyph}
            svgUrl="/static/eth-diamond-glyph.svg"
          />
          <AssetDownload
            title={t("page-assets-eth-diamond-gray")}
            alt={t("page-assets-eth-diamond-gray")}
            image={ethDiamondBlack}
            svgUrl="/static/eth-diamond-black.svg"
          />
          <AssetDownload
            title={t("page-assets-eth-diamond-color")}
            alt={t("page-assets-eth-diamond-color")}
            image={ethDiamondColor}
            svgUrl="/static/eth-diamond-rainbow.svg"
          />
        </Row>
        <Row>
          <AssetDownload
            title={t("page-assets-eth-diamond-purple")}
            alt={t("page-assets-eth-diamond-purple")}
            image={ethDiamondPurple}
            svgUrl="/static/eth-diamond-purple.svg"
          />
          <AssetDownload
            title={t("page-assets-eth-diamond-colored")}
            alt={t("page-assets-eth-diamond-colored")}
            image={ethGlyphColored}
            svgUrl="/static/eth-glyph-colored.svg"
          />
        </Row>
        <Row>
          <AssetDownload
            title={t("page-assets-eth-logo-portrait-gray")}
            alt={t("page-assets-eth-logo-portrait-gray")}
            image={ethPortraitBlack}
            svgUrl="/static/ethereum-logo-portrait-black.svg  "
          />
          <AssetDownload
            title={t("page-assets-eth-logo-landscape-gray")}
            alt={t("page-assets-eth-logo-landscape-gray")}
            image={ethLandscapeBlack}
            svgUrl="/static/ethereum-logo-landscape-black.svg"
          />
          <AssetDownload
            title={t("page-assets-eth-wordmark-gray")}
            alt={t("page-assets-eth-wordmark-gray")}
            image={ethWordmarkBlack}
            svgUrl="/static/ethereum-wordmark-black.svg"
          />
        </Row>
        <Row>
          <AssetDownload
            title={t("page-assets-eth-logo-portrait-purple")}
            alt={t("page-assets-eth-logo-portrait-purple")}
            image={ethPortraitPurple}
            svgUrl="/static/ethereum-logo-portrait-purple.svg"
          />
          <AssetDownload
            title={t("page-assets-eth-logo-landscape-purple")}
            alt={t("page-assets-eth-logo-landscape-purple")}
            image={ethLandscapePurple}
            svgUrl="/static/ethereum-logo-landscape-purple.svg"
          />
          <AssetDownload
            title={t("page-assets-eth-wordmark-purple")}
            alt={t("page-assets-eth-wordmark-purple")}
            image={ethWordmarkPurple}
            svgUrl="/static/ethereum-wordmark-purple-purple.svg"
          />
        </Row>
        <H3>{t("page-assets-page-assets-solid-background")}</H3>
        <Row>
          <AssetDownload
            title={t("page-assets-eth-diamond-white")}
            alt={t("page-assets-eth-diamond-white")}
            image={ethDiamondBlackWhite}
            svgUrl="/static/eth-diamond-black-white.svg"
          />
          <AssetDownload
            title={t("page-assets-eth-diamond-gray")}
            alt={t("page-assets-eth-diamond-gray")}
            image={ethDiamondBlackGray}
            svgUrl="/static/eth-diamond-black-gray.svg"
          />
          <AssetDownload
            title={t("page-assets-eth-diamond-purple")}
            alt={t("page-assets-eth-diamond-purple")}
            image={ethDiamondPurplePurple}
            svgUrl="/static/eth-diamond-purple-purple.svg"
          />
        </Row>

        <Row>
          <AssetDownload
            title={t("page-assets-eth-diamond-white")}
            alt={t("page-assets-eth-diamond-white")}
            image={ethDiamondPurpleWhite}
            svgUrl="/static/eth-diamond-purple-white.svg"
          />
          <AssetDownload
            title={t("page-assets-eth-diamond-white")}
            alt={t("page-assets-eth-diamond-white")}
            image={ethDiamondPurpleWhite}
            svgUrl="/static/eth-diamond-purple-white.svg"
          />
        </Row>
        <Row>
          <AssetDownload
            title={t("page-assets-eth-logo-portrait-gray")}
            alt={t("page-assets-eth-logo-portrait-gray")}
            image={ethPortraitBlackGray}
            svgUrl="/static/ethereum-logo-portrait-black-gray.svg"
          />
          <AssetDownload
            title={t("page-assets-eth-logo-landscape-gray")}
            alt={t("page-assets-eth-logo-landscape-gray")}
            image={ethLandscapeBlackGray}
            svgUrl="/static/ethereum-logo-landscape-black-gray.svg"
          />
          <AssetDownload
            title={t("page-assets-eth-wordmark-gray")}
            alt={t("page-assets-eth-wordmark-gray")}
            image={ethWordmarkBlackGray}
            svgUrl="/static/ethereum-wordmark-black-gray.svg"
          />
        </Row>
        <Row>
          <AssetDownload
            title={t("page-assets-eth-logo-portrait-purple")}
            alt={t("page-assets-eth-logo-portrait-purple")}
            image={ethPortraitPurplePurple}
            svgUrl="/static/ethereum-logo-portrait-purple-purple.svg"
          />
          <AssetDownload
            title={t("page-assets-eth-logo-landscape-purple")}
            alt={t("page-assets-eth-logo-landscape-purple")}
            image={ethLandscapePurplePurple}
            svgUrl="/static/ethereum-logo-landscape-purple-purple.svg"
          />
          <AssetDownload
            title={t("page-assets-eth-wordmark-purple")}
            alt={t("page-assets-eth-wordmark-purple")}
            image={ethWordmarkPurplePurple}
            svgUrl="/static/ethereum-wordmark-purple-purple.svg"
          />
        </Row>
        <Row>
          <AssetDownload
            title={t("page-assets-eth-logo-landscape-white")}
            alt={t("page-assets-eth-logo-landscape-white")}
            image={ethLandscapePurpleWhite}
            svgUrl="/static/ethereum-logo-landscape-purple-white.svg"
          />
          <AssetDownload
            title={t("page-assets-eth-wordmark-white")}
            alt={t("page-assets-eth-wordmark-white")}
            image={ethWordmarkPurpleWhite}
            svgUrl="/static/ethereum-wordmark-purple-white.svg"
          />
        </Row>
        <H2 id="historical-illustrations">{t("page-assets-illustrations")}</H2>
        <Row>
          <AssetDownload
            title={t("page-assets-hero-panda")}
            alt={t("page-assets-hero-panda")}
            image={heroPanda}
          />
          <AssetDownload
            title={t("page-assets-merge-panda")}
            alt={t("page-assets-merge-panda")}
            image={mergePanda}
            svgUrl="/static/merge-panda.svg"
          />
        </Row>
      </Box>
      <FeedbackCard />
    </Flex>
  )
}

export default AssetsPage

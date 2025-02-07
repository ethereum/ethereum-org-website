import { HTMLAttributes } from "react"
import type { GetStaticProps } from "next/types"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

import type { BasePageProps, ChildOnlyProp, Lang } from "@/lib/types"

import AssetDownload from "@/components/AssetDownload"
import FeedbackCard from "@/components/FeedbackCard"
import { TwImage } from "@/components/Image"
import MainArticle from "@/components/MainArticle"
import PageMetadata from "@/components/PageMetadata"
import { Center, Flex } from "@/components/ui/flex"
import InlineLink from "@/components/ui/Link"

import { existsNamespace } from "@/lib/utils/existsNamespace"
import { getLastDeployDate } from "@/lib/utils/getLastDeployDate"
import { getLocaleTimestamp } from "@/lib/utils/time"
// import efLogo from "@/public/images/ef-logo.png"
// import efLogoWhite from "@/public/images/ef-logo-white.png"
// import ethDiamondBlackHero from "@/public/images/assets/eth-diamond-black.png"
// import ethDiamondPurpleHero from "@/public/images/assets/eth-diamond-purple.png"
// import ethGifCat from "@/public/images/eth-gif-cat.png"
// import ethGifChalk from "@/public/images/eth-gif-chalk.png"
// import ethGifSun from "@/public/images/eth-gif-sun.png"
// import ethGifWaves from "@/public/images/eth-gif-waves.png"
// import ethPortraitPurpleWhite from "@/public/images/assets/ethereum-logo-portrait-purple-white.png"
// import leslieTheRhino from "@/public/images/upgrades/upgrade_rhino.png"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import useColorModeValue from "@/hooks/useColorModeValue"
import ethDiamondBlack from "@/public/images/assets/eth-diamond-black.png"
import ethDiamondBlackGray from "@/public/images/assets/eth-diamond-black-gray.png"
import ethDiamondBlackWhite from "@/public/images/assets/eth-diamond-black-white.jpg"
import ethDiamondGlyph from "@/public/images/assets/eth-diamond-glyph.png"
import ethDiamondPurple from "@/public/images/assets/eth-diamond-purple.png"
import ethDiamondPurplePurple from "@/public/images/assets/eth-diamond-purple-purple.png"
import ethDiamondPurpleWhite from "@/public/images/assets/eth-diamond-purple-white.jpg"
import ethDiamondColor from "@/public/images/assets/eth-diamond-rainbow.png"
import ethGlyphColored from "@/public/images/assets/eth-glyph-colored.png"
import ethLandscapeBlack from "@/public/images/assets/ethereum-logo-landscape-black.png"
import ethLandscapeBlackGray from "@/public/images/assets/ethereum-logo-landscape-black-gray.png"
import ethLandscapePurple from "@/public/images/assets/ethereum-logo-landscape-purple.png"
import ethLandscapePurplePurple from "@/public/images/assets/ethereum-logo-landscape-purple-purple.png"
import ethLandscapePurpleWhite from "@/public/images/assets/ethereum-logo-landscape-purple-white.png"
import ethPortraitBlack from "@/public/images/assets/ethereum-logo-portrait-black.png"
import ethPortraitBlackGray from "@/public/images/assets/ethereum-logo-portrait-black-gray.png"
import ethPortraitPurple from "@/public/images/assets/ethereum-logo-portrait-purple.png"
import ethPortraitPurplePurple from "@/public/images/assets/ethereum-logo-portrait-purple-purple.png"
import ethWordmarkBlack from "@/public/images/assets/ethereum-wordmark-black.png"
import ethWordmarkBlackGray from "@/public/images/assets/ethereum-wordmark-black-gray.png"
import ethWordmarkPurple from "@/public/images/assets/ethereum-wordmark-purple.png"
import ethWordmarkPurplePurple from "@/public/images/assets/ethereum-wordmark-purple-purple.png"
import ethWordmarkPurpleWhite from "@/public/images/assets/ethereum-wordmark-purple-white.png"
import developers from "@/public/images/developers-eth-blocks.png"
import doge from "@/public/images/doge-computer.png"
import enterprise from "@/public/images/enterprise-eth.png"
import eth from "@/public/images/eth.png"
import finance from "@/public/images/finance_transparent.png"
import future from "@/public/images/future_transparent.png"
import hackathon from "@/public/images/hackathon_transparent.png"
import communityHero from "@/public/images/heroes/community-hero.png"
import developersHero from "@/public/images/heroes/developers-hub-hero.jpg"
import garden from "@/public/images/heroes/garden.jpg"
import guidesHero from "@/public/images/heroes/guides-hub-hero.jpg"
import layer2Hero from "@/public/images/heroes/layer-2-hub-hero.jpg"
import learnHero from "@/public/images/heroes/learn-hub-hero.png"
import quizzesHub from "@/public/images/heroes/quizzes-hub-hero.png"
import roadmapHero from "@/public/images/heroes/roadmap-hub-hero.jpg"
import hero from "@/public/images/home/hero.png"
import heroPanda from "@/public/images/home/hero-panda.png"
import mergePanda from "@/public/images/home/merge-panda.png"
import impact from "@/public/images/impact_transparent.png"
import infrastructure from "@/public/images/infrastructure_transparent.png"
import beaconChain from "@/public/images/upgrades/core.png"
import merge from "@/public/images/upgrades/merge.png"
import newRings from "@/public/images/upgrades/newrings.png"
import oldShip from "@/public/images/upgrades/oldship.png"
import dao from "@/public/images/use-cases/dao-2.png"
import defi from "@/public/images/use-cases/defi.png"
import wallet from "@/public/images/wallet.png"
import whatIsEthereum from "@/public/images/what-is-ethereum.png"

const Row = (props: ChildOnlyProp) => (
  <div
    className="-mx-4 mb-8 grid grid-cols-[repeat(auto-fit,minmax(min(288px,100%),1fr))]"
    {...props}
  />
)

const H2 = (props: HTMLAttributes<HTMLHeadingElement>) => (
  <h2 className="mb-6 mt-16 scroll-mt-24 leading-xs" {...props} />
)

const H3 = (props: ChildOnlyProp) => (
  <h3 className="mb-0 mt-10 leading-xs" {...props} />
)

export const getStaticProps = (async ({ locale }) => {
  const requiredNamespaces = getRequiredNamespacesForPage("assets")

  const contentNotTranslated = !existsNamespace(locale!, requiredNamespaces[2])

  const lastDeployDate = getLastDeployDate()
  const lastDeployLocaleTimestamp = getLocaleTimestamp(
    locale as Lang,
    lastDeployDate
  )

  return {
    props: {
      ...(await serverSideTranslations(locale!, requiredNamespaces)),
      contentNotTranslated,
      lastDeployLocaleTimestamp,
    },
  }
}) satisfies GetStaticProps<BasePageProps>

const AssetsPage = () => {
  const { t } = useTranslation("page-assets")
  const assetPageHeroImage = useColorModeValue(
    ethDiamondBlack,
    ethDiamondPurple
  )
  return (
    <Flex className="w-full flex-col">
      <PageMetadata
        title={t("page-assets-meta-title")}
        description={t("page-assets-meta-desc")}
      />
      <MainArticle className="px-8 py-4">
        <Flex className="flex-col px-8 py-4">
          <Center>
            <TwImage
              className="w-20"
              src={assetPageHeroImage}
              alt={t("page-assets-eth-diamond-gray")}
            />
          </Center>
          <Center>
            <h1 className="my-8">{t("page-assets-h1")}</h1>
          </Center>
          <Center>
            <InlineLink href="/assets/#illustrations">
              {t("page-assets-illustrations")}
            </InlineLink>
          </Center>
          <Center>
            <InlineLink href="/assets/#historical">
              {t("page-assets-historical-artwork")}
            </InlineLink>
          </Center>
          <Center>
            <InlineLink href="/assets/#brand">
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
            title={t("page-assets-learn-hero-name")}
            alt={t("page-assets-learn-hero-name")}
            image={learnHero}
            artistName="Liam Cobb"
            artistUrl="https://liamcobb.com/"
          />
          <AssetDownload
            title={t("page-assets-community-hero-name")}
            alt={t("page-assets-community-hero-name")}
            image={communityHero}
            artistName="Liam Cobb"
            artistUrl="https://liamcobb.com/"
          />
        </Row>
        <Row>
          <AssetDownload
            title={t("page-assets-quizzes-hero-name")}
            alt={t("page-assets-quizzes-hero-name")}
            image={quizzesHub}
            artistName="Liam Cobb"
            artistUrl="https://liamcobb.com/"
          />
          <AssetDownload
            title={t("page-assets-developers-hero-name")}
            alt={t("page-assets-developers-hero-name")}
            image={developersHero}
            artistName="Liam Cobb"
            artistUrl="https://liamcobb.com/"
          />
        </Row>
        <Row>
          <AssetDownload
            title={t("page-assets-garden-name")}
            alt={t("page-assets-garden-name")}
            image={garden}
            artistName="Liam Cobb"
            artistUrl="https://liamcobb.com/"
          />
          <AssetDownload
            title={t("page-assets-roadmap-hero-name")}
            alt={t("page-assets-roadmap-hero-name")}
            image={roadmapHero}
            artistName="Liam Cobb"
            artistUrl="https://liamcobb.com/"
          />
        </Row>
        <Row>
          <AssetDownload
            title={t("page-assets-layer-2-hero-name")}
            alt={t("page-assets-layer-2-hero-name")}
            image={layer2Hero}
            artistName="Liam Cobb"
            artistUrl="https://liamcobb.com/"
          />
          <AssetDownload
            title={t("page-assets-guides-hero-name")}
            alt={t("page-assets-guides-hero-name")}
            image={guidesHero}
            artistName="Liam Cobb"
            artistUrl="https://liamcobb.com/"
          />
        </Row>
        <Row>
          <AssetDownload
            title={t("page-assets-doge")}
            alt={t("page-assets-doge")}
            image={doge}
            artistName="WT"
          />
          <AssetDownload
            title={t("page-assets-blocks")}
            alt={t("page-assets-blocks")}
            image={developers}
            artistName="WT"
          />
          <AssetDownload
            title={t("page-assets-enterprise")}
            alt={t("page-assets-enterprise")}
            image={enterprise}
            artistName="WT"
          />
        </Row>
        <Row>
          <AssetDownload
            title={t("page-assets-infrastructure")}
            alt={t("page-assets-infrastructure")}
            image={infrastructure}
            artistName="WT"
          />
          <AssetDownload
            title={t("page-assets-finance")}
            alt={t("page-assets-finance")}
            image={finance}
            artistName="WT"
          />
          <AssetDownload
            title={t("page-assets-impact")}
            alt={t("page-assets-impact")}
            image={impact}
            artistName="WT"
          />
        </Row>
        <Row>
          <AssetDownload
            title={t("page-assets-future")}
            alt={t("page-assets-future")}
            image={future}
            artistName="WT"
          />
          <AssetDownload
            title={t("page-assets-hackathon")}
            alt={t("page-assets-hackathon")}
            image={hackathon}
            artistName="WT"
          />
          <AssetDownload
            title={t("page-assets-robot")}
            alt={t("page-assets-robot")}
            image={wallet}
            artistName="WT"
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
            svgUrl="/images/assets/svgs/eth-diamond-glyph.svg"
          />
          <AssetDownload
            title={t("page-assets-eth-diamond-gray")}
            alt={t("page-assets-eth-diamond-gray")}
            image={ethDiamondBlack}
            svgUrl="/images/assets/svgs/eth-diamond-black.svg"
          />
          <AssetDownload
            title={t("page-assets-eth-diamond-color")}
            alt={t("page-assets-eth-diamond-color")}
            image={ethDiamondColor}
            svgUrl="/images/assets/svgs/eth-diamond-rainbow.svg"
          />
        </Row>
        <Row>
          <AssetDownload
            title={t("page-assets-eth-diamond-purple")}
            alt={t("page-assets-eth-diamond-purple")}
            image={ethDiamondPurple}
            svgUrl="/images/assets/svgs/eth-diamond-purple.svg"
          />
          <AssetDownload
            title={t("page-assets-eth-diamond-colored")}
            alt={t("page-assets-eth-diamond-colored")}
            image={ethGlyphColored}
            svgUrl="/images/assets/svgs/eth-glyph-colored.svg"
          />
        </Row>
        <Row>
          <AssetDownload
            title={t("page-assets-eth-logo-portrait-gray")}
            alt={t("page-assets-eth-logo-portrait-gray")}
            image={ethPortraitBlack}
            svgUrl="/images/assets/svgs/ethereum-logo-portrait-black.svg  "
          />
          <AssetDownload
            title={t("page-assets-eth-logo-landscape-gray")}
            alt={t("page-assets-eth-logo-landscape-gray")}
            image={ethLandscapeBlack}
            svgUrl="/images/assets/svgs/ethereum-logo-landscape-black.svg"
          />
          <AssetDownload
            title={t("page-assets-eth-wordmark-gray")}
            alt={t("page-assets-eth-wordmark-gray")}
            image={ethWordmarkBlack}
            svgUrl="/images/assets/svgs/ethereum-wordmark-black.svg"
          />
        </Row>
        <Row>
          <AssetDownload
            title={t("page-assets-eth-logo-portrait-purple")}
            alt={t("page-assets-eth-logo-portrait-purple")}
            image={ethPortraitPurple}
            svgUrl="/images/assets/svgs/ethereum-logo-portrait-purple.svg"
          />
          <AssetDownload
            title={t("page-assets-eth-logo-landscape-purple")}
            alt={t("page-assets-eth-logo-landscape-purple")}
            image={ethLandscapePurple}
            svgUrl="/images/assets/svgs/ethereum-logo-landscape-purple.svg"
          />
          <AssetDownload
            title={t("page-assets-eth-wordmark-purple")}
            alt={t("page-assets-eth-wordmark-purple")}
            image={ethWordmarkPurple}
            svgUrl="/images/assets/svgs/ethereum-wordmark-purple-purple.svg"
          />
        </Row>
        <H3>{t("page-assets-page-assets-solid-background")}</H3>
        <Row>
          <AssetDownload
            title={t("page-assets-eth-diamond-white")}
            alt={t("page-assets-eth-diamond-white")}
            image={ethDiamondBlackWhite}
            svgUrl="/images/assets/svgs/eth-diamond-black-white.svg"
          />
          <AssetDownload
            title={t("page-assets-eth-diamond-gray")}
            alt={t("page-assets-eth-diamond-gray")}
            image={ethDiamondBlackGray}
            svgUrl="/images/assets/svgs/eth-diamond-black-gray.svg"
          />
          <AssetDownload
            title={t("page-assets-eth-diamond-purple")}
            alt={t("page-assets-eth-diamond-purple")}
            image={ethDiamondPurplePurple}
            svgUrl="/images/assets/svgs/eth-diamond-purple-purple.svg"
          />
        </Row>

        <Row>
          <AssetDownload
            title={t("page-assets-eth-diamond-white")}
            alt={t("page-assets-eth-diamond-white")}
            image={ethDiamondPurpleWhite}
            svgUrl="/images/assets/svgs/eth-diamond-purple-white.svg"
          />
          <AssetDownload
            title={t("page-assets-eth-diamond-white")}
            alt={t("page-assets-eth-diamond-white")}
            image={ethDiamondPurpleWhite}
            svgUrl="/images/assets/svgs/eth-diamond-purple-white.svg"
          />
        </Row>
        <Row>
          <AssetDownload
            title={t("page-assets-eth-logo-portrait-gray")}
            alt={t("page-assets-eth-logo-portrait-gray")}
            image={ethPortraitBlackGray}
            svgUrl="/images/assets/svgs/ethereum-logo-portrait-black-gray.svg"
          />
          <AssetDownload
            title={t("page-assets-eth-logo-landscape-gray")}
            alt={t("page-assets-eth-logo-landscape-gray")}
            image={ethLandscapeBlackGray}
            svgUrl="/images/assets/svgs/ethereum-logo-landscape-black-gray.svg"
          />
          <AssetDownload
            title={t("page-assets-eth-wordmark-gray")}
            alt={t("page-assets-eth-wordmark-gray")}
            image={ethWordmarkBlackGray}
            svgUrl="/images/assets/svgs/ethereum-wordmark-black-gray.svg"
          />
        </Row>
        <Row>
          <AssetDownload
            title={t("page-assets-eth-logo-portrait-purple")}
            alt={t("page-assets-eth-logo-portrait-purple")}
            image={ethPortraitPurplePurple}
            svgUrl="/images/assets/svgs/ethereum-logo-portrait-purple-purple.svg"
          />
          <AssetDownload
            title={t("page-assets-eth-logo-landscape-purple")}
            alt={t("page-assets-eth-logo-landscape-purple")}
            image={ethLandscapePurplePurple}
            svgUrl="/images/assets/svgs/ethereum-logo-landscape-purple-purple.svg"
          />
          <AssetDownload
            title={t("page-assets-eth-wordmark-purple")}
            alt={t("page-assets-eth-wordmark-purple")}
            image={ethWordmarkPurplePurple}
            svgUrl="/images/assets/svgs/ethereum-wordmark-purple-purple.svg"
          />
        </Row>
        <Row>
          <AssetDownload
            title={t("page-assets-eth-logo-landscape-white")}
            alt={t("page-assets-eth-logo-landscape-white")}
            image={ethLandscapePurpleWhite}
            svgUrl="/images/assets/svgs/ethereum-logo-landscape-purple-white.svg"
          />
          <AssetDownload
            title={t("page-assets-eth-wordmark-white")}
            alt={t("page-assets-eth-wordmark-white")}
            image={ethWordmarkPurpleWhite}
            svgUrl="/images/assets/svgs/ethereum-wordmark-purple-white.svg"
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
            svgUrl="/images/assets/svgs/merge-panda.svg"
          />
        </Row>
      </MainArticle>
      <FeedbackCard />
    </Flex>
  )
}

export default AssetsPage

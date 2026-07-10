import { getTranslations, setRequestLocale } from "next-intl/server"

import type { Lang, PageParams } from "@/lib/types"

import AssetDownload, {
  type AssetDownloadProps,
} from "@/components/AssetDownload"
import ContentFeedback from "@/components/ContentFeedback"
import { Image } from "@/components/Image"
import MainArticle from "@/components/MainArticle"
import { Grid } from "@/components/ui/grid"
import InlineLink from "@/components/ui/Link"
import { Section } from "@/components/ui/section"

import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import { getMetadata } from "@/lib/utils/metadata"

import AssetsJsonLD from "./page-jsonld"

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
import ethPortraitPurpleWhite from "@/public/images/assets/ethereum-logo-portrait-purple-white.png"
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
import developersHero from "@/public/images/heroes/developers-hub-hero.png"
import garden from "@/public/images/heroes/garden.jpg"
import guidesHero from "@/public/images/heroes/guides-hub-hero.jpg"
import layer2Hero from "@/public/images/heroes/layer-2-hub-hero.png"
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

type AssetItem = Omit<AssetDownloadProps, "perRow" | "titleAs">

const cobb = { artistName: "Liam Cobb", artistUrl: "https://liamcobb.com/" }
const hachmang = {
  artistName: "Viktor Hachmang",
  artistUrl: "https://viktorhachmang.nl/",
}
const atkins = {
  artistName: "Patrick Atkins",
  artistUrl: "https://www.patrickatkins.co.uk/",
}
const wt = { artistName: "WT" }

const svgPath = "/images/assets/svgs"

// Each inner array is one visual row; perRow derives from its length so the
// image `sizes` attribute stays matched to the rendered cell width
const renderAssetRows = (
  rows: AssetItem[][],
  titleAs?: AssetDownloadProps["titleAs"]
) =>
  rows.map((row, idx) => (
    <Grid key={idx} size="wide" fit>
      {row.map((item) => (
        <AssetDownload
          key={item.title}
          {...item}
          perRow={Math.min(row.length, 3) as AssetDownloadProps["perRow"]}
          titleAs={titleAs}
        />
      ))}
    </Grid>
  ))

export default async function Page(props: { params: Promise<PageParams> }) {
  const params = await props.params
  const { locale } = params

  setRequestLocale(locale)

  const { contributors } = await getAppPageContributorInfo(
    "assets",
    locale as Lang
  )

  const t = await getTranslations("page-assets")

  const illustrationRows: AssetItem[][] = [
    [{ title: t("page-assets-hero"), image: hero, ...cobb }],
    [
      { title: t("page-assets-learn-hero-name"), image: learnHero, ...cobb },
      {
        title: t("page-assets-community-hero-name"),
        image: communityHero,
        ...cobb,
      },
    ],
    [
      { title: t("page-assets-quizzes-hero-name"), image: quizzesHub, ...cobb },
      {
        title: t("page-assets-developers-hero-name"),
        image: developersHero,
        ...cobb,
      },
    ],
    [
      { title: t("page-assets-garden-name"), image: garden, ...cobb },
      {
        title: t("page-assets-roadmap-hero-name"),
        image: roadmapHero,
        ...cobb,
      },
    ],
    [
      {
        title: t("page-assets-layer-2-hero-name"),
        image: layer2Hero,
        ...cobb,
      },
      { title: t("page-assets-guides-hero-name"), image: guidesHero, ...cobb },
    ],
    [
      { title: t("page-assets-doge"), image: doge, ...wt },
      { title: t("page-assets-blocks"), image: developers, ...wt },
      { title: t("page-assets-enterprise"), image: enterprise, ...wt },
    ],
    [
      { title: t("page-assets-infrastructure"), image: infrastructure, ...wt },
      { title: t("page-assets-finance"), image: finance, ...wt },
      { title: t("page-assets-impact"), image: impact, ...wt },
    ],
    [
      { title: t("page-assets-future"), image: future, ...wt },
      { title: t("page-assets-hackathon"), image: hackathon, ...wt },
      { title: t("page-assets-robot"), image: wallet, ...wt },
    ],
    [
      { title: t("page-assets-bazaar"), image: whatIsEthereum, ...hachmang },
      { title: t("page-assets-eth"), image: eth, ...hachmang },
    ],
    [
      { title: t("page-assets-mainnet"), image: oldShip, ...hachmang },
      { title: t("page-assets-merge"), image: merge, ...hachmang },
    ],
    [
      { title: t("page-assets-beacon-chain"), image: beaconChain, ...hachmang },
      { title: t("page-assets-sharding"), image: newRings, ...hachmang },
    ],
    [
      { title: t("page-assets-defi"), image: defi, ...atkins },
      { title: t("page-assets-dao"), image: dao, ...atkins },
    ],
  ]

  const historicalRows: AssetItem[][] = [
    [
      { title: t("page-assets-hero-panda"), image: heroPanda },
      {
        title: t("page-assets-merge-panda"),
        image: mergePanda,
        svgUrl: `${svgPath}/merge-panda.svg`,
      },
    ],
  ]

  const brandTransparentRows: AssetItem[][] = [
    [
      {
        title: t("page-assets-eth-diamond-glyph"),
        image: ethDiamondGlyph,
        svgUrl: `${svgPath}/eth-diamond-glyph.svg`,
      },
      {
        title: t("page-assets-eth-diamond-gray"),
        image: ethDiamondBlack,
        svgUrl: `${svgPath}/eth-diamond-black.svg`,
      },
      {
        title: t("page-assets-eth-diamond-color"),
        image: ethDiamondColor,
        svgUrl: `${svgPath}/eth-diamond-rainbow.svg`,
      },
    ],
    [
      {
        title: t("page-assets-eth-diamond-purple"),
        image: ethDiamondPurple,
        svgUrl: `${svgPath}/eth-diamond-purple.svg`,
      },
      {
        title: t("page-assets-eth-diamond-colored"),
        image: ethGlyphColored,
        svgUrl: `${svgPath}/eth-glyph-colored.svg`,
      },
    ],
    [
      {
        title: t("page-assets-eth-logo-portrait-gray"),
        image: ethPortraitBlack,
        svgUrl: `${svgPath}/ethereum-logo-portrait-black.svg`,
      },
      {
        title: t("page-assets-eth-logo-landscape-gray"),
        image: ethLandscapeBlack,
        svgUrl: `${svgPath}/ethereum-logo-landscape-black.svg`,
      },
      {
        title: t("page-assets-eth-wordmark-gray"),
        image: ethWordmarkBlack,
        svgUrl: `${svgPath}/ethereum-wordmark-black.svg`,
      },
    ],
    [
      {
        title: t("page-assets-eth-logo-portrait-purple"),
        image: ethPortraitPurple,
        svgUrl: `${svgPath}/ethereum-logo-portrait-purple.svg`,
      },
      {
        title: t("page-assets-eth-logo-landscape-purple"),
        image: ethLandscapePurple,
        svgUrl: `${svgPath}/ethereum-logo-landscape-purple.svg`,
      },
      {
        title: t("page-assets-eth-wordmark-purple"),
        image: ethWordmarkPurple,
        svgUrl: `${svgPath}/ethereum-wordmark-purple.svg`,
      },
    ],
  ]

  const brandSolidRows: AssetItem[][] = [
    [
      {
        title: t("page-assets-eth-diamond-white"),
        image: ethDiamondBlackWhite,
        svgUrl: `${svgPath}/eth-diamond-black-white.svg`,
      },
      {
        title: t("page-assets-eth-diamond-gray"),
        image: ethDiamondBlackGray,
        svgUrl: `${svgPath}/eth-diamond-black-gray.svg`,
      },
    ],
    [
      {
        title: t("page-assets-eth-diamond-purple"),
        image: ethDiamondPurplePurple,
        svgUrl: `${svgPath}/eth-diamond-purple-purple.svg`,
      },
      {
        title: t("page-assets-eth-diamond-white"),
        image: ethDiamondPurpleWhite,
        svgUrl: `${svgPath}/eth-diamond-purple-white.svg`,
      },
    ],
    [
      {
        title: t("page-assets-eth-logo-portrait-gray"),
        image: ethPortraitBlackGray,
        svgUrl: `${svgPath}/ethereum-logo-portrait-black-gray.svg`,
      },
      {
        title: t("page-assets-eth-logo-landscape-gray"),
        image: ethLandscapeBlackGray,
        svgUrl: `${svgPath}/ethereum-logo-landscape-black-gray.svg`,
      },
      {
        title: t("page-assets-eth-wordmark-gray"),
        image: ethWordmarkBlackGray,
        svgUrl: `${svgPath}/ethereum-wordmark-black-gray.svg`,
      },
    ],
    [
      {
        title: t("page-assets-eth-logo-portrait-purple"),
        image: ethPortraitPurplePurple,
        svgUrl: `${svgPath}/ethereum-logo-portrait-purple-purple.svg`,
      },
      {
        title: t("page-assets-eth-logo-landscape-purple"),
        image: ethLandscapePurplePurple,
        svgUrl: `${svgPath}/ethereum-logo-landscape-purple-purple.svg`,
      },
      {
        title: t("page-assets-eth-wordmark-purple"),
        image: ethWordmarkPurplePurple,
        svgUrl: `${svgPath}/ethereum-wordmark-purple-purple.svg`,
      },
    ],
    [
      {
        title: t("page-assets-eth-logo-portrait-white"),
        image: ethPortraitPurpleWhite,
      },
      {
        title: t("page-assets-eth-logo-landscape-white"),
        image: ethLandscapePurpleWhite,
        svgUrl: `${svgPath}/ethereum-logo-landscape-purple-white.svg`,
      },
      {
        title: t("page-assets-eth-wordmark-white"),
        image: ethWordmarkPurpleWhite,
        svgUrl: `${svgPath}/ethereum-wordmark-purple-white.svg`,
      },
    ],
  ]

  return (
    <>
      <AssetsJsonLD locale={locale} contributors={contributors} />

      <main className="p-page pt-page-2x">
        <MainArticle className="flow space-y-space-4x">
          <Section className="flex flex-col items-center gap-space text-center">
            <Image
              className="w-20 dark:hidden"
              src={ethDiamondBlack}
              alt={t("page-assets-eth-diamond-gray")}
              sizes="80px"
            />
            <Image
              className="hidden w-20 dark:block"
              src={ethDiamondPurple}
              alt={t("page-assets-eth-diamond-purple")}
              sizes="80px"
            />
            <h1>{t("page-assets-h1")}</h1>
            <div className="flex flex-col items-center gap-2">
              <InlineLink href="#illustrations">
                {t("page-assets-illustrations")}
              </InlineLink>
              <InlineLink href="#historical">
                {t("page-assets-historical-artwork")}
              </InlineLink>
              <InlineLink href="#brand">
                {t("page-assets-ethereum-brand-assets")}
              </InlineLink>
            </div>
          </Section>

          <Section id="illustrations">
            <h2>{t("page-assets-illustrations")}</h2>
            {renderAssetRows(illustrationRows)}
          </Section>

          <Section id="historical">
            <h2>{t("page-assets-historical-artwork")}</h2>
            {renderAssetRows(historicalRows)}
          </Section>

          <Section id="brand">
            <h2>{t("page-assets-ethereum-brand-assets")}</h2>
            <h3>{t("page-assets-page-assets-transparent-background")}</h3>
            {renderAssetRows(brandTransparentRows, "h4")}
            <h3>{t("page-assets-page-assets-solid-background")}</h3>
            {renderAssetRows(brandSolidRows, "h4")}
          </Section>
        </MainArticle>

        {/* End-of-page actions */}
        <ContentFeedback />
      </main>
    </>
  )
}

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>
}) {
  const params = await props.params
  const { locale } = params

  const t = await getTranslations("page-assets")

  return await getMetadata({
    locale,
    slug: ["assets"],
    title: t("page-assets-meta-title"),
    description: t("page-assets-meta-desc"),
  })
}

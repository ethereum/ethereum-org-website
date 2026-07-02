import { pick } from "lodash"
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"
import type { ReactNode } from "react"

import type { Lang, PageParams } from "@/lib/types"

import CardList, {
  type CardProps as CardListCardProps,
} from "@/components/CardList"
import ContentFeedback from "@/components/ContentFeedback"
import Emoji from "@/components/Emoji"
import EthPriceCard from "@/components/EthPriceCard"
import FileContributors from "@/components/FileContributors"
import I18nProvider from "@/components/I18nProvider"
import { Image } from "@/components/Image"
import MainArticle from "@/components/MainArticle"
import Translation from "@/components/Translation"
import { Alert, AlertContent, AlertDescription } from "@/components/ui/alert"
import { ButtonLink } from "@/components/ui/buttons/Button"
import Callout from "@/components/ui/callout"
import {
  Card,
  CardContent,
  CardEmoji,
  CardFooter,
  CardHeader,
  CardParagraph,
  CardTitle,
} from "@/components/ui/card"
import { Stack } from "@/components/ui/flex"
import { Grid } from "@/components/ui/grid"
import { Divider } from "@/components/ui/hr"
import InlineLink from "@/components/ui/Link"
import { Section } from "@/components/ui/section"

import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import { getMetadata } from "@/lib/utils/metadata"
import { screens } from "@/lib/utils/screen"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import { exchangesByCountryLastUpdated } from "@/data/exchangesByCountry"

import CentralizedExchanges from "./_components/CentralizedExchangesLazy"
import GetEthPageJsonLD from "./page-jsonld"

import uniswap from "@/public/images/dapps/uni.png"
import dapps from "@/public/images/doge-computer.png"
import bancor from "@/public/images/exchanges/bancor.png"
import hero from "@/public/images/get-eth.png"
import wallet from "@/public/images/wallet.png"

type CardProps = {
  children: ReactNode
  emoji: string
  title: ReactNode
  description: ReactNode
}

const StyledCard = ({ children, emoji, title, description }: CardProps) => (
  <Card>
    <CardHeader>
      <CardEmoji text={emoji} />
    </CardHeader>
    <CardContent>
      <CardTitle>{title}</CardTitle>
      <CardParagraph>{description}</CardParagraph>
    </CardContent>
    <CardFooter>{children}</CardFooter>
  </Card>
)

export default async function Page(props: { params: Promise<PageParams> }) {
  const params = await props.params
  const { locale } = params
  const t = await getTranslations("page-get-eth")

  const tokenSwaps: CardListCardProps[] = [
    {
      title: "Uniswap",
      link: "https://app.uniswap.org/#/swap",
      image: uniswap,
      alt: "",
    },
    {
      title: "Carbon DeFi",
      link: "https://www.carbondefi.xyz/",
      image: bancor,
      alt: "",
    },
  ]

  const safetyArticles: CardListCardProps[] = [
    {
      title: t("page-get-eth-article-protecting-yourself"),
      link: "https://support.mycrypto.com/staying-safe/protecting-yourself-and-your-funds",
      description: t("page-get-eth-article-protecting-yourself-desc"),
    },
    {
      title: t("page-get-eth-article-keeping-crypto-safe"),
      link: "https://blog.coinbase.com/the-keys-to-keeping-your-crypto-safe-96d497cce6cf",
      description: t("page-get-eth-article-keeping-crypto-safe-desc"),
    },
  ]

  setRequestLocale(locale)

  // Get i18n messages
  const allMessages = await getMessages({ locale })
  const requiredNamespaces = getRequiredNamespacesForPage("/get-eth")
  const messages = pick(allMessages, requiredNamespaces)

  const { contributors, lastEditLocaleTimestamp } =
    await getAppPageContributorInfo("get-eth", locale as Lang)

  return (
    <>
      <GetEthPageJsonLD
        locale={locale}
        lastEditLocaleTimestamp={lastEditLocaleTimestamp}
        contributors={contributors}
      />

      <Section className="relative mb-space-2x">
        <Image
          src={hero}
          className="absolute -z-[1] min-h-[300px] w-full object-cover max-md:hidden"
          sizes="100vw"
          alt={t("page-get-eth-hero-image-alt")}
          preload
        />
        <div className="flow flex flex-col items-center p-page text-center max-lg:my-8 lg:mt-24">
          <h1>{t("page-get-eth-where-to-buy-title")}</h1>
          <p className="mb-0 max-w-[45ch] text-center text-xl leading-snug text-body-medium">
            {t("page-get-eth-where-to-buy-desc")}
          </p>

          <EthPriceCard className="mb-space" />
          <ButtonLink
            href="#country-picker"
            customEventOptions={{
              eventCategory: "Search by country button",
              eventAction: "click",
              eventName: "search_by_country",
            }}
          >
            {t("page-get-eth-search-by-country")}
          </ButtonLink>
        </div>
      </Section>

      <main className="pb-page">
        <MainArticle className="flow *:[section]:px-page">
          <Section id="ways">
            <h2 className="sr-only select-none">
              {t("page-get-eth-ways-to-get")}
            </h2>
            <Grid columns={3} className="my-4 lg:my-0">
              <StyledCard
                emoji=":office_building:"
                title={t("page-get-eth-cex")}
                description={t("page-get-eth-cex-desc")}
              >
                <InlineLink href="#country-picker">
                  {t("page-get-eth-cex-link-desc")}
                </InlineLink>
              </StyledCard>
              <StyledCard
                emoji=":building_construction:"
                title={t("page-get-eth-earn")}
                description={t("page-get-eth-earn-desc")}
              >
                <InlineLink href="/dao/">
                  {t("page-get-eth-daos-link-desc")}
                </InlineLink>
              </StyledCard>
              <StyledCard
                emoji=":busts_in_silhouette:"
                title={t("page-get-eth-peers")}
                description={t("page-get-eth-peers-desc")}
              >
                <InlineLink href="/wallets/">
                  {t("page-get-eth-wallets-link")}
                </InlineLink>
              </StyledCard>
              <StyledCard
                emoji=":robot:"
                title={t("page-get-eth-dex")}
                description={
                  <Translation id="page-get-eth:page-get-eth-dex-desc" />
                }
              >
                <InlineLink href="#dex">{t("page-get-eth-try-dex")}</InlineLink>
              </StyledCard>
              <StyledCard
                emoji=":key:"
                title={t("page-get-eth-wallets")}
                description={t("page-get-eth-wallets-purchasing")}
              >
                <InlineLink href="/wallets/">
                  {t("page-get-eth-wallets-link")}
                </InlineLink>
              </StyledCard>
              <StyledCard
                emoji=":shield:"
                title={t("page-get-eth-staking")}
                description={t("page-get-eth-staking-desc")}
              >
                <InlineLink href="/staking">
                  {t("page-get-eth-staking-link-desc")}
                </InlineLink>
              </StyledCard>
            </Grid>

            <p>
              <em>
                {t("listing-policy-disclaimer")}{" "}
                <InlineLink href="https://github.com/ethereum/ethereum-org-website/issues/new/choose">
                  {t("listing-policy-raise-issue-link")}
                </InlineLink>
              </em>
            </p>
            <Alert className="mx-auto w-fit" variant="update">
              <AlertContent className="flex flex-row items-center gap-4">
                <Emoji className="text-4xl" text=":wave:" />
                <AlertDescription>
                  {t("page-get-eth-new-to-eth")}{" "}
                  <InlineLink href="/eth/">
                    {t("page-get-eth-whats-eth-link")}
                  </InlineLink>
                </AlertDescription>
              </AlertContent>
            </Alert>
          </Section>

          <Section
            id="country-picker"
            className="flex flex-col items-center bg-fade-accent-a py-16"
          >
            <div className="flex flex-col items-center">
              <h2 className="mb-4">{t("page-get-eth-exchanges-header")}</h2>
              <p className="mb-8 max-w-3xl text-center">
                {t("page-get-eth-exchanges-intro")}
              </p>

              {/* CLIENT SIDE */}
              <I18nProvider locale={locale} messages={messages}>
                <CentralizedExchanges
                  lastDataUpdateDate={exchangesByCountryLastUpdated}
                />
              </I18nProvider>
            </div>
          </Section>

          <Section id="dex">
            <h2 className="text-2xl leading-6 md:text-3xl">
              {t("page-get-eth-dexs")}
            </h2>
            <Grid
              columns={2}
              size="wider"
              className="gap-16 [--grid-gap:--spacing(16)]"
            >
              <div className="flow">
                <h3 className="text-xl leading-6 md:text-2xl">
                  {t("page-get-eth-what-are-DEX's")}
                </h3>
                <p>{t("page-get-eth-dexs-desc")}</p>
                <p>
                  {t("page-get-eth-dexs-desc-2")}{" "}
                  <InlineLink href="/smart-contracts">
                    {t("page-get-eth-smart-contract-link")}
                  </InlineLink>
                </p>
                <p>{t("page-get-eth-dexs-desc-3")}</p>
                <p>{t("page-get-eth-need-wallet")}</p>
                <ButtonLink href="/wallets/find-wallet/" className="sm:w-fit">
                  {t("page-get-eth-get-wallet-btn")}
                </ButtonLink>
                <Alert variant="warning">
                  <AlertContent>
                    <AlertDescription>
                      <Translation id="page-get-eth:page-get-eth-dexs-desc-4" />
                    </AlertDescription>
                  </AlertContent>
                </Alert>
              </div>

              <div className="flow">
                <h3 className="text-xl leading-6 md:text-2xl">
                  {t("page-get-eth-other-cryptos")}
                </h3>
                <p>{t("page-get-eth-swapping")}</p>
                <CardList items={tokenSwaps} />
                <Alert variant="warning">
                  <AlertContent>
                    <AlertDescription>
                      <Translation id="page-get-eth:page-get-eth-warning" />
                    </AlertDescription>
                  </AlertContent>
                </Alert>
              </div>
            </Grid>
          </Section>

          <Divider className="mx-auto my-space-4x" />

          <Section id="safety" className="flow">
            <h2 className="text-2xl leading-6 md:text-3xl">
              {t("page-get-eth-keep-it-safe")}
            </h2>
            <Grid
              columns={2}
              size="wider"
              className="gap-16 [--grid-gap:--spacing(16)]"
            >
              <div className="flow">
                <Image
                  src={wallet}
                  className="mx-auto h-auto w-full max-w-sm"
                  sizes={`(max-width: ${screens.sm}) 100vw, (max-width: ${screens.md}) 60vw, calc(${screens["2xl"]} / 2)`}
                  alt=""
                />
                <h3 className="text-xl leading-6 md:text-2xl">
                  {t("page-get-eth-community-safety")}
                </h3>
                <CardList items={safetyArticles} />
              </div>

              <div className="flow">
                <Stack className="gap-4">
                  <p>
                    <Translation id="page-get-eth:page-get-eth-description" />
                  </p>
                  <p>{t("page-get-eth-security")}</p>
                </Stack>
                <Stack className="gap-4">
                  <h3 className="text-xl leading-6 md:text-2xl">
                    {t("page-get-eth-protect-eth-in-wallet")}
                  </h3>
                  <p>{t("page-get-eth-protect-eth-desc")}</p>
                  <InlineLink href="/wallets/">
                    {t("page-get-eth-your-address-wallet-link")}
                  </InlineLink>
                </Stack>
                <Stack className="gap-4">
                  <h3 className="text-xl leading-6 md:text-2xl">
                    {t("page-get-eth-your-address")}
                  </h3>
                  <p>{t("page-get-eth-your-address-desc")}</p>
                  <div className="mb-6 flex flex-col-reverse justify-between rounded bg-[#191919] p-2 select-none lg:flex-row">
                    <p className="mb-0 font-monospace text-xs text-white">
                      0x0125e2478d69eXaMpLe81766fef5c120d30fb53f
                    </p>
                    <p className="mx-4 mb-0 text-sm text-error uppercase">
                      {t("page-get-eth-do-not-copy")}
                    </p>
                  </div>
                  <p>{t("page-get-eth-your-address-desc-3")}</p>
                </Stack>
                <Stack className="gap-4">
                  <h3 className="text-xl leading-6 md:text-2xl">
                    {t("page-get-eth-wallet-instructions")}
                  </h3>
                  <p>{t("page-get-eth-wallet-instructions-lost")}</p>
                </Stack>
              </div>
            </Grid>
          </Section>

          <Divider className="mx-auto my-space-4x" />

          <Section>
            <Callout
              title={t("page-get-eth-use-your-eth")}
              description={t("page-get-eth-use-your-eth-dapps")}
              image={dapps}
              alt={t("page-index:page-index-sections-individuals-image-alt")}
            >
              <ButtonLink href="/apps/">
                {t("page-get-eth-checkout-dapps-btn")}
              </ButtonLink>
            </Callout>

            <FileContributors
              className="border-t"
              contributors={contributors}
              lastEditLocaleTimestamp={lastEditLocaleTimestamp}
            />
          </Section>
        </MainArticle>

        <Section className="px-page">
          <ContentFeedback />
        </Section>
      </main>
    </>
  )
}

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>
}) {
  const params = await props.params
  const { locale } = params

  const t = await getTranslations("page-get-eth")

  return await getMetadata({
    locale,
    slug: ["get-eth"],
    title: t("page-get-eth-meta-title"),
    description: t("page-get-eth-meta-description"),
  })
}

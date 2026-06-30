import { pick } from "lodash"
import {
  CircleDashed,
  CircleDot,
  DatabaseCheck,
  HandCoins,
  Users,
  Wallet as WalletIcon,
} from "lucide-react"
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"
import type { ComponentType, ReactNode } from "react"

import type { Lang, PageParams } from "@/lib/types"

import CardList, {
  type CardProps as CardListCardProps,
} from "@/components/CardList"
import ContentFeedback from "@/components/ContentFeedback"
import EthPriceCard from "@/components/EthPriceCard"
import FileContributors from "@/components/FileContributors"
import PageHero from "@/components/Hero/PageHero"
import I18nProvider from "@/components/I18nProvider"
import { Image } from "@/components/Image"
import MainArticle from "@/components/MainArticle"
import Translation from "@/components/Translation"
import { ButtonLink } from "@/components/ui/buttons/Button"
import Callout from "@/components/ui/callout"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardIconContainer,
  CardParagraph,
  CardTitle,
} from "@/components/ui/card"
import { Grid } from "@/components/ui/grid"
import InlineLink, { LinkWithArrow } from "@/components/ui/Link"
import { Section } from "@/components/ui/section"

import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import { getMetadata } from "@/lib/utils/metadata"
import { screens } from "@/lib/utils/screen"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import { exchangesByCountryLastUpdated } from "@/data/exchangesByCountry"

import CentralizedExchanges from "./_components/CentralizedExchangesLazy"
import GetEthPageJsonLD from "./page-jsonld"

import handEth from "@/public/images/developers-eth-blocks.png"
import dapps from "@/public/images/doge-computer.png"
import worldMapDark from "@/public/images/get-eth/world-map-dark.png"
import worldMapLight from "@/public/images/get-eth/world-map-light.png"
import ethCoins from "@/public/images/get-eth-coins.png"
import wallet from "@/public/images/wallet.png"

const Eyebrow = ({ children }: { children: ReactNode }) => (
  <p className="text-sm font-bold tracking-wide text-primary-high-contrast uppercase">
    {children}
  </p>
)

type WayToGetEth = {
  icon: ComponentType<{ className?: string }>
  title: ReactNode
  description: ReactNode
  linkText: ReactNode
  href: string
}

export default async function Page(props: { params: Promise<PageParams> }) {
  const params = await props.params
  const { locale } = params
  const t = await getTranslations("page-get-eth")

  const waysToGetEth: WayToGetEth[] = [
    {
      icon: CircleDot,
      title: t("page-get-eth-cex"),
      description: t("page-get-eth-cex-desc"),
      linkText: t("page-get-eth-cex-link-desc"),
      href: "#country-picker",
    },
    {
      icon: HandCoins,
      title: t("page-get-eth-earn"),
      description: t("page-get-eth-earn-desc"),
      linkText: t("page-get-eth-daos-link-desc"),
      href: "/dao/",
    },
    {
      icon: Users,
      title: t("page-get-eth-receive"),
      description: t("page-get-eth-peers-desc"),
      linkText: t("page-get-eth-receive-link"),
      href: "/guides/how-to-use-a-wallet/",
    },
    {
      icon: CircleDashed,
      title: t("page-get-eth-dex"),
      description: <Translation id="page-get-eth:page-get-eth-dex-desc" />,
      linkText: t("page-get-eth-try-dex"),
      href: "/apps/categories/defi/",
    },
    {
      icon: WalletIcon,
      title: t("page-get-eth-wallets"),
      description: t("page-get-eth-wallets-purchasing"),
      linkText: t("page-get-eth-wallets-link"),
      href: "/wallets/",
    },
    {
      icon: DatabaseCheck,
      title: t("page-get-eth-staking"),
      description: t("page-get-eth-staking-desc"),
      linkText: t("page-get-eth-staking-link-desc"),
      href: "/staking/",
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

      <PageHero
        variant="no-divider"
        breadcrumbs={{ slug: "get-eth", startDepth: 1 }}
        heroImg={ethCoins}
        imageOverlay={
          <EthPriceCard className="absolute inset-x-0 top-1/2 mx-auto -translate-y-1/2" />
        }
        title={t("page-get-eth-hero-title")}
        description={t("page-get-eth-hero-subtitle")}
        buttons={[
          {
            content: t("page-get-eth-get-eth-btn"),
            href: "#country-picker",
            matomo: {
              eventCategory: "Get ETH button",
              eventAction: "click",
              eventName: "get_eth_hero",
            },
          },
        ]}
      />

      <main className="p-page pt-page-2x">
        <MainArticle className="flow space-y-space-4x">
          <Section id="ways">
            <h2 className="mb-space-2x text-center text-h1">
              {t("page-get-eth-ways-you-can-get-eth")}
            </h2>
            <Grid columns={3}>
              {waysToGetEth.map(
                ({ icon: Icon, title, description, linkText, href }) => (
                  <Card key={href + String(title)}>
                    <CardHeader>
                      <CardIconContainer>
                        <Icon />
                      </CardIconContainer>
                    </CardHeader>
                    <CardContent>
                      <CardTitle>{title}</CardTitle>
                      <CardParagraph>{description}</CardParagraph>
                    </CardContent>
                    <CardFooter buttons="inherit">
                      <LinkWithArrow href={href}>{linkText}</LinkWithArrow>
                    </CardFooter>
                  </Card>
                )
              )}
            </Grid>

            <p className="mt-space text-body-medium">
              <em>
                {t("listing-policy-disclaimer")}{" "}
                <InlineLink href="https://github.com/ethereum/ethereum-org-website/issues/new/choose">
                  {t("listing-policy-raise-issue-link")}
                </InlineLink>
              </em>
            </p>
          </Section>

          <Section>
            <Callout
              image={handEth}
              alt=""
              title={t("page-get-eth-new-to-eth-title")}
              description={t("page-get-eth-new-to-eth-desc")}
            >
              <ButtonLink href="/eth/">
                {t("page-get-eth-whats-eth-link")}
              </ButtonLink>
            </Callout>
          </Section>

          <Section
            id="country-picker"
            data-flow="skip"
            className="relative flex min-h-[700px] flex-col items-center justify-center rounded-2xl bg-accent-a/5 px-page py-hero-3x dark:bg-accent-a/10"
          >
            <Image
              src={worldMapLight}
              alt=""
              aria-hidden
              sizes="(max-width: 896px) 100vw, 896px"
              className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-auto w-full max-w-4xl rounded-t-2xl select-none dark:hidden"
            />
            <Image
              src={worldMapDark}
              alt=""
              aria-hidden
              sizes="(max-width: 896px) 100vw, 896px"
              className="pointer-events-none absolute inset-x-0 top-0 mx-auto hidden h-auto w-full max-w-4xl rounded-t-2xl select-none dark:block"
            />
            <div className="relative z-10 flex flex-col items-center gap-6">
              <Eyebrow>{t("page-get-eth-exchanges-eyebrow")}</Eyebrow>
              <h2 className="text-center text-h1">
                {t("page-get-eth-find-exchange-title")}
              </h2>
              <p className="max-w-2xl text-center text-lg text-body-medium">
                {t("page-get-eth-find-exchange-desc")}
              </p>
            </div>

            {/* CLIENT SIDE */}
            <div className="relative z-10 mt-6 flex w-full flex-col items-center">
              <I18nProvider locale={locale} messages={messages}>
                <CentralizedExchanges
                  lastDataUpdateDate={exchangesByCountryLastUpdated}
                />
              </I18nProvider>
            </div>
          </Section>

          <Section
            id="safety"
            data-flow="skip"
            className="rounded-2xl bg-background-highlight p-8 md:p-16"
          >
            <Grid balanced={2} className="items-center gap-8">
              <Image
                src={wallet}
                className="mx-auto h-auto w-full max-w-sm"
                sizes={`(max-width: ${screens.sm}) 100vw, (max-width: ${screens.md}) 60vw, calc(${screens["2xl"]} / 2)`}
                alt=""
              />
              <div className="flex flex-col gap-6">
                <Eyebrow>{t("page-get-eth-safety-eyebrow")}</Eyebrow>
                <h2 className="text-h1">{t("page-get-eth-keep-it-safe")}</h2>
                <p className="text-lg text-body-medium">
                  {t("page-get-eth-description")}
                </p>
                <p className="text-lg text-body-medium">
                  {t("page-get-eth-security")}
                </p>
              </div>
            </Grid>

            <Grid columns={3} className="mt-space-2x">
              <Card variant="nested">
                <CardContent>
                  <CardTitle>
                    {t("page-get-eth-protect-eth-in-wallet")}
                  </CardTitle>
                  <CardParagraph>
                    {t("page-get-eth-protect-eth-desc")}
                  </CardParagraph>
                  <InlineLink href="/wallets/">
                    {t("page-get-eth-your-address-wallet-link")}
                  </InlineLink>
                </CardContent>
              </Card>

              <Card variant="nested">
                <CardContent>
                  <CardTitle>{t("page-get-eth-your-address")}</CardTitle>
                  <CardParagraph>
                    {t("page-get-eth-your-address-desc")}
                  </CardParagraph>
                  <div className="select-none">
                    <div className="rounded bg-background-highlight p-2">
                      <p className="mb-0 font-monospace text-xs break-all text-body-medium">
                        0x0125e2478d69eXaMpLe81766fef5c120d30fb53f
                      </p>
                    </div>
                    <p className="mt-2 mb-0 text-end text-xs text-body-medium">
                      {t("page-get-eth-do-not-copy")}
                    </p>
                  </div>
                  <CardParagraph>
                    {t("page-get-eth-your-address-desc-3")}
                  </CardParagraph>
                </CardContent>
              </Card>

              <Card variant="nested">
                <CardContent>
                  <CardTitle>{t("page-get-eth-wallet-instructions")}</CardTitle>
                  <CardParagraph>
                    {t("page-get-eth-wallet-instructions-lost")}
                  </CardParagraph>
                  <InlineLink href="/security/">
                    {t("page-get-eth-more-on-security")}
                  </InlineLink>
                </CardContent>
              </Card>
            </Grid>

            <div className="mx-auto mt-space-2x flex w-full max-w-2xl flex-col items-center gap-space">
              <h3 className="text-center">
                {t("page-get-eth-community-safety")}
              </h3>
              <CardList className="w-full" items={safetyArticles} />
            </div>
          </Section>

          <Section>
            <Callout
              title={t("page-get-eth-use-your-eth")}
              description={t("page-get-eth-use-your-eth-dapps")}
              image={dapps}
              alt=""
            >
              <ButtonLink href="/apps/">
                {t("page-get-eth-checkout-dapps-btn")}
              </ButtonLink>
            </Callout>

            <FileContributors
              className="my-10 border-t"
              contributors={contributors}
              lastEditLocaleTimestamp={lastEditLocaleTimestamp}
            />
          </Section>
        </MainArticle>

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

  const t = await getTranslations("page-get-eth")

  return await getMetadata({
    locale,
    slug: ["get-eth"],
    title: t("page-get-eth-meta-title"),
    description: t("page-get-eth-meta-description"),
  })
}

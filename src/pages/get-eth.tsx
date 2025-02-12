import type { GetStaticProps, InferGetStaticPropsType } from "next/types"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import type { ReactNode } from "react"

import type { BasePageProps, ChildOnlyProp, Lang } from "@/lib/types"

import CalloutBanner from "@/components/CalloutBanner"
import CardList, {
  type CardProps as CardListCardProps,
} from "@/components/CardList"
import CentralizedExchanges from "@/components/CentralizedExchanges"
import Emoji from "@/components/Emoji"
import EthPriceCard from "@/components/EthPriceCard"
import FeedbackCard from "@/components/FeedbackCard"
import { TwImage as Image } from "@/components/Image"
import MainArticle from "@/components/MainArticle"
import PageMetadata from "@/components/PageMetadata"
import Translation from "@/components/Translation"
import { Alert, AlertContent, AlertDescription } from "@/components/ui/alert"
import { ButtonLink } from "@/components/ui/buttons/Button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Divider } from "@/components/ui/divider"
import { Stack } from "@/components/ui/flex"
import InlineLink from "@/components/ui/Link"

import { cn } from "@/lib/utils/cn"
import { existsNamespace } from "@/lib/utils/existsNamespace"
import { getLastDeployDate } from "@/lib/utils/getLastDeployDate"
import { getLastModifiedDateByPath } from "@/lib/utils/gh"
import { trackCustomEvent } from "@/lib/utils/matomo"
import { getLocaleTimestamp } from "@/lib/utils/time"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import { useBreakpointValue } from "@/hooks/useBreakpointValue"
import uniswap from "@/public/images/dapps/uni.png"
import dapps from "@/public/images/doge-computer.png"
import bancor from "@/public/images/exchanges/bancor.png"
import kyber from "@/public/images/exchanges/kyber.png"
import hero from "@/public/images/get-eth.png"
import wallet from "@/public/images/wallet.png"

type CardProps = {
  children: ReactNode
  emoji: string
  title: ReactNode
  description: ReactNode
}

const StyledCard = ({ children, emoji, title, description }: CardProps) => (
  <Card className="flex flex-col rounded-sm border">
    <CardHeader className="space-y-4">
      <Emoji text={emoji} className="text-5xl leading-none" />
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent className="flex-1 px-6">
      <p>{description}</p>
    </CardContent>
    <CardFooter>{children}</CardFooter>
  </Card>
)

const TwoColumnContent = (props: ChildOnlyProp) => (
  <div className="grid grid-cols-1 gap-16 lg:grid-cols-2" {...props} />
)

type Props = BasePageProps & {
  lastDataUpdateDate: string
}

export const getStaticProps = (async ({ locale }) => {
  const requiredNamespaces = getRequiredNamespacesForPage("get-eth")

  const contentNotTranslated = !existsNamespace(locale!, requiredNamespaces[2])

  const lastDataUpdateDate = getLastModifiedDateByPath(
    "src/data/exchangesByCountry.ts"
  )

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
      lastDataUpdateDate,
    },
  }
}) satisfies GetStaticProps<Props>

const GetEthPage = ({
  lastDataUpdateDate,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { t } = useTranslation("page-get-eth")

  const walletImageWidth = useBreakpointValue({
    base: "full",
    sm: "60%",
    md: "50%",
  })

  const tokenSwaps: CardListCardProps[] = [
    {
      title: "Uniswap",
      link: "https://app.uniswap.org/#/swap",
      image: uniswap,
      alt: "",
    },
    {
      title: "Bancor",
      link: "https://www.carbondefi.xyz/",
      image: bancor,
      alt: "",
    },
    {
      title: "Kyber",
      link: "https://kyberswap.com/#/swap/",
      image: kyber,
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

  return (
    <MainArticle>
      <Stack className="gap-16 p-8">
        <PageMetadata
          title={t("page-get-eth-meta-title")}
          description={t("page-get-eth-meta-description")}
        />

        <div className="relative flex w-full flex-col-reverse justify-center lg:mx-auto lg:mb-8 lg:flex-col">
          <Image
            src={hero}
            className="absolute -z-10 h-auto max-h-[400px] min-h-[300px] w-full overflow-x-auto object-cover"
            sizes="100%"
            alt={t("page-get-eth-hero-image-alt")}
            priority
          />
          <div className="my-8 flex flex-col items-center text-center lg:mx-0 lg:mb-0 lg:mt-24">
            <h1 className="my-8 text-4xl md:text-5xl">
              {t("page-get-eth-where-to-buy-title")}
            </h1>
            <p className="mb-0 max-w-[45ch] text-center text-xl leading-snug text-body-medium">
              {t("page-get-eth-where-to-buy-desc")}
            </p>
            <br />
            <EthPriceCard className="mb-8" />
            <ButtonLink
              href="#country-picker"
              onClick={() =>
                trackCustomEvent({
                  eventCategory: "Search by country button",
                  eventAction: "click",
                  eventName: "search_by_country",
                })
              }
            >
              {t("page-get-eth-search-by-country")}
            </ButtonLink>
          </div>
        </div>

        <div className="my-4 grid grid-cols-1 gap-8 md:grid-cols-2 lg:my-0 lg:grid-cols-3">
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
        </div>

        <Stack className="gap-16">
          <p>
            <em>
              {t("common:listing-policy-disclaimer")}{" "}
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
        </Stack>

        <div
          id="country-picker"
          className={cn(
            "-mx-8 my-0 flex flex-col items-center px-8 py-16 sm:p-16 md:my-16 lg:mx-0",
            "bg-gradient-to-r from-accent-a/10 to-accent-c/10 dark:from-accent-a/20 dark:to-accent-c-hover/20"
          )}
        >
          <CentralizedExchanges lastDataUpdateDate={lastDataUpdateDate} />
        </div>

        <Stack className="gap-12">
          <h2 id="dex" className="text-2xl leading-6 md:text-3xl">
            {t("page-get-eth-dexs")}
          </h2>
          <TwoColumnContent>
            <Stack className="gap-4">
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
              <ButtonLink href="/wallets/find-wallet/" className="w-fit">
                {t("page-get-eth-get-wallet-btn")}
              </ButtonLink>
              <Alert variant="warning">
                <AlertContent>
                  <AlertDescription>
                    <Translation id="page-get-eth:page-get-eth-dexs-desc-4" />
                  </AlertDescription>
                </AlertContent>
              </Alert>
            </Stack>

            <Stack className="gap-4">
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
            </Stack>
          </TwoColumnContent>
        </Stack>

        <Divider className="mx-auto my-16 md:my-32" />

        <Stack className="gap-12">
          <h2 className="text-2xl leading-6 md:text-3xl">
            {t("page-get-eth-keep-it-safe")}
          </h2>
          <TwoColumnContent>
            <Stack className="gap-4">
              <Image
                src={wallet}
                className="mb-8 self-center"
                sizes={walletImageWidth}
                style={{ width: walletImageWidth, height: "auto" }}
                alt=""
              />
              <h3 className="text-xl leading-6 md:text-2xl">
                {t("page-get-eth-community-safety")}
              </h3>
              <CardList items={safetyArticles} />
            </Stack>

            <Stack className="gap-8">
              <Stack className="gap-4">
                <p>{t("page-get-eth-description")}</p>
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
                <div className="mb-6 flex select-none flex-col-reverse justify-between rounded bg-[#191919] p-2 lg:flex-row">
                  <p className="mb-0 font-monospace text-xs text-white">
                    0x0125e2478d69eXaMpLe81766fef5c120d30fb53f
                  </p>
                  <p className="mx-4 mb-0 text-sm uppercase text-error">
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
            </Stack>
          </TwoColumnContent>
        </Stack>

        <Divider className="mx-auto my-16 md:my-32" />

        <CalloutBanner
          className="mx-4 mb-40 mt-24"
          titleKey="page-get-eth:page-get-eth-use-your-eth"
          descriptionKey="page-get-eth:page-get-eth-use-your-eth-dapps"
          image={dapps}
          alt={t("page-index:page-index-sections-individuals-image-alt")}
          imageWidth={600}
        >
          <div>
            <ButtonLink href="/dapps/">
              {t("page-get-eth-checkout-dapps-btn")}
            </ButtonLink>
          </div>
        </CalloutBanner>

        <FeedbackCard />
      </Stack>
    </MainArticle>
  )
}

export default GetEthPage

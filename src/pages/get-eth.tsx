import type { GetStaticProps, InferGetStaticPropsType } from "next/types"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import type { ReactNode } from "react"
import { useBreakpointValue } from "@chakra-ui/react"

import type { BasePageProps, ChildOnlyProp, Lang } from "@/lib/types"

import CalloutBanner from "@/components/CalloutBanner"
import type { CardListItem } from "@/components/CardList"
import CardList from "@/components/CardList"
import CentralizedExchanges from "@/components/CentralizedExchanges"
import Emoji from "@/components/Emoji"
import EthPriceCard from "@/components/EthPriceCard"
import FeedbackCard from "@/components/FeedbackCard"
import { Image } from "@/components/Image"
import InfoBanner from "@/components/InfoBanner"
import { TWMainArticle as MainArticle } from "@/components/MainArticle"
import { Divider } from "@/components/MdComponents"
import PageMetadata from "@/components/PageMetadata"
import Translation from "@/components/Translation"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { existsNamespace } from "@/lib/utils/existsNamespace"
import { getLastDeployDate } from "@/lib/utils/getLastDeployDate"
import { getLastModifiedDateByPath } from "@/lib/utils/gh"
import { trackCustomEvent } from "@/lib/utils/matomo"
import { getLocaleTimestamp } from "@/lib/utils/time"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import { ButtonLink } from "../../tailwind/ui/buttons/Button"
import InlineLink from "../../tailwind/ui/Link"

import uniswap from "@/public/images/dapps/uni.png"
import dapps from "@/public/images/doge-computer.png"
import oneinch from "@/public/images/exchanges/1inch.png"
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
  <Card className="flex flex-col rounded-sm">
    <CardHeader className="space-y-4">
      <Emoji fontSize="5xl" lineHeight={0} text={emoji} />
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent className="flex-1">
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

  const tokenSwaps: CardListItem[] = [
    {
      title: "Uniswap",
      link: "https://app.uniswap.org/#/swap",
      image: uniswap,
      alt: "",
    },
    {
      title: "1inch",
      link: "https://1inch.exchange/#/",
      image: oneinch,
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

  const safetyArticles: CardListItem[] = [
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

  const walletImageWidth = useBreakpointValue({
    base: "full",
    sm: "60%",
    md: "50%",
  })

  return (
    <MainArticle className="mx-auto flex flex-col gap-16 p-8">
      <PageMetadata
        title={t("page-get-eth-meta-title")}
        description={t("page-get-eth-meta-description")}
      />

      <div className="relative flex w-full flex-col-reverse justify-center lg:mx-auto lg:mb-8 lg:flex-col">
        <Image
          src={hero}
          position="absolute"
          zIndex={-1}
          sizes="100%"
          style={{ width: "100%", height: "auto", objectFit: "cover" }}
          overflowX="auto"
          minH="300px"
          maxH="400px"
          alt={t("page-get-eth-hero-image-alt")}
          priority
        />
        <div className="mx-8 mb-8 mt-8 flex flex-col items-center text-center lg:mx-0 lg:mb-0 lg:mt-24">
          <h1 className="my-8 text-4xl leading-6 md:text-5xl">
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
          description={<Translation id="page-get-eth:page-get-eth-dex-desc" />}
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

      <div className="mb-8">
        <p>
          <em>
            {t("common:listing-policy-disclaimer")}{" "}
            <InlineLink href="https://github.com/ethereum/ethereum-org-website/issues/new/choose">
              {t("listing-policy-raise-issue-link")}
            </InlineLink>
          </em>
        </p>
        <InfoBanner emoji=":wave:" shouldCenter mt={8}>
          {t("page-get-eth-new-to-eth")}{" "}
          <InlineLink href="/eth/">
            {t("page-get-eth-whats-eth-link")}
          </InlineLink>
        </InfoBanner>
      </div>

      <div
        id="country-picker"
        className="my-0 flex flex-col items-center bg-radial-gradient px-8 py-16 sm:p-16 md:my-16"
      >
        <CentralizedExchanges lastDataUpdateDate={lastDataUpdateDate} />
      </div>

      <div className="space-y-12">
        <h2 id="dex" className="text-2xl leading-6 md:text-3xl">
          {t("page-get-eth-dexs")}
        </h2>
        <TwoColumnContent>
          <div className="space-y-4">
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
            <ButtonLink href="/wallets/find-wallet/">
              {t("page-get-eth-get-wallet-btn")}
            </ButtonLink>
            <InfoBanner isWarning>
              <Translation id="page-get-eth:page-get-eth-dexs-desc-4" />
            </InfoBanner>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl leading-6 md:text-2xl">
              {t("page-get-eth-other-cryptos")}
            </h3>
            <p>{t("page-get-eth-swapping")}</p>
            <CardList items={tokenSwaps} />
            <InfoBanner isWarning>{t("page-get-eth-warning")}</InfoBanner>
          </div>
        </TwoColumnContent>
      </div>

      <Divider className="mx-auto my-16 md:my-32" />

      <div className="space-y-12">
        <h2 className="text-2xl leading-6 md:text-3xl">
          {t("page-get-eth-keep-it-safe")}
        </h2>
        <TwoColumnContent>
          <div className="flex flex-col gap-4">
            <Image
              src={wallet}
              sizes={walletImageWidth}
              style={{ width: walletImageWidth, height: "auto" }}
              alignSelf="center"
              mb={8}
              alt=""
            />
            <h3 className="text-xl leading-6 md:text-2xl">
              {t("page-get-eth-community-safety")}
            </h3>
            <CardList items={safetyArticles} />
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <p>{t("page-get-eth-description")}</p>
              <p>{t("page-get-eth-security")}</p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl leading-6 md:text-2xl">
                {t("page-get-eth-protect-eth-in-wallet")}
              </h3>
              <p>{t("page-get-eth-protect-eth-desc")}</p>
              <InlineLink href="/wallets/">
                {t("page-get-eth-your-address-wallet-link")}
              </InlineLink>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl leading-6 md:text-2xl">
                {t("page-get-eth-your-address")}
              </h3>
              <p>{t("page-get-eth-your-address-desc")}</p>
              <div className="mb-6 flex select-none flex-col-reverse justify-between rounded bg-[#191919] p-2 lg:flex-row">
                <p className="mb-0 font-monospace text-xs text-white">
                  0x0125e2478d69eXaMpLe81766fef5c120d30fb53f
                </p>
                <p className="text-fail300 mx-4 mb-0 text-sm uppercase">
                  {t("page-get-eth-do-not-copy")}
                </p>
              </div>
              <p>{t("page-get-eth-your-address-desc-3")}</p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl leading-6 md:text-2xl">
                {t("page-get-eth-wallet-instructions")}
              </h3>
              <p>{t("page-get-eth-wallet-instructions-lost")}</p>
            </div>
          </div>
        </TwoColumnContent>
      </div>

      <Divider className="mx-auto my-16 md:my-32" />

      <div className="mb-20 md:mb-40">
        <CalloutBanner
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
      </div>

      <FeedbackCard />
    </MainArticle>
  )
}

export default GetEthPage

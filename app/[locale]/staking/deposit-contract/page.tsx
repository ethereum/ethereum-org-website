import { pick } from "lodash"
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"

import type { PageParams } from "@/lib/types"

import Breadcrumbs from "@/components/Breadcrumbs"
import CardList from "@/components/CardList"
import ContentFeedback from "@/components/ContentFeedback"
import I18nProvider from "@/components/I18nProvider"
import MainArticle from "@/components/MainArticle"
import {
  Alert,
  AlertContent,
  AlertDescription,
  AlertEmoji,
} from "@/components/ui/alert"
import { ButtonLink } from "@/components/ui/buttons/Button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import InlineLink from "@/components/ui/Link"
import { Section } from "@/components/ui/section"

import { getMetadata } from "@/lib/utils/metadata"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import { DEPOSIT_CONTRACT_ADDRESS } from "@/data/addresses"

import DepositContract from "./_components/deposit-contract"
import DepositContractJsonLD from "./page-jsonld"

import consensys from "@/public/images/projects/consensys.png"
import blockscout from "@/public/images/resources/blockscout.webp"
import ef from "@/public/images/staking/ef-blog-logo.png"

const Page = async (props: { params: Promise<PageParams> }) => {
  const params = await props.params
  const { locale } = params

  setRequestLocale(locale)

  const t = await getTranslations("page-staking-deposit-contract")

  // Get i18n messages
  const allMessages = await getMessages({ locale })
  const requiredNamespaces = getRequiredNamespacesForPage(
    "/staking/deposit-contract"
  )
  const messages = pick(allMessages, requiredNamespaces)

  const addressSources = [
    {
      title: "ConsenSys",
      link: "https://consensys.net/blog/news/eth2-phase-0-deposit-contract-address/",
      image: consensys,
      alt: "",
    },
    {
      title: "Ethereum Foundation",
      link: "https://blog.ethereum.org/2020/11/04/eth2-quick-update-no-19/",
      image: ef,
      alt: "",
    },
    {
      title: "Blockscout",
      link: `https://eth.blockscout.com/address/${DEPOSIT_CONTRACT_ADDRESS}`,
      image: blockscout,
      alt: "",
    },
  ]

  return (
    <>
      <DepositContractJsonLD locale={locale} />

      <main className="flow px-page pt-space-2x pb-page">
        <Breadcrumbs slug="/staking/deposit-contract" startDepth={1} />

        <MainArticle className="flex gap-x-16 gap-y-8 border-b pb-space-2x *:flex-1 max-lg:flex-col">
          <div className="flow">
            <h1>{t("page-staking-deposit-contract-title")}</h1>
            <p className="text-body-medium">
              {t("page-staking-deposit-contract-subtitle")}
            </p>
            <Section id="not-launchpad">
              <h2>{t("page-staking-deposit-contract-h2")}</h2>
              <p>
                {t("page-staking-deposit-contract-staking")}{" "}
                <InlineLink href="/staking/">
                  {t("page-staking-deposit-contract-staking-more-link")}
                </InlineLink>
              </p>
              <ButtonLink href="https://launchpad.ethereum.org">
                {t("page-staking-deposit-contract-launchpad")}
              </ButtonLink>
            </Section>

            <Section id="resources">
              <h2>{t("page-staking-deposit-contract-staking-check")}</h2>
              <p className="mb-6">
                {t("page-staking-deposit-contract-staking-check-desc")}
              </p>
              <CardList items={addressSources} />
            </Section>
          </div>
          <Card
            className="h-fit overflow-hidden lg:sticky lg:top-28 lg:max-w-xl"
            variant="header-bar"
          >
            <CardHeader className="items-center justify-center p-2! text-center">
              <h2 className="text-sm font-normal uppercase">
                {t("page-staking-deposit-contract-address-check-btn")}
              </h2>
            </CardHeader>

            <CardContent spacing="md">
              <I18nProvider locale={locale} messages={messages}>
                <DepositContract />
              </I18nProvider>
            </CardContent>

            <CardFooter>
              <Alert variant="warning">
                <AlertEmoji text=":warning:" />
                <AlertContent>
                  <AlertDescription>
                    {t("page-staking-deposit-contract-warning-2")}{" "}
                    <InlineLink
                      className="text-primary"
                      href="https://launchpad.ethereum.org"
                    >
                      {t("page-staking-deposit-contract-launchpad-2")}
                    </InlineLink>
                  </AlertDescription>
                </AlertContent>
              </Alert>
            </CardFooter>
          </Card>
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

  const t = await getTranslations("page-staking-deposit-contract")

  return await getMetadata({
    locale,
    slug: ["staking", "deposit-contract"],
    title: t("page-staking-deposit-contract-meta-title"),
    description: t("page-staking-deposit-contract-meta-description"),
  })
}

export default Page

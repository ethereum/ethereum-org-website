import { pick } from "lodash"
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"

import type { Lang, PageParams, WalletData } from "@/lib/types"

import FindWalletProductTable from "@/components/FindWalletProductTable"
import { ContentHero } from "@/components/Hero"
import I18nProvider from "@/components/I18nProvider"
import ListingMethodology from "@/components/ListingMethodology"
import MainArticle from "@/components/MainArticle"
import { UnorderedList } from "@/components/ui/list"
import { Section } from "@/components/ui/section"

import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import { formatDate } from "@/lib/utils/date"
import { getMetadata } from "@/lib/utils/metadata"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"
import {
  getNonSupportedLocaleWallets,
  getSupportedLanguages,
  getSupportedLocaleWallets,
} from "@/lib/utils/wallets"

import FindWalletPageJsonLD from "./page-jsonld"

const Page = async (props: { params: Promise<PageParams> }) => {
  const params = await props.params
  const { locale } = params
  const t = await getTranslations("page-wallets-find-wallet")

  setRequestLocale(locale)

  const supportedLocaleWallets = getSupportedLocaleWallets(locale!)
  const noSupportedLocaleWallets = getNonSupportedLocaleWallets(locale!)
  const walletsData = supportedLocaleWallets.concat(noSupportedLocaleWallets)

  const wallets = walletsData.map((wallet) => ({
    ...wallet,
    id: wallet.name,
    supportedLanguages: getSupportedLanguages(
      wallet.languages_supported,
      locale!
    ),
  }))

  const mostRecentWalletUpdate = walletsData
    .map((wallet: WalletData) => wallet.last_updated)
    .filter((d) => d.length > 0)
    .sort()
    .at(-1)

  const lastUpdatedDisplay = mostRecentWalletUpdate
    ? formatDate(mostRecentWalletUpdate, locale)
    : ""

  // Get i18n messages
  const allMessages = await getMessages({ locale })
  const requiredNamespaces = getRequiredNamespacesForPage(
    "/wallets/find-wallet"
  )
  const messages = pick(allMessages, requiredNamespaces)

  const { contributors } = await getAppPageContributorInfo(
    "wallets/find-wallet",
    locale as Lang
  )

  return (
    <>
      <FindWalletPageJsonLD
        locale={locale}
        contributors={contributors}
        wallets={walletsData}
      />

      <I18nProvider locale={locale} messages={messages}>
        <MainArticle className="relative flex flex-col">
          <ContentHero
            breadcrumbs={{ slug: "/wallets/find-wallet" }}
            title={t("page-find-wallet-title")}
            description={t("page-find-wallet-description")}
            variant="no-divider"
          />

          <Section id="wallets">
            <h2 className="sr-only select-none">
              {t("page-find-wallet-table-title")}
            </h2>
            <FindWalletProductTable wallets={wallets} />
          </Section>

          <ListingMethodology
            heading={t("page-find-wallet-methodology-title")}
            description={t("page-find-wallet-methodology-intro")}
            lastUpdated={lastUpdatedDisplay}
            href="/contributing/adding-wallets/"
            footers={[
              t("page-find-wallet-footnote-1"),
              t("page-find-wallet-footnote-2"),
            ]}
          >
            <p>{t("page-find-wallet-methodology-must-haves-label")}</p>

            <UnorderedList className="space-y-2">
              {[
                "security",
                "track-record",
                "maintenance",
                "honest-info",
                "contact",
                "eip1559",
                "ux",
                "ethereum-focused",
              ].map((key) => (
                <li key={key}>
                  {t(`page-find-wallet-methodology-criterion-${key}`)}
                </li>
              ))}
            </UnorderedList>

            <p>{t("page-find-wallet-methodology-verification")}</p>

            <p>{t("page-find-wallet-methodology-filters")}</p>
          </ListingMethodology>
        </MainArticle>
      </I18nProvider>
    </>
  )
}

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>
}) {
  const params = await props.params
  const { locale } = params

  const t = await getTranslations("page-wallets-find-wallet")

  return await getMetadata({
    locale,
    slug: ["wallets", "find-wallet"],
    title: t("page-find-wallet-meta-title"),
    description: t("page-find-wallet-meta-description"),
    image: "/images/wallets/wallet-hero.png",
  })
}

export default Page

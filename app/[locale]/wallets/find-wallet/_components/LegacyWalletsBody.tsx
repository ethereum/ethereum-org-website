import { pick } from "lodash"
import { getMessages, getTranslations } from "next-intl/server"

import type { WalletData } from "@/lib/types"

import FindWalletProductTable from "@/components/FindWalletProductTable"
import I18nProvider from "@/components/I18nProvider"
import ListingMethodology from "@/components/ListingMethodology"
import { UnorderedList } from "@/components/ui/list"
import { Section } from "@/components/ui/section"

import { formatDate } from "@/lib/utils/date"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"
import {
  getNonSupportedLocaleWallets,
  getSupportedLanguages,
  getSupportedLocaleWallets,
} from "@/lib/utils/wallets"

const METHODOLOGY_CRITERIA = [
  "security",
  "track-record",
  "maintenance",
  "honest-info",
  "contact",
  "eip1559",
  "ux",
  "ethereum-focused",
]

/**
 * The pre-revamp expandable-table body, kept alive as the Original arm of the
 * FindWalletCatalog2026 A/B test. Derives its own data so the catalog arm pays
 * nothing for it. Delete this and FindWalletProductTable when the test ends.
 */
const LegacyWalletsBody = async ({ locale }: { locale: string }) => {
  const t = await getTranslations({
    locale,
    namespace: "page-wallets-find-wallet",
  })

  const supportedLocaleWallets = getSupportedLocaleWallets(locale)
  const noSupportedLocaleWallets = getNonSupportedLocaleWallets(locale)
  const walletsData = supportedLocaleWallets.concat(noSupportedLocaleWallets)

  const wallets = walletsData.map((wallet) => ({
    ...wallet,
    id: wallet.name,
    supportedLanguages: getSupportedLanguages(
      wallet.languages_supported,
      locale
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

  // The table is a client island that reads translations via useTranslations,
  // so it needs the namespace shipped to the browser.
  const allMessages = await getMessages({ locale })
  const messages = pick(
    allMessages,
    getRequiredNamespacesForPage("/wallets/find-wallet")
  )

  return (
    <I18nProvider locale={locale} messages={messages}>
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
          {METHODOLOGY_CRITERIA.map((key) => (
            <li key={key}>
              {t(`page-find-wallet-methodology-criterion-${key}`)}
            </li>
          ))}
        </UnorderedList>

        <p>{t("page-find-wallet-methodology-verification")}</p>

        <p>{t("page-find-wallet-methodology-filters")}</p>
      </ListingMethodology>
    </I18nProvider>
  )
}

export default LegacyWalletsBody

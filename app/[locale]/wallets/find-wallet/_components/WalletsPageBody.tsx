import { ArrowLeft } from "lucide-react"
import { getTranslations } from "next-intl/server"

import ListingMethodology from "@/components/ListingMethodology"
import { BaseLink } from "@/components/ui/Link"
import { UnorderedList } from "@/components/ui/list"
import { Section } from "@/components/ui/section"

import {
  type CatalogWallet,
  toCatalogCard,
  type WalletLanguageOption,
  type WalletNetwork,
} from "@/lib/utils/walletData"

import { buildDeviceLabels } from "@/data/wallets/devices"
import {
  buildPersonaLabels,
  type WalletPersonaId,
} from "@/data/wallets/personas"

import WalletPersonaCards from "./WalletPersonaCards"
import WalletsCatalog, { type WalletCatalogLabels } from "./WalletsCatalog"

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

type WalletsPageBodyProps = {
  locale: string
  wallets: CatalogWallet[]
  networks: WalletNetwork[]
  languages: WalletLanguageOption[]
  personaCounts: Record<WalletPersonaId, number>
  lastUpdatedDisplay: string
  currentPersonaId?: WalletPersonaId
}

/**
 * Shared body for the find-wallet index and persona pages: persona navigation,
 * the filterable catalog (over the page's wallet subset), and the listing
 * methodology. Wallet detail is its own route (`[wallet]`), shown as a modal
 * via interception.
 */
const WalletsPageBody = async ({
  locale,
  wallets,
  networks,
  languages,
  personaCounts,
  lastUpdatedDisplay,
  currentPersonaId,
}: WalletsPageBodyProps) => {
  const t = await getTranslations({
    locale,
    namespace: "page-wallets-find-wallet",
  })
  const tCommon = await getTranslations({ locale, namespace: "common" })

  // Built server-side so the client catalog island receives plain strings —
  // no i18n runtime or message catalog ships to the browser.
  const catalogLabels: WalletCatalogLabels = {
    catalog: {
      searchPlaceholder: t("page-find-wallet-search-wallets"),
      resultsLabel: t("page-find-wallet-results-label"),
      noResults: t("page-find-wallet-empty-results-title"),
      filtersToggle: t("page-find-wallet-filters"),
      applyLabel: t("page-find-wallet-show-results"),
      closeLabel: tCommon("close"),
    },
    filter: {
      device: t("page-find-wallet-device"),
      buySell: t("page-find-wallet-buy-sell-crypto"),
      network: t("page-find-wallet-network-support"),
      language: t("page-find-wallet-languages-supported"),
    },
    header: {
      filters: t("page-find-wallet-filters"),
      reset: t("page-find-wallet-reset-filters"),
    },
    buyCrypto: t("page-find-wallet-buy-crypto"),
    sellCrypto: t("page-find-wallet-sell-for-fiat"),
    devices: buildDeviceLabels(t),
    personas: buildPersonaLabels(t),
  }

  return (
    <>
      <Section>
        {currentPersonaId && (
          <div className="mb-4 flex px-page">
            <BaseLink
              href="/wallets/find-wallet/"
              className="inline-flex items-center gap-1.5 text-sm font-bold no-underline hover:underline"
            >
              <ArrowLeft className="size-4 rtl:-scale-x-100" />
              {t("page-find-wallet-see-all-wallets")}
            </BaseLink>
          </div>
        )}
        <WalletPersonaCards
          locale={locale}
          personaCounts={personaCounts}
          currentPersonaId={currentPersonaId}
        />
      </Section>

      <Section id="wallets" className="mt-10 px-page lg:mt-16">
        <h2 className="sr-only select-none">
          {t("page-find-wallet-table-title")}
        </h2>
        <WalletsCatalog
          // Reset client filter/search state when navigating between personas.
          key={currentPersonaId ?? "all"}
          locale={locale}
          // Slim projection: only what the island reads crosses to the client.
          wallets={wallets.map(toCatalogCard)}
          networks={networks}
          languages={languages}
          labels={catalogLabels}
        />
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
    </>
  )
}

export default WalletsPageBody

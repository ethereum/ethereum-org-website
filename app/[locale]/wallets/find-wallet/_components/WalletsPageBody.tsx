import { getTranslations } from "next-intl/server"

import ListingMethodology from "@/components/ListingMethodology"
import { UnorderedList } from "@/components/ui/list"
import { Section } from "@/components/ui/section"

import type {
  CatalogWallet,
  WalletLanguageOption,
  WalletNetwork,
  WalletPersonaId,
} from "@/lib/utils/walletData"

import WalletPersonaCards from "./WalletPersonaCards"
import WalletsCatalog from "./WalletsCatalog"

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

  return (
    <>
      <Section className="px-page">
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
          wallets={wallets}
          networks={networks}
          languages={languages}
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

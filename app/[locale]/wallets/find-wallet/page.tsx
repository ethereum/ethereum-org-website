import { getTranslations } from "next-intl/server"
import type { ReactNode } from "react"

import type { FileContributor, Lang, PageParams } from "@/lib/types"

import { ABTest } from "@/components/AB"
import PageHero from "@/components/Hero/PageHero"
import MainArticle from "@/components/MainArticle"

import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import { getMetadata } from "@/lib/utils/metadata"
import {
  getCatalogWallets,
  getLastUpdatedDisplay,
  getPersonaCounts,
  getWalletLanguageOptions,
  getWalletNetworks,
} from "@/lib/utils/walletData"

import WalletsPageBody from "./_components/WalletsPageBody"
import FindWalletPageJsonLD from "./page-jsonld"

// Wallet data is repo-checked-in, so it only changes at deploy time.
export const revalidate = false

const Page = async (props: {
  params: Promise<PageParams>
  /** Precomputed A/B variant index, passed only by the ab-code route */
  catalogVariant?: number
  /**
   * The A/B test's Original arm, injected by the ab-code route rather than
   * imported here: a static import would pull the legacy table's client
   * components into this route's bundle, shipping them to every visitor of the
   * design that replaced it.
   */
  legacyBody?: ReactNode
}) => {
  const { locale } = await props.params
  const { catalogVariant, legacyBody } = props

  const t = await getTranslations({
    locale,
    namespace: "page-wallets-find-wallet",
  })

  const wallets = getCatalogWallets(locale)
  const networks = getWalletNetworks(wallets)
  const languages = getWalletLanguageOptions(wallets, locale)
  const personaCounts = getPersonaCounts(wallets)

  const lastUpdatedDisplay = getLastUpdatedDisplay(wallets, locale)

  // Only feeds a supplementary JSON-LD field, so a data-layer outage must not
  // 500 the page.
  let contributors: FileContributor[] = []
  try {
    contributors = (
      await getAppPageContributorInfo("wallets/find-wallet", locale as Lang)
    ).contributors
  } catch {
    // Non-fatal: JSON-LD omits the contributor list.
  }

  const catalogBody = (
    <WalletsPageBody
      key="NewCatalog"
      locale={locale}
      wallets={wallets}
      networks={networks}
      languages={languages}
      personaCounts={personaCounts}
      lastUpdatedDisplay={lastUpdatedDisplay}
    />
  )

  return (
    <>
      {/* Outside the variant swap: both arms are the same URL, so search
          engines must see one consistent set of structured data. */}
      <FindWalletPageJsonLD
        locale={locale}
        contributors={contributors}
        wallets={wallets}
      />
      <MainArticle className="relative flex flex-col">
        <PageHero
          breadcrumbs={{ slug: "/wallets/find-wallet" }}
          title={t("page-find-wallet-title")}
          description={t("page-find-wallet-description")}
          variant="no-divider"
        />
        {catalogVariant !== undefined && legacyBody ? (
          <ABTest
            testKey="FindWalletCatalog2026"
            variantIndex={catalogVariant}
            // Element keys become the Matomo variation names verbatim - they
            // must match the dashboard exactly (see ABTest label derivation).
            variants={[legacyBody, catalogBody]}
          />
        ) : (
          catalogBody
        )}
      </MainArticle>
    </>
  )
}

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await props.params

  const t = await getTranslations({
    locale,
    namespace: "page-wallets-find-wallet",
  })

  return await getMetadata({
    locale,
    slug: ["wallets", "find-wallet"],
    title: t("page-find-wallet-meta-title"),
    description: t("page-find-wallet-meta-description"),
    image: "/images/wallets/wallet-hero.png",
  })
}

export default Page

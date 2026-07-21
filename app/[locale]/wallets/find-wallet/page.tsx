import { getTranslations, setRequestLocale } from "next-intl/server"

import type { FileContributor, Lang, PageParams } from "@/lib/types"

import PageHero from "@/components/Hero/PageHero"
import MainArticle from "@/components/MainArticle"

import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import { formatDate } from "@/lib/utils/date"
import { getMetadata } from "@/lib/utils/metadata"
import {
  getCatalogWallets,
  getPersonaCounts,
  getWalletLanguageOptions,
  getWalletNetworks,
} from "@/lib/utils/walletData"

import WalletsPageBody from "./_components/WalletsPageBody"
import FindWalletPageJsonLD from "./page-jsonld"

// Wallet data is repo-checked-in and deploy-coupled, so the page is fully
// static and only changes at deploy time (revamp plan engineering flags).
export const revalidate = false

const Page = async (props: { params: Promise<PageParams> }) => {
  const { locale } = await props.params
  setRequestLocale(locale)

  const t = await getTranslations("page-wallets-find-wallet")

  const wallets = getCatalogWallets(locale!)
  const networks = getWalletNetworks(wallets)
  const languages = getWalletLanguageOptions(wallets, locale!)
  const personaCounts = getPersonaCounts(wallets)

  const mostRecentWalletUpdate = wallets
    .map((wallet) => wallet.last_updated)
    .filter((date) => date.length > 0)
    .sort()
    .at(-1)
  const lastUpdatedDisplay = mostRecentWalletUpdate
    ? formatDate(mostRecentWalletUpdate, locale)
    : ""

  // Contributor info comes from the Netlify Blobs data layer; it only feeds a
  // supplementary JSON-LD field, so a data-layer outage must not 500 the page.
  let contributors: FileContributor[] = []
  try {
    contributors = (
      await getAppPageContributorInfo("wallets/find-wallet", locale as Lang)
    ).contributors
  } catch {
    // Non-fatal: JSON-LD omits the contributor list when unavailable.
  }

  return (
    <>
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
        <WalletsPageBody
          locale={locale}
          wallets={wallets}
          networks={networks}
          languages={languages}
          personaCounts={personaCounts}
          lastUpdatedDisplay={lastUpdatedDisplay}
        />
      </MainArticle>
    </>
  )
}

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await props.params
  setRequestLocale(locale)

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

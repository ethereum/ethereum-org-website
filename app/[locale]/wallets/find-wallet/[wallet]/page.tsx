import { notFound } from "next/navigation"
import { getTranslations, setRequestLocale } from "next-intl/server"

import type { PageParams } from "@/lib/types"

import ContentFeedback from "@/components/ContentFeedback"
import MainArticle from "@/components/MainArticle"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import { getMetadata } from "@/lib/utils/metadata"
import { findWalletBySlug, getCatalogWallets } from "@/lib/utils/walletData"

import { DEFAULT_LOCALE } from "@/lib/constants"

import WalletDetail from "../_components/WalletDetail"

import WalletDetailPageJsonLD from "./page-jsonld"

// Repo-checked-in data, deploy-coupled: render once on demand, cache durably,
// invalidate at next deploy (revamp plan engineering flags).
export const revalidate = false
export const dynamicParams = true

type WalletPageParams = PageParams & { wallet: string }

const Page = async (props: { params: Promise<WalletPageParams> }) => {
  const { locale, wallet: walletSlug } = await props.params
  setRequestLocale(locale)

  const t = await getTranslations("page-wallets-find-wallet")

  const wallet = findWalletBySlug(getCatalogWallets(locale), walletSlug)
  if (!wallet) notFound()

  return (
    <>
      <WalletDetailPageJsonLD locale={locale} wallet={wallet} />
      {/* Breadcrumb sits outside <main>, matching the catalog page inset. */}
      <div className="px-page py-hero lg:py-hero-2x">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">ethereum.org</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="ms-[0.625rem] me-[0.625rem] text-gray-400">
              /
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink href="/wallets/find-wallet/">
                {t("page-find-wallet-title")}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="ms-[0.625rem] me-[0.625rem] text-gray-400">
              /
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage>{wallet.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <main className="px-page pb-page">
        <MainArticle className="max-w-5xl">
          <WalletDetail locale={locale} wallet={wallet} variant="page" />
        </MainArticle>
        <ContentFeedback />
      </main>
    </>
  )
}

export function generateStaticParams() {
  // Prebuild English wallet pages; other locales render on demand.
  return getCatalogWallets(DEFAULT_LOCALE).map((wallet) => ({
    locale: DEFAULT_LOCALE,
    wallet: wallet.slug,
  }))
}

export async function generateMetadata(props: {
  params: Promise<WalletPageParams>
}) {
  const { locale, wallet: walletSlug } = await props.params
  setRequestLocale(locale)

  const wallet = findWalletBySlug(getCatalogWallets(locale), walletSlug)
  if (!wallet) return {}

  return await getMetadata({
    locale,
    slug: ["wallets", "find-wallet", walletSlug],
    title: wallet.name,
    description: wallet.descriptionStripped?.slice(0, 160) ?? wallet.name,
  })
}

export default Page

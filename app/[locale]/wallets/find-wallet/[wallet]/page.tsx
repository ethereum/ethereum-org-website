import Link from "next/link"
import { notFound } from "next/navigation"
import { getTranslations, setRequestLocale } from "next-intl/server"

import type { Lang, PageParams } from "@/lib/types"

import {
  getFindWalletRows,
  getWalletRowBySlug,
  walletSlug,
} from "@/components/FindWallets/data"
import WalletDetail from "@/components/FindWallets/WalletDetail"
import MainArticle from "@/components/MainArticle"

import { getMetadata } from "@/lib/utils/metadata"

export const dynamicParams = true

type WalletPageParams = PageParams & { wallet: string }

const Page = async (props: { params: Promise<WalletPageParams> }) => {
  const { locale, wallet: slug } = await props.params
  setRequestLocale(locale)

  const wallet = getWalletRowBySlug(locale!, slug)
  if (!wallet) notFound()

  const t = await getTranslations("page-wallets-find-wallet")

  return (
    <MainArticle className="relative mx-auto flex w-full max-w-4xl flex-col gap-6 px-4 py-8">
      <Link href="/wallets/find-wallet/" className="text-primary">
        ← {t("page-find-wallet-title")}
      </Link>
      <WalletDetail wallet={wallet} locale={locale as Lang} />
    </MainArticle>
  )
}

export function generateStaticParams() {
  // Prerender the (single-locale PoC) detail pages so they are crawlable.
  return getFindWalletRows("en").map((wallet) => ({
    wallet: walletSlug(wallet.name),
  }))
}

export async function generateMetadata(props: {
  params: Promise<WalletPageParams>
}) {
  const { locale, wallet: slug } = await props.params
  const wallet = getWalletRowBySlug(locale!, slug)
  const t = await getTranslations("page-wallets-find-wallet")

  return await getMetadata({
    locale,
    slug: ["wallets", "find-wallet", slug],
    title: wallet ? wallet.name : t("page-find-wallet-meta-title"),
    description: t("page-find-wallet-meta-description"),
    image: "/images/wallets/wallet-hero.png",
  })
}

export default Page

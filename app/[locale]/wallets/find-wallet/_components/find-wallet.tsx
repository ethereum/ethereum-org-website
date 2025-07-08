"use client"

import type { Wallet } from "@/lib/types"

import Breadcrumbs from "@/components/Breadcrumbs"
import FindWalletProductTable from "@/components/FindWalletProductTable"
import { SimpleHero } from "@/components/Hero"
import MainArticle from "@/components/MainArticle"

import { useTranslation } from "@/hooks/useTranslation"
import { usePathname } from "@/i18n/routing"

type Props = {
  wallets: Wallet[]
}

const FindWalletPage = ({ wallets }: Props) => {
  const pathname = usePathname()
  const { t } = useTranslation("page-wallets-find-wallet")

  return (
    <MainArticle className="relative flex flex-col">
      <SimpleHero
        breadcrumbs={<Breadcrumbs slug={pathname} />}
        title={t("page-find-wallet-title")}
        subtitle={t("page-find-wallet-description")}
        className="mb-8"
      />

      <FindWalletProductTable wallets={wallets} />
    </MainArticle>
  )
}

export default FindWalletPage

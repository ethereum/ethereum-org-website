"use client"

import type { ChildOnlyProp, Wallet } from "@/lib/types"

import Breadcrumbs from "@/components/Breadcrumbs"
import FindWalletProductTable from "@/components/FindWalletProductTable"
import MainArticle from "@/components/MainArticle"

import { useTranslation } from "@/hooks/useTranslation"
import { usePathname } from "@/i18n/routing"

const Subtitle = ({ children }: ChildOnlyProp) => (
  <p className="mb-6 text-xl leading-[1.4] text-body-medium last:mb-8">
    {children}
  </p>
)

type Props = {
  wallets: Wallet[]
}

const FindWalletPage = ({ wallets }: Props) => {
  const pathname = usePathname()
  const { t } = useTranslation("page-wallets-find-wallet")

  return (
    <MainArticle className="relative flex flex-col">
      <div className="flex w-full flex-col gap-8 px-4 pb-4 pt-11 md:w-1/2">
        <Breadcrumbs slug={pathname} />
        <h1 className="text-[2.5rem] leading-[1.4] md:text-5xl">
          {t("page-find-wallet-title")}
        </h1>
        <Subtitle>{t("page-find-wallet-description")}</Subtitle>
      </div>

      <FindWalletProductTable wallets={wallets} />
    </MainArticle>
  )
}

export default FindWalletPage

import { notFound } from "next/navigation"

import { getWalletBySlug } from "@/lib/utils/walletData"

import WalletDetailModal from "./WalletDetailModal"
import WalletModalDetail from "./WalletModalDetail"

/**
 * Server body for the intercepting modal slot: the compact, row-based wallet
 * detail rendered inside the client modal shell. The standalone `[wallet]`
 * route has its own wider, grouped-checklist layout (`WalletDetail`).
 */
const InterceptedWalletDetail = async ({
  locale,
  walletSlug,
}: {
  locale: string
  walletSlug: string
}) => {
  const wallet = getWalletBySlug(walletSlug, locale)
  if (!wallet) notFound()

  return (
    <WalletDetailModal title={wallet.name}>
      <div className="bg-background p-4 sm:p-8">
        <WalletModalDetail locale={locale} wallet={wallet} />
      </div>
    </WalletDetailModal>
  )
}

export default InterceptedWalletDetail

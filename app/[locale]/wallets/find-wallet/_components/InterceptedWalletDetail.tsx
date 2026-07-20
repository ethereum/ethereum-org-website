import { notFound } from "next/navigation"

import { getWalletBySlug } from "@/lib/utils/walletData"

import WalletDetail from "./WalletDetail"
import WalletDetailModal from "./WalletDetailModal"

/**
 * Server body for the intercepting modal slot: the compact wallet detail
 * rendered inside the client modal shell. The standalone `[wallet]` route has
 * its own wider layout but shares the same `WalletDetail` content.
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
        <WalletDetail locale={locale} wallet={wallet} variant="modal" />
      </div>
    </WalletDetailModal>
  )
}

export default InterceptedWalletDetail

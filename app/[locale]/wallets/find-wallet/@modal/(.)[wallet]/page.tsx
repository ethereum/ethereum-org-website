import { notFound } from "next/navigation"

import type { Lang, PageParams } from "@/lib/types"

import { getWalletRowBySlug } from "@/components/FindWallets/data"
import WalletDetail from "@/components/FindWallets/WalletDetail"
import WalletDetailModal from "@/components/FindWallets/WalletDetailModal"

// Intercepts a wallet opened from the list (`/wallets/find-wallet/`).
const Page = async (props: {
  params: Promise<PageParams & { wallet: string }>
}) => {
  const { locale, wallet: slug } = await props.params
  const wallet = getWalletRowBySlug(locale!, slug)
  if (!wallet) notFound()

  return (
    <WalletDetailModal title={wallet.name}>
      <WalletDetail wallet={wallet} locale={locale as Lang} />
    </WalletDetailModal>
  )
}

export default Page

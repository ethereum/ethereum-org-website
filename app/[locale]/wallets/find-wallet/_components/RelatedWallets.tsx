"use client"

import { startTransition, useCallback, useState } from "react"

import type { CatalogWalletCard } from "@/lib/utils/walletData"

import type { WalletDeviceId } from "@/data/wallets/devices"
import type { WalletPersonaId } from "@/data/wallets/personas"

import WalletCard from "./WalletCard"
import WalletDetailModal, { type WalletModalLabels } from "./WalletDetailModal"

type RelatedWalletsProps = {
  wallets: CatalogWalletCard[]
  deviceLabels: Record<WalletDeviceId, string>
  personaLabels: Record<WalletPersonaId, string>
  modalLabels: WalletModalLabels
}

/** Same card-opens-modal behaviour as the catalog, for the standalone page. */
export default function RelatedWallets({
  wallets,
  deviceLabels,
  personaLabels,
  modalLabels,
}: RelatedWalletsProps) {
  const [openSlug, setOpenSlug] = useState<string | null>(null)
  const open = useCallback(
    (slug: string) => startTransition(() => setOpenSlug(slug)),
    []
  )
  const openWallet = openSlug
    ? wallets.find((wallet) => wallet.slug === openSlug)
    : undefined

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {wallets.map((wallet) => (
          <WalletCard
            key={wallet.slug}
            wallet={wallet}
            deviceLabels={deviceLabels}
            personaLabels={personaLabels}
            onOpen={open}
          />
        ))}
      </div>
      {openWallet && (
        <WalletDetailModal
          wallet={openWallet}
          labels={modalLabels}
          deviceLabels={deviceLabels}
          onClose={() => setOpenSlug(null)}
        />
      )}
    </>
  )
}

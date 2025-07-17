"use client"

import { ConnectButton } from "@rainbow-me/rainbowkit"

import { useTranslation } from "@/hooks/useTranslation"

export const CollectiblesConnectButton = () => {
  const { t } = useTranslation("page-collectibles")
  return (
    <ConnectButton.Custom>
      {({ account, chain, openConnectModal, mounted }) => {
        const connected = mounted && account && chain

        return (
          <>
            {(() => {
              if (!connected) {
                return (
                  <button
                    type="button"
                    onClick={openConnectModal}
                    className="ml-0 mt-2 w-44 rounded-lg border-2 border-[#A259FF] bg-[#F5F6FA] px-4 py-1.5 text-xs font-bold text-[#A259FF] no-underline shadow transition-colors hover:bg-[#E5E7EB] md:text-sm dark:border-[#A259FF] dark:bg-[#23202A] dark:text-[#A259FF] dark:hover:bg-[#2D2536]"
                  >
                    {t("page-collectibles-connect-wallet")}
                  </button>
                )
              }

              return <ConnectButton showBalance={false} />
            })()}
          </>
        )
      }}
    </ConnectButton.Custom>
  )
}

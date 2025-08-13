"use client"

import { ConnectButton } from "@rainbow-me/rainbowkit"

import { Button } from "@/components/ui/buttons/Button"

import { useTranslation } from "@/hooks/useTranslation"

const CollectiblesConnectButton = () => {
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
                  <Button onClick={openConnectModal} variant="outline">
                    {t("page-collectibles-connect-wallet")}
                  </Button>
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

export default CollectiblesConnectButton

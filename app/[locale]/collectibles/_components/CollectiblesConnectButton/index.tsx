"use client"
import { useTranslations } from "next-intl"
import { ConnectButton } from "@rainbow-me/rainbowkit"

import { Button } from "@/components/ui/buttons/Button"

const CollectiblesConnectButton = () => {
  const t = useTranslations("page-collectibles")
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

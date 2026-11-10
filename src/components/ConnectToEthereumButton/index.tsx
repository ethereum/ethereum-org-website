import { useTranslations } from "next-intl"
import { ConnectButton } from "@rainbow-me/rainbowkit"

import EthGlyphSolid from "@/components/icons/eth-glyph-solid.svg"
import { Button } from "@/components/ui/buttons/Button"

const ConnectToEthereumButton = ({ onClick }: { onClick: () => void }) => {
  const t = useTranslations("common")

  return (
    <ConnectButton.Custom>
      {({ account, chain, openConnectModal, mounted }) => {
        const ready = mounted
        if (!ready) return null

        if (account && chain) {
          return <ConnectButton />
        }

        return (
          <Button
            onClick={() => {
              openConnectModal()
              onClick()
            }}
            className="w-full px-8 sm:w-auto"
          >
            <EthGlyphSolid />
            {t("sign-in-with-ethereum")}
          </Button>
        )
      }}
    </ConnectButton.Custom>
  )
}

export default ConnectToEthereumButton

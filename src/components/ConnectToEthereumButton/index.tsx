import { FaChevronDown } from "react-icons/fa"
import { ConnectButton } from "@rainbow-me/rainbowkit"

import EthGlyphSolid from "@/components/icons/eth-glyph-solid.svg"
import { Image } from "@/components/Image"
import { Button } from "@/components/ui/buttons/Button"

const ConnectToEthereumButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <ConnectButton.Custom>
      {({ account, chain, openConnectModal, openAccountModal, mounted }) => {
        const ready = mounted
        if (!ready) return null

        if (account && chain) {
          return (
            <Button
              onClick={openAccountModal}
              variant="ghost"
              className="rounded-2xl border-none bg-background p-0"
            >
              <p className="ps-2 text-sm font-bold text-body">
                {account.displayBalance}
              </p>
              <div className="flex h-full min-h-10 flex-row items-center rounded-2xl bg-background-highlight px-2">
                {account.ensAvatar && (
                  <Image
                    src={account.ensAvatar}
                    alt={account.displayName}
                    className="h-4 w-4 rounded-full"
                  />
                )}
                <p className="text-sm font-bold text-body">
                  {account.displayName}
                </p>
                <FaChevronDown className="ms-2 text-body" />
              </div>
            </Button>
          )
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
            Sign in with Ethereum
          </Button>
        )
      }}
    </ConnectButton.Custom>
  )
}

export default ConnectToEthereumButton

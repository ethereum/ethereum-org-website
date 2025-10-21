import { useState } from "react"
import { ConnectButton } from "@rainbow-me/rainbowkit"

import { Button } from "@/components/ui/buttons/Button"
import Checkbox from "@/components/ui/checkbox"
import InlineLink from "@/components/ui/Link"

export default function MintConnect() {
  const [acceptedTerms, setAcceptedTerms] = useState(false)

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <ConnectButton.Custom>
        {({ account, chain, openConnectModal, mounted }) => {
          const ready = mounted
          if (!ready) return null

          if (account && chain) {
            return <ConnectButton />
          }

          return (
            <Button
              size="lg"
              onClick={openConnectModal}
              disabled={!acceptedTerms}
            >
              Claim Your NFT
            </Button>
          )
        }}
      </ConnectButton.Custom>

      <div className="flex items-start space-x-2">
        <label className="flex items-center gap-2 text-sm leading-relaxed">
          <Checkbox
            checked={acceptedTerms}
            onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
          />
          <span>
            I accept the{" "}
            <InlineLink href="/10years/terms-and-conditions">
              Terms &amp; Conditions
            </InlineLink>
          </span>
        </label>
      </div>
    </div>
  )
}

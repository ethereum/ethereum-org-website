import { useState } from "react"
import { ConnectButton } from "@rainbow-me/rainbowkit"

import { Button } from "@/components/ui/buttons/Button"
import Checkbox from "@/components/ui/checkbox"
import Modal from "@/components/ui/dialog-modal"

export default function MintConnect() {
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [showTermsModal, setShowTermsModal] = useState(false)

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
            <Button
              onClick={() => setShowTermsModal(true)}
              variant="link"
              className="!px-0"
            >
              Terms &amp; Conditions
            </Button>
          </span>
        </label>
      </div>

      {/* Terms & Conditions Modal */}
      <Modal
        open={showTermsModal}
        onOpenChange={setShowTermsModal}
        title="Terms & Conditions"
        size="xl"
        isSimulator
      >
        <div className="max-h-96 overflow-y-auto">
          <pre className="whitespace-pre-wrap text-sm">Terms & Conditions</pre>
        </div>
      </Modal>
    </div>
  )
}

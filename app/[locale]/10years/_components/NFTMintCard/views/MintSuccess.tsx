import {
  Alert,
  AlertContent,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { BaseLink } from "@/components/ui/Link"

import { getTxEtherscanUrl } from "@/lib/torch"

export default function MintSuccess({ txHash }: { txHash?: string }) {
  const tweetText = encodeURIComponent(
    "🎉 I just claimed my free 10th-Anniversary collectible NFT from ethereum.org 🔷 Celebrating a decade of open, decentralized innovation. Join me 👉 https://ethereum.org/en/10years/ #Ethereum10"
  )
  const tweetUrl = `https://twitter.com/intent/tweet?text=${tweetText}`

  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      <Alert
        variant="success"
        className="w-full rounded-none border-none bg-success"
      >
        <AlertContent>
          <AlertTitle className="!text-white">Minting successful!</AlertTitle>
          {txHash && (
            <AlertDescription>
              <BaseLink
                href={getTxEtherscanUrl(txHash)}
                className="text-sm text-white hover:text-white/80"
              >
                View transaction on etherscan
              </BaseLink>
            </AlertDescription>
          )}
        </AlertContent>
      </Alert>

      <BaseLink href={tweetUrl}>Share the celebration</BaseLink>
    </div>
  )
}

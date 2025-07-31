import { useEffect } from "react"
import confetti from "canvas-confetti"

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

  const triggerConfetti = () => {
    const duration = 5000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

    const randomInRange = (min: number, max: number) =>
      Math.random() * (max - min) + min

    const interval = window.setInterval(() => {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        return clearInterval(interval)
      }

      const particleCount = 50 * (timeLeft / duration)

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      })
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      })
    }, 250)
  }

  useEffect(() => {
    triggerConfetti()
  }, [])

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
                View transaction on Etherscan
              </BaseLink>
            </AlertDescription>
          )}
        </AlertContent>
      </Alert>

      <BaseLink href={tweetUrl}>Share the celebration</BaseLink>
    </div>
  )
}

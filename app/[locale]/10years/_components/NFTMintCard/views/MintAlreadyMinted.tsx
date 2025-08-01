import { Alert, AlertContent, AlertDescription } from "@/components/ui/alert"
import { BaseLink } from "@/components/ui/Link"

export default function MintAlreadyMinted() {
  const tweetText = encodeURIComponent(
    "🎉 I have my free 10th-Anniversary collectible NFT from ethereum.org 🔷 Celebrating a decade of open, decentralized innovation. Join me 👉 https://ethereum.org/en/10years/ #Ethereum10"
  )
  const tweetUrl = `https://twitter.com/intent/tweet?text=${tweetText}`

  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      <Alert
        variant="warning"
        className="w-full rounded-none border-none bg-warning"
      >
        <AlertContent>
          <AlertDescription className="text-warning-dark">
            Already minted
          </AlertDescription>
        </AlertContent>
      </Alert>

      <BaseLink href={tweetUrl}>Share the celebration</BaseLink>
    </div>
  )
}

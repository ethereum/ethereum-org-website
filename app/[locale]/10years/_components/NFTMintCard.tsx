"use client"

import { useEffect, useState } from "react"
import confetti from "canvas-confetti"
import {
  useAccount,
  useDisconnect,
  useEnsName,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi"
import { ConnectButton } from "@rainbow-me/rainbowkit"

import { Image } from "@/components/Image"
import {
  Alert,
  AlertContent,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/buttons/Button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Checkbox from "@/components/ui/checkbox"
import Modal from "@/components/ui/dialog-modal"
import { Center } from "@/components/ui/flex"

import { cn } from "@/lib/utils/cn"

import TenYearsNftData from "@/data/TenYearsNFT.json"

import {
  formatAddress,
  getAddressEtherscanUrl,
  getBlockieImage,
  getErrorMessage,
} from "@/lib/torch"
import TorchCoverImage from "@/public/images/10-year-anniversary/torch-cover.png"

interface NFTMintCardProps {
  className?: string
}

type MintState = "idle" | "minting" | "success" | "error"

const NFTMintCard = ({ className }: NFTMintCardProps) => {
  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()
  const { data: ensName } = useEnsName({ address })

  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [showTermsModal, setShowTermsModal] = useState(false)
  const [mintState, setMintState] = useState<MintState>("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const {
    writeContract: mint,
    data: hash,
    error: writeError,
  } = useWriteContract()

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    })

  // Handle transaction states
  useEffect(() => {
    if (isConfirming) {
      setMintState("minting")
    } else if (isConfirmed) {
      setMintState("success")
      triggerConfetti()
    } else if (writeError) {
      setMintState("error")
      setErrorMessage(getErrorMessage(writeError))
    }
  }, [isConfirming, isConfirmed, writeError])

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

  const handleMint = async () => {
    if (!address) {
      setErrorMessage("Please connect your wallet")
      setMintState("error")
      return
    }

    try {
      setMintState("minting")
      setErrorMessage("")

      mint({
        address: TenYearsNftData.address as `0x${string}`,
        abi: TenYearsNftData.abi,
        functionName: "mint",
      })
    } catch (error) {
      setMintState("error")
      setErrorMessage(
        error instanceof Error ? error.message : "Failed to mint NFT"
      )
      console.error("Minting error:", error)
    }
  }

  const resetMintState = () => {
    setMintState("idle")
    setErrorMessage("")
  }

  if (mintState === "success") {
    return (
      <Card
        className={cn(
          "w-full overflow-hidden rounded-3xl bg-background-highlight shadow-xl",
          className
        )}
      >
        <CardContent className="p-8 text-center">
          <div className="mb-6">
            <div className="mb-4 text-6xl">🎉</div>
            <CardTitle className="mb-4 text-2xl">
              NFT Minted Successfully!
            </CardTitle>
            <p className="text-gray-600">
              Your Ethereum 10th Anniversary NFT has been minted to your wallet.
            </p>
          </div>
          {address && (
            <div className="mb-6 flex items-center justify-center gap-4">
              <Avatar
                className="h-12 w-12"
                src={getBlockieImage(address)}
                href={getAddressEtherscanUrl(address)}
                name={ensName || formatAddress(address)}
              />
              <span className="font-medium">
                {ensName || formatAddress(address)}
              </span>
            </div>
          )}
          <Button onClick={resetMintState} variant="outline">
            View Another NFT
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <Card
        className={cn(
          "w-full overflow-hidden rounded-3xl bg-background-highlight shadow-xl",
          className
        )}
      >
        <CardHeader className="bg-gradient-to-b from-blue-900 to-purple-900">
          <CardTitle className="text-center text-white">
            <div className="mb-2 text-2xl font-bold">
              Ethereum 10th Anniversary NFT
            </div>
          </CardTitle>
          <Center className="py-8">
            <Image
              src={TorchCoverImage}
              alt="Ethereum 10th Anniversary NFT"
              width={200}
              height={200}
              className="rounded-lg"
            />
          </Center>
        </CardHeader>

        <CardContent className="p-6">
          <p className="mb-6 text-center text-gray-600">
            Commemorate Ethereum&apos;s 10th anniversary with this exclusive
            NFT. Limited to one mint per wallet address.
          </p>

          {mintState === "error" && (
            <Alert variant="error">
              <AlertContent>
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{errorMessage}</AlertDescription>
              </AlertContent>
            </Alert>
          )}

          <div className="flex flex-col items-center justify-center space-y-4">
            {!isConnected ? (
              <>
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
                      onCheckedChange={(checked) =>
                        setAcceptedTerms(checked as boolean)
                      }
                      disabled={mintState === "minting"}
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
              </>
            ) : (
              <Button
                size="lg"
                onClick={handleMint}
                disabled={mintState === "minting"}
              >
                {mintState === "minting" ? "Minting..." : "Mint NFT"}
              </Button>
            )}

            {isConnected && address && (
              <div className="flex flex-col items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar
                    className="h-6 w-6"
                    src={getBlockieImage(address)}
                    href={getAddressEtherscanUrl(address)}
                    name={ensName || formatAddress(address)}
                  />
                  <div>{ensName || formatAddress(address)}</div>
                </div>
                <Button
                  variant="link"
                  size="sm"
                  onClick={() => disconnect()}
                  className="text-body-medium"
                >
                  disconnect
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Terms & Conditions Modal */}
      <Modal
        open={showTermsModal}
        onOpenChange={setShowTermsModal}
        title="Terms & Conditions"
        size="xl"
      >
        <div className="max-h-96 overflow-y-auto">
          <pre className="whitespace-pre-wrap text-sm">Terms & Conditions</pre>
        </div>
      </Modal>
    </>
  )
}

export default NFTMintCard

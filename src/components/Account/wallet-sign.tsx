"use client"

import { useEffect, useState } from "react"
import { Wallet } from "lucide-react"
import { useTranslations } from "next-intl"
import { createSiweMessage } from "viem/siwe"
import { useAccount, useSignMessage } from "wagmi"
import { useConnectModal } from "@rainbow-me/rainbowkit"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import { Button } from "@/components/ui/buttons/Button"
import WalletProviders from "@/components/WalletProviders"

import { CHALLENGE_HEADER, requestJson, solveAccountChallenge } from "./api"

const queryClient = new QueryClient()

interface WalletSignProps {
  /** Sign in (may create an account), or add a backup wallet to this one */
  mode: "sign-in" | "link"
  onDone: () => void
  onError: (message: string) => void
  className?: string
}

const SignButton = ({ mode, onDone, onError, className }: WalletSignProps) => {
  const t = useTranslations("component-account")
  const { address, chainId, isConnected } = useAccount()
  const { openConnectModal } = useConnectModal()
  const { signMessageAsync } = useSignMessage()
  const [waiting, setWaiting] = useState(false)
  const [pending, setPending] = useState(false)

  const sign = async (from: `0x${string}`) => {
    setPending(true)
    try {
      const nonce = await requestJson<{ nonce: string }>(
        "/api/auth/siwe/nonce",
        {}
      )
      if (!nonce.data) throw new Error()
      const message = createSiweMessage({
        address: from,
        chainId: chainId ?? 1,
        domain: window.location.host,
        uri: window.location.origin,
        nonce: nonce.data.nonce,
        statement: t("account-wallet-statement"),
        version: "1",
        issuedAt: new Date(),
        expirationTime: new Date(Date.now() + 10 * 60_000),
      })
      const signature = await signMessageAsync({ message })
      const result =
        mode === "sign-in"
          ? await requestJson(
              "/api/auth/siwe/verify",
              { message, signature },
              { [CHALLENGE_HEADER]: await solveAccountChallenge() }
            )
          : await requestJson("/api/auth/wallet/link", { message, signature })
      if (result.status === 409) onError(t("account-wallet-taken"))
      else if (!result.ok) onError(t("account-error"))
      else onDone()
    } catch (error) {
      // Rejecting the signature in the wallet isn't an error worth showing
      if (!(error instanceof Error && /reject|denied/i.test(error.message)))
        onError(t("account-error"))
    } finally {
      setPending(false)
    }
  }

  // Connecting first: sign as soon as the wallet is connected
  useEffect(() => {
    if (waiting && isConnected && address) {
      setWaiting(false)
      void sign(address)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [waiting, isConnected, address])

  return (
    <Button
      variant="outline"
      isSecondary
      className={className}
      disabled={pending}
      onClick={() => {
        if (isConnected && address) void sign(address)
        else {
          setWaiting(true)
          openConnectModal?.()
        }
      }}
    >
      <Wallet aria-hidden />
      {mode === "sign-in"
        ? t("account-sign-in-wallet")
        : t("account-add-wallet")}
    </Button>
  )
}

/** Wallet sign-in or linking, with its providers; load with `next/dynamic` */
const WalletSign = (props: WalletSignProps) => (
  <QueryClientProvider client={queryClient}>
    <WalletProviders>
      <SignButton {...props} />
    </WalletProviders>
  </QueryClientProvider>
)

export default WalletSign

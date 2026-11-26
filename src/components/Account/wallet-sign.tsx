"use client"

import { useEffect, useRef, useState } from "react"
import { useTranslations } from "next-intl"
import { mainnet } from "viem/chains"
import { createSiweMessage } from "viem/siwe"
import { useAccount, useSignMessage } from "wagmi"
import { useConnectModal } from "@rainbow-me/rainbowkit"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import WalletProviders from "@/components/WalletProviders"

import {
  type ApiResult,
  CHALLENGE_HEADER,
  requestJson,
  solveAccountChallenge,
} from "./api"

const queryClient = new QueryClient()

const PATHS = {
  "sign-in": "/api/auth/siwe/verify",
  link: "/api/auth/wallet/link",
  confirm: "/api/auth/wallet/confirm",
}

export interface WalletSignProps {
  /** Sign in (may create an account), add a backup wallet to this one, or
   * confirm it's you with one of its wallets */
  mode: keyof typeof PATHS
  /** Bumped by the caller's own button to start */
  start: number
  /** Wraps the request, e.g. to confirm it's you and send it again; null
   * when that was abandoned */
  send?: (
    request: () => Promise<ApiResult<unknown>>
  ) => Promise<ApiResult<unknown> | null>
  /** The wallet's connect modal is about to open: hide any dialog first, as
   * a modal underneath would keep it from taking clicks and focus */
  onConnect?: () => void
  onPending?: (pending: boolean) => void
  onDone: () => void
  /** Closed the connect modal or turned down the signature */
  onCancel?: () => void
  onError: (message: string) => void
}

const Signer = ({
  mode,
  start,
  send,
  onConnect,
  onPending,
  onDone,
  onCancel,
  onError,
}: WalletSignProps) => {
  const t = useTranslations("component-account")
  const { address, isConnected } = useAccount()
  const { openConnectModal, connectModalOpen } = useConnectModal()
  const { signMessageAsync } = useSignMessage()
  const [waiting, setWaiting] = useState(false)
  const handled = useRef(0)
  const modalShown = useRef(false)

  const sign = async (from: `0x${string}`) => {
    onPending?.(true)
    try {
      const nonce = await requestJson<{ nonce: string }>(
        "/api/auth/siwe/nonce",
        {}
      )
      if (!nonce.data) throw new Error()
      const message = createSiweMessage({
        address: from,
        // Mainnet whatever network the wallet is on: signing needs no switch
        chainId: mainnet.id,
        domain: window.location.host,
        uri: window.location.origin,
        nonce: nonce.data.nonce,
        statement: t("account-wallet-statement"),
        version: "1",
        issuedAt: new Date(),
        expirationTime: new Date(Date.now() + 10 * 60_000),
      })
      const signature = await signMessageAsync({ message })
      const headers =
        mode === "sign-in"
          ? { [CHALLENGE_HEADER]: await solveAccountChallenge() }
          : undefined
      const request = () =>
        requestJson(PATHS[mode], { message, signature }, headers)
      const result = send ? await send(request) : await request()
      if (!result) onCancel?.()
      else if (result.status === 409) onError(t("account-wallet-taken"))
      else if (mode === "confirm" && [401, 403].includes(result.status))
        onError(t("account-confirm-failed"))
      else if (!result.ok) onError(t("account-error"))
      else onDone()
    } catch (error) {
      // Turning down the signature in the wallet isn't an error worth showing
      if (error instanceof Error && /reject|denied/i.test(error.message))
        onCancel?.()
      else onError(t("account-error"))
    } finally {
      onPending?.(false)
    }
  }

  // A press of the caller's button: sign now, or connect a wallet first
  useEffect(() => {
    if (!start || start === handled.current) return
    handled.current = start
    if (isConnected && address) void sign(address)
    else if (openConnectModal) {
      onConnect?.()
      setWaiting(true)
      openConnectModal()
    } else onError(t("account-error"))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start])

  // Connected through the modal: sign right away
  useEffect(() => {
    if (waiting && isConnected && address) {
      setWaiting(false)
      void sign(address)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [waiting, isConnected, address])

  // The modal closed without a wallet connected
  useEffect(() => {
    if (connectModalOpen) modalShown.current = true
    else if (modalShown.current) {
      modalShown.current = false
      if (waiting && !isConnected) {
        setWaiting(false)
        onCancel?.()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connectModalOpen])

  return null
}

/**
 * Wallet sign-in, linking or confirming, with its providers. Headless: the
 * caller renders the button and bumps `start`. Render it outside any
 * dialog's content, so it keeps going while the dialog steps aside for the
 * wallet's connect modal (whose "Get a wallet" also serves visitors with
 * none yet). Load with `next/dynamic`.
 */
const WalletSign = (props: WalletSignProps) => (
  <QueryClientProvider client={queryClient}>
    <WalletProviders>
      <Signer {...props} />
    </WalletProviders>
  </QueryClientProvider>
)

export default WalletSign

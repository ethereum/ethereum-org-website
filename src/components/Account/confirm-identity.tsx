"use client"

import { useCallback, useState } from "react"
import { KeyRound, Wallet } from "lucide-react"
import dynamic from "next/dynamic"
import { useTranslations } from "next-intl"

import { Button } from "@/components/ui/buttons/Button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog-modal"

import { needsFreshSession } from "./api"

import { authClient } from "@/lib/auth/client"

const WalletSign = dynamic(() => import("./wallet-sign"), { ssr: false })

/** The browser closed the passkey prompt: nothing to report */
const PASSKEY_CANCELS = [
  "AUTH_CANCELLED",
  "ERROR_CEREMONY_ABORTED",
  "ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",
]

interface SignInMethods {
  passkey: boolean
  wallet: boolean
}

/**
 * "Confirm it's you" before a sensitive change (deleting the account, adding
 * or removing a passkey or a wallet) when the server finds the last sign-in
 * too long ago: one of the account's own passkeys or wallets signs in again,
 * then the change goes ahead. Wrap the change's request in `withFreshSession` and
 * render `confirmDialog`.
 */
export const useConfirmIdentity = (methods: SignInMethods) => {
  const t = useTranslations("component-account")
  const [resolve, setResolve] = useState<((confirmed: boolean) => void) | null>(
    null
  )
  // Stepped aside, still open, while the wallet's connect modal is up
  const [hidden, setHidden] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [walletStart, setWalletStart] = useState(0)
  // Neither known (the lists didn't load): offer both
  const passkey = methods.passkey || !methods.wallet
  const wallet = methods.wallet || !methods.passkey

  const settle = (confirmed: boolean) => {
    resolve?.(confirmed)
    setResolve(null)
    setHidden(false)
    setError(null)
    setWalletStart(0)
  }

  /** The request, sent again once confirmed if the session was too old;
   * null when the learner backed out */
  const withFreshSession = useCallback(
    async <T,>(request: () => Promise<T>): Promise<T | null> => {
      const result = await request()
      if (!needsFreshSession(result)) return result
      const confirmed = await new Promise<boolean>((done) =>
        setResolve(() => done)
      )
      return confirmed ? request() : null
    },
    []
  )

  const confirmWithPasskey = async () => {
    setBusy(true)
    setError(null)
    const { error: failed } = await authClient.signIn
      .passkey()
      .catch(() => ({ error: { code: "UNKNOWN_ERROR" } }))
    setBusy(false)
    if (!failed) return settle(true)
    const code = "code" in failed ? failed.code : undefined
    if (!PASSKEY_CANCELS.includes(code ?? ""))
      setError(t("account-confirm-failed"))
  }

  const confirmDialog = (
    <Dialog
      variant="stacked"
      open={!!resolve && !hidden}
      onOpenChange={(open) => !open && settle(false)}
    >
      <DialogContent className="flow block max-w-md">
        <DialogHeader>
          <DialogTitle>{t("account-confirm-title")}</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          {t("account-confirm-description")}
        </DialogDescription>
        <div className="flex flex-col gap-3">
          {passkey && (
            <Button disabled={busy} onClick={confirmWithPasskey}>
              <KeyRound aria-hidden />
              {t("account-continue-passkey")}
            </Button>
          )}
          {wallet && (
            <Button
              variant="outline"
              isSecondary
              disabled={busy}
              onClick={() => {
                setError(null)
                setWalletStart((count) => count + 1)
              }}
            >
              <Wallet aria-hidden />
              {t("account-sign-in-wallet")}
            </Button>
          )}
        </div>
        {error && (
          <p role="alert" className="text-error dark:text-red-400">
            {error}
          </p>
        )}
      </DialogContent>
      {resolve && wallet && (
        <WalletSign
          mode="confirm"
          start={walletStart}
          onConnect={() => setHidden(true)}
          onCancel={() => setHidden(false)}
          onPending={setBusy}
          onDone={() => settle(true)}
          onError={(message) => {
            setHidden(false)
            setError(message)
          }}
        />
      )}
    </Dialog>
  )

  return { withFreshSession, confirmDialog }
}

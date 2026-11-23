"use client"

import { useEffect, useState } from "react"
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
  DialogTrigger,
} from "@/components/ui/dialog-modal"

import { CHALLENGE_HEADER, isCancelled, solveAccountChallenge } from "./api"
import { useAccount } from "./use-account"

import { authClient } from "@/lib/auth/client"

const loadWalletSign = () => import("./wallet-sign")

const WalletSign = dynamic(loadWalletSign, { ssr: false })

interface SignInDialogProps {
  trigger: React.ReactNode
  /** After sign-in, before the dialog closes: e.g. move local progress over */
  onSignedIn?: () => void | Promise<void>
}

/**
 * Passkey or wallet: no email, no password, and one screen for signing in or
 * up. A wallet with no account gets one; without a wallet, the wallet's
 * connect modal offers to get one. Browsers report "no passkey here" the
 * same as a cancel, so a passkey that doesn't sign in offers to create one.
 * Site-wide, so any feature can ask someone to sign in.
 */
const SignInDialog = ({ trigger, onSignedIn }: SignInDialogProps) => {
  const t = useTranslations("component-account")
  const { refetch } = useAccount()
  const [open, setOpen] = useState(false)
  // Stepped aside, still open, while the wallet's connect modal is up
  const [hidden, setHidden] = useState(false)
  const [busy, setBusy] = useState(false)
  const [walletBusy, setWalletBusy] = useState(false)
  const [walletStart, setWalletStart] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [offerCreate, setOfferCreate] = useState(false)

  // Fetch the wallet chunk ahead of the first open
  useEffect(() => {
    void loadWalletSign()
  }, [])

  const finish = async () => {
    refetch()
    await onSignedIn?.()
    setOpen(false)
    setHidden(false)
  }

  const run = async (
    action: () => Promise<{ error: unknown } | void>,
    onFailed = () => setError(t("account-error"))
  ) => {
    setBusy(true)
    setError(null)
    try {
      const result = await action()
      if (result?.error) onFailed()
      else await finish()
    } catch (caught) {
      if (!isCancelled(caught)) setError(t("account-error"))
    } finally {
      setBusy(false)
    }
  }

  const signInWithPasskey = () =>
    run(
      () => authClient.signIn.passkey(),
      () => setOfferCreate(true)
    )

  const createWithPasskey = () =>
    run(async () =>
      authClient.passkey.addPasskey({
        name: t("account-passkey-default-name"),
        createSession: true,
        fetchOptions: {
          headers: { [CHALLENGE_HEADER]: await solveAccountChallenge() },
        },
      })
    )

  return (
    <Dialog
      variant="stacked"
      open={open && !hidden}
      onOpenChange={(next) => {
        setOpen(next)
        if (next) {
          setError(null)
          setOfferCreate(false)
          setWalletStart(0)
        }
      }}
    >
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      {/* Flow rhythm instead of the dialog's grid gap */}
      <DialogContent className="flow block max-w-md">
        <DialogHeader>
          <DialogTitle>{t("account-continue-title")}</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          {t("account-continue-description")}
        </DialogDescription>
        <div className="flex flex-col gap-3">
          <Button disabled={busy || walletBusy} onClick={signInWithPasskey}>
            <KeyRound aria-hidden />
            {t("account-continue-passkey")}
          </Button>
          <Button
            variant="outline"
            isSecondary
            disabled={busy || walletBusy}
            onClick={() => {
              setError(null)
              setWalletStart((count) => count + 1)
            }}
          >
            <Wallet aria-hidden />
            {t("account-sign-in-wallet")}
          </Button>
        </div>
        {offerCreate && (
          <div
            role="status"
            className="flex flex-col gap-3 rounded-lg border bg-background-highlight p-4"
          >
            <p className="m-0">{t("account-passkey-missing")}</p>
            <Button
              variant="outline"
              disabled={busy}
              onClick={createWithPasskey}
            >
              <KeyRound aria-hidden />
              {t("account-create-passkey")}
            </Button>
          </div>
        )}
        {error && (
          <p role="alert" className="text-error dark:text-red-400">
            {error}
          </p>
        )}
      </DialogContent>
      {open && (
        <WalletSign
          mode="sign-in"
          start={walletStart}
          onConnect={() => setHidden(true)}
          onCancel={() => setHidden(false)}
          onPending={setWalletBusy}
          onDone={() => run(async () => {})}
          onError={(message) => {
            setHidden(false)
            setError(message)
          }}
        />
      )}
    </Dialog>
  )
}

export default SignInDialog

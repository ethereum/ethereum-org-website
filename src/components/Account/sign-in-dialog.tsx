"use client"

import { useState } from "react"
import { KeyRound } from "lucide-react"
import dynamic from "next/dynamic"
import { useTranslations } from "next-intl"

import { Button } from "@/components/ui/buttons/Button"
import Checkbox from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog-modal"
import { Label } from "@/components/ui/label"

import { CHALLENGE_HEADER, isCancelled, solveAccountChallenge } from "./api"
import { useAccount } from "./use-account"

import { authClient } from "@/lib/auth/client"

const WalletSign = dynamic(() => import("./wallet-sign"), { ssr: false })

/** Accounts this new count as just created, for the sign-up-only choices */
const NEW_ACCOUNT_MS = 2 * 60_000

interface SignInDialogProps {
  trigger: React.ReactNode
  /** Defaults to "Save your progress" */
  title?: string
  /** After sign-in, before the dialog closes: e.g. move local progress over */
  onSignedIn?: () => void | Promise<void>
}

/**
 * Passkey or wallet: no email, no password. A new passkey creates the
 * account; an existing one or a wallet signs in (a new wallet also creates
 * one). Site-wide, so any feature can ask someone to sign in.
 */
const SignInDialog = ({ trigger, title, onSignedIn }: SignInDialogProps) => {
  const t = useTranslations("component-account")
  const { refetch } = useAccount()
  const [open, setOpen] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [leaderboard, setLeaderboard] = useState(true)

  const finish = async () => {
    const { data } = await authClient.getSession()
    const created = data?.user.createdAt
      ? new Date(data.user.createdAt).getTime()
      : 0
    if (!leaderboard && Date.now() - created < NEW_ACCOUNT_MS)
      await authClient.updateUser({ showOnLeaderboard: false })
    refetch()
    await onSignedIn?.()
    setOpen(false)
  }

  const run = async (action: () => Promise<{ error: unknown } | void>) => {
    setBusy(true)
    setError(null)
    try {
      const result = await action()
      if (result?.error) setError(t("account-error"))
      else await finish()
    } catch (caught) {
      if (!isCancelled(caught)) setError(t("account-error"))
    } finally {
      setBusy(false)
    }
  }

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

  const signInWithPasskey = () => run(() => authClient.signIn.passkey())

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{title ?? t("account-sign-in-title")}</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          {t("account-sign-in-description")}
        </DialogDescription>
        <div className="flex flex-col gap-3">
          <Button disabled={busy} onClick={createWithPasskey}>
            <KeyRound aria-hidden />
            {t("account-create-passkey")}
          </Button>
          <Button
            variant="outline"
            isSecondary
            disabled={busy}
            onClick={signInWithPasskey}
          >
            <KeyRound aria-hidden />
            {t("account-sign-in-passkey")}
          </Button>
          <WalletSign
            mode="sign-in"
            className="w-full"
            onDone={() => run(async () => {})}
            onError={setError}
          />
        </div>
        <div className="flex items-start gap-3">
          <Checkbox
            id="account-leaderboard"
            checked={leaderboard}
            onCheckedChange={(checked) => setLeaderboard(checked === true)}
            className="mt-1"
          />
          <Label htmlFor="account-leaderboard" className="flex flex-col gap-1">
            <span>{t("account-leaderboard-label")}</span>
            <span className="text-sm text-body-medium">
              {t("account-leaderboard-hint")}
            </span>
          </Label>
        </div>
        {error && (
          <p role="alert" className="m-0 text-error dark:text-red-400">
            {error}
          </p>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default SignInDialog

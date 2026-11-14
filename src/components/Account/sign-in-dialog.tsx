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

type View = "sign-in" | "create"

interface SignInDialogProps {
  trigger: React.ReactNode
  /** Which view opens first; the other is a link away */
  view?: View
  /** After sign-in, before the dialog closes: e.g. move local progress over */
  onSignedIn?: () => void | Promise<void>
}

/**
 * Passkey or wallet: no email, no password. Opens on signing in, with
 * creating an account (and its leaderboard choice) one link away. A wallet
 * that has no account yet gets one either way. Site-wide, so any feature can
 * ask someone to sign in.
 */
const SignInDialog = ({
  trigger,
  view: initialView = "sign-in",
  onSignedIn,
}: SignInDialogProps) => {
  const t = useTranslations("component-account")
  const { refetch } = useAccount()
  const [open, setOpen] = useState(false)
  const [view, setView] = useState<View>(initialView)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [leaderboard, setLeaderboard] = useState(true)
  const creating = view === "create"

  const switchView = (next: View) => {
    setView(next)
    setError(null)
  }

  const finish = async () => {
    if (creating && !leaderboard) {
      const { data } = await authClient.getSession()
      const created = data?.user.createdAt
        ? new Date(data.user.createdAt).getTime()
        : 0
      if (Date.now() - created < NEW_ACCOUNT_MS)
        await authClient.updateUser({ showOnLeaderboard: false })
    }
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
    <Dialog
      variant="stacked"
      open={open}
      onOpenChange={(next) => {
        setOpen(next)
        if (next) switchView(initialView)
      }}
    >
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      {/* Flow rhythm instead of the dialog's grid gap */}
      <DialogContent className="flow block max-w-md">
        <DialogHeader>
          <DialogTitle>
            {creating ? t("account-create-title") : t("account-sign-in")}
          </DialogTitle>
        </DialogHeader>
        <DialogDescription>
          {creating
            ? t("account-create-description")
            : t("account-sign-in-description")}
        </DialogDescription>
        <div className="flex flex-col gap-3">
          <Button
            disabled={busy}
            onClick={creating ? createWithPasskey : signInWithPasskey}
          >
            <KeyRound aria-hidden />
            {creating
              ? t("account-create-passkey")
              : t("account-sign-in-passkey")}
          </Button>
          <WalletSign
            mode="sign-in"
            label={
              creating
                ? t("account-create-wallet")
                : t("account-sign-in-wallet")
            }
            className="w-full"
            onDone={() => run(async () => {})}
            onError={setError}
          />
        </div>
        {creating && (
          <div className="flex items-start gap-3">
            <Checkbox
              id="account-leaderboard"
              checked={leaderboard}
              onCheckedChange={(checked) => setLeaderboard(checked === true)}
              className="mt-1"
            />
            <Label
              htmlFor="account-leaderboard"
              className="flex flex-col gap-1"
            >
              <span>{t("account-leaderboard-label")}</span>
              <span className="text-sm text-body-medium">
                {t("account-leaderboard-hint")}
              </span>
            </Label>
          </div>
        )}
        {error && (
          <p role="alert" className="text-error dark:text-red-400">
            {error}
          </p>
        )}
        <p className="text-sm text-body-medium">
          {creating ? t("account-have-account") : t("account-new-here")}{" "}
          <Button
            variant="link"
            className="min-h-0 p-0 text-sm"
            onClick={() => switchView(creating ? "sign-in" : "create")}
          >
            {creating ? t("account-sign-in") : t("account-create-title")}
          </Button>
        </p>
      </DialogContent>
    </Dialog>
  )
}

export default SignInDialog

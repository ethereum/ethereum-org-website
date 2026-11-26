"use client"

import { useRef, useState } from "react"
import { useTranslations } from "next-intl"

import { Button } from "@/components/ui/buttons/Button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog-modal"

import { flushProgress } from "./account-sync"

/** Longest a sign-out waits for the upload before offering the choice */
const FLUSH_WAIT_MS = 8_000

const flushInTime = () =>
  Promise.race([
    flushProgress(),
    new Promise<boolean>((resolve) =>
      setTimeout(() => resolve(false), FLUSH_WAIT_MS)
    ),
  ])

/**
 * Before signing out: progress the account hasn't saved yet goes up first.
 * When it can't (offline, say), the learner picks: try again, or sign out and
 * leave it on this device until they sign in here again. `confirmSignOut`
 * resolves true to go ahead; `dialog` renders the choice.
 */
export const useSignOutGuard = () => {
  const t = useTranslations("page-courses")
  const [open, setOpen] = useState(false)
  const [busy, setBusy] = useState(false)
  const [failed, setFailed] = useState(false)
  const decide = useRef<(signOut: boolean) => void>(undefined)

  const confirmSignOut = async () => {
    if (await flushInTime()) return true
    setFailed(false)
    setOpen(true)
    return new Promise<boolean>((resolve) => {
      decide.current = resolve
    })
  }

  const settle = (signOut: boolean) => {
    setOpen(false)
    decide.current?.(signOut)
    decide.current = undefined
  }

  const retry = async () => {
    setBusy(true)
    const saved = await flushInTime()
    setBusy(false)
    if (saved) settle(true)
    else setFailed(true)
  }

  const dialog = (
    <Dialog
      variant="stacked"
      open={open}
      onOpenChange={(next) => !next && settle(false)}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("page-courses-sign-out-unsaved-title")}</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          {t("page-courses-sign-out-unsaved-description")}
        </DialogDescription>
        <p role="status" className="m-0 font-bold text-error empty:hidden">
          {failed && t("page-courses-sign-out-unsaved-failed")}
        </p>
        <DialogFooter className="flex flex-wrap justify-end gap-2">
          <Button
            variant="outline"
            isSecondary
            disabled={busy}
            onClick={() => settle(true)}
          >
            {t("page-courses-sign-out-unsaved-anyway")}
          </Button>
          <Button disabled={busy} onClick={retry}>
            {t("page-courses-try-again")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )

  return { confirmSignOut, dialog }
}

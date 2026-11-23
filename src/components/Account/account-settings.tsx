"use client"

import { useCallback, useEffect, useState } from "react"
import {
  Check,
  KeyRound,
  LogOut,
  MonitorSmartphone,
  Pencil,
  Trash2,
  Wallet,
  X,
} from "lucide-react"
import dynamic from "next/dynamic"
import { useLocale, useTranslations } from "next-intl"

import { Button } from "@/components/ui/buttons/Button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog-modal"
import Input from "@/components/ui/input"

import { formatDate } from "@/lib/utils/date"

import { useSignOutGuard } from "../Courses/sign-out-guard"

import { isCancelled, requestJson } from "./api"
import { useConfirmIdentity } from "./confirm-identity"
import { useAccount } from "./use-account"

import { authClient } from "@/lib/auth/client"
import { truncateAddress } from "@/lib/auth/display-name"

const WalletSign = dynamic(() => import("./wallet-sign"), { ssr: false })

interface PasskeyItem {
  id: string
  name?: string | null
  createdAt?: string | null
}

interface WalletItem {
  address: string
  createdAt: string
}

interface SessionItem {
  id: string
  createdAt: string
  current: boolean
}

const row =
  "flex items-center justify-between gap-3 rounded-lg border border-border px-4 py-3"
// Name and date stack on phones and share a line from md
const rowText = "flex flex-col md:flex-row md:items-baseline md:gap-3"
const PASSKEY_NAME_MAX = 50

interface AccountSettingsProps {
  /** Before the page learns the visitor signed out (`deleted`: or deleted
   * the account), e.g. to clear what belonged to the account */
  onLeave?: (deleted: boolean) => void
}

/**
 * Sign-in methods (passkeys and wallets: keep a backup), signed-in devices,
 * sign out and account deletion. Only for signed-in visitors.
 */
const AccountSettings = ({ onLeave }: AccountSettingsProps) => {
  const t = useTranslations("component-account")
  const locale = useLocale()
  const { refetch } = useAccount()
  const [passkeys, setPasskeys] = useState<PasskeyItem[]>([])
  const [wallets, setWallets] = useState<WalletItem[]>([])
  const [sessions, setSessions] = useState<SessionItem[]>([])
  const [error, setError] = useState<string | null>(null)
  const [sessionsError, setSessionsError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const [renaming, setRenaming] = useState<{ id: string; name: string } | null>(
    null
  )
  const [linkStart, setLinkStart] = useState(0)
  const [linking, setLinking] = useState(false)

  const load = useCallback(async () => {
    const [p, w, s] = await Promise.all([
      requestJson<PasskeyItem[]>("/api/auth/passkey/list-user-passkeys"),
      requestJson<WalletItem[]>("/api/auth/wallet/list"),
      requestJson<SessionItem[]>("/api/auth/sessions/list"),
    ])
    setPasskeys(p.data ?? [])
    setWallets(w.data ?? [])
    setSessions(s.data ?? [])
  }, [])

  useEffect(() => {
    void load()
  }, [load])

  const methods = passkeys.length + wallets.length
  const date = (value?: string | null) =>
    value ? formatDate(value, locale, { dateStyle: "medium" }) : ""
  const signOutGuard = useSignOutGuard()
  const { withFreshSession, confirmDialog } = useConfirmIdentity({
    passkey: passkeys.length > 0,
    wallet: wallets.length > 0,
  })

  const act = async (
    // null: the learner backed out of confirming it's them
    action: () => Promise<{ ok?: boolean; error?: unknown } | null>,
    // The section whose message shows the outcome
    report: (message: string | null) => void = setError
  ) => {
    setBusy(true)
    report(null)
    try {
      const result = await action()
      if (result && (result.error || result.ok === false))
        report(t("account-error"))
      await load()
    } catch (caught) {
      if (!isCancelled(caught)) report(t("account-error"))
    } finally {
      setBusy(false)
    }
  }

  const addPasskey = () =>
    act(() =>
      withFreshSession(() =>
        authClient.passkey.addPasskey({
          name: t("account-passkey-default-name"),
        })
      )
    )
  const renamePasskey = async () => {
    if (!renaming?.name.trim()) return setRenaming(null)
    const { id, name } = renaming
    setRenaming(null)
    await act(() =>
      requestJson("/api/auth/passkey/update-passkey", {
        id,
        name: name.trim(),
      })
    )
  }
  const removePasskey = (id: string) =>
    act(() =>
      withFreshSession(() =>
        requestJson("/api/auth/passkey/delete-passkey", { id })
      )
    )
  const removeWallet = (address: string) =>
    act(() =>
      withFreshSession(() =>
        requestJson("/api/auth/wallet/unlink", { address })
      )
    )

  const signOutOthers = () =>
    act(
      () => withFreshSession(() => authClient.revokeOtherSessions()),
      setSessionsError
    )

  const deleteAccount = async () => {
    const result = await withFreshSession(() => authClient.deleteUser())
    if (!result) return
    if (result.error) return setError(t("account-error"))
    onLeave?.(true)
    refetch()
  }

  const signOut = async () => {
    // Course progress the account hasn't saved yet goes up first, or the
    // learner chooses to leave it on this device
    if (!(await signOutGuard.confirmSignOut())) return
    const { error } = await authClient.signOut()
    if (error) return setError(t("account-error"))
    onLeave?.(false)
    refetch()
  }

  return (
    // Its own spacing: the sections opt out of the profile page's flow rhythm
    <div className="flex flex-col gap-8">
      <section data-flow="skip" className="flex flex-col gap-4">
        <h3 className="m-0 text-lg">{t("account-methods-title")}</h3>
        <p className="m-0 max-w-3xl text-body-medium">
          {t("account-methods-hint")}
        </p>
        <ul className="m-0 flex max-w-3xl list-none flex-col gap-2">
          {passkeys.map(({ id, name, createdAt }) => (
            <li key={id} className={row}>
              {renaming?.id === id ? (
                <form
                  className="flex flex-1 items-center gap-2"
                  onSubmit={(event) => {
                    event.preventDefault()
                    void renamePasskey()
                  }}
                >
                  <KeyRound className="size-5 shrink-0" aria-hidden />
                  <Input
                    autoFocus
                    size="sm"
                    maxLength={PASSKEY_NAME_MAX}
                    aria-label={t("account-passkey-name")}
                    value={renaming.name}
                    onChange={(event) =>
                      setRenaming({ id, name: event.target.value })
                    }
                    onKeyDown={(event) =>
                      event.key === "Escape" && setRenaming(null)
                    }
                    className="min-w-0 flex-1"
                  />
                  <Button
                    type="submit"
                    variant="ghost"
                    isSecondary
                    size="sm"
                    aria-label={t("account-save")}
                  >
                    <Check aria-hidden />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    isSecondary
                    size="sm"
                    onClick={() => setRenaming(null)}
                    aria-label={t("account-cancel")}
                  >
                    <X aria-hidden />
                  </Button>
                </form>
              ) : (
                <>
                  <span className="flex items-center gap-3">
                    <KeyRound className="size-5 shrink-0" aria-hidden />
                    <span className={rowText}>
                      <span>{name || t("account-passkey-default-name")}</span>
                      <span className="text-sm text-body-medium">
                        {date(createdAt)}
                      </span>
                    </span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      isSecondary
                      size="sm"
                      disabled={busy}
                      onClick={() =>
                        setRenaming({
                          id,
                          name: name || t("account-passkey-default-name"),
                        })
                      }
                      aria-label={t("account-rename")}
                    >
                      <Pencil aria-hidden />
                    </Button>
                    <Button
                      variant="ghost"
                      isSecondary
                      size="sm"
                      disabled={busy || methods <= 1}
                      onClick={() => removePasskey(id)}
                      aria-label={t("account-remove")}
                    >
                      <Trash2 aria-hidden />
                    </Button>
                  </span>
                </>
              )}
            </li>
          ))}
          {wallets.map(({ address, createdAt }) => (
            <li key={address} className={row}>
              <span className="flex items-center gap-3">
                <Wallet className="size-5 shrink-0" aria-hidden />
                <span className={rowText}>
                  <span className="font-mono">{truncateAddress(address)}</span>
                  <span className="text-sm text-body-medium">
                    {date(createdAt)}
                  </span>
                </span>
              </span>
              <Button
                variant="ghost"
                isSecondary
                size="sm"
                disabled={busy || methods <= 1}
                onClick={() => removeWallet(address)}
                aria-label={t("account-remove")}
              >
                <Trash2 aria-hidden />
              </Button>
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-3">
          <Button
            variant="outline"
            isSecondary
            disabled={busy}
            onClick={addPasskey}
          >
            <KeyRound aria-hidden />
            {t("account-add-passkey")}
          </Button>
          <Button
            variant="outline"
            isSecondary
            disabled={busy || linking}
            onClick={() => {
              setError(null)
              setLinkStart((count) => count + 1)
            }}
          >
            <Wallet aria-hidden />
            {t("account-add-wallet")}
          </Button>
          <WalletSign
            mode="link"
            start={linkStart}
            send={withFreshSession}
            onPending={setLinking}
            onDone={() => void load()}
            onError={setError}
          />
        </div>
        {confirmDialog}
        {error && (
          <p role="alert" className="m-0 text-error dark:text-red-400">
            {error}
          </p>
        )}
      </section>

      {sessions.length > 0 && (
        <section data-flow="skip" className="flex flex-col gap-4">
          <h3 className="m-0 text-lg">{t("account-sessions-title")}</h3>
          <p className="m-0 max-w-3xl text-body-medium">
            {t("account-sessions-hint")}
          </p>
          <ul className="m-0 flex max-w-3xl list-none flex-col gap-2">
            {sessions.map(({ id, createdAt, current }) => (
              <li key={id} className={row}>
                <span className="flex items-center gap-3">
                  <MonitorSmartphone className="size-5 shrink-0" aria-hidden />
                  <span className={rowText}>
                    <span>
                      {current
                        ? t("account-session-current")
                        : t("account-session-other")}
                    </span>
                    <span className="text-sm text-body-medium">
                      {t("account-session-signed-in", {
                        date: date(createdAt),
                      })}
                    </span>
                  </span>
                </span>
              </li>
            ))}
          </ul>
          {sessions.length > 1 && (
            <div className="flex flex-wrap gap-3">
              <Button
                variant="outline"
                isSecondary
                disabled={busy}
                onClick={signOutOthers}
              >
                <LogOut aria-hidden />
                {t("account-sign-out-others")}
              </Button>
            </div>
          )}
          {sessionsError && (
            <p role="alert" className="m-0 text-error dark:text-red-400">
              {sessionsError}
            </p>
          )}
        </section>
      )}

      <section data-flow="skip" className="flex flex-wrap items-center gap-3">
        <Button variant="outline" isSecondary onClick={signOut}>
          {t("account-sign-out")}
        </Button>
        {signOutGuard.dialog}
        <Dialog variant="stacked">
          <DialogTrigger asChild>
            <Button variant="link" className="text-error dark:text-red-400">
              {t("account-delete")}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t("account-delete-title")}</DialogTitle>
            </DialogHeader>
            <DialogDescription>
              {t("account-delete-description")}
            </DialogDescription>
            <DialogFooter className="flex flex-wrap justify-end gap-2">
              <DialogClose asChild>
                <Button variant="outline" isSecondary>
                  {t("account-cancel")}
                </Button>
              </DialogClose>
              <DialogClose asChild>
                <Button onClick={deleteAccount}>{t("account-delete")}</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </section>
    </div>
  )
}

export default AccountSettings

"use client"

import { useCallback, useEffect, useId, useState } from "react"
import { Check, KeyRound, Pencil, Trash2, Wallet, X } from "lucide-react"
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
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field"
import Input from "@/components/ui/input"
import Switch from "@/components/ui/switch"

import { formatDate } from "@/lib/utils/date"

import { isCancelled, requestJson } from "./api"
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

const row =
  "flex items-center justify-between gap-3 rounded-lg border border-border px-4 py-3"
// Name and date stack on phones and share a line from md
const rowText = "flex flex-col md:flex-row md:items-baseline md:gap-3"
const PASSKEY_NAME_MAX = 50

/**
 * Sign-in methods (passkeys and wallets: keep a backup), leaderboard
 * visibility, sign out and account deletion. Only for signed-in visitors.
 */
const AccountSettings = () => {
  const t = useTranslations("component-account")
  const locale = useLocale()
  const { user, refetch } = useAccount()
  const [passkeys, setPasskeys] = useState<PasskeyItem[]>([])
  const [wallets, setWallets] = useState<WalletItem[]>([])
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const [renaming, setRenaming] = useState<{ id: string; name: string } | null>(
    null
  )
  const leaderboardId = useId()

  const load = useCallback(async () => {
    const [p, w] = await Promise.all([
      requestJson<PasskeyItem[]>("/api/auth/passkey/list-user-passkeys"),
      requestJson<WalletItem[]>("/api/auth/wallet/list"),
    ])
    setPasskeys(p.data ?? [])
    setWallets(w.data ?? [])
  }, [])

  useEffect(() => {
    void load()
  }, [load])

  const methods = passkeys.length + wallets.length
  const date = (value?: string | null) =>
    value ? formatDate(value, locale, { dateStyle: "medium" }) : ""

  const act = async (
    action: () => Promise<{ ok?: boolean; error?: unknown }>
  ) => {
    setBusy(true)
    setError(null)
    try {
      const result = await action()
      if (result.error || result.ok === false) setError(t("account-error"))
      await load()
    } catch (caught) {
      if (!isCancelled(caught)) setError(t("account-error"))
    } finally {
      setBusy(false)
    }
  }

  const addPasskey = () =>
    act(() =>
      authClient.passkey.addPasskey({ name: t("account-passkey-default-name") })
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
    act(() => requestJson("/api/auth/passkey/delete-passkey", { id }))
  const removeWallet = (address: string) =>
    act(() => requestJson("/api/auth/wallet/unlink", { address }))

  const setLeaderboard = async (showOnLeaderboard: boolean) => {
    await authClient.updateUser({ showOnLeaderboard })
    refetch()
  }

  const deleteAccount = async () => {
    await authClient.deleteUser()
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
        <ul className="m-0 flex max-w-2xl list-none flex-col gap-2">
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
          <WalletSign
            mode="link"
            onDone={() => void load()}
            onError={setError}
          />
        </div>
        {error && (
          <p role="alert" className="m-0 text-error dark:text-red-400">
            {error}
          </p>
        )}
      </section>

      {/* Label and description stacked; the switch centred beside both */}
      <Field
        orientation="horizontal"
        className="max-w-2xl justify-between gap-4 rounded-lg border border-border px-4 py-3 has-[>[data-slot=field-content]]:items-center"
      >
        <FieldContent>
          <FieldLabel
            htmlFor={leaderboardId}
            className="cursor-pointer text-base font-normal"
          >
            {t("account-leaderboard-label")}
          </FieldLabel>
          <FieldDescription id={`${leaderboardId}-description`}>
            {t("account-leaderboard-hint-profile")}
          </FieldDescription>
        </FieldContent>
        <Switch
          id={leaderboardId}
          aria-describedby={`${leaderboardId}-description`}
          checked={user?.showOnLeaderboard !== false}
          onCheckedChange={setLeaderboard}
          className="shrink-0"
        />
      </Field>

      <section data-flow="skip" className="flex flex-wrap items-center gap-3">
        <Button
          variant="outline"
          isSecondary
          onClick={async () => {
            await authClient.signOut()
            refetch()
          }}
        >
          {t("account-sign-out")}
        </Button>
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

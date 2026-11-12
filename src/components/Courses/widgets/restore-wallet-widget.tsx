"use client"

import { useState } from "react"
import {
  Check,
  NotebookPen,
  RotateCcw,
  Smartphone,
  TriangleAlert,
  Wallet,
  Waves,
} from "lucide-react"
import { useLocale, useTranslations } from "next-intl"

import { Button } from "@/components/ui/buttons/Button"

import { cn } from "@/lib/utils/cn"
import { numberFormat } from "@/lib/utils/numbers"

import { chunkyButton, chunkyButtonSecondary, chunkyTile } from "../theme"

import type { WidgetProps } from "./types"
import WidgetShell from "./widget-shell"

// Loaded on demand: keeps the key derivation code out of every other lesson
const loadAccounts = () => import("viem/accounts")

const addressOf = async (words: string[]) =>
  (await loadAccounts()).mnemonicToAccount(words.join(" ")).address

/**
 * The phrase's last bits are a checksum of the rest, and real wallets reject
 * a phrase that fails it, so a changed word must keep it valid to be honest.
 */
const isValidPhrase = async (words: string[], list: readonly string[]) => {
  const bits = words
    .map((word) => list.indexOf(word).toString(2).padStart(11, "0"))
    .join("")
  const entropyBits = (bits.length * 32) / 33
  const entropy = new Uint8Array(entropyBits / 8)
  entropy.forEach(
    (_, i) => (entropy[i] = parseInt(bits.slice(i * 8, i * 8 + 8), 2))
  )
  const hash = new Uint8Array(await crypto.subtle.digest("SHA-256", entropy))
  const checksum = hash[0].toString(2).padStart(8, "0")
  return checksum.startsWith(bits.slice(entropyBits))
}

/** A different word at `at` that still makes a valid phrase */
const swapWord = async (words: string[], at: number) => {
  const { english } = await loadAccounts()
  const start = english.indexOf(words[at])
  for (let step = 1; step < english.length; step++) {
    const candidate = english[(start + step * 97) % english.length]
    const next = words.map((word, i) => (i === at ? candidate : word))
    if (await isValidPhrase(next, english)) return next
  }
  return words
}

const shuffle = <T,>(items: T[]) => {
  const copy = [...items]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

interface DemoWallet {
  phrase: string[]
  address: string
  /** Positions in `phrase`, shuffled, for the word bank */
  bank: number[]
}

interface Restored {
  words: string[]
  address: string
  /** Index of the word the learner changed, if any */
  changedAt?: number
}

const Address = ({ value }: { value: string }) => (
  <span dir="ltr" className="font-mono text-sm break-all">
    {value}
  </span>
)

/**
 * Set up a wallet, lose the phone, copy the paper phrase into a new wallet
 * and get the same address back; then change one word and get another.
 */
const RestoreWalletWidget = ({ onComplete }: WidgetProps) => {
  const t = useTranslations("page-courses")
  const int = numberFormat(useLocale())
  const [wallet, setWallet] = useState<DemoWallet | null>(null)
  const [lost, setLost] = useState(false)
  const [typed, setTyped] = useState<number[]>([])
  const [restored, setRestored] = useState<Restored | null>(null)
  const [busy, setBusy] = useState(false)
  const [status, setStatus] = useState("")

  const run = async (task: () => Promise<void>) => {
    setBusy(true)
    try {
      await task()
    } finally {
      setBusy(false)
    }
  }

  const setUp = () =>
    run(async () => {
      const { generateMnemonic, english } = await loadAccounts()
      const phrase = generateMnemonic(english).split(" ")
      setWallet({
        phrase,
        address: await addressOf(phrase),
        bank: shuffle(phrase.map((_, i) => i)),
      })
      setStatus(t("page-courses-widget-restore-ready"))
    })

  const lose = () => {
    setLost(true)
    setStatus(t("page-courses-widget-restore-lost"))
  }

  const copy = (index: number) => {
    if (!wallet) return
    const word = wallet.phrase[index]
    // Repeated words are interchangeable, so compare the word, not its slot
    if (word !== wallet.phrase[typed.length])
      return setStatus(t("page-courses-widget-restore-miss", { word }))
    setTyped([...typed, index])
    setStatus(t("page-courses-widget-restore-copied", { word }))
  }

  const restore = () =>
    run(async () => {
      if (!wallet) return
      setRestored({
        words: wallet.phrase,
        address: await addressOf(wallet.phrase),
      })
      setStatus(t("page-courses-widget-restore-same"))
    })

  const change = (at: number) =>
    run(async () => {
      if (!wallet) return
      const words = await swapWord(wallet.phrase, at)
      setRestored({ words, address: await addressOf(words), changedAt: at })
      setStatus(t("page-courses-widget-restore-different"))
      onComplete()
    })

  const fix = () =>
    run(async () => {
      if (!wallet) return
      setRestored({ words: wallet.phrase, address: wallet.address })
      setStatus(t("page-courses-widget-restore-same"))
    })

  const same = restored && wallet && restored.address === wallet.address
  const card = "flex flex-col gap-3 rounded-2xl border-2 bg-background p-3"
  const heading = "m-0 flex items-center gap-2 text-md font-bold"

  if (!wallet)
    return (
      <WidgetShell>
        <Button
          variant="ghost"
          onClick={setUp}
          disabled={busy}
          className={cn(chunkyButton, "self-start")}
        >
          <Wallet />
          {t("page-courses-widget-restore-setup")}
        </Button>
        <p className="m-0 text-sm text-body-medium">
          {t("page-courses-widget-restore-disclaimer")}
        </p>
      </WidgetShell>
    )

  return (
    <WidgetShell>
      <section className={cn(card, "border-border")}>
        <h3 className={heading}>
          <NotebookPen className="size-5 shrink-0" aria-hidden />
          {t("page-courses-widget-restore-paper")}
        </h3>
        <ol className="m-0 grid list-none grid-cols-2 gap-x-4 gap-y-1 font-mono text-sm sm:grid-cols-3">
          {wallet.phrase.map((word, i) => (
            <li key={i} className="m-0 flex gap-2">
              <span className="text-body-medium" aria-hidden>
                {int.format(i + 1)}
              </span>
              {word}
            </li>
          ))}
        </ol>
      </section>

      <section
        className={cn(
          card,
          lost ? "border-dashed border-border" : "border-border"
        )}
      >
        <h3 className={heading}>
          {lost ? (
            <Waves className="size-5 shrink-0" aria-hidden />
          ) : (
            <Smartphone className="size-5 shrink-0" aria-hidden />
          )}
          {t("page-courses-widget-restore-old")}
        </h3>
        {lost ? (
          <p className="m-0 text-body-medium">
            {t("page-courses-widget-restore-gone")}
          </p>
        ) : (
          <>
            <p className="m-0 flex flex-col gap-1">
              <span className="font-bold">
                {t("page-courses-widget-restore-address")}
              </span>
              <Address value={wallet.address} />
            </p>
            <Button
              variant="ghost"
              onClick={lose}
              className={cn(chunkyButton, "self-start")}
            >
              <Waves />
              {t("page-courses-widget-restore-lose")}
            </Button>
          </>
        )}
      </section>

      {lost && (
        <section className={cn(card, "border-(--course)")}>
          <h3 className={heading}>
            <Smartphone className="size-5 shrink-0" aria-hidden />
            {t("page-courses-widget-restore-new")}
          </h3>

          <ol className="m-0 grid list-none grid-cols-2 gap-2 sm:grid-cols-3">
            {wallet.phrase.map((_, i) => {
              const word = restored
                ? restored.words[i]
                : typed[i] !== undefined
                  ? wallet.phrase[typed[i]]
                  : undefined
              const changed = restored?.changedAt === i
              return (
                <li key={i} className="m-0">
                  {restored ? (
                    <button
                      type="button"
                      disabled={busy}
                      onClick={() => change(i)}
                      aria-label={t("page-courses-widget-restore-change", {
                        word: word ?? "",
                      })}
                      className={cn(
                        chunkyTile,
                        "flex min-h-11 w-full items-center px-2 font-mono text-sm focus-visible:outline-4 focus-visible:outline-(--course-soft)",
                        changed &&
                          "border-warning-border bg-warning-light dark:bg-warning-dark"
                      )}
                    >
                      <span className="me-2 text-body-medium" aria-hidden>
                        {int.format(i + 1)}
                      </span>
                      {word}
                    </button>
                  ) : (
                    <span
                      className={cn(
                        "flex min-h-11 items-center rounded-2xl border-2 px-2 font-mono text-sm",
                        word
                          ? "border-(--course) bg-(--course-softer)"
                          : "border-dashed border-border"
                      )}
                    >
                      <span className="me-2 text-body-medium" aria-hidden>
                        {int.format(i + 1)}
                      </span>
                      {word}
                    </span>
                  )}
                </li>
              )
            })}
          </ol>

          {!restored && typed.length < wallet.phrase.length && (
            <div className="flex flex-col gap-2">
              <p className="m-0 text-body-medium">
                {t("page-courses-widget-restore-bank")}
              </p>
              <ul className="m-0 flex list-none flex-wrap gap-2">
                {wallet.bank
                  .filter((index) => !typed.includes(index))
                  .map((index) => (
                    <li key={index} className="m-0">
                      <button
                        type="button"
                        onClick={() => copy(index)}
                        className={cn(
                          chunkyTile,
                          "min-h-11 px-3 font-mono text-sm focus-visible:outline-4 focus-visible:outline-(--course-soft)"
                        )}
                      >
                        {wallet.phrase[index]}
                      </button>
                    </li>
                  ))}
              </ul>
            </div>
          )}

          {!restored && typed.length === wallet.phrase.length && (
            <Button
              variant="ghost"
              onClick={restore}
              disabled={busy}
              className={cn(chunkyButton, "self-start")}
            >
              <RotateCcw />
              {t("page-courses-widget-restore-go")}
            </Button>
          )}

          {restored && (
            <>
              <p className="m-0 flex flex-col gap-1">
                <span className="font-bold">
                  {t("page-courses-widget-restore-address")}
                </span>
                <Address value={restored.address} />
              </p>
              <p
                className={cn(
                  "m-0 flex items-start gap-2 font-bold",
                  same
                    ? "text-green-700 dark:text-green-400"
                    : "text-error dark:text-red-400"
                )}
              >
                {same ? (
                  <Check className="mt-0.5 size-5 shrink-0" aria-hidden />
                ) : (
                  <TriangleAlert
                    className="mt-0.5 size-5 shrink-0"
                    aria-hidden
                  />
                )}
                {same
                  ? t("page-courses-widget-restore-match")
                  : t("page-courses-widget-restore-mismatch")}
              </p>
              {restored.changedAt === undefined ? (
                <p className="m-0 text-body-medium">
                  {t("page-courses-widget-restore-tip")}
                </p>
              ) : (
                <Button
                  variant="ghost"
                  onClick={fix}
                  disabled={busy}
                  className={cn(chunkyButtonSecondary, "self-start")}
                >
                  <RotateCcw />
                  {t("page-courses-widget-restore-fix")}
                </Button>
              )}
            </>
          )}
        </section>
      )}

      <p role="status" className="m-0 min-h-6">
        {status}
      </p>

      <p className="m-0 text-sm text-body-medium">
        {t("page-courses-widget-restore-disclaimer")}
      </p>
    </WidgetShell>
  )
}

export default RestoreWalletWidget

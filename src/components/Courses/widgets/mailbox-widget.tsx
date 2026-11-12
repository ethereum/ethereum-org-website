"use client"

import { useEffect, useRef, useState } from "react"
import { Coins, KeyRound, Lock, LockOpen, Mailbox } from "lucide-react"
import { useTranslations } from "next-intl"

import { Button } from "@/components/ui/buttons/Button"

import { cn } from "@/lib/utils/cn"

import { chunkyButtonSecondary, chunkyTile, courseText } from "../theme"

import DraggableTile from "./draggable-tile"
import type { WidgetProps } from "./types"
import WidgetShell from "./widget-shell"

const SENDERS = ["neighbor", "friend", "shop"] as const
type Sender = (typeof SENDERS)[number]

// The learner's own key sits in the middle so it isn't the obvious first pick
const KEYS = ["neighbor", "yours", "stranger"] as const
type KeyId = (typeof KEYS)[number]

const SLOT = "slot"
const LOCK = "lock"

type Outcome =
  | { kind: "start" }
  | { kind: "posted" }
  | { kind: "letter-in-lock" }
  | { kind: "key-in-slot" }
  | { kind: "wrong"; key: KeyId }
  | { kind: "opened" }
  | { kind: "relocked" }

/**
 * The learner's own glass-door mailbox, before addresses and keys are named:
 * anyone can drop a payment in and see what's inside (addresses are public),
 * only the owner's key opens the door to spend it. Payments and keys drag
 * onto the slot and lock; tapping does the same.
 */
const MailboxWidget = ({ onComplete }: WidgetProps) => {
  const t = useTranslations("page-courses")
  const [posted, setPosted] = useState<Sender[]>([])
  const [open, setOpen] = useState(false)
  const [hover, setHover] = useState<string | null>(null)
  const [outcome, setOutcome] = useState<Outcome>({ kind: "start" })
  const [seen, setSeen] = useState({ posted: false, opened: false })
  const [done, setDone] = useState(false)
  // Focus target after a tile or button leaves the page, so keyboard users
  // aren't dropped at the top of the document
  const [refocus, setRefocus] = useState(false)
  const paymentsRef = useRef<HTMLUListElement>(null)
  const statusRef = useRef<HTMLParagraphElement>(null)

  // Wrong keys are optional: posting a payment and opening the door is enough
  useEffect(() => {
    if (!done && seen.posted && seen.opened) {
      setDone(true)
      onComplete()
    }
  }, [done, seen, onComplete])

  useEffect(() => {
    if (!refocus) return
    setRefocus(false)
    const next = paymentsRef.current?.querySelector("button")
    ;(next ?? statusRef.current)?.focus()
  }, [refocus])

  const senderName = (id: Sender) =>
    t(`page-courses-widget-mailbox-sender-${id}`)
  const keyName = (id: KeyId) => t(`page-courses-widget-mailbox-key-${id}`)

  const post = (sender: Sender, target = SLOT) => {
    if (target === LOCK) return setOutcome({ kind: "letter-in-lock" })
    if (target !== SLOT) return
    setPosted((list) => [...list, sender])
    setOutcome({ kind: "posted" })
    setSeen((s) => ({ ...s, posted: true }))
    setRefocus(true)
  }

  const tryKey = (key: KeyId, target = LOCK) => {
    if (target === SLOT) return setOutcome({ kind: "key-in-slot" })
    if (target !== LOCK || open) return
    if (key !== "yours") return setOutcome({ kind: "wrong", key })
    setOpen(true)
    setOutcome({ kind: "opened" })
    setSeen((s) => ({ ...s, opened: true }))
  }

  const relock = () => {
    setOpen(false)
    setOutcome({ kind: "relocked" })
    statusRef.current?.focus()
  }

  const status = (() => {
    switch (outcome.kind) {
      case "start":
        return t("page-courses-widget-mailbox-start")
      case "posted":
        return t("page-courses-widget-mailbox-posted")
      case "letter-in-lock":
        return t("page-courses-widget-mailbox-letter-in-lock")
      case "key-in-slot":
        return t("page-courses-widget-mailbox-key-in-slot")
      case "wrong":
        return t("page-courses-widget-mailbox-wrong", {
          key: keyName(outcome.key),
        })
      case "opened":
        return t("page-courses-widget-mailbox-opened")
      case "relocked":
        return t("page-courses-widget-mailbox-relocked")
    }
  })()

  const waiting = SENDERS.filter((sender) => !posted.includes(sender))
  const State = open ? LockOpen : Lock

  const tile = cn(
    chunkyTile,
    "flex min-h-12 items-center gap-2 px-3 py-2 text-start text-md font-semibold text-body focus-visible:outline-4 focus-visible:outline-(--course-soft)",
    "aria-disabled:cursor-default aria-disabled:opacity-60 aria-disabled:active:translate-y-0 aria-disabled:active:border-b-4"
  )
  const zone = (id: string) =>
    cn(
      "flex min-h-14 flex-1 items-center gap-2 rounded-xl border-2 border-dashed border-(--course) bg-(--course-softer) px-3 py-2 text-sm font-bold transition-shadow",
      hover === id && "ring-4 ring-(--course-soft)"
    )

  return (
    <WidgetShell>
      <div className="flex flex-col gap-3 rounded-2xl border-2 border-b-[6px] border-(--course) bg-background p-4">
        <div className="flex flex-wrap items-center gap-3">
          <Mailbox className={cn("size-12 shrink-0", courseText)} aria-hidden />
          <div className="flex flex-col gap-1">
            <span className="font-bold">
              {t("page-courses-widget-mailbox-yours")}
            </span>
            <span className="flex items-center gap-1.5 text-body-medium">
              <State className="size-4 shrink-0" aria-hidden />
              {t(
                open
                  ? "page-courses-widget-mailbox-open"
                  : "page-courses-widget-mailbox-locked"
              )}
              {" · "}
              {t("page-courses-widget-mailbox-letters", {
                count: posted.length,
              })}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <div data-drop-target={SLOT} className={zone(SLOT)}>
            <Coins className={cn("size-5 shrink-0", courseText)} aria-hidden />
            {t("page-courses-widget-mailbox-slot")}
          </div>
          <div data-drop-target={LOCK} className={zone(LOCK)}>
            <State className={cn("size-5 shrink-0", courseText)} aria-hidden />
            {t("page-courses-widget-mailbox-lock-zone")}
          </div>
        </div>

        {/* Glass door: what's inside shows whether or not it's open */}
        {posted.length > 0 && (
          <div className="flex flex-col gap-2">
            <h3 className="m-0 text-sm font-bold text-body-medium">
              {t("page-courses-widget-mailbox-inside")}
            </h3>
            <ul className="m-0 flex list-none flex-wrap gap-2">
              {posted.map((sender) => (
                <li
                  key={sender}
                  className="m-0 flex items-center gap-1.5 rounded-lg bg-(--course-softer) px-2 py-1 text-sm whitespace-nowrap"
                >
                  <Coins className={cn("size-4", courseText)} aria-hidden />
                  {senderName(sender)}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="m-0 text-md font-bold">
          {t("page-courses-widget-mailbox-letters-title")}
        </h3>
        {waiting.length ? (
          <ul ref={paymentsRef} className="m-0 flex list-none flex-wrap gap-2">
            {waiting.map((sender) => (
              <li key={sender} className="m-0">
                <DraggableTile
                  onClick={() => post(sender)}
                  onPlace={(target) => post(sender, target)}
                  onHover={setHover}
                  className={tile}
                >
                  <Coins
                    className={cn("size-5 shrink-0", courseText)}
                    aria-hidden
                  />
                  {senderName(sender)}
                  <span className="sr-only">
                    {t("page-courses-widget-mailbox-post-hint")}
                  </span>
                </DraggableTile>
              </li>
            ))}
          </ul>
        ) : (
          <p className="m-0 text-body-medium">
            {t("page-courses-widget-mailbox-all-posted")}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="m-0 text-md font-bold">
          {t("page-courses-widget-mailbox-keys")}
        </h3>
        {/* aria-disabled, not disabled, so a focused key keeps focus on open */}
        <ul className="m-0 flex list-none flex-wrap gap-2">
          {KEYS.map((key) => (
            <li key={key} className="m-0">
              <DraggableTile
                aria-disabled={open}
                onClick={() => tryKey(key)}
                onPlace={(target) => tryKey(key, target)}
                onHover={setHover}
                className={tile}
              >
                <KeyRound
                  className={cn("size-5 shrink-0", courseText)}
                  aria-hidden
                />
                {keyName(key)}
                <span className="sr-only">
                  {t("page-courses-widget-mailbox-key-hint")}
                </span>
              </DraggableTile>
            </li>
          ))}
          {open && (
            <li className="m-0">
              <Button
                variant="ghost"
                onClick={relock}
                className={chunkyButtonSecondary}
              >
                <Lock />
                {t("page-courses-widget-mailbox-lock")}
              </Button>
            </li>
          )}
        </ul>
      </div>

      <p
        ref={statusRef}
        tabIndex={-1}
        role="status"
        className={cn(
          "m-0 min-h-6",
          (outcome.kind === "wrong" ||
            outcome.kind === "letter-in-lock" ||
            outcome.kind === "key-in-slot") &&
            "text-error dark:text-red-400",
          outcome.kind === "opened" && "text-green-700 dark:text-green-400"
        )}
      >
        {status}
      </p>
    </WidgetShell>
  )
}

export default MailboxWidget

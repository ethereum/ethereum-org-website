"use client"

import { type ReactNode, useEffect, useId, useState } from "react"
import {
  ArrowDown,
  Globe,
  KeyRound,
  Laptop,
  PenLine,
  Send,
  ShieldAlert,
  ShieldCheck,
  Undo2,
  UserX,
  WifiOff,
} from "lucide-react"
import { motion, useReducedMotion } from "motion/react"
import { useTranslations } from "next-intl"

import { Button } from "@/components/ui/buttons/Button"
import Input from "@/components/ui/input"

import { cn } from "@/lib/utils/cn"

import { chunkyButton, chunkyButtonSecondary, courseText } from "../theme"

import type { WidgetProps } from "./types"
import WidgetShell from "./widget-shell"

type Hex = `0x${string}`

interface Packet {
  address: Hex
  message: string
  signature: Hex
}

/** Who the received signature points to: an address, or none at all */
type Check = { address: Hex } | { broken: true }

const short = (hex: string, head = 10, tail = 8) =>
  hex.length > head + tail ? `${hex.slice(0, head)}…${hex.slice(-tail)}` : hex

// Loaded with the step, so signing and checking never wait on the network
const loadViem = () => Promise.all([import("viem/accounts"), import("viem")])

/** Swap one random hex digit of the signature (never the `0x`) for another */
const tamper = (signature: Hex): Hex => {
  const at = 2 + Math.floor(Math.random() * (signature.length - 2))
  const digit =
    (parseInt(signature[at], 16) + 1 + Math.floor(Math.random() * 15)) % 16
  return `${signature.slice(0, at)}${digit.toString(16)}${signature.slice(at + 1)}` as Hex
}

/** The received signature in full, with digits that differ from the original marked */
const SignatureDiff = ({
  original,
  received,
}: {
  original: Hex
  received: Hex
}) => {
  // A whole new signature differs almost everywhere; marking it all says nothing
  const diff = [...received].filter((c, i) => c !== original[i]).length
  const mark = diff > 0 && diff <= 8
  return (
    <code dir="ltr" className="text-sm break-all">
      {mark
        ? [...received].map((c, i) =>
            c === original[i] ? (
              c
            ) : (
              <mark
                key={i}
                className="rounded-sm bg-error px-px font-bold text-white"
              >
                {c}
              </mark>
            )
          )
        : received}
    </code>
  )
}

const Zone = ({
  icon: Icon,
  title,
  badge,
  children,
}: {
  icon: typeof Laptop
  title: string
  badge: ReactNode
  children: ReactNode
}) => (
  <section className="flex flex-col gap-3 rounded-2xl border-2 border-border bg-background p-4">
    <header className="flex items-center justify-between gap-2">
      <h3 className="m-0 flex items-center gap-2 text-base font-bold">
        <Icon className={cn("size-5 shrink-0", courseText)} aria-hidden />
        {title}
      </h3>
      <span className="flex items-center gap-1.5 rounded-full bg-background-highlight px-2.5 py-0.5 text-xs font-bold tracking-wide text-body-medium uppercase">
        {badge}
      </span>
    </header>
    {children}
  </section>
)

const Row = ({
  label,
  children,
  className,
}: {
  label: string
  children: ReactNode
  className?: string
}) => (
  <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-sm">
    <span className={cn("font-bold text-body-medium", className)}>{label}</span>
    <code dir="ltr" className="break-all">
      {children}
    </code>
  </div>
)

const SignVerifyWidget = ({ onComplete }: WidgetProps) => {
  const t = useTranslations("page-courses")
  const reduceMotion = useReducedMotion()
  const messageId = useId()
  const receivedId = useId()

  const [account, setAccount] = useState<{ key: Hex; address: Hex } | null>(
    null
  )
  const [message, setMessage] = useState(
    t("page-courses-widget-sign-message-default")
  )
  const [signed, setSigned] = useState<Packet | null>(null)
  const [sent, setSent] = useState(false)
  // What arrived online; the attacker edits this copy, never the original
  const [received, setReceived] = useState<Packet | null>(null)
  const [check, setCheck] = useState<Check | null>(null)
  const [verified, setVerified] = useState(false)
  const [rejected, setRejected] = useState(false)
  const [done, setDone] = useState(false)

  // Demo key, made in the browser; nothing here is ever sent anywhere
  useEffect(() => {
    let active = true
    loadViem().then(([{ generatePrivateKey, privateKeyToAddress }]) => {
      const key = generatePrivateKey()
      if (active) setAccount({ key, address: privateKeyToAddress(key) })
    })
    return () => {
      active = false
    }
  }, [])

  // Checking uses only what was received: message, signature, address
  useEffect(() => {
    if (!received) return
    let active = true
    loadViem()
      .then(([, { recoverMessageAddress }]) =>
        recoverMessageAddress({
          message: received.message,
          signature: received.signature,
        })
      )
      .then(
        (address) => active && setCheck({ address }),
        () => active && setCheck({ broken: true })
      )
    return () => {
      active = false
    }
  }, [received])

  const valid =
    !!check &&
    !!received &&
    "address" in check &&
    check.address.toLowerCase() === received.address.toLowerCase()

  useEffect(() => {
    if (!check) return
    if (valid) setVerified(true)
    else setRejected(true)
  }, [check, valid])

  useEffect(() => {
    if (verified && rejected && !done) {
      setDone(true)
      onComplete()
    }
  }, [verified, rejected, done, onComplete])

  const sign = async () => {
    if (!account) return
    const [{ privateKeyToAccount }] = await loadViem()
    const signature = await privateKeyToAccount(account.key).signMessage({
      message,
    })
    setSigned({ address: account.address, message, signature })
  }

  const send = () => {
    if (!signed) return
    setSent(true)
    setCheck(null)
    setReceived(signed)
  }

  const forge = async () => {
    if (!received) return
    const [{ generatePrivateKey, privateKeyToAccount }] = await loadViem()
    const signature = await privateKeyToAccount(
      generatePrivateKey()
    ).signMessage({ message: received.message })
    setReceived({ ...received, signature })
  }

  const edit = (next: Partial<Packet>) => {
    if (received) setReceived({ ...received, ...next })
  }

  const changed =
    !!received &&
    !!signed &&
    (received.message !== signed.message ||
      received.signature !== signed.signature)

  const appear = {
    initial: reduceMotion ? false : { opacity: 0, y: -16 },
    animate: { opacity: 1, y: 0 },
  } as const

  return (
    <WidgetShell>
      <Zone
        icon={Laptop}
        title={t("page-courses-widget-sign-device")}
        badge={
          <>
            <WifiOff className="size-3.5" aria-hidden />
            {t("page-courses-widget-sign-offline")}
          </>
        }
      >
        <div className="flex flex-col gap-1 rounded-xl border-2 border-dashed border-error/60 p-3 text-sm">
          <span className="flex items-center gap-2 font-bold text-error dark:text-red-400">
            <KeyRound className="size-4 shrink-0" aria-hidden />
            {t("page-courses-widget-sign-key")}
          </span>
          <code dir="ltr" className="break-all">
            {account ? short(account.key, 12, 10) : "…"}
          </code>
          <span className="text-body-medium">
            {t("page-courses-widget-sign-key-stays")}
          </span>
        </div>
        <Row label={t("page-courses-widget-sign-signer")}>
          {account ? short(account.address, 8, 6) : "…"}
        </Row>
        <label htmlFor={messageId} className="text-sm font-bold">
          {t("page-courses-widget-sign-message-label")}
        </label>
        <Input
          id={messageId}
          value={message}
          disabled={!!signed}
          onChange={(e) => setMessage(e.target.value)}
        />
        {!signed ? (
          <Button
            variant="ghost"
            onClick={sign}
            disabled={!account || !message}
            className={chunkyButton}
          >
            <PenLine />
            {t("page-courses-widget-sign-button")}
          </Button>
        ) : (
          <motion.div {...appear} className="flex flex-col gap-3">
            <Row label={t("page-courses-widget-sign-signature")}>
              {short(signed.signature)}
            </Row>
            <p className="m-0 text-sm text-body-medium">
              {t("page-courses-widget-sign-device-note")}
            </p>
            {!sent && (
              <Button variant="ghost" onClick={send} className={chunkyButton}>
                <Send />
                {t("page-courses-widget-sign-send")}
              </Button>
            )}
          </motion.div>
        )}
      </Zone>

      {sent && (
        <motion.p
          {...appear}
          className="m-0 -my-2 flex items-center justify-center gap-2 text-center text-sm font-bold text-body-medium"
        >
          <ArrowDown
            className={cn("size-4 shrink-0", courseText)}
            aria-hidden
          />
          {t("page-courses-widget-sign-crossed")}
        </motion.p>
      )}

      <Zone
        icon={Globe}
        title={t("page-courses-widget-sign-public")}
        badge={t("page-courses-widget-sign-online")}
      >
        {!received ? (
          <p className="m-0 rounded-xl border-2 border-dashed border-border p-4 text-center text-sm text-body-medium">
            {t("page-courses-widget-sign-public-empty")}
          </p>
        ) : (
          <motion.div {...appear} className="flex flex-col gap-3">
            <p className="m-0 text-sm">
              {t("page-courses-widget-sign-public-note")}
            </p>
            <Row label={t("page-courses-widget-sign-claimed")}>
              {short(received.address, 8, 6)}
            </Row>
            <label htmlFor={receivedId} className="text-sm font-bold">
              {t("page-courses-widget-sign-message-label")}
            </label>
            <Input
              id={receivedId}
              value={received.message}
              onChange={(e) => edit({ message: e.target.value })}
            />
            <div className="flex flex-col gap-1">
              <span className="text-sm font-bold text-body-medium">
                {t("page-courses-widget-sign-signature")}
              </span>
              {signed && (
                <SignatureDiff
                  original={signed.signature}
                  received={received.signature}
                />
              )}
            </div>

            <div
              className={cn(
                "flex flex-col gap-2 rounded-xl border-2 p-3 transition-colors",
                !check
                  ? "border-border"
                  : valid
                    ? "border-success bg-success-light dark:bg-success-dark"
                    : "border-error bg-error-light dark:bg-error-dark"
              )}
            >
              <Row label={t("page-courses-widget-sign-recovered")}>
                {!check
                  ? "…"
                  : "address" in check
                    ? short(check.address, 8, 6)
                    : "—"}
              </Row>
              <p
                role="status"
                hidden={!check}
                className={cn(
                  "m-0 flex items-center gap-2 font-bold",
                  valid
                    ? "text-green-700 dark:text-green-400"
                    : "text-error dark:text-red-400"
                )}
              >
                {valid ? (
                  <ShieldCheck className="size-5 shrink-0" aria-hidden />
                ) : (
                  <ShieldAlert className="size-5 shrink-0" aria-hidden />
                )}
                {!check
                  ? null
                  : valid
                    ? t("page-courses-widget-sign-valid")
                    : "broken" in check
                      ? t("page-courses-widget-sign-broken")
                      : t("page-courses-widget-sign-invalid")}
              </p>
            </div>

            <p className="m-0 text-sm font-bold">
              {t("page-courses-widget-sign-attack")}
            </p>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="ghost"
                onClick={() => edit({ signature: tamper(received.signature) })}
                className={chunkyButtonSecondary}
              >
                <PenLine />
                {t("page-courses-widget-sign-tamper")}
              </Button>
              <Button
                variant="ghost"
                onClick={forge}
                className={chunkyButtonSecondary}
              >
                <UserX />
                {t("page-courses-widget-sign-forge")}
              </Button>
              {changed && (
                <Button
                  variant="ghost"
                  onClick={() => setReceived(signed)}
                  className={chunkyButtonSecondary}
                >
                  <Undo2 />
                  {t("page-courses-widget-sign-reset")}
                </Button>
              )}
            </div>
          </motion.div>
        )}
      </Zone>
    </WidgetShell>
  )
}

export default SignVerifyWidget

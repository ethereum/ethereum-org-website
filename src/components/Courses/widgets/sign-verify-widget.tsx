"use client"

import { useEffect, useId, useState } from "react"
import { PenLine, ShieldAlert, ShieldCheck } from "lucide-react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { useTranslations } from "next-intl"

import { Button } from "@/components/ui/buttons/Button"
import Input from "@/components/ui/input"

import { cn } from "@/lib/utils/cn"

import { chunkyButton } from "../theme"

import type { WidgetProps } from "./types"
import WidgetShell from "./widget-shell"

type Hex = `0x${string}`

interface Signed {
  message: string
  signature: Hex
}

const short = (hex: string, head = 10, tail = 8) =>
  hex.length > head + tail ? `${hex.slice(0, head)}…${hex.slice(-tail)}` : hex

const SignVerifyWidget = ({ onComplete }: WidgetProps) => {
  const t = useTranslations("page-courses")
  const reduceMotion = useReducedMotion()
  const messageId = useId()
  const tamperId = useId()

  const [account, setAccount] = useState<{ key: Hex; address: Hex } | null>(
    null
  )
  const [message, setMessage] = useState(
    t("page-courses-widget-sign-message-default")
  )
  const [signed, setSigned] = useState<Signed | null>(null)
  const [received, setReceived] = useState("")
  const [recovered, setRecovered] = useState<Hex | null>(null)
  const [done, setDone] = useState(false)

  // Demo key, created in the browser on first render; viem loads on demand
  useEffect(() => {
    let active = true
    import("viem/accounts").then(
      ({ generatePrivateKey, privateKeyToAddress }) => {
        const key = generatePrivateKey()
        if (active) setAccount({ key, address: privateKeyToAddress(key) })
      }
    )
    return () => {
      active = false
    }
  }, [])

  // Re-verify whenever the received message changes
  useEffect(() => {
    if (!signed) return
    let active = true
    import("viem").then(async ({ recoverMessageAddress }) => {
      const address = await recoverMessageAddress({
        message: received,
        signature: signed.signature,
      })
      if (active) setRecovered(address)
    })
    return () => {
      active = false
    }
  }, [received, signed])

  const valid =
    !!recovered &&
    !!account &&
    recovered.toLowerCase() === account.address.toLowerCase()

  useEffect(() => {
    if (signed && recovered && !valid && received !== signed.message && !done) {
      setDone(true)
      onComplete()
    }
  }, [signed, recovered, valid, received, done, onComplete])

  const sign = async () => {
    if (!account) return
    const { privateKeyToAccount } = await import("viem/accounts")
    const signature = await privateKeyToAccount(account.key).signMessage({
      message,
    })
    setSigned({ message, signature })
    setReceived(message)
    setRecovered(null)
  }

  return (
    <WidgetShell>
      {/* Signer */}
      <div className="flex flex-col gap-3 rounded-2xl bg-background p-4">
        <div className="flex items-center justify-between gap-2 text-sm">
          <span className="font-bold text-body-medium">
            {t("page-courses-widget-sign-signer")}
          </span>
          <code
            dir="ltr"
            className="text-(--course-strong) dark:text-(--course-bright)"
          >
            {account ? short(account.address, 8, 6) : "…"}
          </code>
        </div>
        <label htmlFor={messageId} className="text-sm font-bold">
          {t("page-courses-widget-sign-message-label")}
        </label>
        <Input
          id={messageId}
          value={message}
          disabled={!!signed}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button
          variant="ghost"
          onClick={sign}
          disabled={!account || !!signed || !message}
          className={chunkyButton}
        >
          <PenLine />
          {t("page-courses-widget-sign-button")}
        </Button>
        {signed && (
          <div className="flex items-center justify-between gap-2 text-sm">
            <span className="font-bold text-body-medium">
              {t("page-courses-widget-sign-signature")}
            </span>
            <code dir="ltr">{short(signed.signature)}</code>
          </div>
        )}
      </div>

      {/* Verifier */}
      <AnimatePresence>
        {signed && (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              "flex flex-col gap-3 rounded-2xl border-2 p-4 transition-colors",
              !recovered
                ? "border-border bg-background"
                : valid
                  ? "border-success bg-success-light dark:bg-success-dark"
                  : "border-error bg-error-light dark:bg-error-dark"
            )}
          >
            <p className="m-0 font-bold">
              {t("page-courses-widget-sign-verifier")}
            </p>
            <p className="m-0 text-sm">
              {t("page-courses-widget-sign-verifier-hint")}
            </p>
            <label htmlFor={tamperId} className="sr-only">
              {t("page-courses-widget-sign-message-label")}
            </label>
            <Input
              id={tamperId}
              value={received}
              onChange={(e) => setReceived(e.target.value)}
            />
            <div className="flex items-center justify-between gap-2 text-sm">
              <span className="font-bold">
                {t("page-courses-widget-sign-recovered")}
              </span>
              <code dir="ltr">{recovered ? short(recovered, 8, 6) : "…"}</code>
            </div>
            <p
              role="status"
              hidden={!recovered}
              className={cn(
                "m-0 flex items-center gap-2",
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
              {valid
                ? t("page-courses-widget-sign-valid")
                : t("page-courses-widget-sign-invalid")}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </WidgetShell>
  )
}

export default SignVerifyWidget

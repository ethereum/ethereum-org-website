"use client"

import { useState } from "react"
import { KeyRound, RefreshCw, Shuffle } from "lucide-react"
import { useTranslations } from "next-intl"

import { Button } from "@/components/ui/buttons/Button"

import { chunkyButton, chunkyButtonSecondary } from "../theme"

import type { WidgetProps } from "./types"

interface KeyPair {
  privateKey: `0x${string}`
  address: string
  /** Index of the character changed by the tweak, if any */
  changedAt?: number
}

// Loaded on demand: keeps the secp256k1 code out of every other lesson
const deriveAddress = async (privateKey: `0x${string}`) => {
  const { privateKeyToAddress } = await import("viem/accounts")
  return privateKeyToAddress(privateKey)
}

const KeyPairWidget = ({ onComplete }: WidgetProps) => {
  const t = useTranslations("page-courses")
  const [pair, setPair] = useState<KeyPair | null>(null)

  const generate = async () => {
    const { generatePrivateKey } = await import("viem/accounts")
    const privateKey = generatePrivateKey()
    setPair({ privateKey, address: await deriveAddress(privateKey) })
  }

  const tweak = async () => {
    if (!pair) return
    const at = pair.privateKey.length - 1
    const last = pair.privateKey[at]
    const privateKey = `${pair.privateKey.slice(0, at)}${
      last === "0" ? "1" : "0"
    }` as `0x${string}`
    setPair({
      privateKey,
      address: await deriveAddress(privateKey),
      changedAt: at,
    })
    onComplete()
  }

  return (
    <div className="flex flex-col gap-4 rounded-base bg-background-highlight p-4 md:p-6">
      <div className="flex flex-wrap gap-2">
        <Button
          variant="ghost"
          onClick={generate}
          className={pair ? chunkyButtonSecondary : chunkyButton}
        >
          {pair ? <RefreshCw /> : <KeyRound />}
          {pair
            ? t("page-courses-widget-key-regenerate")
            : t("page-courses-widget-key-generate")}
        </Button>
        {pair && (
          <Button variant="ghost" onClick={tweak} className={chunkyButton}>
            <Shuffle />
            {t("page-courses-widget-key-tweak")}
          </Button>
        )}
      </div>

      {pair && (
        <dl className="m-0 flex flex-col gap-3 font-mono text-sm" dir="ltr">
          <div>
            <dt className="font-sans font-bold text-error dark:text-red-400">
              {t("page-courses-widget-key-private")}
            </dt>
            <dd className="m-0 break-all">
              {pair.changedAt === undefined ? (
                pair.privateKey
              ) : (
                <>
                  {pair.privateKey.slice(0, pair.changedAt)}
                  <mark className="rounded-sm bg-warning px-0.5 text-body">
                    {pair.privateKey[pair.changedAt]}
                  </mark>
                </>
              )}
            </dd>
          </div>
          <div>
            <dt className="font-sans font-bold text-green-700 dark:text-green-400">
              {t("page-courses-widget-key-address")}
            </dt>
            <dd className="m-0 break-all">{pair.address}</dd>
          </div>
        </dl>
      )}

      {pair?.changedAt !== undefined && (
        <p className="m-0" role="status">
          {t("page-courses-widget-key-changed")}
        </p>
      )}

      <p className="m-0 text-sm text-body-medium">
        {t("page-courses-widget-key-disclaimer")}
      </p>
    </div>
  )
}

export default KeyPairWidget

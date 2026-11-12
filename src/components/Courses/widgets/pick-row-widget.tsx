"use client"

import { type ReactNode, useId, useState } from "react"
import {
  AtSign,
  Coins,
  Gamepad2,
  Gift,
  HandCoins,
  ImageIcon,
  ShieldCheck,
  Tag,
  Wallet,
} from "lucide-react"
import { useTranslations } from "next-intl"
import * as RadioGroup from "@radix-ui/react-radio-group"

import { Center } from "@/components/ui/flex"

import { cn } from "@/lib/utils/cn"

import {
  chunkyTile,
  courseText,
  pickedMarker,
  pickedTile,
  type PickResult,
} from "../theme"

import type { WidgetProps } from "./types"
import WidgetShell from "./widget-shell"

/**
 * One-pick puzzle over a list of rows: the address-check pattern with a
 * custom header and row body. Strings under `page-courses-widget-{name}-`:
 * `-list` (the list label), `-hint-{row}` for every wrong row, `-hit`.
 */
const PickRows = ({
  name,
  rows,
  answer,
  header,
  renderRow,
  onAnswer,
  locked,
  wrong,
}: WidgetProps & {
  name: string
  rows: readonly string[]
  answer: string
  header: ReactNode
  renderRow: (id: string) => ReactNode
}) => {
  const t = useTranslations("page-courses")
  const listLabelId = useId()
  const [picked, setPicked] = useState("")

  const resultFor = (id: string): PickResult | undefined => {
    if (id !== picked) return undefined
    if (locked) return "correct"
    return wrong ? "incorrect" : undefined
  }

  const pick = (id: string) => {
    setPicked(id)
    onAnswer({
      correct: id === answer,
      hint:
        id === answer ? undefined : t(`page-courses-widget-${name}-hint-${id}`),
    })
  }

  return (
    <WidgetShell>
      {header}
      <div className="flex flex-col gap-3">
        <p
          id={listLabelId}
          className="m-0 text-sm font-bold tracking-wide text-body-medium uppercase"
        >
          {t(`page-courses-widget-${name}-list`)}
        </p>
        <RadioGroup.Root
          aria-labelledby={listLabelId}
          className="flex flex-col gap-3"
          value={picked}
          disabled={locked}
          onValueChange={pick}
        >
          {rows.map((id, idx) => (
            <RadioGroup.Item
              key={id}
              value={id}
              className={cn(
                chunkyTile,
                "group/option flex w-full cursor-pointer items-center gap-3 p-3 text-start focus-visible:outline-4 focus-visible:outline-(--course-soft)",
                pickedTile,
                "disabled:cursor-default disabled:active:translate-y-0 disabled:active:border-b-4"
              )}
              data-result={resultFor(id)}
            >
              <Center
                aria-hidden
                className={cn(
                  "size-8 shrink-0 rounded-full",
                  pickedMarker(resultFor(id))
                )}
              >
                {String.fromCharCode(65 + idx)}
              </Center>
              <span className="flex min-w-0 flex-1 flex-col gap-1">
                {renderRow(id)}
              </span>
            </RadioGroup.Item>
          ))}
        </RadioGroup.Root>
      </div>
      {locked && (
        <p role="status" className="m-0 text-green-700 dark:text-green-400">
          {t(`page-courses-widget-${name}-hit`)}
        </p>
      )}
    </WidgetShell>
  )
}

/** A labelled reference card above the list */
const Reference = ({
  icon,
  label,
  children,
}: {
  icon: ReactNode
  label: string
  children: ReactNode
}) => (
  <div className="flex flex-col gap-1">
    <p className="m-0 flex items-center gap-2 font-bold">
      {icon}
      {label}
    </p>
    <div className="m-0 rounded-2xl bg-background p-3">{children}</div>
  </div>
)

const Hex = ({ children }: { children: string }) => (
  <span className="font-mono text-sm break-all">
    <span dir="ltr">{children}</span>
  </span>
)

const iconClass = cn("size-5 shrink-0", courseText)

/*
 * Tokens: four tokens with one name and picture; only the contract address
 * tells them apart. One fake copies the address's start and end, as a
 * reminder to check all of it. Fixed so server and client render the same.
 */
const TOKEN_ADDRESS = "0x5c1e8a3f72b94d06e1a7c3b58f2d9e04a6b1c7d2"
const TOKENS: Record<string, string> = {
  name: "0x9f03b6d1e7c24a58b0e3f1a96c7d2b45e8a0f13c",
  official: "0x2d7ae0c94b1f68d3a5e2c07b91f4d6a8e3c5b290",
  real: TOKEN_ADDRESS,
  lookalike: "0x5c1e4b90d2a7f3e18c6b05d7a2e9f1c3b84dc7d2",
}

/** Tokens course: pick the real token by its contract address */
export const TokenCheckWidget = (props: WidgetProps) => {
  const t = useTranslations("page-courses")
  return (
    <PickRows
      {...props}
      name="token-check"
      rows={Object.keys(TOKENS)}
      answer="real"
      header={
        <Reference
          icon={<ShieldCheck className={iconClass} aria-hidden />}
          label={t("page-courses-widget-token-check-official")}
        >
          <Hex>{TOKEN_ADDRESS}</Hex>
        </Reference>
      }
      renderRow={(id) => (
        <>
          <span className="flex items-center gap-2 font-bold">
            <Coins className={iconClass} aria-hidden />
            {t(
              id === "official"
                ? "page-courses-widget-token-check-name-official"
                : "page-courses-widget-token-check-name"
            )}
          </span>
          <span className="text-sm text-body-medium">
            {t("page-courses-widget-token-check-contract")}
          </span>
          <Hex>{TOKENS[id]}</Hex>
        </>
      )}
    />
  )
}

const LURE_ICONS = {
  eth: Wallet,
  stable: HandCoins,
  game: Gamepad2,
  lure: Gift,
} as const

/** Tokens course: spot the surprise token that's there as bait */
export const TokenLureWidget = (props: WidgetProps) => {
  const t = useTranslations("page-courses")
  return (
    <PickRows
      {...props}
      name="token-lure"
      rows={Object.keys(LURE_ICONS)}
      answer="lure"
      header={
        <p className="m-0 flex items-center gap-2 text-xl font-bold">
          <Wallet className={iconClass} aria-hidden />
          {t("page-courses-widget-token-lure-wallet")}
        </p>
      }
      renderRow={(id) => {
        const Icon = LURE_ICONS[id as keyof typeof LURE_ICONS]
        return (
          <>
            <span className="flex items-start gap-2 font-bold break-words">
              <Icon className={cn(iconClass, "mt-0.5")} aria-hidden />
              {t(`page-courses-widget-token-lure-name-${id}`)}
            </span>
            <span className="text-sm text-body-medium">
              {t(`page-courses-widget-token-lure-from-${id}`)}
            </span>
          </>
        )
      }}
    />
  )
}

const PROOF_ROWS = [
  "name",
  "picture",
  "creator",
  "number",
  "collection",
] as const
const COLLECTION_ADDRESS = "0x3e8b1c7a05d94f26b8e0a7c31d5f92e46b0a8c17"

/** NFTs course: tap the one detail that proves an NFT is from the original */
export const NftProofWidget = (props: WidgetProps) => {
  const t = useTranslations("page-courses")
  return (
    <PickRows
      {...props}
      name="nft-proof"
      rows={PROOF_ROWS}
      answer="collection"
      header={
        <p className="m-0 flex items-center gap-2 text-xl font-bold">
          <Tag className={iconClass} aria-hidden />
          {t("page-courses-widget-nft-proof-title")}
        </p>
      }
      renderRow={(id) => (
        <>
          <span className="text-sm font-bold text-body-medium">
            {t(`page-courses-widget-nft-proof-field-${id}`)}
          </span>
          {id === "collection" ? (
            <Hex>{COLLECTION_ADDRESS}</Hex>
          ) : id === "picture" ? (
            <span className="flex items-center gap-2">
              <ImageIcon className={iconClass} aria-hidden />
              {t("page-courses-widget-nft-proof-value-picture")}
            </span>
          ) : (
            <span>{t(`page-courses-widget-nft-proof-value-${id}`)}</span>
          )}
        </>
      )}
    />
  )
}

/* Look-alike names: a digit for a letter, a doubled letter, an extra dash */
const NAMES: Record<string, string> = {
  digit: "a1ice.eth",
  double: "allice.eth",
  real: "alice.eth",
  dash: "alice-eth.eth",
}

/** NFTs course: pick the exact Ethereum name among look-alikes */
export const NameCheckWidget = (props: WidgetProps) => {
  const t = useTranslations("page-courses")
  return (
    <PickRows
      {...props}
      name="name-check"
      rows={Object.keys(NAMES)}
      answer="real"
      header={
        <Reference
          icon={<AtSign className={iconClass} aria-hidden />}
          label={t("page-courses-widget-name-check-given")}
        >
          <Hex>{NAMES.real}</Hex>
        </Reference>
      }
      renderRow={(id) => <Hex>{NAMES[id]}</Hex>}
    />
  )
}

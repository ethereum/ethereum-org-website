"use client"

import { useId, useState } from "react"
import { Bird, Cat, Store, Tag, TriangleAlert } from "lucide-react"
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

/*
 * The approval-scope idea for NFTs, as a pick: one NFT, the whole
 * collection (approve all), or the recovery phrase (everything). The grid
 * shows what each choice would let the marketplace move.
 */
const SCOPES = ["all", "one", "phrase"] as const
type Scope = (typeof SCOPES)[number]
const ANSWER: Scope = "one"

const NFTS = [
  { id: "cat-1", collection: "cats" },
  { id: "cat-2", collection: "cats" },
  { id: "cat-3", collection: "cats", selling: true },
  { id: "cat-4", collection: "cats" },
  { id: "bird-1", collection: "birds" },
  { id: "bird-2", collection: "birds" },
] as const

const exposed = (scope: Scope | "", nft: (typeof NFTS)[number]) => {
  if (scope === "phrase") return true
  if (scope === "all") return nft.collection === "cats"
  if (scope === "one") return "selling" in nft
  return false
}

const NftApprovalWidget = ({ onAnswer, locked, wrong }: WidgetProps) => {
  const t = useTranslations("page-courses")
  const listLabelId = useId()
  const [picked, setPicked] = useState<Scope | "">("")

  const resultFor = (id: Scope): PickResult | undefined => {
    if (id !== picked) return undefined
    if (locked) return "correct"
    return wrong ? "incorrect" : undefined
  }

  const pick = (id: Scope) => {
    setPicked(id)
    onAnswer({
      correct: id === ANSWER,
      hint:
        id === ANSWER
          ? undefined
          : t(`page-courses-widget-nft-approval-hint-${id}`),
    })
  }

  return (
    <WidgetShell>
      <p className="m-0 flex items-start gap-2 rounded-2xl bg-background p-3 font-bold">
        <Store
          className={cn("mt-0.5 size-5 shrink-0", courseText)}
          aria-hidden
        />
        {t("page-courses-widget-nft-approval-request")}
      </p>

      <div className="flex flex-col gap-3">
        <p
          id={listLabelId}
          className="m-0 text-sm font-bold tracking-wide text-body-medium uppercase"
        >
          {t("page-courses-widget-nft-approval-list")}
        </p>
        <RadioGroup.Root
          aria-labelledby={listLabelId}
          className="flex flex-col gap-3"
          value={picked}
          disabled={locked}
          onValueChange={(id) => pick(id as Scope)}
        >
          {SCOPES.map((id, idx) => (
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
              <span className="min-w-0 flex-1">
                {t(`page-courses-widget-nft-approval-scope-${id}`)}
              </span>
            </RadioGroup.Item>
          ))}
        </RadioGroup.Root>
      </div>

      <div className="flex flex-col gap-2">
        <p className="m-0 text-sm font-bold text-body-medium">
          {t("page-courses-widget-nft-approval-grid")}
        </p>
        <ul className="m-0 grid list-none grid-cols-3 gap-2">
          {NFTS.map((nft) => {
            const Icon = nft.collection === "cats" ? Cat : Bird
            const selling = "selling" in nft
            // The NFT for sale is meant to be movable; anything else is at risk
            const at = exposed(picked, nft) && !selling
            const label = t(`page-courses-widget-nft-approval-nft-${nft.id}`)
            return (
              <li
                key={nft.id}
                className={cn(
                  "m-0 flex flex-col items-center gap-1 rounded-xl border-2 bg-background p-2 text-center text-sm font-bold transition-colors",
                  at
                    ? "border-red-600 bg-error-light dark:border-red-400 dark:bg-error-dark"
                    : selling && picked
                      ? "border-(--course)"
                      : "border-transparent"
                )}
              >
                <Icon
                  className={cn(
                    "size-6",
                    at ? "text-error dark:text-red-400" : courseText
                  )}
                  aria-hidden
                />
                <span>{label}</span>
                {selling && (
                  <span className="flex items-center gap-1 text-body-medium">
                    <Tag className="size-3.5" aria-hidden />
                    {t("page-courses-widget-nft-approval-selling")}
                  </span>
                )}
              </li>
            )
          })}
        </ul>
        {picked === "phrase" && (
          <p className="m-0 flex items-start gap-2 font-bold text-error dark:text-red-400">
            <TriangleAlert className="mt-0.5 size-5 shrink-0" aria-hidden />
            {t("page-courses-widget-nft-approval-everything")}
          </p>
        )}
        <p aria-live="polite" className="sr-only">
          {picked && t(`page-courses-widget-nft-approval-covers-${picked}`)}
        </p>
      </div>

      {locked && (
        <p role="status" className="m-0 text-green-700 dark:text-green-400">
          {t("page-courses-widget-nft-approval-hit")}
        </p>
      )}
    </WidgetShell>
  )
}

export default NftApprovalWidget

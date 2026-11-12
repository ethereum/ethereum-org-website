"use client"

import { Fragment, useId, useState } from "react"
import { useTranslations } from "next-intl"
import * as RadioGroup from "@radix-ui/react-radio-group"

import { Center } from "@/components/ui/flex"

import { cn } from "@/lib/utils/cn"

import { chunkyTile, pickedMarker, pickedTile, type PickResult } from "../theme"

import type { WidgetProps } from "./types"
import WidgetShell from "./widget-shell"

/*
 * Two of the four are delegations, so the learner has to tell the wallet's
 * own upgrade from one a website started. Contract addresses are made up.
 */
const REQUESTS = [
  { id: "wallet", contract: null, allNetworks: false },
  { id: "approval", contract: null, allNetworks: false },
  { id: "website", contract: "0x7a3f…c91e", allNetworks: true },
  { id: "payment", contract: null, allNetworks: false },
] as const

type RequestId = (typeof REQUESTS)[number]["id"]

const DANGEROUS: RequestId = "website"

const FIELDS = ["from", "kind", "does"] as const

const DelegationCheckWidget = ({ onAnswer, locked, wrong }: WidgetProps) => {
  const t = useTranslations("page-courses")
  const listLabelId = useId()
  const [picked, setPicked] = useState<RequestId | "">("")

  const resultFor = (id: RequestId): PickResult | undefined => {
    if (id !== picked) return undefined
    if (locked) return "correct"
    return wrong ? "incorrect" : undefined
  }

  const pick = (id: RequestId) => {
    setPicked(id)
    onAnswer({
      correct: id === DANGEROUS,
      hint:
        id === DANGEROUS
          ? undefined
          : t(`page-courses-widget-delegation-hint-${id}`),
    })
  }

  return (
    <WidgetShell>
      <p
        id={listLabelId}
        className="m-0 text-sm font-bold tracking-wide text-body-medium uppercase"
      >
        {t("page-courses-widget-delegation-list")}
      </p>
      <RadioGroup.Root
        aria-labelledby={listLabelId}
        className="flex flex-col gap-3"
        value={picked}
        disabled={locked}
        onValueChange={(id) => pick(id as RequestId)}
      >
        {REQUESTS.map(({ id, contract, allNetworks }, idx) => (
          <RadioGroup.Item
            key={id}
            value={id}
            className={cn(
              chunkyTile,
              "group/option flex w-full cursor-pointer items-start gap-3 p-3 text-start focus-visible:outline-4 focus-visible:outline-(--course-soft)",
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
            <span className="grid min-w-0 flex-1 grid-cols-1 gap-x-3 gap-y-0.5 sm:grid-cols-[auto_1fr]">
              {FIELDS.map((field) => (
                <Fragment key={field}>
                  <span className="text-sm text-body-medium">
                    {t(`page-courses-widget-delegation-field-${field}`)}
                  </span>
                  <span className="font-semibold">
                    {t(`page-courses-widget-delegation-${id}-${field}`)}
                  </span>
                </Fragment>
              ))}
              {contract && (
                <>
                  <span className="text-sm text-body-medium">
                    {t("page-courses-widget-delegation-field-contract")}
                  </span>
                  <span className="font-semibold">
                    <span dir="ltr" className="font-mono text-sm">
                      {contract}
                    </span>{" "}
                    {t("page-courses-widget-delegation-unknown")}
                  </span>
                </>
              )}
              <span className="text-sm text-body-medium">
                {t("page-courses-widget-delegation-field-networks")}
              </span>
              <span className="font-semibold">
                {t(
                  allNetworks
                    ? "page-courses-widget-delegation-networks-all"
                    : "page-courses-widget-delegation-networks-one"
                )}
              </span>
            </span>
          </RadioGroup.Item>
        ))}
      </RadioGroup.Root>

      {locked && (
        <p role="status" className="m-0 text-green-700 dark:text-green-400">
          {t("page-courses-widget-delegation-hit")}
        </p>
      )}
    </WidgetShell>
  )
}

export default DelegationCheckWidget

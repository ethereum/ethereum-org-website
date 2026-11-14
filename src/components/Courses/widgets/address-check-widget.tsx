"use client"

import { useId, useState } from "react"
import { Eye, EyeOff, UserRound } from "lucide-react"
import { useTranslations } from "next-intl"
import * as RadioGroup from "@radix-ui/react-radio-group"

import { Button } from "@/components/ui/buttons/Button"
import { Center } from "@/components/ui/flex"

import { cn } from "@/lib/utils/cn"

import {
  chunkyButtonSecondary,
  chunkyTile,
  courseText,
  pickedMarker,
  pickedTile,
  type PickResult,
} from "../theme"

import type { WidgetProps } from "./types"
import WidgetShell from "./widget-shell"

/*
 * Fixed (not generated) so server and client render the same list. Like a
 * real look-alike, each copies only the four characters a shortened address
 * shows at each end; matching more takes far more computing to find, so the
 * middle is unrelated.
 */
const TARGET = "0x7ae2c4f1b09d3e85a6f2710c9b4e58d3a1f04d1c"
const OPTIONS = [
  { id: "fake-a", address: "0x7ae24ce43b941818a5e2b3eab49fb795183d4d1c" },
  { id: "fake-b", address: "0x7ae2f04d4b04bf9b5c62891a93dc87b8d47a4d1c" },
  { id: "exact", address: TARGET },
  { id: "fake-c", address: "0x7ae256f4213ff6ee5be35093d2e4f0e9feb44d1c" },
] as const

type OptionId = (typeof OPTIONS)[number]["id"]

const shorten = (address: string) =>
  `${address.slice(0, 6)}…${address.slice(-4)}`

/** The address with every character that differs from the target marked */
const Diff = ({ address }: { address: string }) => (
  <>
    {Array.from(address, (char, i) =>
      char === TARGET[i] ? (
        char
      ) : (
        <mark key={i} className="rounded-sm bg-warning px-px text-body">
          {char}
        </mark>
      )
    )}
  </>
)

const AddressCheckWidget = ({ onAnswer, locked, wrong }: WidgetProps) => {
  const t = useTranslations("page-courses")
  const [picked, setPicked] = useState<OptionId | "">("")

  const resultFor = (id: OptionId): PickResult | undefined => {
    if (id !== picked) return undefined
    if (locked) return "correct"
    return wrong ? "incorrect" : undefined
  }
  const [full, setFull] = useState(false)
  const listLabelId = useId()
  // Once solved, show every address in full with its differences marked
  const showFull = full || locked

  const pick = (id: OptionId) => {
    setPicked(id)
    onAnswer({
      correct: id === "exact",
      hint:
        id === "exact"
          ? undefined
          : t("page-courses-widget-address-hint-lookalike"),
    })
  }

  return (
    <WidgetShell>
      <div className="flex flex-col gap-1">
        <p className="m-0 flex items-center gap-2 font-bold">
          <UserRound
            className={cn("size-5 shrink-0", courseText)}
            aria-hidden
          />
          {t("page-courses-widget-address-recipient")}
        </p>
        <p className="m-0 rounded-2xl bg-background p-3 font-mono text-sm break-all">
          <span dir="ltr">{TARGET}</span>
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p
            id={listLabelId}
            className="m-0 text-sm font-bold tracking-wide text-body-medium uppercase"
          >
            {t("page-courses-widget-address-candidates")}
          </p>
          {!locked && (
            <Button
              variant="ghost"
              onClick={() => setFull((on) => !on)}
              className={cn(chunkyButtonSecondary, "min-h-10 px-4 text-sm")}
            >
              {full ? <EyeOff aria-hidden /> : <Eye aria-hidden />}
              {full
                ? t("page-courses-widget-address-show-short")
                : t("page-courses-widget-address-show-full")}
            </Button>
          )}
        </div>
        {!showFull && (
          <p className="m-0 text-sm text-body-medium">
            {t("page-courses-widget-address-short-note")}
          </p>
        )}

        <RadioGroup.Root
          aria-labelledby={listLabelId}
          className="flex flex-col gap-3"
          value={picked}
          disabled={locked}
          onValueChange={(id) => pick(id as OptionId)}
        >
          {OPTIONS.map(({ id, address }, idx) => (
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
              <span className="min-w-0 font-mono text-sm break-all">
                <span dir="ltr">
                  {!showFull ? (
                    shorten(address)
                  ) : locked ? (
                    <Diff address={address} />
                  ) : (
                    address
                  )}
                </span>
              </span>
            </RadioGroup.Item>
          ))}
        </RadioGroup.Root>
      </div>

      {locked && (
        <p role="status" className="m-0 text-green-700 dark:text-green-400">
          {t("page-courses-widget-address-hit")}
        </p>
      )}
    </WidgetShell>
  )
}

export default AddressCheckWidget

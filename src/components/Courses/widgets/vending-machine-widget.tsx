"use client"

import { useEffect, useId, useState } from "react"
import {
  CakeSlice,
  Check,
  CircleDashed,
  Cookie,
  Donut,
  type LucideIcon,
  Minus,
  Plus,
  RotateCcw,
  X,
} from "lucide-react"
import { useLocale, useTranslations } from "next-intl"

import { Button } from "@/components/ui/buttons/Button"

import { cn } from "@/lib/utils/cn"
import { numberFormat } from "@/lib/utils/numbers"

import {
  chunkyButton,
  chunkyButtonSecondary,
  chunkyTile,
  courseText,
} from "../theme"

import type { WidgetProps } from "./types"
import WidgetShell from "./widget-shell"

const START_BALANCE = 5

// The donut starts sold out so the stock rule can be seen rejecting a call
const ITEMS: { id: ItemId; price: number; stock: number; icon: LucideIcon }[] =
  [
    { id: "cupcake", price: 1, stock: 3, icon: CakeSlice },
    { id: "cookie", price: 2, stock: 1, icon: Cookie },
    { id: "donut", price: 3, stock: 0, icon: Donut },
  ]
type ItemId = "cupcake" | "cookie" | "donut"

const RULES = ["price", "stock"] as const
type Rule = (typeof RULES)[number]
type RuleState = "pass" | "fail" | "skipped"

type Outcome =
  | { kind: "ok"; item: ItemId; paid: number }
  | { kind: "price"; item: ItemId; paid: number }
  | { kind: "stock"; item: ItemId }

const initialStock = () =>
  Object.fromEntries(ITEMS.map(({ id, stock }) => [id, stock])) as Record<
    ItemId,
    number
  >

// Strings that name the contract or ETH get a coins version for `everyday`
const EVERYDAY_KEYS = new Set([
  "eth",
  "balance",
  "held",
  "pay",
  "less",
  "more",
  "rules",
  "rule-price",
  "ok",
  "reject-price",
])

interface VendingMachineWidgetProps extends WidgetProps {
  /** A plain snack machine taking coins, before contracts are named */
  everyday?: boolean
}

const VendingMachineWidget = ({
  onComplete,
  everyday,
}: VendingMachineWidgetProps) => {
  const t = useTranslations("page-courses")
  const key = (name: string) =>
    `page-courses-widget-vending-${name}${everyday && EVERYDAY_KEYS.has(name) ? "-everyday" : ""}`
  const locale = useLocale()
  const int = numberFormat(locale)
  const payId = useId()

  const [balance, setBalance] = useState(START_BALANCE)
  const [held, setHeld] = useState(0)
  const [stock, setStock] = useState(initialStock)
  const [selected, setSelected] = useState<ItemId>("cupcake")
  const [pay, setPay] = useState(1)
  const [outcome, setOutcome] = useState<Outcome | null>(null)
  const [seen, setSeen] = useState({ ok: false, rejected: false })
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (!done && seen.ok && seen.rejected) {
      setDone(true)
      onComplete()
    }
  }, [done, seen, onComplete])

  const eth = (amount: number) =>
    t(key("eth"), { amount: int.format(amount), count: amount })
  const itemName = (id: ItemId) => t(`page-courses-widget-vending-item-${id}`)

  // A snack machine shows "sold out" before taking coins; the contract
  // checks the price first, as its code does
  const rules: readonly Rule[] = everyday ? ["stock", "price"] : RULES
  const buy = () => {
    const item = ITEMS.find(({ id }) => id === selected)!
    for (const rule of rules) {
      if (rule === "price" && pay !== item.price) {
        setOutcome({ kind: "price", item: item.id, paid: pay })
        setSeen((s) => ({ ...s, rejected: true }))
        return
      }
      if (rule === "stock" && stock[item.id] === 0) {
        setOutcome({ kind: "stock", item: item.id })
        setSeen((s) => ({ ...s, rejected: true }))
        return
      }
    }
    setBalance(balance - pay)
    setHeld(held + pay)
    setStock({ ...stock, [item.id]: stock[item.id] - 1 })
    setPay(Math.min(pay, balance - pay))
    setOutcome({ kind: "ok", item: item.id, paid: pay })
    setSeen((s) => ({ ...s, ok: true }))
  }

  const reset = () => {
    setBalance(START_BALANCE)
    setHeld(0)
    setStock(initialStock())
    setPay(1)
    setOutcome(null)
  }

  const ruleState = (rule: Rule): RuleState | null => {
    if (!outcome) return null
    if (outcome.kind === "ok") return "pass"
    const failed = outcome.kind
    if (rule === failed) return "fail"
    // Rules before the failed one passed; later ones never ran
    return rules.indexOf(rule) < rules.indexOf(failed) ? "pass" : "skipped"
  }

  const status = (() => {
    if (!outcome) return null
    // Lowercase form for use mid-sentence
    const item = t(`page-courses-widget-vending-item-${outcome.item}-inline`)
    if (outcome.kind === "ok")
      return t(key("ok"), {
        item,
        amount: int.format(outcome.paid),
        count: outcome.paid,
      })
    if (outcome.kind === "price") {
      const price = ITEMS.find(({ id }) => id === outcome.item)!.price
      return t(key("reject-price"), {
        item,
        price: int.format(price),
        priceCount: price,
        amount: int.format(outcome.paid),
      })
    }
    return t("page-courses-widget-vending-reject-stock", { item })
  })()

  return (
    <WidgetShell>
      <dl className="m-0 grid grid-cols-2 gap-3">
        {[
          { name: "balance", value: balance },
          { name: "held", value: held },
        ].map(({ name, value }) => (
          <div
            key={name}
            className="flex flex-col gap-1 rounded-2xl bg-background p-3"
          >
            <dt className="text-sm font-bold text-body-medium">
              {t(key(name))}
            </dt>
            <dd className="m-0 text-lg font-black tabular-nums">
              {eth(value)}
            </dd>
          </div>
        ))}
      </dl>

      <fieldset className="m-0 flex flex-col gap-2 border-0 p-0">
        <legend className="mb-2 font-bold">
          {t("page-courses-widget-vending-pick")}
        </legend>
        <ul className="m-0 grid list-none grid-cols-1 gap-3 sm:grid-cols-3">
          {ITEMS.map(({ id, price, icon: Icon }) => {
            const active = selected === id
            return (
              <li key={id} className="m-0">
                <Button
                  variant="ghost"
                  aria-pressed={active}
                  onClick={() => setSelected(id)}
                  className={cn(
                    chunkyTile,
                    "flex h-full w-full items-center justify-start gap-3 p-3 text-start text-body sm:flex-col sm:items-start hover-link:!text-body",
                    active &&
                      "border-(--course) bg-(--course-soft) hover:bg-(--course-soft)"
                  )}
                >
                  <Icon
                    className={cn("size-7 shrink-0", courseText)}
                    aria-hidden
                  />
                  <span className="flex flex-col gap-0.5">
                    <span className="font-bold">{itemName(id)}</span>
                    <span className="text-sm font-semibold">{eth(price)}</span>
                    <span
                      className={cn(
                        "text-sm font-semibold",
                        stock[id] === 0
                          ? "text-error dark:text-red-400"
                          : "text-body-medium"
                      )}
                    >
                      {t("page-courses-widget-vending-stock", {
                        count: stock[id],
                      })}
                    </span>
                  </span>
                </Button>
              </li>
            )
          })}
        </ul>
      </fieldset>

      <div className="flex flex-wrap items-end justify-between gap-4">
        <div
          role="group"
          aria-labelledby={payId}
          className="flex flex-col gap-2"
        >
          <span id={payId} className="font-bold">
            {t(key("pay"))}
          </span>
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              onClick={() => setPay(pay - 1)}
              disabled={pay <= 0}
              aria-label={t(key("less"))}
              className={cn(chunkyButtonSecondary, "px-3")}
            >
              <Minus />
            </Button>
            <output
              aria-live="polite"
              className="min-w-16 text-center text-xl font-black tabular-nums"
            >
              {eth(pay)}
            </output>
            <Button
              variant="ghost"
              onClick={() => setPay(pay + 1)}
              disabled={pay >= balance}
              aria-label={t(key("more"))}
              className={cn(chunkyButtonSecondary, "px-3")}
            >
              <Plus />
            </Button>
          </div>
        </div>
        <Button variant="ghost" onClick={buy} className={chunkyButton}>
          {t("page-courses-widget-vending-buy")}
        </Button>
      </div>

      <div className="flex flex-col gap-2 rounded-2xl border-2 border-(--course-soft) bg-background p-4">
        <p className="m-0 text-sm font-bold tracking-wide text-body-medium uppercase">
          {t(key("rules"))}
        </p>
        <ol className="m-0 flex list-none flex-col gap-2">
          {rules.map((rule) => {
            const state = ruleState(rule)
            return (
              <li key={rule} className="m-0 flex items-start gap-2">
                {state === "pass" ? (
                  <Check
                    className="mt-0.5 size-5 shrink-0 text-green-700 dark:text-green-400"
                    aria-hidden
                  />
                ) : state === "fail" ? (
                  <X
                    className="mt-0.5 size-5 shrink-0 text-error dark:text-red-400"
                    aria-hidden
                  />
                ) : (
                  <CircleDashed
                    className="mt-0.5 size-5 shrink-0 text-body-medium"
                    aria-hidden
                  />
                )}
                <span>
                  {t(key(`rule-${rule}`))}
                  {state && (
                    <span className="sr-only">
                      {" "}
                      ({t(`page-courses-widget-vending-rule-${state}`)})
                    </span>
                  )}
                </span>
              </li>
            )
          })}
        </ol>
      </div>

      <p
        role="status"
        className={cn(
          "m-0 min-h-6",
          outcome?.kind === "ok"
            ? "text-green-700 dark:text-green-400"
            : "text-error dark:text-red-400"
        )}
      >
        {status}
      </p>

      {outcome && (
        <Button
          variant="ghost"
          onClick={reset}
          className={cn(chunkyButtonSecondary, "self-start")}
        >
          <RotateCcw />
          {t("page-courses-widget-vending-reset")}
        </Button>
      )}
    </WidgetShell>
  )
}

/** The same machine taking coins, for lessons before contracts are named */
export const SnackMachineWidget = (props: WidgetProps) => (
  <VendingMachineWidget {...props} everyday />
)

export default VendingMachineWidget

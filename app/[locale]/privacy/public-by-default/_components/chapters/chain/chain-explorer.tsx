"use client"

import { type ReactNode, useId, useState } from "react"
import { useLocale, useTranslations } from "next-intl"

import { Ltr, richTags } from "@/components/PrivacyWidgets/shared/rich-tags"
import { Button } from "@/components/ui/buttons/Button"
import Switch from "@/components/ui/switch"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tag } from "@/components/ui/tag"

import { cn } from "@/lib/utils/cn"
import { dateTimeFormat } from "@/lib/utils/date"
import { numberFormat } from "@/lib/utils/numbers"

import { persona } from "@/data/privacy-lesson/persona"

import { useLesson } from "../../lesson-provider"
import { LESSON_NS, useLessonTranslations } from "../../use-lesson-translations"

import { BALANCE, type ChainTx, NET_WORTH_USD } from "./data"
import { useChainData } from "./use-chain-data"

type ExplorerTab = "transaction" | "address" | "payroll"

const PAYROLL_ROWS_SHOWN = 6

/** One line of the explorer: label, value and the analyst's note */
const Field = ({
  label,
  value,
  note,
  showNote,
}: {
  label: ReactNode
  value: ReactNode
  note?: ReactNode
  showNote: boolean
}) => (
  <div className="grid gap-x-4 gap-y-1 border-b py-3 last:border-b-0 md:grid-cols-[10rem_minmax(0,1fr)]">
    <dt className="text-sm text-body-medium">{label}</dt>
    <dd className="m-0 min-w-0 space-y-1">
      <div className="break-words">{value}</div>
      {showNote && note && (
        <p className="m-0 text-sm text-leak-high-contrast">{note}</p>
      )}
    </dd>
  </div>
)

const SummaryCard = ({
  label,
  value,
  detail,
}: {
  label: ReactNode
  value: ReactNode
  detail?: ReactNode
}) => (
  <div className="min-w-0 rounded-base border bg-background p-4">
    <p className="m-0 text-sm text-body-medium">{label}</p>
    <p className="m-0 text-lg font-bold">{value}</p>
    {detail && <p className="m-0 text-sm text-body-medium">{detail}</p>}
  </div>
)

const ChainExplorer = () => {
  const t = useLessonTranslations()
  const tFull = useTranslations(LESSON_NS)
  const locale = useLocale()
  const { collect } = useLesson()
  const chain = useChainData()
  const analystId = useId()
  const [tab, setTab] = useState<ExplorerTab>("transaction")
  const [analyst, setAnalyst] = useState(false)
  const [payrollOpen, setPayrollOpen] = useState(false)
  const [samSees, setSamSees] = useState(false)

  if (!chain) return null
  const { data } = chain

  const amountFormat = numberFormat(locale, { maximumFractionDigits: 5 })
  const countFormat = numberFormat(locale)
  const amount = (value: number, unit: string) => (
    <Ltr>
      {amountFormat.format(value)} {unit}
    </Ltr>
  )
  const utcTime = dateTimeFormat(locale, {
    timeZone: "UTC",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  })
  const utcStamp = dateTimeFormat(locale, {
    timeZone: "UTC",
    dateStyle: "medium",
    timeStyle: "medium",
    hourCycle: "h23",
  })
  const monthYear = dateTimeFormat(locale, { month: "long", year: "numeric" })
  const usd = numberFormat(locale, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  })

  const openAddress = () => {
    setTab("address")
    if (!samSees) {
      setSamSees(true)
      collect("friend", "networth", "salary", "rent")
    }
  }
  const openPayroll = () => {
    setPayrollOpen(true)
    setTab("payroll")
  }
  const onTabChange = (value: string) => {
    if (value === "address") openAddress()
    else setTab(value as ExplorerTab)
  }

  const noteFor = (tx: ChainTx) => {
    switch (tx.note) {
      case "cafe":
        return t("chain-history-note-cafe", { count: data.recentCafeCount })
      case undefined:
        return null
      default:
        return t(`chain-history-note-${tx.note}`)
    }
  }

  const counterparty = (tx: ChainTx) =>
    tx.kind === "salary" ? (
      <Button
        variant="link"
        className="h-auto min-h-0 p-0 font-mono"
        onClick={openPayroll}
      >
        <span dir="ltr">{tx.counterparty}</span>
      </Button>
    ) : (
      <Ltr>{tx.counterparty}</Ltr>
    )

  const salary = data.transactions.find((tx) => tx.kind === "salary")
  const rent = data.transactions.find((tx) => tx.kind === "rent")

  return (
    <div className="space-y-6">
      <div className="space-y-4 rounded-base border bg-background-highlight p-4 sm:p-6">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <p className="m-0 font-bold">{t("chain-explorer-title")}</p>
          <p className="m-0 text-sm text-body-medium">
            {t("chain-explorer-meta")}
          </p>
        </div>

        <div
          role="search"
          aria-label={t("chain-explorer-search-label")}
          className="truncate rounded-base border bg-background px-4 py-2 font-mono text-sm text-body-medium"
          dir="ltr"
        >
          {tab === "transaction"
            ? data.txHash
            : tab === "address"
              ? persona.mainFull
              : persona.payroll}
        </div>

        <div className="flex items-start gap-3">
          <Switch
            id={analystId}
            checked={analyst}
            onCheckedChange={setAnalyst}
            aria-describedby={`${analystId}-description`}
            className="mt-1"
          />
          <div>
            <label htmlFor={analystId} className="cursor-pointer font-semibold">
              {t("chain-analyst-toggle")}
            </label>
            <p
              id={`${analystId}-description`}
              className="m-0 text-sm text-body-medium"
            >
              {t("chain-analyst-toggle-description")}
            </p>
          </div>
        </div>

        <Tabs value={tab} onValueChange={onTabChange}>
          <TabsList aria-label={t("chain-explorer-tabs-label")}>
            <TabsTrigger value="transaction">
              {t("chain-explorer-tab-transaction")}
            </TabsTrigger>
            <TabsTrigger value="address">
              {t("chain-address-label")}
            </TabsTrigger>
            {payrollOpen && (
              <TabsTrigger value="payroll">
                {t("chain-explorer-tab-payroll")}
              </TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="transaction" className="bg-background">
            <dl className="m-0">
              <Field
                showNote={analyst}
                label={t("chain-field-hash")}
                value={
                  <span dir="ltr" className="font-mono text-sm break-all">
                    {data.txHash}
                  </span>
                }
              />
              <Field
                showNote={analyst}
                label={t("chain-field-status")}
                value={
                  <Tag size="small" status="success" variant="subtle">
                    {t("chain-field-status-success")}
                  </Tag>
                }
              />
              <Field
                showNote={analyst}
                label={t("chain-field-block")}
                value={<Ltr>{countFormat.format(persona.block)}</Ltr>}
                note={t("chain-field-block-note")}
              />
              <Field
                showNote={analyst}
                label={t("chain-field-timestamp")}
                value={
                  <span dir="ltr">
                    {utcStamp.format(data.dinner.timestamp)} UTC
                  </span>
                }
                note={t("chain-field-timestamp-note")}
              />
              <Field
                showNote={analyst}
                label={t("chain-field-from")}
                value={
                  <Button
                    variant="link"
                    className="h-auto min-h-0 p-0 text-start font-mono break-all whitespace-normal"
                    onClick={openAddress}
                  >
                    <span dir="ltr">{persona.mainFull}</span>
                  </Button>
                }
                note={t("chain-field-from-note")}
              />
              <Field
                showNote={analyst}
                label={t("chain-field-to")}
                value={<Ltr>{persona.friend}</Ltr>}
                note={t("chain-field-to-note")}
              />
              <Field
                showNote={analyst}
                label={t("chain-field-value")}
                value={amount(data.dinner.amount, data.dinner.unit)}
                note={t("chain-field-value-note")}
              />
              <Field
                showNote={analyst}
                label={t("chain-field-fee")}
                value={amount(0.00002, "ETH")}
              />
              <Field
                showNote={analyst}
                label={t("chain-field-gas-price")}
                value={amount(0.95, "gwei")}
                note={tFull.rich(
                  `${LESSON_NS}-chain-field-gas-price-note`,
                  richTags({ glossary: "gwei" })
                )}
              />
              <Field
                showNote={analyst}
                label={t("chain-field-nonce")}
                value={<Ltr>{countFormat.format(data.nonce)}</Ltr>}
                note={tFull.rich(`${LESSON_NS}-chain-field-nonce-note`, {
                  ...richTags({ glossary: "nonce" }),
                  count: data.nonce,
                })}
              />
              <Field
                showNote={analyst}
                label={t("chain-field-input")}
                value={t("chain-field-input-plain", { data: "0x" })}
              />
            </dl>
          </TabsContent>

          <TabsContent value="address" className="space-y-4 bg-background">
            <p className="m-0 text-sm text-body-medium">
              {t("chain-address-label")}{" "}
              <span dir="ltr" className="font-mono break-all text-body">
                {persona.mainFull}
              </span>
            </p>
            <div className="grid gap-3 sm:grid-cols-3">
              <SummaryCard
                label={t("chain-card-balance")}
                value={amount(BALANCE.eth, "ETH")}
                detail={amount(BALANCE.usdc, "USDC")}
              />
              <SummaryCard
                label={t("chain-card-transactions")}
                value={countFormat.format(data.transactions.length)}
                detail={t("chain-card-transactions-detail", {
                  sentCount: countFormat.format(data.sentCount),
                  receivedCount: countFormat.format(data.receivedCount),
                })}
              />
              <SummaryCard
                label={t("chain-card-funded")}
                value={t("chain-card-funded-value", {
                  count: data.fundedCount,
                })}
              />
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("chain-history-time")}</TableHead>
                  <TableHead>{t("chain-history-counterparty")}</TableHead>
                  <TableHead>{t("chain-history-amount")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.history.map((tx) => {
                  const note = analyst ? noteFor(tx) : null
                  return (
                    <TableRow key={tx.id}>
                      <TableCell className="whitespace-nowrap">
                        <span dir="ltr">{utcTime.format(tx.timestamp)}</span>
                      </TableCell>
                      <TableCell>
                        {counterparty(tx)}
                        {note && (
                          <p className="m-0 mt-1 text-sm text-leak-high-contrast">
                            {note}
                          </p>
                        )}
                      </TableCell>
                      <TableCell className="whitespace-nowrap">
                        <Tag
                          size="small"
                          variant="outline"
                          status={tx.direction === "in" ? "success" : "normal"}
                          className="me-2"
                        >
                          {t(
                            tx.direction === "in"
                              ? "chain-history-in"
                              : "chain-history-out"
                          )}
                        </Tag>
                        {amount(tx.amount, tx.unit)}
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
            <p className="m-0 text-sm text-body-medium">
              {t("chain-history-more", {
                count: data.olderCount,
                startDate: monthYear.format(data.startDate),
              })}
            </p>
          </TabsContent>

          {payrollOpen && (
            <TabsContent value="payroll" className="space-y-4 bg-background">
              <p className="m-0 text-sm text-body-medium">
                {t("chain-address-label")} <Ltr>{persona.payroll}</Ltr>
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                <SummaryCard
                  label={t("chain-payroll-pattern")}
                  value={t("chain-payroll-pattern-value", {
                    count: data.payroll.length,
                  })}
                  detail={t("chain-payroll-pattern-detail")}
                />
                <SummaryCard
                  label={t("chain-payroll-paid")}
                  value={amount(
                    data.payroll.reduce((sum, row) => sum + row.amount, 0),
                    "USDC"
                  )}
                  detail={t("chain-payroll-paid-detail", {
                    count: data.payroll.length,
                  })}
                />
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t("chain-payroll-recipient")}</TableHead>
                    <TableHead>{t("chain-history-amount")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.payroll.slice(0, PAYROLL_ROWS_SHOWN).map((row) => (
                    <TableRow
                      key={row.address}
                      className={cn(row.isYou && "bg-leak-low-contrast")}
                    >
                      <TableCell>
                        <Ltr>{row.address}</Ltr>
                        {row.isYou && (
                          <Tag
                            size="small"
                            status="warning"
                            variant="solid"
                            className="ms-2"
                          >
                            {t("chain-payroll-you")}
                          </Tag>
                        )}
                      </TableCell>
                      <TableCell>{amount(row.amount, "USDC")}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <p className="m-0 text-sm text-body-medium">
                {t("chain-payroll-more", {
                  count: data.payroll.length - PAYROLL_ROWS_SHOWN,
                })}
              </p>
              <p className="m-0">{t("chain-payroll-explainer")}</p>
            </TabsContent>
          )}
        </Tabs>

        <p className="m-0 text-sm text-body-medium">
          {t("chain-explorer-caption")}
        </p>
      </div>

      <section
        aria-live="polite"
        aria-labelledby="chain-sam-title"
        className={cn(
          "space-y-3 rounded-base border p-4 sm:p-6",
          samSees && "border-leak bg-leak-low-contrast/40"
        )}
      >
        <h3 id="chain-sam-title" className="m-0 text-h5">
          {t("chain-sam-label", { friendName: persona.friend })}
        </h3>
        {!samSees ? (
          <p className="m-0">
            {t("chain-sam-idle", {
              amount: `${amountFormat.format(data.dinner.amount)} ${data.dinner.unit}`,
            })}
          </p>
        ) : (
          <>
            <dl className="m-0 grid gap-x-6 gap-y-2 sm:grid-cols-[auto_minmax(0,1fr)]">
              {(
                [
                  [
                    "chain-sam-balance-label",
                    t("chain-sam-balance-value", {
                      ethAmount: `${amountFormat.format(BALANCE.eth)} ETH`,
                      tokenAmount: `${amountFormat.format(BALANCE.usdc)} USDC`,
                    }),
                  ],
                  [
                    "chain-sam-income-label",
                    t("chain-sam-income-value", {
                      amount: `${amountFormat.format(salary?.amount ?? 0)} USDC`,
                    }),
                  ],
                  [
                    "chain-sam-rent-label",
                    t("chain-sam-rent-value", {
                      amount: `${amountFormat.format(rent?.amount ?? 0)} USDC`,
                    }),
                  ],
                  ["chain-sam-routine-label", t("chain-sam-routine-value")],
                  [
                    "chain-sam-cashout-label",
                    t("chain-sam-cashout-value", { address: persona.deposit }),
                  ],
                  [
                    "chain-sam-wallets-label",
                    <>
                      {t("chain-sam-wallets-value", {
                        count: data.fundedCount,
                      })}{" "}
                      {t("chain-sam-wallets-total", {
                        amount: usd.format(NET_WORTH_USD),
                      })}
                    </>,
                  ],
                ] as const
              ).map(([labelKey, value]) => (
                <div key={labelKey} className="contents">
                  <dt className="font-semibold">{t(labelKey)}</dt>
                  <dd className="m-0 min-w-0">{value}</dd>
                </div>
              ))}
            </dl>
            <p className="m-0 font-bold text-leak-high-contrast">
              {t("chain-sam-conclusion")}
            </p>
          </>
        )}
      </section>
    </div>
  )
}

export default ChainExplorer

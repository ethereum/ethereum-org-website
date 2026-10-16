import { createRandom } from "@/components/PrivacyWidgets/shared/random"

import { persona } from "@/data/privacy-lesson/persona"

/**
 * The single dataset behind chapter 04: the explorer's history, its counts,
 * the payroll page and the clock heatmap all derive from it. Generated
 * deterministically (seeded) relative to `now`, in the reader's own UTC
 * offset, so "your" activity looks like it happened where the reader lives.
 */

const MINUTE = 60_000
const DAY = 24 * 60 * MINUTE
const SPAN_DAYS = 730 // "over two years"

/** Totals the copy describes; every count in the chapter comes from the data */
const SENT_TOTAL = 413
const RECEIVED_TOTAL = 96
const RECENT_CAFE_TOTAL = 14
const RECENT_CAFE_DAYS = 90
const FUNDED_ADDRESSES = 3
export const HISTORY_ROWS = 10

/** Sleep window (local) the sample respects: nothing from 01:00 to 07:00 */
const ACTIVE_WEEKDAY = { from: 7 * 60 + 40, to: 24 * 60 + 30 }
const ACTIVE_WEEKEND = { from: 10 * 60, to: 24 * 60 + 30 }
export const ASSUMED_SLEEP = { start: 1 * 60, end: 7 * 60 }

export type ChainNoteId =
  | "dinner"
  | "salary"
  | "friend"
  | "exchange"
  | "cafe"
  | "cafe-again"
  | "rent"
  | "salary-again"
  | "rent-again"

export type ChainTxKind =
  | "dinner"
  | "salary"
  | "friend"
  | "exchange"
  | "cafe"
  | "rent"
  | "fund"
  | "other"

export interface ChainTx {
  id: string
  direction: "in" | "out"
  kind: ChainTxKind
  /** UTC milliseconds */
  timestamp: number
  counterparty: string
  amount: number
  unit: "ETH" | "USDC"
  /** Analyst note shown in "read it like an analyst" mode */
  note?: ChainNoteId
}

export interface PayrollRow {
  address: string
  amount: number
  isYou: boolean
}

export interface ChainData {
  transactions: ChainTx[]
  history: ChainTx[]
  olderCount: number
  startDate: number
  sentCount: number
  receivedCount: number
  fundedCount: number
  recentCafeCount: number
  /** Sent timestamps; the clock heatmap counts these */
  sentTimestamps: number[]
  dinner: ChainTx
  /** Sent transactions before the dinner payment: the dinner's nonce */
  nonce: number
  payroll: PayrollRow[]
  txHash: string
}

const hex = (random: ReturnType<typeof createRandom>, length: number) =>
  Array.from({ length }, () => "0123456789abcdef"[random.int(0, 15)]).join("")

const shortHex = (random: ReturnType<typeof createRandom>) =>
  `0x${hex(random, 4)}…${hex(random, 4)}`

export const CAFE_ADDRESS = "0xc4fe…b3a7"

export const buildChainData = (
  now: number,
  utcOffsetMinutes: number
): ChainData => {
  const random = createRandom(0x04c4a1)
  const offset = utcOffsetMinutes * MINUTE
  const toUtc = (localMs: number) => localMs - offset
  const nowLocal = now + offset
  const todayLocal = Math.floor(nowLocal / DAY) * DAY
  const localDay = (daysAgo: number) => todayLocal - daysAgo * DAY
  const isWeekend = (localMs: number) => {
    const day = new Date(localMs).getUTCDay()
    return day === 0 || day === 6
  }
  const activeMinute = (localDayStart: number) => {
    const { from, to } = isWeekend(localDayStart)
      ? ACTIVE_WEEKEND
      : ACTIVE_WEEKDAY
    return random.int(from, to - 1)
  }
  /** Local wall-clock time on a given local date, as a UTC timestamp */
  const at = (localDayStart: number, minutes: number) =>
    toUtc(localDayStart + minutes * MINUTE)

  // Month anchors in local time (salary on the 25th, rent on the 1st)
  const nowDate = new Date(nowLocal)
  const monthDay = (monthsBack: number, day: number) =>
    Date.UTC(nowDate.getUTCFullYear(), nowDate.getUTCMonth() - monthsBack, day)
  const salaryMonthsBack = nowDate.getUTCDate() >= 25 ? 0 : 1
  const salaryDay = (k: number) => monthDay(salaryMonthsBack + k, 25)
  const rentDay = (k: number) => monthDay(k, 1)

  // The dinner was "just sent". Keep it out of the sleep window so the
  // sample stays consistent if the reader visits at night.
  const justSent = now - 3 * MINUTE
  const justSentMinutes = (justSent + offset - todayLocal) / MINUTE
  const dinnerTime =
    justSentMinutes >= ASSUMED_SLEEP.start &&
    justSentMinutes < ASSUMED_SLEEP.end
      ? at(todayLocal, ASSUMED_SLEEP.start - 5)
      : justSent
  /** The nearest weekday on or before `daysAgo` (café visits are workday mornings) */
  const weekdayAgo = (daysAgo: number) => {
    let day = localDay(daysAgo)
    while (isWeekend(day)) day -= DAY
    return day
  }

  const tx = (t: Omit<ChainTx, "id">, id: string): ChainTx => ({ ...t, id })

  // The ten most recent rows, each with something to say
  const scripted: ChainTx[] = [
    tx(
      {
        direction: "out",
        kind: "dinner",
        timestamp: dinnerTime,
        counterparty: persona.friend,
        amount: 0.03,
        unit: "ETH",
        note: "dinner",
      },
      "dinner"
    ),
    tx(
      {
        direction: "out",
        kind: "cafe",
        timestamp: at(weekdayAgo(1), 8 * 60 + 35),
        counterparty: CAFE_ADDRESS,
        amount: 4.5,
        unit: "USDC",
        note: "cafe",
      },
      "cafe-1"
    ),
    tx(
      {
        direction: "out",
        kind: "cafe",
        timestamp: at(weekdayAgo(3), 8 * 60 + 28),
        counterparty: CAFE_ADDRESS,
        amount: 3.8,
        unit: "USDC",
        note: "cafe-again",
      },
      "cafe-2"
    ),
    tx(
      {
        direction: "in",
        kind: "friend",
        timestamp: at(localDay(4), 21 * 60 + 10),
        counterparty: persona.friend,
        amount: 0.05,
        unit: "ETH",
        note: "friend",
      },
      "friend"
    ),
    tx(
      {
        direction: "out",
        kind: "cafe",
        timestamp: at(weekdayAgo(5), 8 * 60 + 41),
        counterparty: CAFE_ADDRESS,
        amount: 4.5,
        unit: "USDC",
        note: "cafe-again",
      },
      "cafe-3"
    ),
    tx(
      {
        direction: "out",
        kind: "exchange",
        timestamp: at(localDay(6), 19 * 60 + 20),
        counterparty: persona.deposit,
        amount: 0.5,
        unit: "ETH",
        note: "exchange",
      },
      "exchange"
    ),
    tx(
      {
        direction: "in",
        kind: "salary",
        timestamp: at(salaryDay(0), 9 * 60),
        counterparty: persona.payroll,
        amount: 4200,
        unit: "USDC",
        note: "salary",
      },
      "salary-1"
    ),
    tx(
      {
        direction: "out",
        kind: "rent",
        timestamp: at(rentDay(0), 10 * 60 + 5),
        counterparty: persona.landlord,
        amount: 1150,
        unit: "USDC",
        note: "rent",
      },
      "rent-1"
    ),
    tx(
      {
        direction: "in",
        kind: "salary",
        timestamp: at(salaryDay(1), 9 * 60),
        counterparty: persona.payroll,
        amount: 4200,
        unit: "USDC",
        note: "salary-again",
      },
      "salary-2"
    ),
    tx(
      {
        direction: "out",
        kind: "rent",
        timestamp: at(rentDay(1), 10 * 60 + 5),
        counterparty: persona.landlord,
        amount: 1150,
        unit: "USDC",
        note: "rent-again",
      },
      "rent-2"
    ),
  ].sort((a, b) => b.timestamp - a.timestamp)

  // Everything generated below is older than the oldest scripted row
  const oldestScripted = Math.min(...scripted.map((t) => t.timestamp))
  const firstOlderDay = Math.ceil((now - oldestScripted) / DAY) + 1
  const olderDay = () => localDay(random.int(firstOlderDay, SPAN_DAYS))

  const generated: ChainTx[] = []
  const add = (t: Omit<ChainTx, "id">) =>
    generated.push({ ...t, id: `tx-${generated.length}` })

  // Older salaries and rent, one a month, for the rest of the two years
  const salaryCount = scripted.filter((t) => t.kind === "salary").length
  const rentCount = scripted.filter((t) => t.kind === "rent").length
  for (let k = salaryCount; k < 24; k++) {
    add({
      direction: "in",
      kind: "salary",
      timestamp: at(salaryDay(k), 9 * 60),
      counterparty: persona.payroll,
      amount: 4200,
      unit: "USDC",
    })
  }
  for (let k = rentCount; k < 24; k++) {
    add({
      direction: "out",
      kind: "rent",
      timestamp: at(rentDay(k), 10 * 60 + 5),
      counterparty: persona.landlord,
      amount: 1150,
      unit: "USDC",
    })
  }

  // More café visits in recent months: weekday mornings
  const scriptedCafes = scripted.filter((t) => t.kind === "cafe").length
  for (let i = scriptedCafes; i < RECENT_CAFE_TOTAL; i++) {
    let day = localDay(random.int(firstOlderDay, RECENT_CAFE_DAYS - 1))
    while (isWeekend(day)) day -= DAY
    add({
      direction: "out",
      kind: "cafe",
      timestamp: at(day, random.int(8 * 60 + 20, 8 * 60 + 50)),
      counterparty: CAFE_ADDRESS,
      amount: random.pick([3.8, 4.5, 5.2]),
      unit: "USDC",
    })
  }

  for (let i = 0; i < FUNDED_ADDRESSES; i++) {
    const day = olderDay()
    add({
      direction: "out",
      kind: "fund",
      timestamp: at(day, activeMinute(day)),
      counterparty: persona.addresses[i + 1],
      amount: random.pick([0.05, 0.1, 0.2]),
      unit: "ETH",
    })
  }

  // The rest: ordinary activity, sent only during waking hours
  const sentSoFar = () =>
    [...scripted, ...generated].filter((t) => t.direction === "out").length
  const receivedSoFar = () =>
    [...scripted, ...generated].filter((t) => t.direction === "in").length
  while (sentSoFar() < SENT_TOTAL) {
    const day = olderDay()
    add({
      direction: "out",
      kind: "other",
      timestamp: at(day, activeMinute(day)),
      counterparty: shortHex(random),
      amount: random.pick([0.01, 0.02, 0.05, 0.1, 12, 25, 40, 80]),
      unit: random.next() < 0.5 ? "ETH" : "USDC",
    })
  }
  while (receivedSoFar() < RECEIVED_TOTAL) {
    const day = olderDay()
    add({
      direction: "in",
      kind: "other",
      timestamp: at(day, random.int(0, 24 * 60 - 1)),
      counterparty: shortHex(random),
      amount: random.pick([0.02, 0.05, 0.1, 20, 50]),
      unit: random.next() < 0.5 ? "ETH" : "USDC",
    })
  }

  const transactions = [...scripted, ...generated].sort(
    (a, b) => b.timestamp - a.timestamp
  )
  const sent = transactions.filter((t) => t.direction === "out")
  const dinner = scripted.find((t) => t.kind === "dinner")!

  const payrollRandom = createRandom(0x9a7011)
  const payroll: PayrollRow[] = Array.from({ length: 39 }, (_, i) => ({
    address: i === 2 ? persona.main : shortHex(payrollRandom),
    amount: i === 2 ? 4200 : payrollRandom.int(28, 96) * 100,
    isYou: i === 2,
  }))

  return {
    transactions,
    history: transactions.slice(0, HISTORY_ROWS),
    olderCount: transactions.length - HISTORY_ROWS,
    startDate: transactions[transactions.length - 1].timestamp,
    sentCount: sent.length,
    receivedCount: transactions.length - sent.length,
    fundedCount: transactions.filter((t) => t.kind === "fund").length,
    recentCafeCount: transactions.filter(
      (t) => t.kind === "cafe" && now - t.timestamp < RECENT_CAFE_DAYS * DAY
    ).length,
    sentTimestamps: sent.map((t) => t.timestamp),
    dinner,
    nonce: sent.filter((t) => t.timestamp < dinner.timestamp).length,
    payroll,
    txHash: `0x${hex(createRandom(0xd1ee), 64)}`,
  }
}

/* ---------- clock analysis (what "anyone can run on a real address") ---------- */

export interface ClockAnalysis {
  /** Transactions per UTC weekday (0 = Monday) and hour */
  grid: number[][]
  hourTotals: number[]
  max: number
  /** Longest run of UTC hours with no activity at all (wraps midnight) */
  silence: { start: number; length: number }
  /** Inferred offset, in minutes east of UTC */
  inferredOffsetMinutes: number
  /** Typical first activity, local minutes after midnight */
  weekdayStart: number
  weekendStart: number
}

export const analyseClock = (
  timestamps: number[],
  utcOffsetMinutes: number
): ClockAnalysis => {
  const grid = Array.from({ length: 7 }, () => Array<number>(24).fill(0))
  const hourTotals = Array<number>(24).fill(0)
  for (const ts of timestamps) {
    const date = new Date(ts)
    const weekday = (date.getUTCDay() + 6) % 7
    const hour = date.getUTCHours()
    grid[weekday][hour] += 1
    hourTotals[hour] += 1
  }

  let best = { start: 0, length: 0 }
  for (let start = 0; start < 24; start++) {
    let length = 0
    while (length < 24 && hourTotals[(start + length) % 24] === 0) length++
    if (length > best.length) best = { start, length }
  }

  // Assume the quiet stretch is centred on 04:00 local, mid-way through sleep
  const midpointUtc = best.start + best.length / 2
  const sleepMid = (ASSUMED_SLEEP.start + ASSUMED_SLEEP.end) / 2 / 60
  let offsetHours = sleepMid - midpointUtc
  while (offsetHours <= -12) offsetHours += 24
  while (offsetHours > 14) offsetHours -= 24

  // Earliest activity on weekdays and on weekends, local time, rounded down
  // to 10 minutes (the sample was built with the reader's actual offset)
  const local = timestamps.map((ts) => ts + utcOffsetMinutes * MINUTE)
  const startOf = (weekend: boolean) => {
    const minutes = local
      .filter((ms) => {
        const day = new Date(ms).getUTCDay()
        return (day === 0 || day === 6) === weekend
      })
      .map((ms) => {
        const m = Math.floor((ms % DAY) / MINUTE)
        // Shortly after midnight belongs to the previous day's evening
        return m < ASSUMED_SLEEP.start ? m + 24 * 60 : m
      })
      .sort((a, b) => a - b)
    return Math.floor((minutes[0] ?? 0) / 10) * 10
  }

  return {
    grid,
    hourTotals,
    max: Math.max(1, ...grid.flat()),
    silence: best,
    inferredOffsetMinutes: Math.round(offsetHours * 60),
    weekdayStart: startOf(false),
    weekendStart: startOf(true),
  }
}

/** "UTC+1", "UTC−3:30": a machine string, rendered LTR */
export const formatUtcOffset = (minutes: number) => {
  const sign = minutes < 0 ? "−" : "+"
  const abs = Math.abs(minutes)
  const h = Math.floor(abs / 60)
  const m = abs % 60
  return `UTC${sign}${h}${m ? `:${String(m).padStart(2, "0")}` : ""}`
}

/** Offsets agree within an hour, comparing round the clock (−11:30 ≈ +12:30) */
export const offsetsMatch = (a: number, b: number) => {
  const diff = (((a - b) % 1440) + 1440) % 1440
  return Math.min(diff, 1440 - diff) <= 60
}

/** Balances on the explorer's address page (example values, formatted in code) */
export const BALANCE = { eth: 2.184, usdc: 6020 } as const
/** Everything across the reader's addresses, in US dollars */
export const NET_WORTH_USD = 48210

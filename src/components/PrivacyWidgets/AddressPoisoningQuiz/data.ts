/**
 * Sample history for the address-poisoning quiz. Fixed values, so the quiz is
 * identical on every render and in visual tests. Both fakes share the first 4
 * and last 6 hex characters of Sam's real address, like the 2024 WBTC case.
 */
export const SAM_ADDRESS = "0x8c1ea4c123b1612dd272d1371c17149d43f64b07"
const FAKE_ZERO_VALUE = "0x8c1e9536b3216fdaeeb975729fae923d5af64b07"
const FAKE_DUST = "0x8c1e4fd12aabfe228f219e9cb0eb53f169f64b07"

export type PoisonRowKind = "sent" | "received"
export type FakeReason = "zero-value" | "dust"

export interface PoisonRow {
  id: string
  kind: PoisonRowKind
  amount: number
  unit: string
  address: string
  /** How long ago the row arrived, relative to when the quiz is shown */
  minutesAgo: number
  /** Present on the scammer's rows */
  fake?: FakeReason
}

/** Newest first, the way a wallet lists history */
export const POISON_ROWS: PoisonRow[] = [
  {
    id: "fake-zero-value",
    kind: "sent",
    amount: 0,
    unit: "USDC",
    address: FAKE_ZERO_VALUE,
    minutesAgo: 2,
    fake: "zero-value",
  },
  {
    id: "fake-dust",
    kind: "received",
    amount: 0.0001,
    unit: "ETH",
    address: FAKE_DUST,
    minutesAgo: 4,
    fake: "dust",
  },
  {
    id: "real-sent",
    kind: "sent",
    amount: 0.03,
    unit: "ETH",
    address: SAM_ADDRESS,
    minutesAgo: 7,
  },
  {
    id: "real-received",
    kind: "received",
    amount: 25,
    unit: "USDC",
    address: SAM_ADDRESS,
    minutesAgo: 60 * 24 * 9,
  },
]

/** How wallets shorten addresses: the first and last 4 hex characters */
export const shortAddress = (address: string) =>
  `${address.slice(0, 6)}…${address.slice(-4)}`

/** Source dates for the "On the record" cards (formatted in code) */
export const SOURCE_DATES = {
  coindesk: "2024-05-03",
  cointelegraph: "2024-05-10",
} as const

export const SOURCE_LINKS = {
  coindesk:
    "https://www.coindesk.com/business/2024/05/03/exploiter-steals-68m-worth-of-crypto-through-address-poisoning",
  cointelegraph:
    "https://cointelegraph.com/news/wbtc-address-poisoner-all-funds-negotiations",
  study: "https://arxiv.org/abs/2501.16681",
} as const

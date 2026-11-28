/**
 * Local payment apps and exchanges that Ask AI sees as no-match queries. When retrieval
 * finds nothing and the query names one of these, the reader is pointed to the get-ETH
 * country picker instead of the "English only" notice, which does not apply to them.
 *
 * Neutral on purpose: a match never names, lists or endorses a service. It only points
 * to the existing country tool.
 *
 * Matched literally, case-insensitive, as whole words against the normalised query (see
 * `matchBuyQuery` in app/api/ask/grounding.ts). Exchanges serving sanctioned regions are
 * deliberately left out. Wallet names are a different intent and stay out of scope.
 */

/** Where a matched query is sent. */
export const ASK_BUY_ROUTE_PATH = "/get-eth/#country-picker"

/** Names that are specific enough to match anywhere in the query. */
export const ASK_BUY_TERMS: string[] = [
  // Pakistan
  "easypaisa",
  "jazzcash",
  "sadapay",
  "nayapay",
  // Bangladesh
  "bkash",
  "nagad",
  "rocket bkash",
  "dbbl rocket",
  "islami bank",
  // East Africa
  "telebirr",
  "cbe birr",
  "m pesa",
  "mpesa",
  "airtel money",
  // West Africa
  "mtn momo",
  "orange money",
  "opay",
  "palmpay",
  "moniepoint",
  // India
  "upi",
  "paytm",
  "phonepe",
  "google pay",
  "gpay",
  // Southeast Asia
  "gcash",
  "paymaya",
  "gopay",
  // Latin America
  "pix",
  "mercado pago",
  "nubank",
  "nequi",
  "yape",
  // Egypt and MENA
  "instapay",
  "vodafone cash",
  // Exchanges
  "toobit",
  "binance",
  "bybit",
  "okx",
  "kucoin",
  "mexc",
  "bitget",
  "coinbase",
  "kraken",
]

/**
 * Names that are also everyday words, so they only match when they are the whole query.
 * "rocket" is covered by its two specific phrases above instead.
 */
export const ASK_BUY_WHOLE_QUERY_TERMS: string[] = [
  "wave",
  "maya",
  "dana",
  "ovo",
]

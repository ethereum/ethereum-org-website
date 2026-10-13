/**
 * Google only accepts an enumerated app type for `applicationCategory`, so the
 * descriptive label has to ride along in `applicationSubCategory`.
 * https://developers.google.com/search/docs/appearance/structured-data/software-app
 */
export const WALLET_APPLICATION_CATEGORY = {
  applicationCategory: "FinanceApplication",
  applicationSubCategory: "Cryptocurrency Wallet",
} as const

/** Ethereum mainnet genesis block: 30 July 2015, 15:26:13 UTC */
export const ETHEREUM_GENESIS_TIMESTAMP = Date.UTC(2015, 6, 30, 15, 26, 13)

const MS_PER_YEAR = 365.25 * 24 * 60 * 60 * 1000

/**
 * Whole years elapsed since `since`, used for the "N years of uninterrupted
 * uptime" stat so it never needs a manual bump.
 */
export const uptimeYearsSince = (since: number, now = Date.now()): number =>
  Math.max(0, Math.floor((now - since) / MS_PER_YEAR))

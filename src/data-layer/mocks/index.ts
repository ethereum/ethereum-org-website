/**
 * Mock data files for local development.
 *
 * These files are generated from Netlify Blobs storage and can be used
 * for local development without needing to connect to Netlify Blobs.
 *
 * Generated: 2025-12-16T18:32:05.983Z
 * Total files: 16
 */

export const mockTaskIds = [
  "fetch-account-holders",
  "fetch-apps",
  "fetch-events",
  "fetch-blob-stats",
  "fetch-collectibles",
  "fetch-community-picks",
  "fetch-ethereum-marketcap",
  "fetch-eth-price",
  "fetch-gfis",
  "fetch-grow-the-pie",
  "fetch-grow-the-pie-blockspace",
  "fetch-grow-the-pie-master",
  "fetch-l2beat",
  "fetch-rss",
  "fetch-stablecoins-data",
  "fetch-staked-percentage",
  "fetch-total-eth-staked",
] as const

export type MockTaskId = (typeof mockTaskIds)[number]

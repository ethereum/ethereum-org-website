/**
 * Mock data files for local development.
 *
 * These files are generated from Netlify Blobs storage and can be used
 * for local development without needing to connect to Netlify Blobs.
 *
 * Generated: 2025-12-10T23:12:11.353Z
 * Total files: 20
 */

export const mockTaskIds = [
  "fetch-apps",
  "fetch-beaconchain-epoch",
  "fetch-beaconchain-ethstore",
  "fetch-blobscan-stats",
  "fetch-calendar-events",
  "fetch-community-picks",
  "fetch-ethereum-marketcap",
  "fetch-ethereum-stablecoins-mcap",
  "fetch-eth-price",
  "fetch-gfis",
  "fetch-git-history",
  "fetch-github-repo-data",
  "fetch-grow-the-pie",
  "fetch-grow-the-pie-master",
  "fetch-l2beat",
  "fetch-posts",
  "fetch-rss",
  "fetch-stablecoins-data",
  "fetch-total-eth-staked",
  "fetch-total-value-locked",
] as const

export type MockTaskId = (typeof mockTaskIds)[number]

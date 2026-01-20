/**
 * Mock data files for local development.
 *
 * These files are generated from Netlify Blobs storage and can be used
 * for local development without needing to connect to Netlify Blobs.
 *
 * Generated: 2025-12-16T18:32:05.983Z
 * Total files: 20
 */

export const mockTaskIds = [
  "fetch-apps",
  "fetch-beaconchain",
  "fetch-events",
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
  "fetch-grow-the-pie-blockspace",
  "fetch-grow-the-pie-master",
  "fetch-l2beat",
  "fetch-posts",
  "fetch-rss",
  "fetch-stablecoins-data",
  "fetch-total-eth-staked",
  "fetch-total-value-locked",
] as const

export type MockTaskId = (typeof mockTaskIds)[number]

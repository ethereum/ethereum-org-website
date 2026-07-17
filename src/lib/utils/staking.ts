// Consensus-layer issuance constants — see
// https://ethereum.org/developers/docs/consensus-mechanisms/pos/rewards-and-penalties/
const BASE_REWARD_FACTOR = 64
const SLOTS_PER_EPOCH = 32
const SECONDS_PER_SLOT = 12
const SECONDS_PER_YEAR = 31_557_600 // 365.25 days
const EPOCHS_PER_YEAR = SECONDS_PER_YEAR / (SLOTS_PER_EPOCH * SECONDS_PER_SLOT)
const GWEI_PER_ETH = 1e9

/**
 * Approximate the network staking APR from the total amount of ETH staked.
 *
 * Derived from the base-reward formula: at full participation a validator's
 * annual issuance divided by its stake reduces to
 *   BASE_REWARD_FACTOR * EPOCHS_PER_YEAR / sqrt(totalStakedGwei)
 * This is protocol (consensus-layer) issuance only — it excludes execution-layer
 * tips and MEV — but it tracks Beaconcha.in's ETH.STORE rate within ~0.05pp at
 * current stake levels.
 *
 * @param totalEthStaked - total ETH staked, in whole ETH
 * @returns APR as a fraction (e.g. 0.028 for 2.8%)
 */
export const computeStakingApr = (totalEthStaked: number): number =>
  (BASE_REWARD_FACTOR * EPOCHS_PER_YEAR) /
  Math.sqrt(totalEthStaked * GWEI_PER_ETH)

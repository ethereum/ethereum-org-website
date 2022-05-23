const calculateStakingRewards = (totalAtStake) => {
  const slotTimeInSec = 12
  const slotsInEpoch = 32
  const baseRewardFactor = 64
  const averageNetworkPctOnline = 0.95
  const validatorUptime = 0.99
  const validatorDeposit = 32 // ETH
  const effectiveBalanceIncrement = 1_000_000_000 // gwei
  const weightDenominator = 64
  const proposerWeight = 8

  // Calculate number of epochs per year
  const avgSecInYear = 31556908.8 // 60 * 60 * 24 * 365.242
  const epochPerYear = avgSecInYear / (slotTimeInSec * slotsInEpoch)
  const baseRewardPerIncrement =
    (effectiveBalanceIncrement * baseRewardFactor) /
    (totalAtStake * 10e8) ** 0.5

  // Calculate base reward for full validator (in gwei)
  const baseGweiRewardFullValidator =
    ((validatorDeposit * 10e8) / effectiveBalanceIncrement) *
    baseRewardPerIncrement

  // Calculate offline per-validator penalty per epoch (in gwei)
  // Note: Inactivity penalty is not included in this simple calculation
  const offlineEpochGweiPenalty =
    baseGweiRewardFullValidator *
    ((weightDenominator - proposerWeight) / weightDenominator)

  // Calculate online per-validator reward per epoch (in gwei)
  const onlineEpochGweiReward =
    baseGweiRewardFullValidator * averageNetworkPctOnline

  // Calculate net yearly staking reward (in gwei)
  const reward = onlineEpochGweiReward * validatorUptime
  const penalty = offlineEpochGweiPenalty * (1 - validatorUptime)
  const netRewardPerYear = epochPerYear * (reward - penalty)

  // Return net yearly staking reward percentage
  return netRewardPerYear / 10e8 / validatorDeposit
}

export default calculateStakingRewards

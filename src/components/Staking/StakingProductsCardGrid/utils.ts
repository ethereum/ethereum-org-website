import { FlagType, Product, StakingCategoryType } from "./types"

const scoreOpenSource = (product: Product): 1 | 0 => {
  return product.openSource === FlagType.VALID ? 1 : 0
}

const scoreAudited = (product: Product): 1 | 0 => {
  return product.audited === FlagType.VALID ? 1 : 0
}

const scoreBugBounty = (product: Product): 1 | 0 => {
  return product.bugBounty === FlagType.VALID ? 1 : 0
}
1
const scoreBattleTested = (product: Product): 2 | 1 | 0 => {
  return product.battleTested === FlagType.VALID
    ? 2
    : product.battleTested === FlagType.CAUTION
    ? 1
    : 0
}

const scoreTrustless = (product: Product): 1 | 0 => {
  return product.trustless === FlagType.VALID ? 1 : 0
}

const scorePermissionless = (product: Product): 1 | 0 => {
  return product.permissionless === FlagType.VALID ? 1 : 0
}

const scorePermissionlessNodes = (product: Product): 1 | 0 => {
  return product.permissionlessNodes === FlagType.VALID ? 1 : 0
}

const scoreMultiClient = (product: Product): 1 | 0 => {
  return product.multiClient === FlagType.VALID ? 1 : 0
}

const scoreClientDiversity = (flag: FlagType | undefined): 2 | 1 | 0 => {
  if (flag === FlagType.VALID) return 2

  if (flag === FlagType.WARNING) return 1

  return 0
}

const scoreEconomical = (product: Product): 1 | 0 => {
  return product.economical === FlagType.VALID ? 1 : 0
}

const getRankingScore = (product: Product): number => {
  let score = 0
  score += scoreOpenSource(product)
  score += scoreAudited(product)
  score += scoreBugBounty(product)
  score += scoreBattleTested(product)
  score += scoreTrustless(product)
  score += scorePermissionless(product)
  score += scorePermissionlessNodes(product)
  score += scoreMultiClient(product)
  score += scoreClientDiversity(product.executionDiversity)
  score += scoreClientDiversity(product.consensusDiversity)
  score += scoreEconomical(product)
  return score
}

const getBattleTestedFlag = (
  _launchDate: string
): FlagType.CAUTION | FlagType.WARNING | FlagType.VALID => {
  const launchDate = new Date(_launchDate)
  const now = new Date()
  const halfYearAgo = new Date()
  const oneYearAgo = new Date()
  halfYearAgo.setDate(now.getDate() - 183)
  oneYearAgo.setDate(now.getDate() - 365)

  if (oneYearAgo > launchDate) return FlagType.VALID
  if (halfYearAgo > launchDate) return FlagType.CAUTION
  return FlagType.WARNING
}

const getDiversityOfClients = (
  _pctMajorityClient: number | null
): FlagType.VALID | FlagType.UNKNOWN | FlagType.WARNING => {
  if (_pctMajorityClient === null) return FlagType.UNKNOWN
  if (_pctMajorityClient > 50) return FlagType.WARNING
  return FlagType.VALID
}

const getFlagFromBoolean = (bool: boolean) =>
  bool ? FlagType.VALID : FlagType.FALSE

const getBrandProperties = ({
  hue,
  SAT,
  LUM,
  ...rest
}: Pick<
  StakingCategoryType,
  "name" | "imageName" | "hue" | "url" | "matomo"
> & { SAT: string; LUM: string }): Pick<
  Product,
  "name" | "imageName" | "color" | "url" | "matomo"
> => ({
  color: `hsla(${hue}, ${SAT}, ${LUM}, 1)`,
  ...rest,
})

const getTagProperties = (
  props: Pick<StakingCategoryType, "platforms" | "ui">
): Pick<Product, "platforms" | "ui"> => props

const getSharedSecurityProperties = (
  props: Pick<
    StakingCategoryType,
    "isFoss" | "audits" | "hasBugBounty" | "launchDate"
  >
): Pick<Product, "openSource" | "audited" | "bugBounty" | "battleTested"> => ({
  openSource: getFlagFromBoolean(props.isFoss),
  audited: getFlagFromBoolean(!!props.audits?.length),
  bugBounty: getFlagFromBoolean(props.hasBugBounty),
  battleTested: getBattleTestedFlag(props.launchDate),
})

export {
  getBrandProperties,
  getDiversityOfClients,
  getFlagFromBoolean,
  getRankingScore,
  getSharedSecurityProperties,
  getTagProperties,
}

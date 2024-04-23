import type { MatomoEventOptions } from "@/lib/utils/matomo"

import type stakingProducts from "@/data/staking-products.json"

export enum FlagType {
  VALID = "green-check",
  CAUTION = "caution",
  WARNING = "warning",
  FALSE = "false",
  UNKNOWN = "unknown",
}

export type Product = {
  name: string
  imageName: string
  color: string
  url: string
  platforms: Array<string>
  ui: Array<string>
  minEth?: number
  openSource: FlagType
  audited: FlagType
  bugBounty: FlagType
  battleTested: FlagType
  trustless?: FlagType
  selfCustody?: FlagType
  liquidityToken?: FlagType
  permissionless?: FlagType
  permissionlessNodes?: FlagType
  multiClient?: FlagType
  consensusDiversity?: FlagType
  executionDiversity?: FlagType
  economical?: FlagType
  matomo: MatomoEventOptions
}

export type StakingProductsType = typeof stakingProducts

export type NodeToolsType = StakingProductsType["nodeTools"]
export type KeyGenType = StakingProductsType["keyGen"]
export type PoolsType = StakingProductsType["pools"]
export type SaasType = StakingProductsType["saas"]

export type StakingProductsCategoryKeys = keyof StakingProductsType

export type StakingCategoryType =
  StakingProductsType[StakingProductsCategoryKeys][number]

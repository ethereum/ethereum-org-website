import { safeShuffle } from "@/lib/utils/random"

import stakingProducts from "@/data/staking-products.json"

import { StakingProductCard } from "./StakingProductCard"
import {
  KeyGenType,
  NodeToolsType,
  PoolsType,
  Product,
  SaasType,
  StakingProductsCategoryKeys,
} from "./types"
import {
  getBrandProperties,
  getDiversityOfClients,
  getFlagFromBoolean,
  getRankingScore,
  getSharedSecurityProperties,
  getTagProperties,
} from "./utils"

export type StakingProductsCardGridProps = {
  category: StakingProductsCategoryKeys
}

const getRankedProducts = (
  category: StakingProductsCategoryKeys
): Product[] => {
  const categoryProducts = stakingProducts[category]
  const products: Product[] = []

  const mapCatProducts = <T,>(items: T[], cb: (listing: T) => Product) =>
    items.map((item) => cb(item))

  // Pooled staking services
  if (category === "pools") {
    products.push(
      ...mapCatProducts(categoryProducts as PoolsType, (listing) => ({
        ...getBrandProperties(listing),
        ...getTagProperties(listing),
        ...getSharedSecurityProperties(listing),
        trustless: getFlagFromBoolean(listing.isTrustless),
        permissionlessNodes: getFlagFromBoolean(listing.hasPermissionlessNodes),
        executionDiversity: getDiversityOfClients(
          listing.pctMajorityExecutionClient
        ),
        consensusDiversity: getDiversityOfClients(
          listing.pctMajorityConsensusClient
        ),
        liquidityToken: getFlagFromBoolean(!!listing.tokens?.length),
        minEth: listing.minEth,
      }))
    )
  }

  // Solo staking products
  if (category === "nodeTools") {
    products.push(
      ...mapCatProducts(categoryProducts as NodeToolsType, (listing) => ({
        ...getBrandProperties(listing),
        ...getTagProperties(listing),
        ...getSharedSecurityProperties(listing),
        trustless: getFlagFromBoolean(listing.isTrustless),
        permissionless: getFlagFromBoolean(listing.isPermissionless),
        multiClient: getFlagFromBoolean(listing.multiClient),
        selfCustody: getFlagFromBoolean(true),
        economical: getFlagFromBoolean(listing.minEth < 32),
        minEth: listing.minEth,
      }))
    )
  }

  // Staking as a service
  if (category === "saas") {
    products.push(
      ...mapCatProducts(categoryProducts as SaasType, (listing) => ({
        ...getBrandProperties(listing),
        ...getTagProperties(listing),
        ...getSharedSecurityProperties(listing),
        permissionless: getFlagFromBoolean(listing.isPermissionless),
        executionDiversity: getDiversityOfClients(
          listing.pctMajorityExecutionClient
        ),
        consensusDiversity: getDiversityOfClients(
          listing.pctMajorityConsensusClient
        ),
        selfCustody: getFlagFromBoolean(listing.isSelfCustody),
        minEth: listing.minEth,
      }))
    )
  }

  // Key generators
  if (category === "keyGen") {
    products.push(
      ...mapCatProducts(categoryProducts as KeyGenType, (listing) => ({
        ...getBrandProperties(listing),
        ...getTagProperties(listing),
        ...getSharedSecurityProperties(listing),
        permissionless: getFlagFromBoolean(listing.isPermissionless),
        selfCustody: getFlagFromBoolean(listing.isSelfCustody),
      }))
    )
  }

  return safeShuffle(products)
    .map((product) => ({ ...product, rankingScore: getRankingScore(product) }))
    .sort((a, b) => b.rankingScore - a.rankingScore)
}

const StakingProductsCardGrid = ({
  category,
}: StakingProductsCardGridProps) => {
  const rankedProducts = getRankedProducts(category)

  return (
    <div className="mx-0 my-12 grid grid-cols-fill-4 gap-6">
      {rankedProducts.map((product) => (
        <StakingProductCard key={product.name} product={product} />
      ))}
    </div>
  )
}

export default StakingProductsCardGrid

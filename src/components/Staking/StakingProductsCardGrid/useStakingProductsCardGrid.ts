import { useEffect, useState } from "react"
import { shuffle } from "lodash"
import { useColorModeValue } from "@chakra-ui/react"
import {
  KeyGenType,
  NodeToolsType,
  PoolsType,
  Product,
  SaasType,
  StakingProductsCategoryKeys,
} from "./types"
import stakingProducts from "../../../data/staking-products.json"

import {
  getBrandProperties,
  getTagProperties,
  getSharedSecurityProperties,
  getFlagFromBoolean,
  getDiversityOfClients,
  getRankingScore,
} from "./utils"

export const useStakingProductsCardGrid = ({
  category,
}: {
  category: StakingProductsCategoryKeys
}) => {
  const [rankedProducts, updateRankedProducts] = useState<Array<Product>>([])
  const [SAT, LUM] = useColorModeValue(["75%", "60%"], ["50%", "35%"])

  useEffect(() => {
    const categoryProducts = stakingProducts[category]
    const products: Array<Product> = []

    function mapCatProducts<T extends unknown>(
      products: T[],
      cb: (listing: T) => Product
    ) {
      return products.map((item) => cb(item))
    }

    // Pooled staking services
    if (category === "pools") {
      products.push(
        ...mapCatProducts(categoryProducts as PoolsType, (listing) => ({
          ...getBrandProperties({ ...listing, SAT, LUM }),
          ...getTagProperties(listing),
          ...getSharedSecurityProperties(listing),
          trustless: getFlagFromBoolean(listing.isTrustless),
          permissionlessNodes: getFlagFromBoolean(
            listing.hasPermissionlessNodes
          ),
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
          ...getBrandProperties({ ...listing, SAT, LUM }),
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
          ...getBrandProperties({ ...listing, SAT, LUM }),
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
          ...getBrandProperties({ ...listing, SAT, LUM }),
          ...getTagProperties(listing),
          ...getSharedSecurityProperties(listing),
          permissionless: getFlagFromBoolean(listing.isPermissionless),
          selfCustody: getFlagFromBoolean(listing.isSelfCustody),
        }))
      )
    }

    if (products) {
      updateRankedProducts(
        shuffle(products)
          .map((product) => ({
            ...product,
            rankingScore: getRankingScore(product),
          }))
          .sort((a, b) => b.rankingScore - a.rankingScore)
      )
    }
  }, [])

  return {
    rankedProducts,
  }
}

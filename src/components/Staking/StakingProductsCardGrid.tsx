import React, { useEffect, useState } from "react"
import { shuffle } from "lodash"
import {
  Badge,
  Box,
  BoxProps,
  Center,
  Flex,
  Heading,
  HStack,
  Icon as ChakraIcon,
  List,
  ListIcon,
  ListItem,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react"
// Data imports
import stakingProducts from "../../data/staking-products.json"
// Component imports
import { ButtonLink } from "../Buttons"
import Translation from "../Translation"
// SVG imports
import {
  CautionProductGlyphIcon,
  GreenCheckProductGlyphIcon,
  UnknownProductGlyphIcon,
  WarningProductGlyphIcon,
} from "../icons/staking"

import { MatomoEventOptions } from "../../utils/matomo"
// When adding a product svg, be sure to add to mapping below as well.

const PADDED_DIV_STYLE: BoxProps = {
  px: 8,
  py: 6,
}

enum FlagType {
  VALID = "green-check",
  CAUTION = "caution",
  WARNING = "warning",
  FALSE = "false",
  UNKNOWN = "unknown",
}

const getIconFromName = (imageName: string): typeof ChakraIcon | undefined => {
  const { [imageName + "GlyphIcon"]: Icon } = require("../icons/staking")
  return Icon
}

const Status = ({ status }: { status: FlagType }) => {
  if (!status) return null

  const getStatusIcon = () => {
    switch (status) {
      case "green-check":
        return GreenCheckProductGlyphIcon
      case "caution":
        return CautionProductGlyphIcon
      case "warning":
      case "false":
        return WarningProductGlyphIcon
      default:
        return UnknownProductGlyphIcon
    }
  }

  return <ListIcon as={getStatusIcon()} fontSize="2xl" m={0} />
}

const StakingBadge: React.FC<{
  type: "ui" | "platform"
  children: React.ReactNode
}> = ({ type, children }) => {
  const uiTypeColor = type === "ui" && "stakingPillUI"
  const platformTypeColor = type === "platform" && "stakingPillPlatform"

  return (
    <Badge
      size="lg"
      background={uiTypeColor || platformTypeColor || undefined}
      textTransform="initial"
    >
      {children}
    </Badge>
  )
}

type Product = {
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
interface ICardProps {
  product: Product
}

const StakingProductCard: React.FC<ICardProps> = ({
  product: {
    name,
    imageName,
    color,
    url,
    platforms,
    ui,
    minEth,
    openSource,
    audited,
    bugBounty,
    battleTested,
    trustless,
    selfCustody,
    liquidityToken,
    permissionless,
    permissionlessNodes,
    multiClient,
    consensusDiversity,
    executionDiversity,
    economical,
    matomo,
  },
}) => {
  const Svg = getIconFromName(imageName)
  type DataType = { label: JSX.Element; status?: FlagType }
  const data: DataType[] = [
    {
      label: <Translation id="page-staking-considerations-solo-1-title" />,
      status: openSource,
    },
    {
      label: <Translation id="page-staking-considerations-solo-2-title" />,
      status: audited,
    },
    {
      label: <Translation id="page-staking-considerations-solo-3-title" />,
      status: bugBounty,
    },
    {
      label: <Translation id="page-staking-considerations-solo-4-title" />,
      status: battleTested,
    },
    {
      label: <Translation id="page-staking-considerations-solo-5-title" />,
      status: trustless,
    },
    {
      label: <Translation id="page-staking-considerations-solo-6-title" />,
      status: permissionless,
    },
    {
      label: <Translation id="page-staking-considerations-pools-6-title" />,
      status: permissionlessNodes,
    },
    {
      label: <Translation id="page-staking-considerations-solo-7-title" />,
      status: multiClient,
    },
    {
      label: <Translation id="page-staking-considerations-saas-7-title" />,
      status: executionDiversity,
    },
    {
      label: <Translation id="page-staking-considerations-saas-8-title" />,
      status: consensusDiversity,
    },
    {
      label: <Translation id="page-staking-considerations-solo-8-title" />,
      status: selfCustody,
    },
    {
      label: <Translation id="page-staking-considerations-pools-8-title" />,
      status: liquidityToken,
    },
    {
      label: <Translation id="page-staking-considerations-solo-9-title" />,
      status: economical,
    },
  ]

  const filteredData = data.filter(
    (item): item is Required<DataType> => !!item.status
  )

  return (
    <Flex
      direction="column"
      background="offBackground"
      borderRadius="base"
      _hover={{
        transition: "0.1s",
        transform: "scale(1.01)",
      }}
    >
      <HStack
        {...PADDED_DIV_STYLE}
        spacing={6}
        background={color}
        bgGradient="linear(0deg, rgba(0, 0, 0, 30%), rgba(0, 0, 0, 0))"
        borderRadius="base"
        maxH={24}
      >
        {!!Svg && <Svg fontSize="2rem" color="white" />}
        <Heading as="h4" fontSize="2xl" color="white">
          {name}
        </Heading>
      </HStack>
      {typeof minEth !== "undefined" && (
        <Center
          fontWeight={700}
          fontSize="base"
          color="textTableOfContents"
          textTransform="uppercase"
          pt={6}
        >
          {minEth > 0 ? `From ${minEth} ETH` : "Any amount"}
        </Center>
      )}
      <Flex
        {...PADDED_DIV_STYLE}
        flexWrap="wrap"
        gap={1}
        flex={1}
        alignItems="flex-start"
      >
        {platforms &&
          platforms.map((platform, idx) => (
            <StakingBadge type="platform" key={idx}>
              {platform}
            </StakingBadge>
          ))}
        {ui &&
          ui.map((_ui, idx) => (
            <StakingBadge type="ui" key={idx}>
              {_ui}
            </StakingBadge>
          ))}
      </Flex>
      <Box {...PADDED_DIV_STYLE} py={0}>
        <List m={0} gap={3}>
          {filteredData &&
            filteredData.map(({ label, status }, idx) => (
              <ListItem
                as={Flex}
                key={idx}
                textTransform="uppercase"
                fontSize="xs"
                lineHeight="0.875rem"
                letterSpacing="wider"
                my={4}
                ms="auto"
                me={0}
                gap="1em"
                alignItems="center"
              >
                <Status status={status} />
                {label}
              </ListItem>
            ))}
        </List>
      </Box>
      <Box {...PADDED_DIV_STYLE}>
        <ButtonLink to={url} customEventOptions={matomo} width="100%">
          <Translation id="page-staking-products-get-started" />
        </ButtonLink>
      </Box>
    </Flex>
  )
}

type StakingProductsType = typeof stakingProducts

type NodeToolsType = StakingProductsType["nodeTools"]
type KeyGenType = StakingProductsType["keyGen"]
type PoolsType = StakingProductsType["pools"]
type SaasType = StakingProductsType["saas"]

type StakingProductsCategoryKeys = keyof StakingProductsType

type StakingCategoryType =
  StakingProductsType[StakingProductsCategoryKeys][number]

export interface IProps {
  category: StakingProductsCategoryKeys
}

const StakingProductCardGrid: React.FC<IProps> = ({ category }) => {
  const [rankedProducts, updateRankedProducts] = useState<Array<Product>>([])
  const [SAT, LUM] = useColorModeValue(["75%", "60%"], ["50%", "35%"])

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

    if (halfYearAgo > launchDate) {
      return FlagType.CAUTION
    }

    if (oneYearAgo > launchDate) {
      return FlagType.VALID
    }

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
    ...rest
  }: Pick<
    StakingCategoryType,
    "name" | "imageName" | "hue" | "url" | "matomo"
  >): Pick<Product, "name" | "imageName" | "color" | "url" | "matomo"> => ({
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
  ): Pick<
    Product,
    "openSource" | "audited" | "bugBounty" | "battleTested"
  > => ({
    openSource: getFlagFromBoolean(props.isFoss),
    audited: getFlagFromBoolean(!!props.audits?.length),
    bugBounty: getFlagFromBoolean(props.hasBugBounty),
    battleTested: getBattleTestedFlag(props.launchDate),
  })

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
          ...getBrandProperties(listing),
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

  if (!rankedProducts) return null

  return (
    <SimpleGrid
      templateColumns="repeat(auto-fill, minmax(min(100%, 280px), 1fr))"
      gap={8}
      my={12}
      mx={0}
    >
      {rankedProducts.map((product) => (
        <StakingProductCard key={product.name} product={product} />
      ))}
    </SimpleGrid>
  )
}

export default StakingProductCardGrid

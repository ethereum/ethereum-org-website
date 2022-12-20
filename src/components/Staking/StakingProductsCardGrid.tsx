import React, {
  ComponentType,
  ReactNode,
  SVGProps,
  useEffect,
  useState,
} from "react"
import { shuffle } from "lodash"
import {
  Badge,
  Box,
  BoxProps,
  Center,
  Flex,
  Heading,
  HStack,
  Icon,
  List,
  ListIcon,
  ListItem,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react"
// Data imports
import stakingProducts from "../../data/staking-products.json"
// Component imports
import ButtonLink from "../ButtonLink"
import Translation from "../Translation"
// SVG imports
import GreenCheck from "../../assets/staking/green-check-product-glyph.svg"
import Caution from "../../assets/staking/caution-product-glyph.svg"
import Warning from "../../assets/staking/warning-product-glyph.svg"
import Unknown from "../../assets/staking/unknown-product-glyph.svg"
// Product SVGs
import Abyss from "../../assets/staking/abyss-glyph.svg"
import Allnodes from "../../assets/staking/allnodes-glyph.svg"
import Ankr from "../../assets/staking/ankr-glyph.svg"
import Avado from "../../assets/staking/avado-glyph.svg"
import Bloxstaking from "../../assets/staking/bloxstaking-glyph.svg"
import Dappnode from "../../assets/staking/dappnode-glyph.svg"
import DefaultOpenSource from "../../assets/staking/default-open-source-glyph.svg"
import Docker from "../../assets/staking/docker-icon.svg"
import Kiln from "../../assets/staking/kiln-glyph.svg"
import Lido from "../../assets/staking/lido-glyph.svg"
import RocketPool from "../../assets/staking/rocket-pool-glyph.svg"
import Stafi from "../../assets/staking/stafi-glyph.svg"
import Stakefish from "../../assets/staking/stakefish-glyph.svg"
import Stakewise from "../../assets/staking/stakewise-glyph.svg"
import Stereum from "../../assets/staking/stereum-glyph.svg"
import Wagyu from "../../assets/staking/wagyu-glyph.svg"
import { EventOptions } from "../../utils/matomo"
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

const getSvgFromPath = (
  svgPath: string
): ComponentType<SVGProps<SVGElement>> => {
  const mapping = {
    "abyss-glyph.svg": Abyss,
    "allnodes-glyph.svg": Allnodes,
    "ankr-glyph.svg": Ankr,
    "avado-glyph.svg": Avado,
    "bloxstaking-glyph.svg": Bloxstaking,
    "dappnode-glyph.svg": Dappnode,
    "docker-icon.svg": Docker,
    "default-open-source-glyph.svg": DefaultOpenSource,
    "kiln-glyph.svg": Kiln,
    "lido-glyph.svg": Lido,
    "rocket-pool-glyph.svg": RocketPool,
    "stafi-glyph.svg": Stafi,
    "stakewise-glyph.svg": Stakewise,
    "stereum-glyph.svg": Stereum,
    "wagyu-glyph.svg": Wagyu,
    "stakefish-glyph.svg": Stakefish,
  }
  return mapping[svgPath]
}

const Status: React.FC<{ status: FlagType }> = ({ status }) => {
  if (!status) return null

  const styles = { fontSize: "2xl", m: 0 }
  switch (status) {
    case "green-check":
      return <ListIcon as={GreenCheck} {...styles} />
    case "caution":
      return <ListIcon as={Caution} {...styles} />
    case "warning":
    case "false":
      return <ListIcon as={Warning} {...styles} />
    default:
      return <ListIcon as={Unknown} {...styles} />
  }
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
  svgPath: string
  color: string
  url: string
  platforms: Array<string>
  ui: Array<string>
  minEth: number
  openSource: FlagType
  audited: FlagType
  bugBounty: FlagType
  battleTested: FlagType
  trustless: FlagType
  selfCustody: FlagType
  liquidityToken: FlagType
  permissionless: FlagType
  permissionlessNodes: FlagType
  multiClient: FlagType
  diverseClients: FlagType
  economical: FlagType
  matomo: EventOptions
}
interface ICardProps {
  product: Product
}

const StakingProductCard: React.FC<ICardProps> = ({
  product: {
    name,
    svgPath,
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
    diverseClients,
    economical,
    matomo,
  },
}) => {
  const Svg = getSvgFromPath(svgPath)
  const data = [
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
      status: diverseClients,
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
  ].filter(({ status }) => !!status)

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
        {!!Svg && <Icon as={Svg} fontSize="2rem" />}
        <Heading fontSize="2xl" color="white">
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
          {data &&
            data.map(({ label, status }, idx) => (
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

export interface IProps {
  category: string
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

  const scoreDiverseClients = (product: Product): 2 | 1 | 0 => {
    return product.diverseClients === FlagType.VALID
      ? 2
      : product.diverseClients === FlagType.WARNING
      ? 1
      : 0
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
    score += scoreDiverseClients(product)
    score += scoreEconomical(product)
    return score
  }

  const getBattleTestedFlag = (_launchDate: string): FlagType => {
    let battleTested = FlagType.WARNING
    const launchDate = new Date(_launchDate)
    const now = new Date()
    const halfYearAgo = new Date()
    const oneYearAgo = new Date()
    halfYearAgo.setDate(now.getDate() - 183)
    oneYearAgo.setDate(now.getDate() - 365)
    if (halfYearAgo > launchDate) {
      battleTested = FlagType.CAUTION
    }
    if (oneYearAgo > launchDate) {
      battleTested = FlagType.VALID
    }
    return battleTested
  }

  const getDiversityOfClients = (
    _pctMajorityClient: number | null
  ): FlagType => {
    if (!_pctMajorityClient) return FlagType.UNKNOWN
    if (_pctMajorityClient > 50) return FlagType.WARNING
    return FlagType.VALID
  }

  const getFlagFromBoolean = (bool: boolean): FlagType =>
    !!bool ? FlagType.VALID : FlagType.FALSE

  const getBrandProperties = ({
    name,
    svgPath,
    hue,
    url,
    socials,
    matomo,
  }) => ({
    name,
    svgPath,
    color: `hsla(${hue}, ${SAT}, ${LUM}, 1)`,
    url,
    socials,
    matomo,
  })

  const getTagProperties = ({ platforms, ui }) => ({
    platforms,
    ui,
  })

  const getSharedSecurityProperties = ({
    isFoss,
    audits,
    hasBugBounty,
    launchDate,
  }) => ({
    openSource: getFlagFromBoolean(isFoss),
    audited: getFlagFromBoolean(audits?.length),
    bugBounty: getFlagFromBoolean(hasBugBounty),
    battleTested: getBattleTestedFlag(launchDate),
  })

  useEffect(() => {
    const categoryProducts = stakingProducts[category]
    const products: Array<Product> = []

    // Pooled staking services
    if (category === "pools") {
      products.push(
        ...categoryProducts.map((listing) => ({
          ...getBrandProperties(listing),
          ...getTagProperties(listing),
          ...getSharedSecurityProperties(listing),
          trustless: getFlagFromBoolean(listing.isTrustless),
          permissionlessNodes: getFlagFromBoolean(
            listing.hasPermissionlessNodes
          ),
          diverseClients: getDiversityOfClients(listing.pctMajorityClient),
          liquidityToken: getFlagFromBoolean(listing.tokens?.length),
          minEth: listing.minEth,
        }))
      )
    }

    // Solo staking products
    if (category === "nodeTools") {
      products.push(
        ...categoryProducts.map((listing) => ({
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
        ...categoryProducts.map((listing) => ({
          ...getBrandProperties(listing),
          ...getTagProperties(listing),
          ...getSharedSecurityProperties(listing),
          permissionless: getFlagFromBoolean(listing.isPermissionless),
          diverseClients: getDiversityOfClients(listing.pctMajorityClient),
          selfCustody: getFlagFromBoolean(listing.isSelfCustody),
          minEth: listing.minEth,
        }))
      )
    }
    // Key generators
    if (category === "keyGen") {
      products.push(
        ...categoryProducts.map((listing) => ({
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

import { ComponentType, SVGProps, useEffect, useState } from "react"
import { shuffle } from "lodash"
import { useTranslation } from "next-i18next"
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

import { ButtonLink } from "@/components/Buttons"
// SVG imports
import {
  CautionProductGlyphIcon,
  GreenCheckProductGlyphIcon,
  UnknownProductGlyphIcon,
  WarningProductGlyphIcon,
} from "@/components/icons/staking"

import { MatomoEventOptions } from "@/lib/utils/matomo"

import stakingProducts from "@/data/staking-products.json"

const PADDED_DIV_STYLE: BoxProps = {
  px: 8,
  py: 6,
}

// TODO: Remove enum, replace with "as const" object
enum FlagType {
  VALID = "green-check",
  CAUTION = "caution",
  WARNING = "warning",
  FALSE = "false",
  UNKNOWN = "unknown",
}

const getIconFromName = (
  imageName: string
): ComponentType<SVGProps<SVGElement>> => {
  const {
    [imageName + "GlyphIcon"]: Icon,
  } = require("@/components/icons/staking")
  return Icon
}

const Status = ({ status }: { status: FlagType }) => {
  if (!status) return null

  const styles = { fontSize: "2xl", m: 0 }
  switch (status) {
    case "green-check":
      return <ListIcon as={GreenCheckProductGlyphIcon} {...styles} />
    case "caution":
      return <ListIcon as={CautionProductGlyphIcon} {...styles} />
    case "warning":
    case "false":
      return <ListIcon as={WarningProductGlyphIcon} {...styles} />
    default:
      return <ListIcon as={UnknownProductGlyphIcon} {...styles} />
  }
}

const StakingBadge = ({
  type,
  children,
}: {
  type: "ui" | "platform"
  children: React.ReactNode
}) => {
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
  consensusDiversity: FlagType
  executionDiversity: FlagType
  economical: FlagType
  matomo: MatomoEventOptions
}
type StakingProductCardProps = {
  product: Product
}

const StakingProductCard = ({
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
}: StakingProductCardProps) => {
  const { t } = useTranslation("page-staking")
  const Svg = getIconFromName(imageName)
  const data = [
    {
      label: t("page-staking-considerations-solo-1-title"),
      status: openSource,
    },
    {
      label: t("page-staking-considerations-solo-2-title"),
      status: audited,
    },
    {
      label: t("page-staking-considerations-solo-3-title"),
      status: bugBounty,
    },
    {
      label: t("page-staking-considerations-solo-4-title"),
      status: battleTested,
    },
    {
      label: t("page-staking-considerations-solo-5-title"),
      status: trustless,
    },
    {
      label: t("page-staking-considerations-solo-6-title"),
      status: permissionless,
    },
    {
      label: t("page-staking-considerations-pools-6-title"),
      status: permissionlessNodes,
    },
    {
      label: t("page-staking-considerations-solo-7-title"),
      status: multiClient,
    },
    {
      label: t("page-staking-considerations-saas-7-title"),
      status: executionDiversity,
    },
    {
      label: t("page-staking-considerations-saas-8-title"),
      status: consensusDiversity,
    },
    {
      label: t("page-staking-considerations-solo-8-title"),
      status: selfCustody,
    },
    {
      label: t("page-staking-considerations-pools-8-title"),
      status: liquidityToken,
    },
    {
      label: t("page-staking-considerations-solo-9-title"),
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
        {!!Svg && <Icon as={Svg} fontSize="2rem" color="white" />}
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
          {t("page-staking-products-get-started")}
        </ButtonLink>
      </Box>
    </Flex>
  )
}

export type StakingProductCardGridProps = {
  category: string
}

const StakingProductCardGrid = ({ category }: StakingProductCardGridProps) => {
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

  const scoreClientDiversity = (flag: FlagType): 2 | 1 | 0 => {
    return flag === FlagType.VALID ? 2 : flag === FlagType.WARNING ? 1 : 0
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
    if (_pctMajorityClient === null) return FlagType.UNKNOWN
    if (_pctMajorityClient > 50) return FlagType.WARNING
    return FlagType.VALID
  }

  const getFlagFromBoolean = (bool: boolean): FlagType =>
    !!bool ? FlagType.VALID : FlagType.FALSE

  const getBrandProperties = ({
    name,
    imageName,
    hue,
    url,
    socials,
    matomo,
  }) => ({
    name,
    imageName,
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
          executionDiversity: getDiversityOfClients(
            listing.pctMajorityExecutionClient
          ),
          consensusDiversity: getDiversityOfClients(
            listing.pctMajorityConsensusClient
          ),
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

import { useTranslation } from "next-i18next"
import type { ComponentType, ReactNode, SVGProps } from "react"
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
} from "@chakra-ui/react"

import { ButtonLink } from "@/components/Buttons"
import {
  CautionProductGlyphIcon,
  GreenCheckProductGlyphIcon,
  UnknownProductGlyphIcon,
  WarningProductGlyphIcon,
} from "@/components/icons/staking"

import { FlagType, Product } from "./types"

const getIconFromName = (
  imageName: string
): ComponentType<SVGProps<SVGElement>> => {
  const {
    [imageName + "GlyphIcon"]: Icon,
  } = require("@/components/icons/staking")
  return Icon
}

const Status = ({ status }: { status: FlagType | undefined }) => {
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
  children: ReactNode
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

type StakingProductCardProps = {
  product: Product
}

export const StakingProductCard = ({
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
  const PADDED_DIV_STYLE: BoxProps = {
    px: 8,
    py: 6,
  }

  const { t } = useTranslation("page-staking")
  const Svg = getIconFromName(imageName)
  type DataType = { label: string; status?: FlagType }
  const data: DataType[] = [
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
        {platforms.map((platform, idx) => (
          <StakingBadge type="platform" key={idx}>
            {platform}
          </StakingBadge>
        ))}
        {ui.map((_ui, idx) => (
          <StakingBadge type="ui" key={idx}>
            {_ui}
          </StakingBadge>
        ))}
      </Flex>
      <Box {...PADDED_DIV_STYLE} py={0}>
        <List m={0} gap={3}>
          {data.map(({ label, status }, idx) => (
            <ListItem
              as={Flex}
              key={idx}
              textTransform="uppercase"
              fontSize="xs"
              lineHeight="0.875rem"
              letterSpacing="wider"
              my="4"
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
        <ButtonLink href={url} customEventOptions={matomo} width="100%">
          {t("page-staking-products-get-started")}
        </ButtonLink>
      </Box>
    </Flex>
  )
}

import * as React from "react"
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
} from "@chakra-ui/react"
import { ButtonLink } from "../../Buttons"
import Translation from "../../Translation"
import {
  CautionProductGlyphIcon,
  GreenCheckProductGlyphIcon,
  UnknownProductGlyphIcon,
  WarningProductGlyphIcon,
} from "../../icons/staking"
import { FlagType, Product } from "./types"

const getIconFromName = (imageName: string): typeof ChakraIcon | undefined => {
  const { [imageName + "GlyphIcon"]: Icon } = require("../icons/staking")
  return Icon
}

export const Status = ({ status }: { status: FlagType }) => {
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

interface ICardProps {
  product: Product
}

export const StakingProductCard: React.FC<ICardProps> = ({
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
  const PADDED_DIV_STYLE: BoxProps = {
    px: 8,
    py: 6,
  }

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

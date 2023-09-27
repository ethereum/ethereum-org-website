import React from "react"
import { Box, Flex, Heading, useTheme } from "@chakra-ui/react"

import InlineLink from "../Link"
import Translation from "../Translation"
import Text from "../OldText"
import OldHeading from "../OldHeading"

import { MatomoEventOptions, trackCustomEvent } from "../../utils/matomo"
import { TranslationKey } from "../../utils/translations"
import {
  StakingGlyphCloudIcon,
  StakingGlyphCPUIcon,
  StakingGlyphTokenWalletIcon,
} from "../icons/staking"

interface DataType {
  title: TranslationKey
  linkText: TranslationKey
  to: string
  matomo: MatomoEventOptions
  color: string
  glyph: JSX.Element
}

type StakingTypePage = "solo" | "saas" | "pools"

export interface IProps {
  page: StakingTypePage
  className?: string
}

const StakingComparison: React.FC<IProps> = ({ page, className }) => {
  const theme = useTheme()
  const { stakingGold, stakingGreen, stakingBlue } = theme.colors

  const solo: DataType = {
    title: "page-staking-dropdown-solo",
    linkText: "page-staking-learn-more-solo",
    to: "/staking/solo/",
    matomo: {
      eventCategory: `StakingComparison`,
      eventAction: `Clicked`,
      eventName: "clicked solo staking",
    },
    color: stakingGold,
    glyph: <StakingGlyphCPUIcon color="stakingGold" boxSize="50px" />,
  }
  const saas: DataType = {
    title: "page-staking-saas-with-abbrev",
    linkText: "page-staking-learn-more-saas",
    to: "/staking/saas/",
    matomo: {
      eventCategory: `StakingComparison`,
      eventAction: `Clicked`,
      eventName: "clicked staking as a service",
    },
    color: stakingGreen,
    glyph: <StakingGlyphCloudIcon color="stakingGreen" w="50px" h="28px" />,
  }
  const pools: DataType = {
    title: "page-staking-dropdown-pools",
    linkText: "page-staking-learn-more-pools",
    to: "/staking/pools/",
    matomo: {
      eventCategory: `StakingComparison`,
      eventAction: `Clicked`,
      eventName: "clicked pooled staking",
    },
    color: stakingBlue,
    glyph: (
      <StakingGlyphTokenWalletIcon color="stakingBlue" w="50px" h="39px" />
    ),
  }
  const data: {
    [key in StakingTypePage]: (DataType & {
      content: TranslationKey
    })[]
  } = {
    solo: [
      {
        ...saas,
        content: "page-staking-comparison-solo-saas",
      },
      {
        ...pools,
        content: "page-staking-comparison-solo-pools",
      },
    ],
    saas: [
      {
        ...solo,
        content: "page-staking-comparison-saas-solo",
      },
      {
        ...pools,
        content: "page-staking-comparison-saas-pools",
      },
    ],
    pools: [
      {
        ...solo,
        content: "page-staking-comparison-pools-solo",
      },
      {
        ...saas,
        content: "page-staking-comparison-pools-saas",
      },
    ],
  }

  const selectedData = data[page]

  return (
    <Flex
      direction="column"
      gap={8}
      bg="linear-gradient(
      83.46deg,
      rgba(127, 127, 213, 0.2) 7.03%,
      rgba(138, 168, 231, 0.2) 52.42%,
      rgba(145, 234, 228, 0.2) 98.77%
    )"
      py={8}
      px={{ base: 6, md: 8 }}
      mt={16}
      className={className}
    >
      <OldHeading fontSize="2rem">Comparison with other options</OldHeading>
      {selectedData.map(
        ({ title, linkText, to, color, content, glyph, matomo }, idx) => (
          <Flex gap={6} direction={{ base: "column", md: "row" }} key={idx}>
            {!!glyph && (
              <Flex
                direction="column"
                justify="flex-start"
                align="center"
                w={12}
                maxH={12}
              >
                {glyph}
              </Flex>
            )}
            <Box>
              <Heading as="h3" fontSize="2xl" color={color} mb={2}>
                <Translation id={title} />
              </Heading>
              <Text>
                <Translation id={content} />
              </Text>
              <InlineLink
                onClick={() => {
                  trackCustomEvent(matomo)
                }}
                to={to}
              >
                <Translation id={linkText} />
              </InlineLink>
            </Box>
          </Flex>
        )
      )}
    </Flex>
  )
}

export default StakingComparison

import { useTranslation } from "next-i18next"
import { Box, Flex, Heading, useTheme } from "@chakra-ui/react"

import type { StakingPage, TranslationKey } from "@/lib/types"

import {
  StakingGlyphCloudIcon,
  StakingGlyphCPUIcon,
  StakingGlyphTokenWalletIcon,
} from "@/components/icons/staking"
import InlineLink from "@/components/Link"
import OldHeading from "@/components/OldHeading"
import Text from "@/components/OldText"

import { MatomoEventOptions, trackCustomEvent } from "@/lib/utils/matomo"

interface DataType {
  title: TranslationKey
  linkText: TranslationKey
  href: string
  matomo: MatomoEventOptions
  color: string
  glyph: JSX.Element
}

export type StakingComparisonProps = {
  page: StakingPage
  className?: string
}

const StakingComparison = ({ page, className }: StakingComparisonProps) => {
  const theme = useTheme()
  const { stakingGold, stakingGreen, stakingBlue } = theme.colors
  const { t } = useTranslation("page-staking")

  const solo: DataType = {
    title: "page-staking-dropdown-solo",
    linkText: "page-staking-learn-more-solo",
    href: "/staking/solo/",
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
    href: "/staking/saas/",
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
    href: "/staking/pools/",
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
    [key in StakingPage]: (DataType & {
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
      <OldHeading fontSize="2rem">
        {t("page-staking-comparison-with-other-options")}
      </OldHeading>
      {selectedData.map(
        ({ title, linkText, href, color, content, glyph, matomo }, idx) => (
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
                {t(title)}
              </Heading>
              <Text>{t(content)}</Text>
              <InlineLink
                onClick={() => {
                  trackCustomEvent(matomo)
                }}
                href={href}
              >
                {t(linkText)}
              </InlineLink>
            </Box>
          </Flex>
        )
      )}
    </Flex>
  )
}

export default StakingComparison

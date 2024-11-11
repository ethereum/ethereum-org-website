import { useTranslation } from "next-i18next"
import { Box, Heading, useTheme } from "@chakra-ui/react"

import type { StakingPage, TranslationKey } from "@/lib/types"

import {
  StakingGlyphCloudIcon,
  StakingGlyphCPUIcon,
  StakingGlyphTokenWalletIcon,
} from "@/components/icons/staking"
import InlineLink from "@/components/Link"
import OldHeading from "@/components/OldHeading"
import Text from "@/components/OldText"

import { cn } from "@/lib/utils/cn"
import { MatomoEventOptions, trackCustomEvent } from "@/lib/utils/matomo"

import { Flex } from "../ui/flex"

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
    glyph: (
      <StakingGlyphCPUIcon className="h-[50px] w-[50px]" color="stakingGold" />
    ),
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
    glyph: (
      <StakingGlyphCloudIcon
        className="h-[28px] w-[50px]"
        color="stakingGreen"
      />
    ),
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
      <StakingGlyphTokenWalletIcon
        className="h-[39px] w-[50px]"
        color="stakingBlue"
      />
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
      className={cn(
        "mt-16 flex-col gap-8 px-6 py-8 md:px-8",
        "bg-gradient-to-r from-accent-a/10 to-accent-c/10 dark:from-accent-a/20 dark:to-accent-c-hover/20",
        className
      )}
    >
      <OldHeading fontSize="2rem">
        {t("page-staking-comparison-with-other-options")}
      </OldHeading>
      {selectedData.map(
        ({ title, linkText, href, color, content, glyph, matomo }, idx) => (
          <Flex className="flex-col gap-6 md:flex-row" key={idx}>
            {!!glyph && (
              <Flex className="max-h-12 w-12 flex-col items-center justify-start">
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

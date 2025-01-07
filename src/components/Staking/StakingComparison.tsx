import { useTranslation } from "next-i18next"

import type { StakingPage, TranslationKey } from "@/lib/types"

import {
  StakingGlyphCloudIcon,
  StakingGlyphCPUIcon,
  StakingGlyphTokenWalletIcon,
} from "@/components/icons/staking"

import { cn } from "@/lib/utils/cn"
import { MatomoEventOptions, trackCustomEvent } from "@/lib/utils/matomo"

import { Flex } from "../ui/flex"
import InlineLink from "../ui/Link"

interface DataType {
  title: TranslationKey
  linkText: TranslationKey
  href: string
  matomo: MatomoEventOptions
  colorClassName: string
  glyph: JSX.Element
}

export type StakingComparisonProps = {
  page: StakingPage
  className?: string
}

const StakingComparison = ({ page, className }: StakingComparisonProps) => {
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
    colorClassName: "text-staking-gold",
    glyph: (
      <StakingGlyphCPUIcon className="h-[50px] w-[50px] text-staking-gold" />
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
    colorClassName: "text-staking-green",
    glyph: (
      <StakingGlyphCloudIcon className="h-[28px] w-[50px] text-staking-green" />
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
    colorClassName: "text-staking-blue",
    glyph: (
      <StakingGlyphTokenWalletIcon className="h-[39px] w-[50px] text-staking-blue" />
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
      <h2 className="mb-4 text-3xl">
        {t("page-staking-comparison-with-other-options")}
      </h2>
      {selectedData.map(
        (
          { title, linkText, href, colorClassName, content, glyph, matomo },
          idx
        ) => (
          <Flex className="flex-col gap-6 md:flex-row" key={idx}>
            {!!glyph && (
              <Flex className="max-h-12 w-12 flex-col items-center justify-start">
                {glyph}
              </Flex>
            )}
            <div>
              <h3 className={cn("mb-2 text-2xl", colorClassName)}>
                {t(title)}
              </h3>
              <p>{t(content)}</p>
              <InlineLink
                onClick={() => {
                  trackCustomEvent(matomo)
                }}
                href={href}
              >
                {t(linkText)}
              </InlineLink>
            </div>
          </Flex>
        )
      )}
    </Flex>
  )
}

export default StakingComparison

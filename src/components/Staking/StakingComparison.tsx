"use client"
import { Cloud, Cpu, Droplets } from "lucide-react"
import { useTranslations } from "next-intl"
import type { JSX } from "react"

import type {
  MatomoEventOptions,
  StakingPage,
  TranslationKey,
} from "@/lib/types"

import { cn } from "@/lib/utils/cn"

import { ButtonLink } from "../ui/buttons/Button"

interface DataType {
  title: TranslationKey
  linkText: TranslationKey
  href: string
  matomo: MatomoEventOptions
  glyphBgClassName: string
  glyph: JSX.Element
}

export type StakingComparisonProps = {
  page: StakingPage
  className?: string
}

const StakingComparison = ({ page, className }: StakingComparisonProps) => {
  const t = useTranslations("page-staking")

  const solo: DataType = {
    title: "page-staking-dropdown-solo",
    linkText: "page-staking-learn-more-solo",
    href: "/staking/solo/",
    matomo: {
      eventCategory: `StakingComparison`,
      eventAction: `Clicked`,
      eventName: "clicked solo staking",
    },
    glyphBgClassName: "bg-staking-gold/20",
    glyph: <Cpu className="size-12 shrink-0 text-staking-gold" />,
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
    glyphBgClassName: "bg-staking-green/20",
    glyph: <Cloud className="size-12 shrink-0 text-staking-green" />,
  }
  const pools: DataType = {
    title: "page-staking-hierarchy-pools-h2",
    linkText: "page-staking-learn-more-pools",
    href: "/staking/pools/",
    matomo: {
      eventCategory: `StakingComparison`,
      eventAction: `Clicked`,
      eventName: "clicked pooled staking",
    },
    glyphBgClassName: "bg-staking-blue/20",
    glyph: <Droplets className="size-12 shrink-0 text-staking-blue" />,
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
    <div
      className={cn(
        "mt-16 flex flex-col gap-10 rounded-base bg-background-highlight p-6 md:p-8",
        className
      )}
    >
      {/* The section heading lives in the markdown page, not here */}
      {selectedData.map(
        (
          { title, linkText, href, glyphBgClassName, content, glyph, matomo },
          idx
        ) => (
          <div className="flex flex-col gap-4" key={idx}>
            <div className="flex items-center gap-4">
              <div
                className={cn(
                  "flex size-20 shrink-0 items-center justify-center rounded-full",
                  glyphBgClassName
                )}
              >
                {glyph}
              </div>
              <h3>{t(title)}</h3>
            </div>
            <p>{t(content)}</p>
            <ButtonLink
              href={href}
              className="w-fit"
              customEventOptions={matomo}
            >
              {t(linkText)}
            </ButtonLink>
          </div>
        )
      )}
    </div>
  )
}

export default StakingComparison

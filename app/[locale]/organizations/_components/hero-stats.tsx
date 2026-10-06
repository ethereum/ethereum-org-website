import { Info } from "lucide-react"
import { getLocale, getTranslations } from "next-intl/server"
import type { ReactNode } from "react"

import Tooltip from "@/components/Tooltip"
import { Flex } from "@/components/ui/flex"
import InlineLink from "@/components/ui/Link"

import { dateTimeFormat, isValidDate } from "@/lib/utils/date"

export type HeroStat = {
  /** Formatted display value; omit to render the error dash */
  value?: ReactNode
  label: ReactNode
  sourceName?: string
  sourceUrl?: string
  lastUpdated?: number | string
}

type HeroStatsProps = {
  stats: HeroStat[]
}

/** Render inside `PageHero`'s `description`; mirrors `StakingStatsBox` */
const HeroStats = async ({ stats }: HeroStatsProps) => {
  const locale = await getLocale()
  const t = await getTranslations("common")

  return (
    <Flex className="flex-col md:flex-row">
      {stats.map(
        ({ value, label, sourceName, sourceUrl, lastUpdated }, idx) => (
          <Flex key={idx} className="flex-col gap-2 border-s p-4 pe-12">
            <div className="inline-block bg-none font-monospace text-3xl font-bold text-primary">
              {value ?? "—"}
            </div>
            <Flex className="gap-2 text-sm uppercase">
              {label}
              {sourceName && sourceUrl && (
                <Tooltip
                  content={
                    <div className="normal-case">
                      <p>
                        {t("data-provided-by")}{" "}
                        <InlineLink href={sourceUrl}>{sourceName}</InlineLink>
                      </p>
                      {lastUpdated && isValidDate(lastUpdated) && (
                        <p className="mt-2">
                          {t("last-updated")}:{" "}
                          {dateTimeFormat(locale, {
                            dateStyle: "medium",
                          }).format(new Date(lastUpdated))}
                        </p>
                      )}
                    </div>
                  }
                >
                  <Info
                    className="size-[1em] text-md hover:text-primary"
                    aria-label={t("data-provided-by")}
                  />
                </Tooltip>
              )}
            </Flex>
          </Flex>
        )
      )}
    </Flex>
  )
}

export default HeroStats

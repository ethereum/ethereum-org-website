import { useTranslation } from "next-i18next"
import { useTheme } from "next-themes"

import type { ChildOnlyProp } from "@/lib/types"

import { cn } from "@/lib/utils/cn"

import { Flex } from "./ui/flex"

type CellProps = ChildOnlyProp & {
  color?: string
  className?: string
}

const Column = ({ children }: ChildOnlyProp) => (
  <Flex className="ms-2 flex-col-reverse first:ms-0 md:ms-4">{children}</Flex>
)

const Cell = ({ children, color, className, ...props }: CellProps) => (
  <div
    className={cn(
      "border border-solid px-2 py-[0.8rem] text-center text-[0.9rem] font-bold leading-none last:rounded-t-2xl md:px-[1.2rem] [&:nth-child(-n+2)]:rounded-bl-2xl [&:nth-child(-n+2)]:rounded-br-2xl",
      className
    )}
    style={{
      borderColor: color || "currentcolor",
      color: color || "currentcolor",
    }}
    {...props}
  >
    {children}
  </div>
)

const ColumnName = ({ children }: ChildOnlyProp) => (
  <Cell className="border-none pt-6">{children}</Cell>
)

const AdoptionChart = () => {
  const { t } = useTranslation("page-what-is-ethereum")
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  return (
    <Flex>
      <Column>
        <ColumnName>2010</ColumnName>
        <Cell color={isDark ? "#FBF9A5" : "#95935B"}>
          {t("adoption-chart-investors-label")}
        </Cell>
      </Column>

      <Column>
        <ColumnName>2014</ColumnName>
        <Cell color={isDark ? "#FBF9A5" : "#95935B"}>
          {t("adoption-chart-investors-label")}
        </Cell>
        <Cell color={isDark ? "#9EC885" : "#67954C"}>
          {t("adoption-chart-developers-label")}
        </Cell>
        <Cell color={isDark ? "#E78F6E" : "#CB7C5E"}>
          {t("adoption-chart-companies-label")}
        </Cell>
      </Column>

      <Column>
        <ColumnName>{t("adoption-chart-column-now-label")}</ColumnName>
        <Cell color={isDark ? "#FBF9A5" : "#95935B"}>
          {t("adoption-chart-investors-label")}
        </Cell>
        <Cell color={isDark ? "#9EC885" : "#67954C"}>
          {t("adoption-chart-developers-label")}
        </Cell>
        <Cell color={isDark ? "#E78F6E" : "#CB7C5E"}>
          {t("adoption-chart-companies-label")}
        </Cell>
        <Cell color={isDark ? "#8EA8CA" : "#5E7492"}>
          {t("adoption-chart-artists-label")}
        </Cell>
        <Cell color={isDark ? "#AC85C2" : "#88669B"}>
          {t("adoption-chart-musicians-label")}
        </Cell>
        <Cell color={isDark ? "#CA928E" : "#985955"}>
          {t("adoption-chart-writers-label")}
        </Cell>
        <Cell color={isDark ? "#B9B9B9" : "#9E9E9E"}>
          {t("adoption-chart-gamers-label")}
        </Cell>
        <Cell color={isDark ? "#E2B79E" : "#E78A54"}>
          {t("adoption-chart-refugees-label")}
        </Cell>
      </Column>
    </Flex>
  )
}

export default AdoptionChart

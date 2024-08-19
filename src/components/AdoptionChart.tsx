import { useTranslation } from "next-i18next"
import { useTheme } from "next-themes"
import { Box, type BoxProps, Flex } from "@chakra-ui/react"

import type { ChildOnlyProp } from "@/lib/types"

const Column = ({ children }: ChildOnlyProp) => (
  <Flex
    flexDirection="column-reverse"
    ms={{ base: 2, md: 4 }}
    _first={{ ms: 0 }}
  >
    {children}
  </Flex>
)

const Cell = ({ children, color, ...props }: BoxProps) => (
  <Box
    border="1px solid"
    borderColor={color || "text"}
    color={color || "text"}
    py="0.8rem"
    px={{ base: 2, md: "1.2rem" }}
    fontSize="0.9rem"
    fontWeight="bold"
    lineHeight="none"
    textAlign="center"
    _last={{
      borderTopStartRadius: "2xl",
      borderTopEndRadius: "2xl",
    }}
    sx={{
      "&:nth-child(-n + 2)": {
        borderBottomStartRadius: "2xl",
        borderBottomEndRadius: "2xl",
      },
    }}
    {...props}
  >
    {children}
  </Box>
)

const ColumnName = ({ children }: ChildOnlyProp) => (
  <Cell border="none" pt={6}>
    {children}
  </Cell>
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

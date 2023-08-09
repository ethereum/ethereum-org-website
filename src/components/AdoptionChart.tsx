// Libraries
import React, { ReactNode } from "react"
import { Box, BoxProps, Flex, useColorMode } from "@chakra-ui/react"

// Components
import Translation from "./Translation"

const Column: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Flex
      flexDirection="column-reverse"
      ml={{ base: 2, md: 4 }}
      _first={{ ml: 0 }}
    >
      {children}
    </Flex>
  )
}

const Cell: React.FC<BoxProps> = ({ children, color, ...props }) => {
  return (
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
        borderTopLeftRadius: "2xl",
        borderTopRightRadius: "2xl",
      }}
      sx={{
        "&:nth-child(-n + 2)": {
          borderBottomLeftRadius: "2xl",
          borderBottomRightRadius: "2xl",
        },
      }}
      {...props}
    >
      {children}
    </Box>
  )
}

const ColumnName: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Cell border="none" pt={6}>
      {children}
    </Cell>
  )
}

interface IProps {}

const AdoptionChart: React.FC<IProps> = () => {
  const { colorMode } = useColorMode()
  const isDark = colorMode === "dark"

  return (
    <Flex>
      <Column>
        <ColumnName>2010</ColumnName>
        <Cell color={isDark ? "#FBF9A5" : "#95935B"}>
          <Translation id="adoption-chart-investors-label" />
        </Cell>
      </Column>

      <Column>
        <ColumnName>2014</ColumnName>
        <Cell color={isDark ? "#FBF9A5" : "#95935B"}>
          <Translation id="adoption-chart-investors-label" />
        </Cell>
        <Cell color={isDark ? "#9EC885" : "#67954C"}>
          <Translation id="adoption-chart-developers-label" />
        </Cell>
        <Cell color={isDark ? "#E78F6E" : "#CB7C5E"}>
          <Translation id="adoption-chart-companies-label" />
        </Cell>
      </Column>

      <Column>
        <ColumnName>
          <Translation id="adoption-chart-column-now-label" />
        </ColumnName>
        <Cell color={isDark ? "#FBF9A5" : "#95935B"}>
          <Translation id="adoption-chart-investors-label" />
        </Cell>
        <Cell color={isDark ? "#9EC885" : "#67954C"}>
          <Translation id="adoption-chart-developers-label" />
        </Cell>
        <Cell color={isDark ? "#E78F6E" : "#CB7C5E"}>
          <Translation id="adoption-chart-companies-label" />
        </Cell>
        <Cell color={isDark ? "#8EA8CA" : "#5E7492"}>
          <Translation id="adoption-chart-artists-label" />
        </Cell>
        <Cell color={isDark ? "#AC85C2" : "#88669B"}>
          <Translation id="adoption-chart-musicians-label" />
        </Cell>
        <Cell color={isDark ? "#CA928E" : "#985955"}>
          <Translation id="adoption-chart-writers-label" />
        </Cell>
        <Cell color={isDark ? "#B9B9B9" : "#9E9E9E"}>
          <Translation id="adoption-chart-gamers-label" />
        </Cell>
        <Cell color={isDark ? "#E2B79E" : "#E78A54"}>
          <Translation id="adoption-chart-refugees-label" />
        </Cell>
      </Column>
    </Flex>
  )
}

export default AdoptionChart

import React, { ReactNode } from "react"
import { Box, BoxProps, Flex, useColorMode } from "@chakra-ui/react"

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
        <Cell color={isDark ? "#FBF9A5" : "#95935B"}>Investors</Cell>
      </Column>

      <Column>
        <ColumnName>2014</ColumnName>
        <Cell color={isDark ? "#FBF9A5" : "#95935B"}>Investors</Cell>
        <Cell color={isDark ? "#9EC885" : "#67954C"}>Developers</Cell>
        <Cell color={isDark ? "#E78F6E" : "#CB7C5E"}>Companies</Cell>
      </Column>

      <Column>
        <ColumnName>Now</ColumnName>
        <Cell color={isDark ? "#FBF9A5" : "#95935B"}>Investors</Cell>
        <Cell color={isDark ? "#9EC885" : "#67954C"}>Developers</Cell>
        <Cell color={isDark ? "#E78F6E" : "#CB7C5E"}>Companies</Cell>
        <Cell color={isDark ? "#8EA8CA" : "#5E7492"}>Artists</Cell>
        <Cell color={isDark ? "#AC85C2" : "#88669B"}>Musicians</Cell>
        <Cell color={isDark ? "#CA928E" : "#985955"}>Writers</Cell>
        <Cell color={isDark ? "#B9B9B9" : "#9E9E9E"}>Gamers</Cell>
        <Cell color={isDark ? "#E2B79E" : "#E78A54"}>Refugees</Cell>
      </Column>
    </Flex>
  )
}

export default AdoptionChart

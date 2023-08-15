import { Box, Flex, Grid, useToken } from "@chakra-ui/react"
import React from "react"

export type Props = {
  children: React.ReactNode
}

export const Banner: React.FC<Props> = ({ children }) => {
  return (
    <Flex
      w="full"
      background="bannerGridGradient"
      direction={{ base: "column", lg: "row" }}
      wrap="nowrap"
      sx={{
        h2: {
          mt: 0,
        },
        ul: {
          mb: 0,
        },
      }}
    >
      {children}
    </Flex>
  )
}

export const BannerBody: React.FC<Props> = ({ children }) => {
  return (
    <Box flex={4} p={10}>
      {children}
    </Box>
  )
}

export const BannerImage: React.FC<Props> = ({ children }) => {
  return (
    <Flex justifyContent="end" flex={2} alignSelf="end">
      {children}
    </Flex>
  )
}

export const BannerGrid: React.FC<Props> = ({ children }) => {
  return (
    <Grid
      templateColumns={{
        base: "repeat(1,1fr)",
        md: "repeat(2,1fr)",
        lg: "repeat(3,1fr)",
      }}
      templateRows={{
        md: "repeat(3, 1fr)",
        lg: "repeat(2, 1fr)",
      }}
      columnGap={0}
      rowGap={0}
    >
      {children}
    </Grid>
  )
}

export const BannerGridCell: React.FC<Props> = ({ children }) => {
  const [medBp, lgBp] = useToken("breakpoints", ["md", "lg"])

  return (
    <Flex
      px={{ base: 0, md: 12 }}
      py={8}
      direction="column"
      borderTop="1px solid"
      borderTopColor="searchBackground"
      borderLeft={{ base: 0, md: "1px solid" }}
      borderLeftColor={{ md: "searchBackground" }}
      sx={{
        "&:first-child": {
          borderTop: 0,
        },
        [`@media (min-width: ${medBp})`]: {
          "&:nth-child(-n + 2)": {
            borderTop: 0,
          },
          "&:nth-child(2n + 1)": {
            borderLeft: 0,
          },
        },
        [`@media (min-width: ${lgBp})`]: {
          "&:first-child": {
            paddingLeft: 0,
            borderLeft: 0,
          },
          "&:nth-child(-n + 2)": {
            borderTop: "1px solid",
            borderTopColor: "searchBackground",
          },
          "&:nth-child(2n + 1)": {
            borderLeft: "1px solid",
            borderLeftColor: "searchBackground",
          },
          "&:nth-child(-n + 3)": {
            borderTop: 0,
            justifyContent: "start",
            paddingTop: 0,
          },
          "&:nth-child(3n + 1)": {
            paddingLeft: 0,
            borderLeft: 0,
          },
          "&:nth-child(n + 4)": {
            justifyContent: "start",
            paddingBottom: 0,
          },
        },
      }}
    >
      {children}
    </Flex>
  )
}

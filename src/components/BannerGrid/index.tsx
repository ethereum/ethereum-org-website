import React from "react"
import { Box, Flex, Grid, useToken } from "@chakra-ui/react"

import { ChildOnlyProp } from "@/lib/types"

export const Banner = ({ children }: ChildOnlyProp) => {
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

export const BannerBody = ({ children }: ChildOnlyProp) => {
  return (
    <Box flex={4} p={10}>
      {children}
    </Box>
  )
}

export const BannerImage = ({ children }: ChildOnlyProp) => {
  return (
    <Flex justifyContent="end" flex={2} alignSelf="end">
      {children}
    </Flex>
  )
}

export const BannerGrid = ({ children }: ChildOnlyProp) => {
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

export const BannerGridCell = ({ children }: ChildOnlyProp) => {
  const [medBp, lgBp] = useToken("breakpoints", ["md", "lg"])

  return (
    <Flex
      px={{ base: 0, md: 12 }}
      py={8}
      direction="column"
      borderTop="1px solid"
      borderTopColor="searchBackground"
      borderInlineStart={{ base: 0, md: "1px solid" }}
      borderInlineStartColor={{ md: "searchBackground" }}
      sx={{
        "&:first-child": {
          borderTop: 0,
        },
        [`@media (min-width: ${medBp})`]: {
          "&:nth-child(-n + 2)": {
            borderTop: 0,
          },
          "&:nth-child(2n + 1)": {
            borderInlineStart: 0,
          },
        },
        [`@media (min-width: ${lgBp})`]: {
          "&:first-child": {
            ps: 0,
            borderInlineStart: 0,
          },
          "&:nth-child(-n + 2)": {
            borderTop: "1px solid",
            borderTopColor: "searchBackground",
          },
          "&:nth-child(2n + 1)": {
            borderInlineStart: "1px solid",
            borderInlineStartColor: "searchBackground",
          },
          "&:nth-child(-n + 3)": {
            borderTop: 0,
            justifyContent: "start",
            paddingTop: 0,
          },
          "&:nth-child(3n + 1)": {
            ps: 0,
            borderInlineStart: 0,
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

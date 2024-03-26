import React from "react"
import { Flex, type FlexProps, Text } from "@chakra-ui/react"

import { Button } from "../../Buttons"

type CategoryTabsProps = FlexProps & {
  categories: Array<string>
  activeIndex?: number
  setActiveIndex?: (i: number) => void
}
export const CategoryTabs = ({
  categories,
  activeIndex = 0,
  setActiveIndex,
  ...flexProps
}: CategoryTabsProps) => (
  <Flex gap={6} {...flexProps}>
    {categories.map((category, index) =>
      setActiveIndex ? (
        <Button
          key={category}
          variant="ghost"
          fontWeight={activeIndex === index ? "bold" : "normal"}
          onClick={() => setActiveIndex(index)}
          p={0}
          pb={2}
          color="body.base"
        >
          {category}
        </Button>
      ) : (
        <Text
          mb={2}
          key={category}
          fontWeight={activeIndex === index ? "bold" : "normal"}
        >
          {category}
        </Text>
      )
    )}
  </Flex>
)

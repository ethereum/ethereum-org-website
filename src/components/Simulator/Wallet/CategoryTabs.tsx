import React from "react"
import { Flex, type FlexProps, Text } from "@chakra-ui/react"

interface IProps extends FlexProps {
  categories: Array<string>
  activeIndex?: number
}
export const CategoryTabs: React.FC<IProps> = ({
  categories,
  activeIndex = 0,
  ...flexProps
}) => (
  <Flex gap={6} {...flexProps}>
    {categories.map((category, index) => (
      <Text fontWeight={activeIndex === index ? "bold" : "normal"}>
        {category}
      </Text>
    ))}
  </Flex>
)

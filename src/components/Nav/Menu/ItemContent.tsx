import { useRouter } from "next/router"
import { Box, Text } from "@chakra-ui/react"

import { cleanPath } from "@/lib/utils/url"

import type { Level, NavItem } from "../types"

type ItemProps = {
  item: NavItem
  lvl: Level
}

const ItemContent = ({ item, lvl }: ItemProps) => {
  const { label, description, icon, ...action } = item
  const { asPath } = useRouter()
  const isLink = "href" in action
  const isActivePage = isLink && cleanPath(asPath) === action.href

  return (
    <Box me="auto" textAlign="start" position="relative">
      <Text
        fontWeight="bold"
        color={isActivePage ? "menu.active" : `menu.lvl${lvl}.main`}
      >
        {label}
      </Text>
      <Text
        fontSize="sm"
        color={isActivePage ? "menu.active" : `menu.lvl${lvl}.subtext`}
      >
        {description}
      </Text>
    </Box>
  )
}

export default ItemContent

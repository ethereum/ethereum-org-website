import { useRouter } from "next/router"
import { Box, Button, forwardRef, Icon, Link, Text } from "@chakra-ui/react"

import { cleanPath } from "@/lib/utils/url"

import type { Level, NavItem } from "../types"

import NextChevron from "./NextChevron"

type ItemProps = {
  item: NavItem
  lvl: Level
}

const ItemContent = forwardRef(({ item, lvl }: ItemProps, ref) => {
  const { label, description, icon, ...action } = item
  const { asPath } = useRouter()
  const isLink = "href" in action
  const isActivePage = isLink && cleanPath(asPath) === action.href

  const itemIcon =
    lvl !== 1 || !icon ? undefined : (
      <Icon as={icon} color="currentColor" position="relative" />
    )

  const expandIcon = isLink ? undefined : (
    <NextChevron fill="currentColor" position="relative" />
  )

  return (
    <Button
      as={isLink ? Link : undefined}
      ref={ref}
      href={action.href}
      color={isActivePage ? "menu.active" : `menu.lvl${lvl}.main`}
      leftIcon={itemIcon}
      rightIcon={expandIcon}
      position="relative"
      w="full"
      sx={{ "span:first-of-type": { m: 0, me: 4 } }} // Spacing for icon
      py="4"
      bg="none"
      _hover={{ boxShadow: "none" }}
      _active={{ boxShadow: "none" }}
    >
      <Box me="auto" textAlign="start" position="relative">
        <Text fontWeight="bold">{label}</Text>
        <Text
          fontSize="sm"
          color={isActivePage ? "menu.active" : `menu.lvl${lvl}.subtext`}
        >
          {description}
        </Text>
      </Box>
    </Button>
  )
})

export default ItemContent

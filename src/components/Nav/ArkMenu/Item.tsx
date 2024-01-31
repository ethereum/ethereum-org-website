import { useRouter } from "next/router"
import { BsCircle } from "react-icons/bs"
import { Box, Button, forwardRef, Icon, Link, Text } from "@chakra-ui/react"

import { cleanPath } from "@/lib/utils/url"

import type { Level, NavItem } from "../types"

import NextChevron from "./NextChevron"

type ItemProps = {
  item: NavItem
  lvl: Level
}

const Item = forwardRef(({ item, lvl }: ItemProps, ref) => {
  const { label, description, icon: CustomIcon, ...action } = item
  const { asPath } = useRouter()
  const isLink = "href" in action
  const isActivePage = isLink && cleanPath(asPath) === action.href

  return (
    <Button
      as={isLink ? Link : undefined}
      ref={ref}
      onClick={() => console.log({ href: action.href })}
      href={action.href}
      color={`menu.lvl${lvl}.main`}
      rightIcon={
        isLink ? undefined : (
          <NextChevron fill="currentColor" position="relative" zIndex="1" />
        )
      }
      leftIcon={
        lvl === 1 ? (
          <Icon
            as={CustomIcon || BsCircle}
            color={isActivePage ? "menu.active" : `menu.lvl${lvl}.main`}
            position="relative"
            zIndex="1"
          />
        ) : undefined
      }
      position="relative"
      w="full"
      sx={{ "span:first-of-type": { m: 0, me: 4 } }}
      py="4"
      bg="none"
      data-group
      _hover={{
        boxShadow: "none",
      }}
      _active={{
        outlineOffset: "2px",
        boxShadow: "none",
      }}
    >
      <Box me="auto" textAlign="start" position="relative" zIndex="1">
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
    </Button>
  )
})

export default Item

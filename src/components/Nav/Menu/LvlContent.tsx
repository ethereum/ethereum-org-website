import { useRouter } from "next/router"
import { Box, Button, Icon, Link } from "@chakra-ui/react"
import * as NavigationMenu from "@radix-ui/react-navigation-menu"
import * as Portal from "@radix-ui/react-portal"

import { ButtonProps } from "@/components/Buttons"

import { cleanPath } from "@/lib/utils/url"

import type { Level, LvlRefs, NavItem } from "../types"

import ItemContent from "./ItemContent"
import NextChevron from "./NextChevron"

type LvlContentProps = {
  lvl: Level
  refs: LvlRefs
  items: NavItem[]
}

/**
 * Content for each sub-menu below top-level navigation
 * Content renders inside sibling Viewport
 * Viewport wrapped in Portal to render inside a passed ref
 * @param { 1 | 2 | 3 } lvl - The level of the menu
 * @param refs - The references to the Grid column elements.
 * @param { NavItem[] } items - The items to be displayed in the menu
 * @returns The JSX element representing the menu content.
 */
const LvlContent = ({ lvl, refs, items }: LvlContentProps) => {
  const { asPath } = useRouter()
  if (lvl > 3) return null

  return (
    <NavigationMenu.Content>
      <NavigationMenu.Sub orientation="vertical">
        <NavigationMenu.List asChild>
          <Box listStyleType="none" bg={`menu.lvl${lvl}.background`} p="4">
            {items.map((item) => {
              const { label, description, icon, ...action } = item
              const subItems = action.items || []
              const isLink = "href" in action
              const isActivePage = isLink && cleanPath(asPath) === action.href

              const activeStyles = {
                outline: "none",
                rounded: "md",
                "p, svg": { color: "primary.base" },
                bg: `menu.lvl${lvl}.activeBackground`,
                boxShadow: "none",
              }

              const buttonProps: ButtonProps = {
                color: isActivePage ? "menu.active" : `menu.lvl${lvl}.main`,
                leftIcon: lvl === 1 && icon ? <Icon as={icon} /> : undefined,
                rightIcon: isLink ? undefined : <NextChevron />,
                position: "relative",
                w: "full",
                sx: {
                  "span:first-of-type": { m: 0, me: 4 }, // Spacing for icon
                  '&[data-state="open"]': { roundedEnd: "none" },
                },
                py: "4",
                bg: "none",
                _hover: activeStyles,
                _active: activeStyles,
                _focus: activeStyles,
                variant: "ghost",
              }

              return (
                <NavigationMenu.Item key={label}>
                  {isLink ? (
                    <NavigationMenu.Link asChild>
                      <Button as={Link} href={action.href} {...buttonProps}>
                        <ItemContent item={item} lvl={lvl} />
                      </Button>
                    </NavigationMenu.Link>
                  ) : (
                    <>
                      <NavigationMenu.Trigger asChild>
                        <Button
                          marginInlineEnd="-16px !important"
                          {...buttonProps}
                        >
                          <ItemContent item={item} lvl={lvl} />
                        </Button>
                      </NavigationMenu.Trigger>
                      <LvlContent
                        lvl={(lvl + 1) as Level}
                        items={subItems}
                        refs={refs}
                      />
                    </>
                  )}
                </NavigationMenu.Item>
              )
            })}
          </Box>
        </NavigationMenu.List>
        <Portal.Root container={refs[`lvl${lvl + 1}`]?.current}>
          <NavigationMenu.Viewport />
        </Portal.Root>
      </NavigationMenu.Sub>
    </NavigationMenu.Content>
  )
}

export default LvlContent

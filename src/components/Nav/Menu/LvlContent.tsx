import { Fragment } from "react"
import { useRouter } from "next/router"
import { Menu as ArkMenu, Portal as ArkPortal } from "@ark-ui/react"
import { Box, Button, Flex, Icon, Link } from "@chakra-ui/react"
import * as NavigationMenu from "@radix-ui/react-navigation-menu"
import * as Portal from "@radix-ui/react-portal"

import { ButtonProps } from "@/components/Buttons"

import { cleanPath } from "@/lib/utils/url"

import type { Level, LvlRefs, NavItem } from "../types"

import ItemContent from "./ItemContent"
import NextChevron from "./NextChevron"

import { useRtlFlip } from "@/hooks/useRtlFlip"

type LvlPortalProps = {
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
const LvlContent = ({ lvl, refs, items }: LvlPortalProps) => {
  // const { direction } = useRtlFlip()
  // const { asPath } = useRouter()
  // const pad = 4
  if (lvl > 3) return null

  return (
    <NavigationMenu.Content>
      <NavigationMenu.Sub>
        <NavigationMenu.List asChild>
          <Box listStyleType="none">
            {items.map(({ label, description, ...action }) => {
              const subItems = action.items || []
              return (
                <NavigationMenu.Item key={label}>
                  {"href" in action ? (
                    <NavigationMenu.Link asChild>
                      <Button as={Link} href={action.href}>
                        {label}
                      </Button>
                    </NavigationMenu.Link>
                  ) : (
                    <>
                      <NavigationMenu.Trigger>
                        <Button>{label}</Button>
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

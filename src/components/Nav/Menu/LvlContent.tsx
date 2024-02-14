import NextLink from "next/link"
import { useRouter } from "next/router"
import { Button, Icon, ListItem, UnorderedList } from "@chakra-ui/react"
import * as NavigationMenu from "@radix-ui/react-navigation-menu"
import * as Portal from "@radix-ui/react-portal"

import { ButtonProps } from "@/components/Buttons"
import Link from "@/components/Link"

import { trackCustomEvent } from "@/lib/utils/matomo"
import { cleanPath } from "@/lib/utils/url"

import type { Level, LvlRefs, NavItem } from "../types"

import ItemContent from "./ItemContent"
import NextChevron from "./NextChevron"

import { useNavMenuColors } from "@/hooks/useNavMenuColors"

type LvlContentProps = {
  lvl: Level
  refs: LvlRefs
  items: NavItem[]
}

/**
 * Content for each sub-menu below top-level navigation
 * Content renders inside sibling Viewport
 * Viewport wrapped in Portal to render inside a passed ref
 * @param lvl - The level of the menu
 * @param refs - The references to the Grid column elements.
 * @param items - The items to be displayed in the menu
 * @returns The JSX element representing the menu content.
 */
const LvlContent = ({ lvl, refs, items }: LvlContentProps) => {
  const { asPath } = useRouter()
  const menuColors = useNavMenuColors()

  if (lvl > 3) return null

  const pad = 4 // Chakra-UI space token

  return (
    <NavigationMenu.Sub orientation="vertical">
      <NavigationMenu.List asChild>
        <UnorderedList listStyleType="none" p={pad} m="0">
          {items.map((item) => {
            const { label, description, icon, ...action } = item
            const subItems = action.items || []
            const isLink = "href" in action
            const isActivePage = isLink && cleanPath(asPath) === action.href
            const activeStyles = {
              outline: "none",
              rounded: "md",
              "p, svg": { color: menuColors.highlight },
              bg: menuColors.lvl[lvl].activeBackground,
              boxShadow: "none",
            }
            const buttonProps: ButtonProps = {
              color: isActivePage ? menuColors.active : menuColors.body,
              leftIcon: lvl === 1 && icon ? <Icon as={icon} /> : undefined,
              rightIcon: isLink ? undefined : <NextChevron />,
              position: "relative",
              w: "full",
              me: -pad,
              sx: {
                "span:first-of-type": { m: 0, me: pad }, // Spacing for icon
              },
              py: pad,
              bg: "none",
              _hover: activeStyles,
              _focus: activeStyles,
              variant: "ghost",
            }
            return (
              <NavigationMenu.Item key={label} asChild>
                <ListItem
                  mb="0"
                  sx={{
                    '&:has(button[data-state="open"])': {
                      roundedEnd: "none",
                      bg: menuColors.lvl[lvl].activeBackground,
                      me: -pad,
                      pe: pad,
                    },
                  }}
                  onMouseLeave={(e) => {
                    // Bring focus to destination button when leaving
                    ;(e.relatedTarget as HTMLButtonElement).focus()
                  }}
                >
                  {isLink ? (
                    <NextLink href={action.href!} passHref legacyBehavior>
                      <NavigationMenu.Link asChild>
                        <Button
                          as={Link}
                          onClick={() =>
                            trackCustomEvent({
                              eventCategory: "Desktop navigation menu",
                              eventAction: `Follow level ${lvl} link`,
                              eventName: action.href!,
                            })
                          }
                          {...buttonProps}
                        >
                          <ItemContent item={item} lvl={lvl} />
                        </Button>
                      </NavigationMenu.Link>
                    </NextLink>
                  ) : (
                    <>
                      <NavigationMenu.Trigger asChild>
                        <Button {...buttonProps}>
                          <ItemContent item={item} lvl={lvl} />
                        </Button>
                      </NavigationMenu.Trigger>
                      <NavigationMenu.Content>
                        <LvlContent
                          lvl={(lvl + 1) as Level}
                          items={subItems}
                          refs={refs}
                        />
                      </NavigationMenu.Content>
                    </>
                  )}
                </ListItem>
              </NavigationMenu.Item>
            )
          })}
        </UnorderedList>
      </NavigationMenu.List>
      <NavigationMenu.Viewport />
      {/* <Portal.Root container={refs[`lvl${lvl + 1}`]?.current}>
      </Portal.Root> */}
    </NavigationMenu.Sub>
  )
}

export default LvlContent

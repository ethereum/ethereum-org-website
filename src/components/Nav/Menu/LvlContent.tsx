import NextLink from "next/link"
import { useRouter } from "next/router"
import {
  Box,
  Button,
  Grid,
  Icon,
  ListItem,
  UnorderedList,
} from "@chakra-ui/react"
import * as NavigationMenu from "@radix-ui/react-navigation-menu"

import { ButtonProps } from "@/components/Buttons"
import Link from "@/components/Link"

import { trackCustomEvent } from "@/lib/utils/matomo"
import { cleanPath } from "@/lib/utils/url"

import type { Level, NavItem, NavSectionKey } from "../types"

import ItemContent from "./ItemContent"
import NextChevron from "./NextChevron"

import { useNavMenuColors } from "@/hooks/useNavMenuColors"

type LvlContentProps = {
  lvl: Level
  items: NavItem[]
  activeSection: NavSectionKey | null
}

/**
 * Content for each sub-menu below top-level navigation
 * Content renders inside sibling Viewport
 * @param lvl - The level of the menu
 * @param items - The items to be displayed in the menu
 * @param activeSection - English label of the active section for event tracking
 * @returns The JSX element representing the menu content.
 */
const LvlContent = ({ lvl, items, activeSection }: LvlContentProps) => {
  const { asPath, locale } = useRouter()
  const menuColors = useNavMenuColors()

  if (lvl > 3) return null

  const pad = 4 // Chakra-UI space token

  const getColumns = (lvl: Level) => {
    const count = 4 - lvl // lvl 1: 3 cols, lvl 2: 2, lvl 3: 1
    return `repeat(${count}, 1fr)`
  }

  return (
    <NavigationMenu.Sub orientation="vertical" asChild>
      <Grid w="full" h="full" gridTemplateColumns={getColumns(lvl)}>
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
                color: menuColors.body,
                leftIcon: lvl === 1 && icon ? <Icon as={icon} /> : undefined,
                rightIcon: isLink ? undefined : <NextChevron />,
                position: "relative",
                w: "full",
                me: -pad,
                sx: {
                  "span:first-of-type": { m: 0, me: pad }, // Spacing for icon
                },
                py: pad,
                bg: isActivePage
                  ? menuColors.lvl[lvl].activeBackground
                  : "none",
                _hover: activeStyles,
                _focus: activeStyles,
                variant: "ghost",
              }
              return (
                <NavigationMenu.Item key={label} asChild>
                  <ListItem
                    mb="1"
                    _last={{ mb: 0 }}
                    sx={{
                      '&:has(button[data-state="open"])': {
                        roundedStart: "md",
                        roundedEnd: "none",
                        bg: menuColors.lvl[lvl].activeBackground,
                        me: -pad,
                        pe: pad,
                      },
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
                                eventAction: `Menu - ${activeSection} - ${locale}`,
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
                        <NavigationMenu.Content asChild>
                          <Box bg={menuColors.lvl[lvl + 1].background} h="full">
                            <LvlContent
                              lvl={(lvl + 1) as Level}
                              items={subItems}
                              activeSection={activeSection}
                            />
                          </Box>
                        </NavigationMenu.Content>
                      </>
                    )}
                  </ListItem>
                </NavigationMenu.Item>
              )
            })}
          </UnorderedList>
        </NavigationMenu.List>

        <NavigationMenu.Viewport style={{ gridColumn: "2/4" }} />
      </Grid>
    </NavigationMenu.Sub>
  )
}

export default LvlContent

import { AnimatePresence, motion } from "framer-motion"
import NextLink from "next/link"
import {
  Box,
  Button,
  Grid,
  Icon,
  ListItem,
  UnorderedList,
} from "@chakra-ui/react"
import {
  Content,
  Item,
  Link as NavigationMenuLink,
  List,
  Sub,
  Trigger,
  Viewport,
} from "@radix-ui/react-navigation-menu"

import { ButtonProps } from "@/components/Buttons"
import Link from "@/components/Link"

import { trackCustomEvent } from "@/lib/utils/matomo"
import { cleanPath } from "@/lib/utils/url"

import type { Level, NavItem, NavSectionKey } from "../types"

import ItemContent from "./ItemContent"
import NextChevron from "./NextChevron"
import { useSubMenu } from "./useSubMenu"

type LvlContentProps = {
  lvl: Level
  items: NavItem[]
  activeSection: NavSectionKey | null
  onClose: () => void
}

/**
 * Content for each sub-menu below top-level navigation
 * Content renders inside sibling Viewport
 * @param lvl - The level of the menu
 * @param items - The items to be displayed in the menu
 * @param activeSection - English label of the active section for event tracking
 * @param onClose - Function to close the menu
 * @returns The JSX element representing the menu content.
 */
const SubMenu = ({ lvl, items, activeSection, onClose }: LvlContentProps) => {
  const { asPath, locale, menuColors, menuVariants, PADDING } = useSubMenu()

  if (lvl > 3) return null

  const templateColumns = `repeat(${4 - lvl}, 1fr)`

  return (
    <Sub orientation="vertical" asChild>
      <AnimatePresence>
        <Grid
          as={motion.div}
          variants={menuVariants}
          initial="closed"
          animate="open"
          exit="closed"
          w="full"
          h="full"
          gridTemplateColumns={templateColumns}
        >
          <List asChild>
            <UnorderedList listStyleType="none" p={PADDING / 2} m="0">
              {items.map((item) => {
                const { label, icon, ...action } = item
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
                  me: -PADDING,
                  sx: {
                    "span:first-of-type": { m: 0, me: 4 }, // Spacing for icon
                  },
                  py: PADDING,
                  bg: isActivePage
                    ? menuColors.lvl[lvl].activeBackground
                    : "none",
                  _hover: activeStyles,
                  _focus: activeStyles,
                  variant: "ghost",
                }
                return (
                  <Item key={label} asChild>
                    <ListItem
                      mb={PADDING / 2}
                      _last={{ mb: 0 }}
                      sx={{
                        '&:has(button[data-state="open"])': {
                          roundedStart: "md",
                          roundedEnd: "none",
                          bg: menuColors.lvl[lvl].activeBackground,
                          me: -PADDING,
                          pe: PADDING,
                        },
                      }}
                    >
                      {isLink ? (
                        <NextLink href={action.href!} passHref legacyBehavior>
                          <NavigationMenuLink asChild>
                            <Button
                              as={Link}
                              onClick={() => {
                                onClose()
                                trackCustomEvent({
                                  eventCategory: "Desktop navigation menu",
                                  eventAction: `Menu - ${activeSection} - ${locale}`,
                                  eventName: action.href!,
                                })
                              }}
                              {...buttonProps}
                            >
                              <ItemContent item={item} lvl={lvl} />
                            </Button>
                          </NavigationMenuLink>
                        </NextLink>
                      ) : (
                        <>
                          <Trigger asChild>
                            <Button {...buttonProps}>
                              <ItemContent item={item} lvl={lvl} />
                            </Button>
                          </Trigger>
                          <Content asChild>
                            <Box
                              bg={menuColors.lvl[lvl + 1].background}
                              h="full"
                            >
                              <SubMenu
                                lvl={(lvl + 1) as Level}
                                items={subItems}
                                activeSection={activeSection}
                                onClose={onClose}
                              />
                            </Box>
                          </Content>
                        </>
                      )}
                    </ListItem>
                  </Item>
                )
              })}
            </UnorderedList>
          </List>
          <Viewport style={{ gridColumn: "2/4" }} />
        </Grid>
      </AnimatePresence>
    </Sub>
  )
}

export default SubMenu

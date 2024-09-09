import { AnimatePresence, motion } from "framer-motion"
import NextLink from "next/link"
import {
  Content,
  Item,
  Link as NavigationMenuLink,
  List,
  Sub,
  Trigger,
  Viewport,
} from "@radix-ui/react-navigation-menu"

import { ChevronNext } from "@/components/Chevron"
import { Button } from "@/components/ui/buttons/Button"
import { BaseLink } from "@/components/ui/Link"
import { ListItem, UnorderedList } from "@/components/ui/list"

import { cn } from "@/lib/utils/cn"
import { trackCustomEvent } from "@/lib/utils/matomo"
import { cleanPath } from "@/lib/utils/url"

import type { Level, NavItem, NavSectionKey } from "../types"

import ItemContent from "./ItemContent"
import { navMenuVariants } from "./MenuContent"
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
  const { asPath, locale, menuVariants } = useSubMenu()
  const { submenu, item: itemClasses, link } = navMenuVariants({ level: lvl })

  if (lvl > 3) return null

  return (
    <Sub orientation="vertical" asChild>
      <AnimatePresence>
        <motion.div
          className={submenu()}
          variants={menuVariants}
          initial="closed"
          animate="open"
          exit="closed"
        >
          <List asChild>
            <UnorderedList className="m-0 list-none p-2">
              {items.map((item) => {
                const { label, icon: Icon, ...action } = item
                const subItems = action.items || []
                const isLink = "href" in action
                const isActivePage = isLink && cleanPath(asPath) === action.href

                const buttonClasses = cn("no-underline text-body", link())

                return (
                  <Item key={label} asChild>
                    <ListItem className={cn("mb-2 last:mb-0", itemClasses())}>
                      {isLink ? (
                        <NextLink href={action.href!} passHref legacyBehavior>
                          <NavigationMenuLink asChild>
                            <Button
                              variant="ghost"
                              className={buttonClasses}
                              data-active={isActivePage}
                              onClick={() => {
                                onClose()
                                trackCustomEvent({
                                  eventCategory: "Desktop navigation menu",
                                  eventAction: `Menu - ${activeSection} - ${locale}`,
                                  eventName: action.href!,
                                })
                              }}
                              asChild
                            >
                              <BaseLink>
                                {lvl === 1 && Icon ? (
                                  <Icon className="me-4 h-6 w-6" />
                                ) : null}

                                <ItemContent item={item} lvl={lvl} />
                              </BaseLink>
                            </Button>
                          </NavigationMenuLink>
                        </NextLink>
                      ) : (
                        <>
                          <Trigger asChild>
                            <Button variant="ghost" className={buttonClasses}>
                              {lvl === 1 && Icon ? (
                                <Icon className="me-4 h-6 w-6" />
                              ) : null}

                              <ItemContent item={item} lvl={lvl} />
                              <ChevronNext />
                            </Button>
                          </Trigger>
                          <Content asChild>
                            <div className="h-full">
                              <SubMenu
                                lvl={(lvl + 1) as Level}
                                items={subItems}
                                activeSection={activeSection}
                                onClose={onClose}
                              />
                            </div>
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
        </motion.div>
      </AnimatePresence>
    </Sub>
  )
}

export default SubMenu

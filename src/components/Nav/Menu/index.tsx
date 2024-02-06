import { useRef } from "react"
import { Box, Flex, Grid } from "@chakra-ui/react"
import * as NavigationMenu from "@radix-ui/react-navigation-menu"
import * as Portal from "@radix-ui/react-portal"

import { Button } from "@/components/Buttons"
import Link from "@/components/Link"

import { SECTION_LABELS } from "@/lib/constants"

import type { LvlRefs, NavSections } from "../types"

import { useRtlFlip } from "@/hooks/useRtlFlip"

type NavMenuProps = {
  sections: NavSections
}

const Menu = ({ sections }: NavMenuProps) => {
  const { direction } = useRtlFlip()

  const refs: LvlRefs = {
    lvl1: useRef(null),
    lvl2: useRef(null),
    lvl3: useRef(null),
  }

  return (
    <>
      <NavigationMenu.Root dir={direction} orientation="horizontal">
        <NavigationMenu.List asChild>
          <Flex listStyleType="none">
            {SECTION_LABELS.map((sectionKey) => {
              const { label: sectionLabel, items: l1Items } =
                sections[sectionKey]
              return (
                <NavigationMenu.Item key={sectionKey}>
                  <NavigationMenu.Trigger asChild>
                    <Button py="2" px="4" variant="link">
                      {sectionLabel}
                    </Button>
                  </NavigationMenu.Trigger>
                  <NavigationMenu.Content>
                    {/* Content goes to Viewport, wrapped in Portal, referencing Grid column */}
                    <NavigationMenu.Sub>
                      <NavigationMenu.List asChild>
                        <Box listStyleType="none">
                          {l1Items.map(
                            ({
                              label: l1Label,
                              description: l1Description,
                              ...l1Action
                            }) => {
                              const l2Items = l1Action.items || []
                              return (
                                <NavigationMenu.Item key={l1Label}>
                                  {"href" in l1Action ? (
                                    <NavigationMenu.Link asChild>
                                      <Button as={Link} href={l1Action.href}>
                                        {l1Label}
                                      </Button>
                                    </NavigationMenu.Link>
                                  ) : (
                                    <>
                                      <NavigationMenu.Trigger>
                                        <Button>{l1Label}</Button>
                                      </NavigationMenu.Trigger>
                                      <NavigationMenu.Content>
                                        <NavigationMenu.Sub>
                                          <NavigationMenu.List asChild>
                                            <Box listStyleType="none">
                                              {l2Items.map(
                                                ({
                                                  label: l2Label,
                                                  description: l2Description,
                                                  ...l2Action
                                                }) => {
                                                  return (
                                                    <NavigationMenu.Item
                                                      key={l2Label}
                                                    >
                                                      <NavigationMenu.Trigger
                                                        asChild
                                                      >
                                                        <Button>
                                                          {l2Label}
                                                        </Button>
                                                      </NavigationMenu.Trigger>
                                                      <NavigationMenu.Content>
                                                        <NavigationMenu.Sub>
                                                          <NavigationMenu.List
                                                            asChild
                                                          >
                                                            <Box listStyleType="none">
                                                              {l2Action.items?.map(
                                                                ({
                                                                  label:
                                                                    l3Label,
                                                                  description:
                                                                    l3Description,
                                                                  ...l3Action
                                                                }) => (
                                                                  <NavigationMenu.Item
                                                                    key={
                                                                      l3Label
                                                                    }
                                                                  >
                                                                    <NavigationMenu.Trigger
                                                                      asChild
                                                                    >
                                                                      <Button>
                                                                        {
                                                                          l3Label
                                                                        }
                                                                      </Button>
                                                                    </NavigationMenu.Trigger>
                                                                    <NavigationMenu.Content>
                                                                      <NavigationMenu.Sub></NavigationMenu.Sub>
                                                                    </NavigationMenu.Content>
                                                                  </NavigationMenu.Item>
                                                                )
                                                              )}
                                                            </Box>
                                                          </NavigationMenu.List>
                                                          <NavigationMenu.Viewport />
                                                        </NavigationMenu.Sub>
                                                      </NavigationMenu.Content>
                                                    </NavigationMenu.Item>
                                                  )
                                                }
                                              )}
                                            </Box>
                                          </NavigationMenu.List>
                                          <Portal.Root
                                            container={refs.lvl3.current}
                                          >
                                            <NavigationMenu.Viewport />
                                          </Portal.Root>
                                        </NavigationMenu.Sub>
                                      </NavigationMenu.Content>
                                    </>
                                  )}
                                </NavigationMenu.Item>
                              )
                            }
                          )}
                        </Box>
                      </NavigationMenu.List>
                      <Portal.Root container={refs.lvl2.current}>
                        <NavigationMenu.Viewport />
                      </Portal.Root>
                    </NavigationMenu.Sub>
                  </NavigationMenu.Content>
                </NavigationMenu.Item>
              )
            })}
          </Flex>
        </NavigationMenu.List>
        <Portal.Root container={refs.lvl1.current}>
          <NavigationMenu.Viewport />
        </Portal.Root>
      </NavigationMenu.Root>

      <Grid
        position="absolute"
        top="16.5"
        insetInline="0"
        templateColumns="repeat(3, 1fr)"
        shadow="md"
        border="1px"
        borderColor="menu.stroke"
        bg="menu.lvl1.background"
      >
        <Box ref={refs.lvl1} id="menu-box-lvl-1" />
        <Box ref={refs.lvl2} id="menu-box-lvl-2" />
        <Box ref={refs.lvl3} id="menu-box-lvl-3" />
      </Grid>
    </>
  )
}

export default Menu

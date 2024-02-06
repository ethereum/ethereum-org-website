import { useRef } from "react"
import { Box, Flex, Grid } from "@chakra-ui/react"
import * as NavigationMenu from "@radix-ui/react-navigation-menu"
import * as Portal from "@radix-ui/react-portal"

import { Button } from "@/components/Buttons"

import { SECTION_LABELS } from "@/lib/constants"

import type { LvlRefs, NavSections } from "../types"

import LvlContent from "./LvlContent"

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
              const { label, items } = sections[sectionKey]
              return (
                <NavigationMenu.Item key={sectionKey}>
                  <NavigationMenu.Trigger asChild>
                    <Button py="2" px="4" variant="link">
                      {label}
                    </Button>
                  </NavigationMenu.Trigger>
                  <LvlContent lvl={1} items={items} refs={refs} />
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

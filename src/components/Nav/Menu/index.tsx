import { useRef } from "react"
import { Box, type BoxProps, Flex, Grid } from "@chakra-ui/react"
import * as NavigationMenu from "@radix-ui/react-navigation-menu"
import * as Portal from "@radix-ui/react-portal"

import { Button } from "@/components/Buttons"

import { SECTION_LABELS } from "@/lib/constants"

import type { LvlRefs, NavSections } from "../types"

import LvlContent from "./LvlContent"

import { useRtlFlip } from "@/hooks/useRtlFlip"

type NavMenuProps = BoxProps & {
  sections: NavSections
}

const Menu = ({ sections, ...props }: NavMenuProps) => {
  const { direction } = useRtlFlip()

  const refs: LvlRefs = {
    lvl1: useRef(null),
    lvl2: useRef(null),
    lvl3: useRef(null),
  }

  return (
    <>
      <Box {...props}>
        <NavigationMenu.Root
          dir={direction}
          orientation="horizontal"
          delayDuration={750}
        >
          <NavigationMenu.List asChild>
            <Flex listStyleType="none">
              {SECTION_LABELS.map((sectionKey) => {
                const { label, items } = sections[sectionKey]
                return (
                  <NavigationMenu.Item key={sectionKey}>
                    <NavigationMenu.Trigger asChild>
                      <Button
                        py="2"
                        px="4"
                        variant="ghost"
                        color="body.base"
                        sx={{
                          '&[data-state="open"]': {
                            bg: "primary.lowContrast",
                            color: "primary.base",
                          },
                        }}
                      >
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
      </Box>

      <Grid
        position="absolute"
        visibility="hidden"
        top="16.5"
        insetInline="0"
        templateColumns={{ base: "repeat(2, 1fr) 0fr", lg: "repeat(3, 1fr)" }}
        shadow="md"
        border="1px"
        borderColor="menu.stroke"
        bg="menu.lvl1.background"
        sx={{
          '&:has(#lvl1 [data-state="open"])': {
            visibility: "visible",
          },
          '&:has(#lvl2 [data-state="open"])': {
            bg: "menu.lvl2.background",
          },
          '&:has(#lvl3 [data-state="open"])': {
            bg: "menu.lvl3-background",
            gridTemplateColumns: "repeat(3, 1fr)",
          },
        }}
      >
        <Box ref={refs.lvl1} id="lvl1" />
        <Box ref={refs.lvl2} id="lvl2" />
        <Box ref={refs.lvl3} id="lvl3" />
      </Grid>
    </>
  )
}

export default Menu

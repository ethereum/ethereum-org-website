import { useRef } from "react"
import { Box, type BoxProps, Flex, Grid } from "@chakra-ui/react"
import * as NavigationMenu from "@radix-ui/react-navigation-menu"

import { Button } from "@/components/Buttons"

import { trackCustomEvent } from "@/lib/utils/matomo"

import { SECTION_LABELS } from "@/lib/constants"

import type { Level, LvlRefs, NavSections } from "../types"

import LvlContent from "./LvlContent"

import { useNavMenuColors } from "@/hooks/useNavMenuColors"
import { useRtlFlip } from "@/hooks/useRtlFlip"

type NavMenuProps = BoxProps & {
  sections: NavSections
}

const Menu = ({ sections, ...props }: NavMenuProps) => {
  const { direction } = useRtlFlip()
  const menuColors = useNavMenuColors()

  const refs: LvlRefs = {
    lvl1: useRef(null),
    lvl2: useRef(null),
    lvl3: useRef(null),
  }

  const getLvlSx = (lvl: Level): BoxProps["sx"] => ({
    opacity: 0,
    '&:has([data-state="open"])': {
      bg: menuColors.lvl[lvl].background,
      opacity: 1,
      transition: "opacity 300ms linear",
    },
  })

  return (
    <Box {...props}>
      <NavigationMenu.Root
        dir={direction}
        orientation="horizontal"
        delayDuration={750}
        onValueChange={(activeSection) => {
          trackCustomEvent({
            eventCategory: "Desktop navigation menu",
            eventAction: "Section changed",
            eventName: activeSection
              ? `Open section: ${activeSection}`
              : "Menu closed",
          })
        }}
      >
        <NavigationMenu.List asChild>
          <Flex listStyleType="none">
            {SECTION_LABELS.map((sectionKey) => {
              const { label, items } = sections[sectionKey]
              return (
                <NavigationMenu.Item key={sectionKey} value={label}>
                  <NavigationMenu.Trigger asChild>
                    <Button
                      py="2"
                      px={{ base: "3", lg: "4" }}
                      variant="ghost"
                      whiteSpace="nowrap"
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
        <Grid
          position="absolute"
          top="19"
          insetInline="0"
          templateColumns="repeat(3, 1fr)"
          shadow="md"
          border="1px"
          borderColor={menuColors.stroke}
          bg={menuColors.lvl[1].background}
          opacity={0}
          sx={{
            '&:has(#lvl1 [data-state="open"])': {
              opacity: 1,
              transition: "opacity 200ms linear",
            },
            '&:has(#lvl2 [data-state="open"])': {
              bg: menuColors.lvl[2].background,
            },
            '&:has(#lvl3 [data-state="open"])': {
              bg: menuColors.lvl[3].background,
            },
          }}
        >
          <Box ref={refs.lvl1} id="lvl1" sx={getLvlSx(1)}>
            <NavigationMenu.Viewport />
          </Box>
          <Box ref={refs.lvl2} id="lvl2" sx={getLvlSx(2)} />
          <Box ref={refs.lvl3} id="lvl3" sx={getLvlSx(3)} />
        </Grid>
      </NavigationMenu.Root>
    </Box>
  )
}

export default Menu

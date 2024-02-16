import { useState } from "react"
import { Box, type BoxProps, Flex } from "@chakra-ui/react"
import * as NavigationMenu from "@radix-ui/react-navigation-menu"

import { Button } from "@/components/Buttons"

// import { trackCustomEvent } from "@/lib/utils/matomo"
import { SECTION_LABELS } from "@/lib/constants"

import type { NavSectionKey, NavSections } from "../types"

import LvlContent from "./LvlContent"

import { useNavMenuColors } from "@/hooks/useNavMenuColors"
import { useRtlFlip } from "@/hooks/useRtlFlip"

type NavMenuProps = BoxProps & {
  sections: NavSections
}

const Menu = ({ sections, ...props }: NavMenuProps) => {
  const { direction } = useRtlFlip()
  const menuColors = useNavMenuColors()
  const [activeSection, setActiveSection] = useState<NavSectionKey | null>(null)

  const getEnglishSectionName = (
    activeSection: string
  ): NavSectionKey | null => {
    const index = Object.values(sections).findIndex(
      (section) => section.label === activeSection
    )
    if (index < 0) return null
    return Object.keys(sections)[index] as NavSectionKey
  }

  return (
    <Box {...props}>
      <NavigationMenu.Root
        dir={direction}
        orientation="horizontal"
        delayDuration={750}
        onValueChange={(activeSection) => {
          setActiveSection(getEnglishSectionName(activeSection))
        }}
      >
        <NavigationMenu.List asChild>
          <Flex as="ul" listStyleType="none">
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
                  <NavigationMenu.Content asChild>
                    {/**
                     * This is the CONTAINER for all three menu levels
                     * This renders inside the NavigationMenu.Viewport component
                     */}
                    <Box
                      position="absolute"
                      top="19"
                      insetInline="0"
                      shadow="md"
                      border="1px"
                      borderColor={menuColors.stroke}
                      bg={menuColors.lvl[1].background}
                    >
                      <LvlContent
                        lvl={1}
                        items={items}
                        activeSection={activeSection}
                      />
                    </Box>
                  </NavigationMenu.Content>
                </NavigationMenu.Item>
              )
            })}
          </Flex>
        </NavigationMenu.List>

        <NavigationMenu.Viewport />
      </NavigationMenu.Root>
    </Box>
  )
}

export default Menu

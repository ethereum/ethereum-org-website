import { Box, type BoxProps, Flex } from "@chakra-ui/react"
import * as NavigationMenu from "@radix-ui/react-navigation-menu"

import { Button } from "@/components/Buttons"

import { SECTION_LABELS } from "@/lib/constants"

import type { NavSections } from "../types"

import LvlContent from "./LvlContent"
import { useNavMenu } from "./useNavMenu"

type NavMenuProps = BoxProps & {
  sections: NavSections
}

const Menu = ({ sections, ...props }: NavMenuProps) => {
  const { direction, menuColors, activeSection, handleSectionChange } =
    useNavMenu(sections)

  return (
    <Box {...props}>
      <NavigationMenu.Root
        dir={direction}
        orientation="horizontal"
        delayDuration={750}
        onValueChange={handleSectionChange}
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

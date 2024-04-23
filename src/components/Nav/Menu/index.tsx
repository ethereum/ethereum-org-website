import { motion } from "framer-motion"
import { Box, type BoxProps, Text, UnorderedList } from "@chakra-ui/react"
import * as NavigationMenu from "@radix-ui/react-navigation-menu"

import { Button } from "@/components/Buttons"

import { MAIN_NAV_ID, NAV_PY, SECTION_LABELS } from "@/lib/constants"

import type { NavSections } from "../types"

import SubMenu from "./SubMenu"
import { useNavMenu } from "./useNavMenu"

type NavMenuProps = BoxProps & {
  sections: NavSections
}

const Menu = ({ sections, ...props }: NavMenuProps) => {
  const {
    activeSection,
    containerVariants,
    direction,
    handleSectionChange,
    isOpen,
    menuColors,
    onClose,
  } = useNavMenu(sections)

  return (
    <Box {...props}>
      <NavigationMenu.Root
        dir={direction}
        orientation="horizontal"
        onValueChange={handleSectionChange}
        delayDuration={0}
      >
        <NavigationMenu.List asChild>
          <UnorderedList
            id={MAIN_NAV_ID}
            display="flex"
            listStyleType="none"
            m="0"
          >
            {SECTION_LABELS.map((sectionKey) => {
              const { label, items } = sections[sectionKey]
              const isActive = activeSection === sectionKey
              return (
                <NavigationMenu.Item key={sectionKey} value={label}>
                  <NavigationMenu.Trigger asChild>
                    <Button
                      py="2"
                      px={{ base: "3", lg: "4" }}
                      variant="ghost"
                      whiteSpace="nowrap"
                      color={isActive ? "primary.base" : "body.base"}
                      _after={{
                        content: '""',
                        position: "absolute",
                        insetInline: 0,
                        top: "100%",
                        height: NAV_PY,
                      }}
                    >
                      {/* Animated highlight for active section */}
                      {isActive && (
                        <Box
                          as={motion.div}
                          layoutId="active-section-highlight"
                          position="absolute"
                          inset="0"
                          bg="primary.lowContrast"
                          rounded="base"
                          zIndex={0}
                        />
                      )}
                      <Text as="span" position="relative" zIndex={1}>
                        {label}
                      </Text>
                    </Button>
                  </NavigationMenu.Trigger>
                  <NavigationMenu.Content asChild>
                    {/**
                     * This is the CONTAINER for all three menu levels
                     * This renders inside the NavigationMenu.Viewport component
                     */}
                    <Box
                      as={motion.div}
                      variants={containerVariants}
                      initial={false}
                      animate={isOpen ? "open" : "closed"}
                      position="absolute"
                      top="19"
                      insetInline="0"
                      shadow="md"
                      border="1px"
                      borderColor={menuColors.stroke}
                      bg={menuColors.lvl[1].background}
                    >
                      <SubMenu
                        lvl={1}
                        items={items}
                        activeSection={activeSection}
                        onClose={onClose}
                      />
                    </Box>
                  </NavigationMenu.Content>
                </NavigationMenu.Item>
              )
            })}
          </UnorderedList>
        </NavigationMenu.List>

        <NavigationMenu.Viewport />
      </NavigationMenu.Root>
    </Box>
  )
}

export default Menu

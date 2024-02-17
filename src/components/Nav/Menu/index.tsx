import { useState } from "react"
import { AnimatePresence, motion, MotionProps } from "framer-motion"
import { Box, type BoxProps, Flex, Text } from "@chakra-ui/react"
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

  const isOpen = activeSection !== null

  const containerVariants: MotionProps["variants"] = {
    open: {
      opacity: 1,
      maxHeight: "100vh",
      transition: { duration: 0.2 },
    },
    closed: {
      opacity: 0,
    },
  }

  return (
    <Box {...props}>
      <NavigationMenu.Root
        dir={direction}
        orientation="horizontal"
        delayDuration={500}
        onValueChange={handleSectionChange}
      >
        <NavigationMenu.List asChild>
          <Flex as="ul" listStyleType="none">
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
                  <AnimatePresence>
                    <NavigationMenu.Content asChild>
                      {/**
                       * This is the CONTAINER for all three menu levels
                       * This renders inside the NavigationMenu.Viewport component
                       */}
                      <Box
                        as={motion.div}
                        key={sectionKey + "-content"}
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
                        <LvlContent
                          lvl={1}
                          items={items}
                          activeSection={activeSection}
                        />
                      </Box>
                    </NavigationMenu.Content>
                  </AnimatePresence>
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

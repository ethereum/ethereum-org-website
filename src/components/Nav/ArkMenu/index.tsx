import { useRef, useState } from "react"
import { motion } from "framer-motion"
import { Menu, type MenuOpenChangeDetails } from "@ark-ui/react"
import {
  Box,
  Flex,
  type FlexProps,
  Grid,
  Text,
  useDisclosure,
} from "@chakra-ui/react"

import { Button } from "@/components/Buttons"

import { SECTION_LABELS } from "@/lib/constants"

import type { LvlRefs, NavSectionKey, NavSections } from "../types"

import LvlPortal from "./LvlPortal"

import { useRtlFlip } from "@/hooks/useRtlFlip"

type ArkMenuProps = FlexProps & {
  sections: NavSections
}

const ArkMenu = ({ sections, ...props }: ArkMenuProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [activeSection, setActiveSection] = useState<NavSectionKey | null>(null)

  const { direction } = useRtlFlip()

  const handleOpenChange = (
    { open }: MenuOpenChangeDetails,
    sectionKey: NavSectionKey
  ): void => {
    setActiveSection(open ? sectionKey : null)
    open ? onOpen() : onClose()
  }

  const refs: LvlRefs = {
    lvl1: useRef(null),
    lvl2: useRef(null),
    lvl3: useRef(null),
  }

  const handleSectionHover = (sectionKey: NavSectionKey) => {
    if (!isOpen) return
    if (sectionKey === activeSection) return
    setActiveSection(sectionKey)
    // TODO: Open the section being hovered
  }

  return (
    <>
      <Flex alignItems="center" listStyleType="none" m="0" {...props}>
        {SECTION_LABELS.map((sectionKey) => {
          const { label } = sections[sectionKey]
          const isActive = activeSection === sectionKey
          return (
            <Menu.Root
              key={label}
              unmountOnExit
              loop
              onOpenChange={(details) => handleOpenChange(details, sectionKey)}
              dir={direction}
            >
              <Menu.Trigger asChild>
                <Button
                  variant="ghost"
                  m="0"
                  color={isActive ? "primary.base" : "menu.lvl1.body"}
                  // onMouseEnter={() => handleSectionHover(sectionKey)}
                >
                  {isActive && (
                    <motion.div
                      style={{
                        position: "absolute",
                        inset: "0",
                        borderRadius: "var(--eth-radii-base)",
                        background: "var(--eth-colors-primary-lowContrast)",
                        zIndex: 0,
                      }}
                      layoutId="menu-section-bg-highlight"
                      transition={{ duration: 0.2 }}
                    />
                  )}
                  <Text as="span" zIndex="1">
                    {label}
                  </Text>
                </Button>
              </Menu.Trigger>
              <LvlPortal
                lvl={1}
                refs={refs}
                items={sections[sectionKey].items}
              />
            </Menu.Root>
          )
        })}
      </Flex>
      <Grid
        position="absolute"
        visibility={isOpen ? "visible" : "hidden"}
        top="navHeight"
        insetInline="0"
        templateColumns="repeat(3, 1fr)"
        transition="height 1s ease-in-out"
        shadow="md"
        border="1px"
        borderColor="menu.stroke"
        scrollBehavior="smooth"
        bg={`menu.lvl${1}.background`}
        sx={{
          // Styling if Lvl2 is open
          '&:has(#menu-box-lvl-2 [data-state="open"])': {
            bg: "menu.lvl2.background",
          },
          // Styling if Lvl3 is open
          '&:has(#menu-box-lvl-3 [data-state="open"])': {
            bg: "menu.lvl3.background",
          },
        }}
      >
        <Box ref={refs.lvl1} id="menu-box-lvl-1" />
        <Box ref={refs.lvl2} id="menu-box-lvl-2" />
        <Box ref={refs.lvl3} id="menu-box-lvl-3" />
      </Grid>
    </>
  )
}

export default ArkMenu

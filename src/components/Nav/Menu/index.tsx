import { useRef, useState } from "react"
import { motion } from "framer-motion"
import { Menu as ArkMenu, type MenuOpenChangeDetails } from "@ark-ui/react"
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

type NavMenuProps = FlexProps & {
  sections: NavSections
}

const Menu = ({ sections, ...props }: NavMenuProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [activeSection, setActiveSection] = useState<NavSectionKey | null>(null)

  const { direction } = useRtlFlip()

  const refs: LvlRefs = {
    lvl1: useRef(null),
    lvl2: useRef(null),
    lvl3: useRef(null),
  }

  const handleOpenChange = (
    { open }: MenuOpenChangeDetails,
    sectionKey: NavSectionKey
  ): void => {
    setActiveSection(open ? sectionKey : null)
    open ? onOpen() : onClose()
  }

  return (
    <>
      <Flex alignItems="center" m="0" {...props}>
        {SECTION_LABELS.map((sectionKey) => {
          const { label, items } = sections[sectionKey]
          const isActive = activeSection === sectionKey
          return (
            <ArkMenu.Root
              key={label}
              dir={direction}
              onOpenChange={(details) => handleOpenChange(details, sectionKey)}
              loop
            >
              <ArkMenu.Trigger asChild>
                <Button
                  variant="ghost"
                  m="0"
                  color={isActive ? "primary.base" : "menu.lvl1.body"}
                >
                  {isActive && (
                    <motion.div
                      style={{
                        position: "absolute",
                        inset: "0",
                        borderRadius: "var(--eth-radii-base)",
                        background: "var(--eth-colors-primary-lowContrast)",
                      }}
                      layoutId="menu-section-bg-highlight"
                      transition={{ duration: 0.2 }}
                    />
                  )}
                  <Text as="span" position="relative">
                    {label}
                  </Text>
                </Button>
              </ArkMenu.Trigger>
              <LvlPortal lvl={1} refs={refs} items={items} />
            </ArkMenu.Root>
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

export default Menu

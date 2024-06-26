import type { RefObject } from "react"
import {
  type ButtonProps,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  useBreakpointValue,
} from "@chakra-ui/react"

import type { NavSections } from "../types"

import HamburgerButton from "./HamburgerButton"
import MenuBody from "./MenuBody"
import MenuFooter from "./MenuFooter"
import MenuHeader from "./MenuHeader"

type MobileNavMenuProps = ButtonProps & {
  isOpen: boolean
  onToggle: () => void
  toggleColorMode: () => void
  toggleSearch: () => void
  linkSections: NavSections
  drawerContainerRef: RefObject<HTMLElement | null>
}

const MobileNavMenu = ({
  isOpen,
  onToggle,
  toggleColorMode,
  toggleSearch,
  linkSections,
  drawerContainerRef,
  ...props
}: MobileNavMenuProps) => {
  return (
    <>
      <HamburgerButton isMenuOpen={isOpen} onToggle={onToggle} {...props} />

      {/* DRAWER MENU */}
      <Drawer
        portalProps={{ containerRef: drawerContainerRef }}
        isOpen={isOpen}
        onClose={onToggle}
        placement="start"
        size="md"
      >
        <DrawerOverlay onClick={onToggle} bg="modalBackground" />

        <DrawerContent bg="background.base">
          {/* HEADER ELEMENTS: SITE NAME, CLOSE BUTTON */}
          <MenuHeader />

          {/* MAIN NAV ACCORDION CONTENTS OF MOBILE MENU */}
          <MenuBody linkSections={linkSections} onToggle={onToggle} />

          {/* FOOTER ELEMENTS: SEARCH, LIGHT/DARK, LANGUAGES */}
          <MenuFooter
            onToggle={onToggle}
            toggleSearch={toggleSearch}
            toggleColorMode={toggleColorMode}
          />
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default MobileNavMenu

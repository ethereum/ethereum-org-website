import type { RefObject } from "react"

import type { NavSections } from "../types"

import HamburgerButton from "./HamburgerButton"
import MenuBody from "./MenuBody"
import MenuFooter from "./MenuFooter"
import MenuHeader from "./MenuHeader"
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer"

type MobileNavMenuProps = {
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
    <Drawer>
      <DrawerTrigger asChild>
        <HamburgerButton isMenuOpen={isOpen} onToggle={onToggle} {...props} />
        {/* <Button variant="outline">Open Drawer</Button> */}
      </DrawerTrigger>
      <DrawerContent>
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
  )
}

export default MobileNavMenu

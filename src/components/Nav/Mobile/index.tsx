import { ButtonProps } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet"

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
}

const MobileNavMenu = ({
  isOpen,
  onToggle,
  toggleColorMode,
  toggleSearch,
  linkSections,
  ...props
}: MobileNavMenuProps) => {
  return (
    <>
      {/* DRAWER MENU */}
      <Sheet open={isOpen} onOpenChange={onToggle}>
        <SheetTrigger asChild>
          <HamburgerButton isMenuOpen={isOpen} onClick={onToggle} {...props} />
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col" aria-describedby="">
          {/* HEADER ELEMENTS: SITE NAME, CLOSE BUTTON */}
          <SheetHeader>
            <MenuHeader />
          </SheetHeader>

          {/* MAIN NAV ACCORDION CONTENTS OF MOBILE MENU */}
          <div className="flex-1 overflow-auto">
            <MenuBody linkSections={linkSections} onToggle={onToggle} />
          </div>

          {/* FOOTER ELEMENTS: SEARCH, LIGHT/DARK, LANGUAGES */}
          <SheetFooter className="h-[108px] justify-center border-t border-primary-low-contrast px-4 py-0">
            <MenuFooter
              onToggle={onToggle}
              toggleSearch={toggleSearch}
              toggleColorMode={toggleColorMode}
            />
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  )
}

export default MobileNavMenu

"use client"

import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet"

import { cn } from "@/lib/utils/cn"

import { ButtonProps } from "../../ui/buttons/Button"
import type { NavSections } from "../types"

import HamburgerButton from "./HamburgerButton"
import MenuBody from "./MenuBody"
import MenuFooter from "./MenuFooter"
import MenuHeader from "./MenuHeader"

import { useDisclosure } from "@/hooks/useDisclosure"

type MobileNavMenuProps = ButtonProps & {
  toggleColorMode: () => void
  toggleSearch: () => void
  linkSections: NavSections
}

const MobileNavMenu = ({
  toggleColorMode,
  toggleSearch,
  linkSections,
  className,
  ...props
}: MobileNavMenuProps) => {
  const { isOpen, onToggle } = useDisclosure()

  // DRAWER MENU
  return (
    <Sheet open={isOpen} onOpenChange={onToggle}>
      <SheetTrigger asChild>
        <HamburgerButton
          className={cn("-me-2", className)}
          isMenuOpen={isOpen}
          {...props}
        />
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
        <SheetFooter className="h-[108px] justify-center border-t border-body-light px-4 py-0">
          <MenuFooter
            onToggle={onToggle}
            toggleSearch={toggleSearch}
            toggleColorMode={toggleColorMode}
          />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default MobileNavMenu

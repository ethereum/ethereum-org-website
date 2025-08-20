import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet"

import { cn } from "@/lib/utils/cn"

import { ButtonProps } from "../../ui/buttons/Button"

import HamburgerButton from "./HamburgerButton"
import MenuBody from "./MenuBody"
import MenuFooter from "./MenuFooter"
import MenuHeader from "./MenuHeader"

type MobileMenuProps = ButtonProps

const MobileMenu = ({ className, ...props }: MobileMenuProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <HamburgerButton
          className={cn("-me-2", className)}
          // TODO: recover this animation/prop
          isMenuOpen={false}
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
          <MenuBody />
        </div>

        {/* FOOTER ELEMENTS: SEARCH, LIGHT/DARK, LANGUAGES */}
        <SheetFooter className="h-[108px] justify-center border-t border-body-light px-4 py-0">
          <MenuFooter />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default MobileMenu

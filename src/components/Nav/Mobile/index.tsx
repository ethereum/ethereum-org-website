import { Sheet, SheetTrigger } from "@/components/ui/sheet"

import { cn } from "@/lib/utils/cn"

import { ButtonProps } from "../../ui/buttons/Button"

import HamburgerButton from "./HamburgerButton"
import MenuBody from "./MenuBody"
import MobileMenuContent from "./MobileMenuContent"

import { getLanguagesDisplayInfo } from "@/lib/nav/links"

type MobileMenuProps = ButtonProps

const MobileMenu = async ({ className, ...props }: MobileMenuProps) => {
  const languages = await getLanguagesDisplayInfo()

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
      <MobileMenuContent menuBody={<MenuBody />} languages={languages} />
    </Sheet>
  )
}

export default MobileMenu

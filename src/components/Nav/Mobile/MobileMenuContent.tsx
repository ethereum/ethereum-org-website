"use client"

import { createContext, useContext, useState } from "react"

import type { LocaleDisplayInfo } from "@/lib/types"

import { SheetContent, SheetFooter, SheetHeader } from "@/components/ui/sheet"

import MenuFooterClient from "./MenuFooterClient"
import MenuHeader from "./MenuHeader"
import MobileLanguagePicker from "./MobileLanguagePicker"

type MobileMenuView = "menu" | "language-picker"

type MobileMenuContextType = {
  currentView: MobileMenuView
  setCurrentView: (view: MobileMenuView) => void
}

const MobileMenuContext = createContext<MobileMenuContextType | undefined>(
  undefined
)

export const useMobileMenu = () => {
  const context = useContext(MobileMenuContext)
  if (!context) {
    throw new Error("useMobileMenu must be used within MobileMenuContent")
  }
  return context
}

type MobileMenuContentProps = {
  menuBody: React.ReactNode
  languages: LocaleDisplayInfo[]
}

const MobileMenuContent = ({ menuBody, languages }: MobileMenuContentProps) => {
  const [currentView, setCurrentView] = useState<MobileMenuView>("menu")

  return (
    <MobileMenuContext.Provider value={{ currentView, setCurrentView }}>
      <SheetContent side="left" className="flex flex-col" aria-describedby="">
        {/* HEADER ELEMENTS: SITE NAME, CLOSE BUTTON */}
        <SheetHeader>
          <MenuHeader />
        </SheetHeader>

        {/* MAIN NAV ACCORDION CONTENTS OF MOBILE MENU */}
        <div className="flex-1 overflow-auto">
          {currentView === "menu" ? (
            menuBody
          ) : (
            <MobileLanguagePicker languages={languages} />
          )}
        </div>

        {/* FOOTER ELEMENTS: SEARCH, LIGHT/DARK, LANGUAGES */}
        {currentView === "menu" && (
          <SheetFooter className="h-[108px] justify-center border-t border-body-light px-4 py-0">
            <MenuFooterClient />
          </SheetFooter>
        )}
      </SheetContent>
    </MobileMenuContext.Provider>
  )
}

export default MobileMenuContent

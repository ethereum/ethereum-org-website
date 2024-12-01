import { useRef } from "react"
import dynamic from "next/dynamic"
import { useTranslation } from "next-i18next"

import { EthHomeIcon } from "@/components/icons"
import Search from "@/components/Search"

import SearchButton from "../Search/SearchButton"
import SearchInputButton from "../Search/SearchInputButton"
import { BaseLink } from "../ui/Link"

import DesktopNavMenu from "./Desktop"
import { useNav } from "./useNav"

import { useBreakpointValue } from "@/hooks/useBreakpointValue"
import { useIsClient } from "@/hooks/useIsClient"

const Menu = dynamic(() => import("./Menu"), {
  ssr: false,
  loading: () => <div />,
})
const MobileNavMenu = dynamic(() => import("./Mobile"), { ssr: false })

// TODO display page title on mobile
const Nav = () => {
  const { toggleColorMode, linkSections } = useNav()
  const { t } = useTranslation("common")
  const navWrapperRef = useRef(null)
  const isClient = useIsClient()
  const desktopScreen = useBreakpointValue({ base: false, md: true })

  return (
    <div className="sticky top-0 z-sticky w-full">
      <nav
        ref={navWrapperRef}
        className="flex h-19 justify-center border-b border-b-disabled bg-background p-4 xl:px-8"
        aria-label={t("nav-primary")}
      >
        <div className="flex w-full max-w-screen-2xl items-center justify-between md:items-stretch md:justify-normal">
          <BaseLink
            href="/"
            aria-label={t("home")}
            className="inline-flex items-center no-underline"
          >
            <EthHomeIcon className="h-[35px] w-[22px] opacity-85 hover:opacity-100" />
          </BaseLink>
          {/* Desktop */}
          <div className="ms-3 flex w-full justify-end md:justify-between xl:ms-8">
            {/* avoid rendering desktop Menu version on mobile */}
            {isClient && desktopScreen ? (
              <Menu className="hidden md:block" sections={linkSections} />
            ) : (
              <div />
            )}

            <Search>
              {({ onOpen }) => {
                if (!isClient) return null

                return (
                  <div className="flex items-center">
                    {/* Desktop */}
                    <div className="hidden md:flex">
                      <SearchButton className="xl:hidden" onClick={onOpen} />
                      <SearchInputButton
                        className="hidden xl:flex"
                        onClick={onOpen}
                      />
                      <DesktopNavMenu toggleColorMode={toggleColorMode} />
                    </div>

                    <div className="flex md:hidden">
                      {/* Mobile */}
                      <SearchButton onClick={onOpen} />
                      <MobileNavMenu
                        toggleColorMode={toggleColorMode}
                        linkSections={linkSections}
                        toggleSearch={onOpen}
                      />
                    </div>
                  </div>
                )
              }}
            </Search>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Nav

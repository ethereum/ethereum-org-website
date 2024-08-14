import { lazy, Suspense, useRef } from "react"
import { useTranslation } from "next-i18next"
import { MdSearch } from "react-icons/md"

import { EthHomeIcon } from "@/components/icons"
import Search from "@/components/Search"

import { isDesktop } from "@/lib/utils/isDesktop"

import SearchButton from "../Search/SearchButton"
import { Button } from "../ui/buttons/Button"
import { BaseLink } from "../ui/Link"

import DesktopNavMenu from "./Desktop"
import Menu from "./Menu"
import { useNav } from "./useNav"

import { useDisclosure } from "@/hooks/useDisclosure"
import { useIsClient } from "@/hooks/useIsClient"

const MobileNavMenu = lazy(() => import("./Mobile"))

// TODO display page title on mobile
const Nav = () => {
  const { toggleColorMode, linkSections } = useNav()
  const { t } = useTranslation("common")
  const searchModalDisclosure = useDisclosure()
  const navWrapperRef = useRef(null)
  const isClient = useIsClient()
  const isDesktopFlag = isDesktop()

  return (
    <div className="sticky top-0 z-sticky w-full">
      <nav
        ref={navWrapperRef}
        className="flex h-19 justify-center border-b border-background-highlight bg-background px-4 py-4 xl:px-8"
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
            {isClient && isDesktopFlag ? (
              <Menu className="hidden md:block" sections={linkSections} />
            ) : (
              <div />
            )}

            <div className="flex items-center">
              {/* Desktop */}
              <div className="hidden md:flex">
                <Search {...searchModalDisclosure}>
                  <SearchButton />
                </Search>
                <DesktopNavMenu toggleColorMode={toggleColorMode} />
              </div>

              <div className="flex md:hidden">
                {/* Mobile */}
                {/* use Suspense to display the Search & the Menu at the same time */}
                <Suspense>
                  <Search {...searchModalDisclosure}>
                    <Button
                      className="px-2 transition-transform duration-200 ease-in-out hover:rotate-6 hover:text-primary"
                      variant="ghost"
                      isSecondary
                    >
                      <MdSearch />
                    </Button>
                  </Search>
                  <MobileNavMenu
                    toggleColorMode={toggleColorMode}
                    linkSections={linkSections}
                    toggleSearch={searchModalDisclosure.onOpen}
                  />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Nav

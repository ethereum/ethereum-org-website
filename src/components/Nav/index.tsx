import { lazy, Suspense, useRef } from "react"
import { useTranslation } from "next-i18next"
import { useDisclosure } from "@chakra-ui/react"

import { EthHomeIcon } from "@/components/icons"
import Search from "@/components/Search"

import { isMobile } from "@/lib/utils/isMobile"

// import DesktopNavMenu from "./Desktop"
import Menu from "./Menu"
import { useNav } from "./useNav"
import Link from "next/link"

const MobileNavMenu = lazy(() => import("./Mobile"))

// TODO display page title on mobile
const Nav = () => {
  const { toggleColorMode, linkSections, mobileNavProps } = useNav()
  const { t } = useTranslation("common")
  const isDesktop = !isMobile()
  const searchModalDisclosure = useDisclosure()
  const navWrapperRef = useRef(null)

  return (
    <div className="sticky top-0 z-10 w-full">
      <nav
        ref={navWrapperRef}
        aria-label={t("nav-primary")}
        className="bg-background-base border-b border-[rgba(0, 0, 0, 0.1)] h-[4.75rem] flex justify-center py-4 px-4 xl:px-8"
      >
        <div className="flex items-center md:items-normal justify-between md:justify-normal w-full max-w-[var(--container-2xl)]">
          <Link
            href="/"
            aria-label={t("home")}
            className="inline-flex items-center no-underline"
          >
            <EthHomeIcon className="opacity-85 hover:opacity-100" />
          </Link>
          <div className="flex w-full justify-end md:justify-between ms-3 xl:ms-8">
            {isDesktop && <Menu hideBelow="md" sections={linkSections} />}
            <div className="flex items-center">
              <div className="hidden md:block">
                {/* <Search {...searchModalDisclosure} />
                <DesktopNavMenu toggleColorMode={toggleColorMode} /> */}
              </div>
              <div className="md:hidden">
                <Suspense>
                  {/* <Search {...searchModalDisclosure} />
                  <MobileNavMenu
                    {...mobileNavProps}
                    linkSections={linkSections}
                    toggleSearch={searchModalDisclosure.onOpen}
                    drawerContainerRef={navWrapperRef}
                  /> */}
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

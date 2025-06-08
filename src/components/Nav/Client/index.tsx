"use client"

import dynamic from "next/dynamic"

import SearchButton from "@/components/Search/SearchButton"
import SearchInputButton from "@/components/Search/SearchInputButton"
import { Skeleton } from "@/components/ui/skeleton"

import DesktopNavMenu from "../Desktop"
import { useNav } from "../useNav"

import { useBreakpointValue } from "@/hooks/useBreakpointValue"

const Menu = dynamic(() => import("../Menu"), {
  ssr: false,
  loading: () => (
    <div className="me-8 flex w-full items-center gap-10 px-6 max-md:hidden">
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton key={i} className="h-6 w-12 py-2 opacity-5" />
      ))}
    </div>
  ),
})

const MobileNavMenu = dynamic(() => import("../Mobile"), {
  ssr: false,
  loading: () => <Skeleton className="my-auto size-6 opacity-10" />,
})

const Search = dynamic(() => import("../../Search"), {
  ssr: false,
  loading: () => (
    <>
      <div className="flex items-center gap-6 px-6 max-md:hidden [&>div]:opacity-5">
        <Skeleton data-label="search-xl" className="hidden h-8 w-40 xl:flex" />
        <Skeleton data-label="search" className="size-6 xl:hidden" />
        <Skeleton data-label="theme-toggle" className="size-6" />
        <Skeleton data-label="language-icon" className="-me-4 size-6" />
        <Skeleton
          data-label="language-name-code"
          className="h-6 w-28 max-lg:hidden"
        />
        <Skeleton data-label="language-code" className="size-6 lg:hidden" />
      </div>
      <div className="flex items-center gap-4 md:hidden [&>div]:opacity-5">
        <Skeleton data-label="search" className="size-6 xl:hidden" />
        <Skeleton data-label="mobile-menu" className="size-6" />
      </div>
    </>
  ),
})

const ClientSideNav = () => {
  const { toggleColorMode, linkSections } = useNav()

  const desktopScreen = useBreakpointValue({ base: false, md: true })
  return (
    <div className="ms-3 flex w-full justify-end md:justify-between xl:ms-8">
      {/* avoid rendering/adding desktop Menu version to DOM on mobile */}
      {desktopScreen && (
        <Menu className="max-md:hidden" sections={linkSections} />
      )}

      <Search>
        {({ onOpen }) => (
          <div className="flex items-center">
            {/* Desktop */}
            <div className="hidden md:flex">
              <SearchButton className="xl:hidden" onClick={onOpen} />
              <SearchInputButton className="hidden xl:flex" onClick={onOpen} />
              <DesktopNavMenu toggleColorMode={toggleColorMode} />
            </div>

            {/* Mobile */}
            <div className="flex md:hidden">
              <SearchButton onClick={onOpen} />
              <MobileNavMenu
                toggleColorMode={toggleColorMode}
                linkSections={linkSections}
                toggleSearch={onOpen}
              />
            </div>
          </div>
        )}
      </Search>
    </div>
  )
}

ClientSideNav.displayName = "ClientSideNav"

export default ClientSideNav

import { getTranslations } from "next-intl/server"

import { EthHomeIcon } from "@/components/icons"

import { breakpointAsNumber } from "@/lib/utils/screen"

import ClientOnly from "../ClientOnly"
import MediaQuery from "../MediaQuery"
import { BaseLink } from "../ui/Link"

import DesktopNav from "./DesktopNav"
import { DesktopNavLoading, MobileNavLoading } from "./loading"
import MobileNav from "./MobileNav"

const Nav = async () => {
  const t = await getTranslations({ namespace: "common" })

  return (
    <nav
      className="sticky top-0 z-sticky flex h-19 w-full max-w-screen-2xl items-center justify-between border-b bg-background p-4 md:items-stretch md:justify-normal xl:px-8"
      aria-label={t("nav-primary")}
    >
      <BaseLink
        href="/"
        aria-label={t("home")}
        className="inline-flex items-center no-underline"
        data-testid="nav-logo"
      >
        <EthHomeIcon className="text-[35px] opacity-85 hover:opacity-100" />
      </BaseLink>

      <div className="ms-3 flex w-full justify-end md:justify-between xl:ms-8">
        <ClientOnly fallback={<DesktopNavLoading />}>
          <MediaQuery queries={[`(min-width: ${breakpointAsNumber.md}px)`]}>
            <DesktopNav />
          </MediaQuery>
        </ClientOnly>
        <ClientOnly fallback={<MobileNavLoading />}>
          <MediaQuery queries={[`(max-width: ${breakpointAsNumber.md - 1}px)`]}>
            <MobileNav />
          </MediaQuery>
        </ClientOnly>
      </div>
    </nav>
  )
}

export default Nav

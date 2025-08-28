import { getLocale, getTranslations } from "next-intl/server"

import { EthHomeIcon } from "@/components/icons"

import ClientOnly from "../ClientOnly"
import { BaseLink } from "../ui/Link"

import DesktopNav from "./DesktopNav"
import { DesktopNavLoading, MobileNavLoading } from "./loading"
import MobileNav from "./MobileNav"

const Nav = async () => {
  const locale = await getLocale()
  const t = await getTranslations({ locale, namespace: "common" })

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
          <DesktopNav className="hidden md:flex" />
        </ClientOnly>
        <ClientOnly fallback={<MobileNavLoading />}>
          <MobileNav className="flex md:hidden" />
        </ClientOnly>
      </div>
    </nav>
  )
}

export default Nav

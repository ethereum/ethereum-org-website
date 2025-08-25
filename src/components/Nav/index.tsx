import dynamic from "next/dynamic"
import { getLocale, getTranslations } from "next-intl/server"

import { EthHomeIcon } from "@/components/icons"

import { BaseLink } from "../ui/Link"

const DesktopNav = dynamic(() => import("./DesktopNav"), {
  ssr: false,
})
const MobileNav = dynamic(() => import("./MobileNav"), {
  ssr: false,
})

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
        <DesktopNav className="hidden md:flex" />
        <MobileNav className="flex md:hidden" />
      </div>
    </nav>
  )
}

export default Nav

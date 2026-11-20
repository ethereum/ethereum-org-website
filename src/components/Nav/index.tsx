import { getTranslations } from "next-intl/server"

import { EthHomeIcon } from "@/components/icons"

import ClientOnly from "../ClientOnly"
import { BaseLink } from "../ui/Link"

import CrawlableNav from "./CrawlableNav"
import DesktopNav from "./DesktopNav"
import { DesktopNavLoading, MobileNavLoading } from "./loading"
import MobileNav from "./MobileNav"
import ResponsiveNav from "./ResponsiveNav"

const Nav = async () => {
  const t = await getTranslations("common")

  return (
    <>
      <nav
        className="sticky top-0 z-sticky flex h-19 w-full max-w-screen-2xl items-center justify-between border-b bg-background p-4 lg:items-stretch lg:justify-normal xl:px-8"
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

        <div className="ms-3 flex w-full min-w-0 justify-end xl:ms-8">
          <ClientOnly
            fallback={
              <>
                <DesktopNavLoading />
                <MobileNavLoading />
              </>
            }
          >
            <ResponsiveNav desktop={<DesktopNav />} mobile={<MobileNav />} />
          </ClientOnly>
        </div>
      </nav>

      <CrawlableNav />
    </>
  )
}

export default Nav

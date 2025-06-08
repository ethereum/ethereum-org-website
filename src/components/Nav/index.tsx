import { getTranslations } from "next-intl/server"

import { EthHomeIcon } from "@/components/icons"

import { BaseLink } from "../ui/Link"

import ClientSideNav from "./Client"

const Nav = async ({ locale }) => {
  const t = await getTranslations({ locale, namespace: "common" })

  return (
    <div className="sticky top-0 z-sticky w-full">
      <nav
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

          <ClientSideNav />
        </div>
      </nav>
    </div>
  )
}

export default Nav

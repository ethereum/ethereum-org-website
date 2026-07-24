import { getTranslations } from "next-intl/server"

import type { Lang } from "@/lib/types"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import { isLangRightToLeft } from "@/lib/utils/translations"

/**
 * Breadcrumbs for find-wallet leaf pages (persona pages, wallet detail):
 * ethereum.org / Wallets / Find wallet / <leaf>. Built by hand rather than via
 * the slug-based `Breadcrumbs` so it stays consistent across routes whose URL
 * segments aren't all navigable (e.g. `personas`) and whose leaf label lives in
 * the page namespace, not `common`.
 */
const FindWalletBreadcrumbs = async ({
  locale,
  leaf,
}: {
  locale: string
  /** Label for the current (non-link) page: a persona title or a wallet name. */
  leaf: string
}) => {
  const t = await getTranslations({ locale, namespace: "common" })
  const dir = isLangRightToLeft(locale as Lang) ? "rtl" : "ltr"

  const separator = (
    <BreadcrumbSeparator className="ms-[0.625rem] me-[0.625rem] text-gray-400">
      /
    </BreadcrumbSeparator>
  )

  return (
    <Breadcrumb dir={dir}>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">ethereum.org</BreadcrumbLink>
        </BreadcrumbItem>
        {separator}
        <BreadcrumbItem>
          <BreadcrumbLink href="/wallets">{t("wallets")}</BreadcrumbLink>
        </BreadcrumbItem>
        {separator}
        <BreadcrumbItem>
          <BreadcrumbLink href="/wallets/find-wallet">
            {t("find-wallet")}
          </BreadcrumbLink>
        </BreadcrumbItem>
        {separator}
        <BreadcrumbItem>
          <BreadcrumbPage>{leaf}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export default FindWalletBreadcrumbs

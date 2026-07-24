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
 * Breadcrumbs for a persona page: ethereum.org / Wallets / Find wallet /
 * <persona>. Built by hand rather than via the slug-based `Breadcrumbs` because
 * the `personas` URL segment isn't a navigable route (so it's dropped) and the
 * persona label lives in the page namespace, not `common`.
 */
const WalletPersonaBreadcrumbs = async ({
  locale,
  personaTitle,
}: {
  locale: string
  personaTitle: string
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
          <BreadcrumbPage>{personaTitle}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export default WalletPersonaBreadcrumbs

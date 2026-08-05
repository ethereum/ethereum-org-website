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
 * Hand-built rather than the slug-based `Breadcrumbs`: not every URL segment is
 * navigable (`personas`), and the leaf label lives outside the `common`
 * namespace.
 */
const FindWalletBreadcrumbs = async ({
  locale,
  leaf,
}: {
  locale: string
  leaf: string
}) => {
  const t = await getTranslations({ locale, namespace: "common" })
  const dir = isLangRightToLeft(locale as Lang) ? "rtl" : "ltr"

  const separator = (
    <BreadcrumbSeparator className="mx-[0.625rem] text-gray-400">
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
          <BreadcrumbLink href="/wallets/">{t("wallets")}</BreadcrumbLink>
        </BreadcrumbItem>
        {separator}
        <BreadcrumbItem>
          <BreadcrumbLink href="/wallets/find-wallet/">
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

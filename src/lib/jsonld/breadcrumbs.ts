import { getTranslations } from "next-intl/server"

import { getBreadcrumbTrail } from "@/lib/utils/breadcrumbs"
import { normalizeUrlForJsonLd } from "@/lib/utils/url"

import { DEFAULT_LOCALE } from "@/lib/constants"

/**
 * BreadcrumbList for a page, built from the same trail as the visible
 * `Breadcrumbs`. Pass the same `slug` and `label` the page renders with.
 * Always starts at the site root, which the visible trail shows as an icon on
 * and below a hub.
 */
export const getBreadcrumbListJsonLd = async (
  locale: string | undefined,
  slug: string,
  label?: string
) => {
  const t = await getTranslations({
    locale: locale ?? DEFAULT_LOCALE,
    namespace: "common",
  })
  const trail = getBreadcrumbTrail(slug)
  const items =
    trail[0]?.href === "/" ? trail : [{ href: "/", labelKey: null }, ...trail]

  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map(({ href, labelKey }, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name:
        idx === items.length - 1 && label
          ? label
          : labelKey
            ? t(labelKey)
            : "ethereum.org",
      item: normalizeUrlForJsonLd(locale, href),
    })),
  }
}

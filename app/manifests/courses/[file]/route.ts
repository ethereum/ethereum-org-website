import { getTranslations } from "next-intl/server"

import type { Lang } from "@/lib/types"

import { isLangRightToLeft } from "@/lib/utils/translations"

import { courseAppScope } from "@/data/courses"

import { LOCALES_CODES } from "@/lib/constants"

// One installable courses app per language: a manifest's scope is a single
// path prefix, so /courses/ and /es/courses/ can't share one
export const dynamic = "force-static"
export const dynamicParams = false

const EXTENSION = ".webmanifest"

export const generateStaticParams = () =>
  LOCALES_CODES.map((locale) => ({ file: `${locale}${EXTENSION}` }))

export const GET = async (
  _: Request,
  { params }: { params: Promise<{ file: string }> }
) => {
  const { file } = await params
  const locale = file.slice(0, -EXTENSION.length)
  const t = await getTranslations({ locale, namespace: "page-courses" })
  const scope = courseAppScope(locale)

  return Response.json(
    {
      id: scope,
      name: t("page-courses-app-name"),
      short_name: t("page-courses-app-short-name"),
      description: t("page-courses-meta-description"),
      lang: locale,
      dir: isLangRightToLeft(locale as Lang) ? "rtl" : "ltr",
      start_url: scope,
      scope,
      display: "standalone",
      background_color: "#ffffff",
      theme_color: "#6c24df",
      // Artwork sits inside the maskable safe zone, so one file serves both
      icons: [192, 512].flatMap((size) =>
        (["any", "maskable"] as const).map((purpose) => ({
          src: `/images/courses/app-icon-${size}.png`,
          type: "image/png",
          sizes: `${size}x${size}`,
          purpose,
        }))
      ),
    },
    { headers: { "Content-Type": "application/manifest+json" } }
  )
}

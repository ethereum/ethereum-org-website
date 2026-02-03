import { Download, Star } from "lucide-react"
import Image from "next/image"
import { getLocale, getTranslations } from "next-intl/server"
import type { MDXRemoteProps } from "next-mdx-remote/rsc"

import GitHub from "@/components/icons/github.svg"
import NpmJs from "@/components/icons/npmjs.svg"
import { htmlElements } from "@/components/MdComponents"
import { ButtonLink } from "@/components/ui/buttons/Button"
import { Tag, TagsInlineText } from "@/components/ui/tag"

import { formatDate, getValidDate } from "@/lib/utils/date"
import { isExternal } from "@/lib/utils/url"

import { DEV_APP_CATEGORY_SLUGS } from "../constants"
import type { DeveloperApp } from "../types"
import { getCategoryTagStyle } from "../utils"

import { renderSimpleMarkdown } from "@/lib/md/renderSimple"

const AppModalContents = async ({ app }: { app: DeveloperApp }) => {
  const locale = await getLocale()
  const t = await getTranslations({
    locale,
    namespace: "page-developers-tools",
  })
  const tCommon = await getTranslations({ locale, namespace: "common" })

  const categorySlug = DEV_APP_CATEGORY_SLUGS[app.category]

  const BoldedParagraph = (props: { children?: React.ReactNode }) => (
    <htmlElements.p className="font-bold" {...props} />
  )

  const mdComponentOverrides = {
    h1: BoldedParagraph,
    h2: BoldedParagraph,
    h3: BoldedParagraph,
    h4: BoldedParagraph,
    h5: BoldedParagraph,
    h6: BoldedParagraph,
    img: () => null,
  } as MDXRemoteProps["components"]

  return (
    <div className="bg-background">
      <div className="h-36 w-full bg-gradient-to-b from-accent-a/5 to-accent-a/10 dark:from-accent-a/10 dark:to-accent-a/20">
        {app.banner_url && (
          <Image
            src={app.banner_url}
            alt=""
            width={23 * 16}
            height={23 * 4}
            className="size-full object-cover"
          />
        )}
      </div>
      <div className="space-y-4 p-8">
        <div className="space-y-1">
          <Tag
            size="small"
            status={getCategoryTagStyle(categorySlug)}
            className="px-1 py-0"
          >
            {app.category}
          </Tag>
          <h2 className="text-3xl">{app.name}</h2>
          <TagsInlineText
            list={app.tags.map((tag) => t(`page-developers-tools-tag-${tag}`))}
            variant="light"
            className="lowercase"
          />
        </div>
        <div className="-mt-2 max-h-[16lh] overflow-y-auto pb-4 pt-2 [mask-image:linear-gradient(to_top,transparent,white_2rem,white_calc(100%-1rem),transparent)]">
          {await renderSimpleMarkdown(app.description, mdComponentOverrides)}
        </div>
        <div className="!mt-8 space-y-2">
          <p>{t("page-developers-tools-modal-links")}</p>
          <div className="flex flex-wrap gap-2">
            {app.website && (
              <ButtonLink href={app.website}>
                {t("page-developers-tools-modal-website")}
              </ButtonLink>
            )}
            {app.twitter && (
              <ButtonLink
                href={app.twitter}
                variant={app.website ? "outline" : "solid"}
              >
                {t("page-developers-tools-modal-social")}
              </ButtonLink>
            )}
            {app.repos
              .filter(({ href }) => isExternal(href))
              .map(({ href, stargazers, downloads, lastUpdated }) => {
                const isGitHub = href.includes("https://github.com")
                const isNpm = href.includes("https://www.npmjs.com")
                const sanitizeRegExp =
                  /^https:\/\/(github\.com|www\.npmjs\.com\/package)\//
                // TODO: Handle non-github/npmjs labels
                const label = href.replace(sanitizeRegExp, "")
                const date = getValidDate(lastUpdated)
                const showStars = isGitHub && !!stargazers
                const showDownloads = isNpm && !!downloads
                return (
                  <ButtonLink
                    key={href}
                    href={href}
                    variant="outline"
                    className="flex w-fit"
                    hideArrow={isGitHub || isNpm}
                    title={
                      date
                        ? `${tCommon("last-updated")}: ${formatDate(date.toString())}`
                        : undefined
                    }
                  >
                    {isGitHub && <GitHub className="!size-5" />}
                    {isNpm && <NpmJs className="!size-5" />}
                    {label}
                    {showStars && (
                      <>
                        {" "}
                        <span
                          className="text-sm"
                          title={t("page-developers-tools-stats-stargazers")}
                        >
                          ({new Intl.NumberFormat(locale).format(stargazers)}
                        </span>
                        <Star className="-mx-[0.5ch] !size-3" />
                        <span className="text-sm">)</span>
                      </>
                    )}
                    {showDownloads && (
                      <>
                        {" "}
                        <span
                          className="text-sm"
                          title={t("page-developers-tools-stats-downloads")}
                        >
                          (
                          {new Intl.NumberFormat(locale, {
                            notation: "compact",
                          }).format(downloads)}
                        </span>
                        <Download className="-mx-[0.5ch] !size-3" />
                        <span className="text-sm">)</span>
                      </>
                    )}
                  </ButtonLink>
                )
              })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AppModalContents

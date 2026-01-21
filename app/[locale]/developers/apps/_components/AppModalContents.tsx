import { Download, Star } from "lucide-react"
import Image from "next/image"
import { getLocale, getTranslations } from "next-intl/server"

import GitHub from "@/components/icons/github.svg"
import NpmJs from "@/components/icons/npmjs.svg"
import { ButtonLink } from "@/components/ui/buttons/Button"
import { Tag, TagsInlineText } from "@/components/ui/tag"

import { formatDate, getValidDate } from "@/lib/utils/date"
import { isExternal } from "@/lib/utils/url"

import type { DeveloperApp } from "../types"

const AppModalContents = async ({ app }: { app: DeveloperApp }) => {
  const locale = await getLocale()
  const t = await getTranslations({ locale, namespace: "page-developers-apps" })
  const tCommon = await getTranslations({ locale, namespace: "common" })

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
            status="tag-red" // TODO: tag colors
            className="px-1 py-0"
          >
            {app.category}
          </Tag>
          <h2 className="text-3xl">{app.name}</h2>
          <TagsInlineText
            list={app.tags.map((tag) => t(`page-developers-apps-tag-${tag}`))}
            variant="light"
            className="lowercase"
          />
        </div>
        <p className="-mt-2 max-h-[16lh] overflow-y-auto pb-4 pt-2 [mask-image:linear-gradient(to_top,transparent,white_2rem,white_calc(100%-1rem),transparent)]">
          {app.description}
        </p>
        <div className="!mt-8 space-y-2">
          <p>{t("page-developers-apps-modal-links")}</p>
          <div className="flex flex-wrap gap-2">
            {app.website && (
              <ButtonLink href={app.website}>
                {t("page-developers-apps-modal-website")}
              </ButtonLink>
            )}
            {app.twitter && (
              <ButtonLink
                href={app.twitter}
                variant={app.website ? "outline" : "solid"}
              >
                {t("page-developers-apps-modal-social")}
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
                          title={t("page-developers-apps-stats-stargazers")}
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
                          title={t("page-developers-apps-stats-downloads")}
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

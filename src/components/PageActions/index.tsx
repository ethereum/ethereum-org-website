"use client"

import CopyPageButton from "@/components/CopyPageButton"
import Github from "@/components/icons/github.svg"
import ListenToPlayer from "@/components/ListenToPlayer/lazy"
import InlineLink from "@/components/ui/Link"

import { cn } from "@/lib/utils/cn"

import { getPlaylistBySlug } from "@/data/listen-to-feature/playlist"

import { useTranslation } from "@/hooks/useTranslation"
import { usePathname } from "@/i18n/navigation"

type PageActionsProps = {
  slug: string
  isTranslated?: boolean
  editPath?: string
  hideEditButton?: boolean
  className?: string
}

const PageActions = ({
  slug,
  isTranslated,
  editPath,
  hideEditButton,
  className,
}: PageActionsProps) => {
  const { t } = useTranslation("common")
  const pathname = usePathname()
  const hasListenToPlaylist = getPlaylistBySlug(slug).index !== -1

  return (
    <div
      className={cn(
        "flex flex-row flex-wrap items-center gap-x-3 gap-y-2 sm:gap-x-4",
        className
      )}
    >
      {hasListenToPlaylist && <ListenToPlayer slug={slug} />}
      <CopyPageButton slug={slug} isTranslated={isTranslated} />
      {!hideEditButton && editPath && (
        <InlineLink
          href={editPath}
          hideArrow
          className="inline-flex items-center gap-2 text-xs text-body! no-underline! hover:text-primary-hover! [&>svg]:size-4"
          customEventOptions={{
            eventCategory: "edit_page",
            eventAction: "gh_edit_click",
            eventName: pathname,
          }}
        >
          <Github />
          {t("edit-page")}
        </InlineLink>
      )}
    </div>
  )
}

export default PageActions

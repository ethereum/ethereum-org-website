import { getTranslations } from "next-intl/server"

import type { PrivacyLessonChapterId } from "@/lib/types"

import Link from "@/components/ui/Link"

const NS = "page-privacy-public-by-default"

/** End-of-chapter link to the next chapter's section, with its kicker and blurb. */
const NextChapterLink = async ({ id }: { id: PrivacyLessonChapterId }) => {
  const t = await getTranslations(NS)
  return (
    <Link
      href={`#${id}`}
      className="block rounded-base border p-6 text-body no-underline hover:border-primary hover:text-body focus-visible:border-primary"
    >
      <span className="block text-sm font-bold tracking-wide text-primary uppercase">
        {t("page-privacy-public-by-default-nav-next", {
          kicker: t(`page-privacy-public-by-default-${id}-kicker`, {
            number: "",
          }),
        })}
      </span>
      <span className="mt-1 block text-lg">
        {t(`page-privacy-public-by-default-${id}-nav-blurb`)}
      </span>
    </Link>
  )
}

export default NextChapterLink

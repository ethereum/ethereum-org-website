"use client"

import { useTranslations } from "next-intl"

import type { PrivacyLessonFixId } from "@/lib/types"

import { richTags } from "@/components/PrivacyWidgets/shared/rich-tags"

import { LESSON_NS } from "../../use-lesson-translations"

import { fixGlossary, fixLearnMoreHref } from "./fix-content"

/** What a fix is, what it protects and costs, and where to learn more */
const FixBody = ({ id }: { id: PrivacyLessonFixId }) => {
  const tRaw = useTranslations(LESSON_NS)
  const k = (suffix: string) => `${LESSON_NS}-${suffix}`
  const glossary = fixGlossary[id] ?? {}

  return (
    <div className="space-y-3">
      <p className="m-0">
        {tRaw.rich(
          k(`fixes-fix-${id}-what`),
          richTags({ glossary: glossary.what })
        )}
      </p>
      {id === "node" && (
        <p className="m-0 text-body-medium">
          {tRaw.rich(
            k("fixes-fix-node-light-client"),
            richTags({ glossary: "light-client" })
          )}
        </p>
      )}
      <dl className="m-0 space-y-3">
        <div>
          <dt className="font-bold">{tRaw(k("fixes-card-protects-label"))}</dt>
          <dd className="m-0">
            {tRaw.rich(
              k(`fixes-fix-${id}-protects`),
              richTags({ glossary: glossary.protects })
            )}
            {id === "pool" && (
              <> {tRaw.rich(k("fixes-fix-pool-association"), richTags())}</>
            )}
          </dd>
        </div>
        <div>
          <dt className="font-bold">{tRaw(k("fixes-card-costs-label"))}</dt>
          <dd className="m-0">
            {tRaw.rich(
              k(`fixes-fix-${id}-costs`),
              richTags({ glossary: glossary.costs })
            )}
          </dd>
        </div>
        <div>
          <dt className="font-bold">{tRaw(k("fixes-card-learn-label"))}</dt>
          <dd className="m-0">
            {tRaw.rich(
              k(`fixes-fix-${id}-learn-more`),
              richTags({ link: fixLearnMoreHref[id] })
            )}
          </dd>
        </div>
      </dl>
    </div>
  )
}

export default FixBody

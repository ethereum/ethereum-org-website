import type { Frontmatter, ITutorial, Skill } from "@/lib/types"

import { dateToString } from "@/lib/utils/date"

import internalTutorialSlugs from "@/data/internalTutorials.json"

import { DEFAULT_LOCALE } from "@/lib/constants"

import { contentSource, getContentSource } from "./source"

// Fumadocs-backed replacement for `getTutorialsData` in src/lib/utils/md.ts.
// The legacy helper iterates `internalTutorialSlugs.json`, then reads each
// tutorial's `index.md` from `public/content/` at request time. That fs read
// becomes empty inside the Netlify function on ISR re-render. Sourcing from
// the compiled fumadocs collection keeps the same return shape with no
// runtime filesystem dependency.

const TUTORIALS_PREFIX = ["developers", "tutorials"]

export async function getTutorialsDataFromFumadocs(
  locale: string
): Promise<ITutorial[]> {
  const tutorials = (internalTutorialSlugs as string[]).map((slug) => {
    // Look up the locale's translated page first, falling back to EN.
    const slugParts = [...TUTORIALS_PREFIX, ...slug.split("/")]
    const localePage =
      locale === DEFAULT_LOCALE
        ? undefined
        : getContentSource(locale)?.getPage(slugParts)
    const enPage = contentSource?.getPage(slugParts)
    const source = localePage ?? enPage
    const isTranslated = locale === DEFAULT_LOCALE || Boolean(localePage)
    if (!source) return null

    const fm = source.data as unknown as Frontmatter

    const tutorial: ITutorial = {
      href: `/developers/tutorials/${slug}`,
      title: fm.title,
      description: fm.description,
      author: fm.author || "",
      tags: fm.tags,
      skill: fm.skill as Skill,
      // PoC stub: real reading-time would come from a build-time remark
      // plugin that stuffs the value into the eager frontmatter. Hardcoded
      // here so we can validate the ISR path without porting that yet.
      timeToRead: 5,
      published: dateToString(fm.published),
      lang: fm.lang,
      isExternal: false,
      isTranslated,
    }
    return tutorial
  })

  return tutorials.filter((t): t is ITutorial => t !== null)
}

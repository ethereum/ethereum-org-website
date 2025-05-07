import fs from "fs"

import { getPostSlugs } from "@/lib/utils/md"

import { DEFAULT_LOCALE, LOCALES_CODES } from "@/lib/constants"

async function checkNotTranslatedMd() {
  const slugs = await getPostSlugs("/")

  const notTranslatedSlugs: string[] = []

  let totalCount = 0
  LOCALES_CODES.forEach(() => {
    slugs.forEach(() => {
      totalCount++
    })
  })

  console.log(`Total md pages: ${totalCount}`)

  let buildCount = 0
  LOCALES_CODES.flatMap((locale) => {
    return slugs.map((slug) => {
      if (locale === DEFAULT_LOCALE) {
        buildCount++
      } else {
        try {
          fs.readFileSync(
            `./public/content/translations/${locale}/${slug}/index.md`
          )
          buildCount++
        } catch (error) {
          notTranslatedSlugs.push(`/${locale}${slug}`)
        }
      }
    })
  })

  console.log(
    `Md files built: ${buildCount} (${Number(
      (buildCount / totalCount) * 100
    ).toFixed(2)}%)`
  )

  console.log(
    `Not translated md files: ${notTranslatedSlugs.length} (${Number(
      (notTranslatedSlugs.length / totalCount) * 100
    ).toFixed(2)}%)`
  )
  //   console.log(JSON.stringify(notTranslatedSlugs, null, 2))
}

checkNotTranslatedMd()

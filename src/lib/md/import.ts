import { DEFAULT_LOCALE } from "../constants"

export const importMd = async (locale: string, slug: string) => {
  let markdown = ""

  if (locale === DEFAULT_LOCALE) {
    markdown = (await import(`../../../public/content/${slug}/index.md`))
      .default
  } else {
    try {
      markdown = (
        await import(
          `../../../public/content/translations/${locale}/${slug}/index.md`
        )
      ).default
    } catch (error) {
      const markdown = (
        await import(`../../../public/content/${slug}/index.md`)
      ).default

      return {
        markdown,
        isTranslated: false,
      }
    }
  }

  return {
    markdown,
    isTranslated: true,
  }
}

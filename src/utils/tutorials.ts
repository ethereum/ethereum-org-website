import { IExternalTutorial, ITutorial } from "../pages/developers/tutorials"
import { Skill } from "../components/TutorialMetadata"
import { Lang } from "./languages"

// Take all tutorials, and return a list of tutorials for a specific locale
export const filterTutorialsByLang = (
  internalTutorials: any,
  externalTutorials: Array<IExternalTutorial>,
  locale: Lang
): Array<ITutorial> => {
  const internalTutorialsMap = internalTutorials.map((tutorial) => ({
    to:
      tutorial?.fields?.slug?.substr(0, 3) === "/en"
        ? tutorial.fields.slug.substr(3)
        : tutorial.fields?.slug || "/",
    title: tutorial?.frontmatter?.title || "",
    description: tutorial?.frontmatter?.description || "",
    author: tutorial?.frontmatter?.author || "",
    tags: tutorial?.frontmatter?.tags?.map((tag) =>
      (tag || "").toLowerCase().trim()
    ),
    skill: tutorial?.frontmatter?.skill as Skill,
    timeToRead: tutorial?.fields?.readingTime?.minutes
      ? Math.round(tutorial?.fields?.readingTime?.minutes)
      : null,
    published: tutorial?.frontmatter?.published,
    lang: tutorial?.frontmatter?.lang || "en",
    isExternal: false,
  }))

  const externalTutorialsMap = externalTutorials.map<ITutorial>(
    (tutorial: IExternalTutorial) => ({
      to: tutorial.url,
      title: tutorial.title,
      description: tutorial.description,
      author: tutorial.author,
      tags: tutorial.tags.map((tag) => tag.toLowerCase().trim()),
      skill: tutorial.skillLevel as Skill,
      timeToRead: Number(tutorial.timeToRead),
      published: new Date(tutorial.publishDate).toISOString(),
      lang: tutorial.lang || "en",
      isExternal: true,
    })
  )

  const allTutorials: Array<ITutorial> = [
    ...externalTutorialsMap,
    ...internalTutorialsMap,
  ]

  const filteredTutorials = allTutorials
    .filter((tutorial) => tutorial.lang === locale)
    .sort((a, b) => {
      if (a.published && b.published) {
        return new Date(b.published).getTime() - new Date(a.published).getTime()
      }
      // Dont order if no published is present
      return 0
    })

  return filteredTutorials
}

export const getSortedTutorialTagsForLang = (
  filteredTutorialsByLang: Array<ITutorial> = []
) => {
  const allTags = filteredTutorialsByLang.reduce<Array<string>>(
    (tags, tutorial) => {
      return [...tags, ...(tutorial.tags || [])]
    },
    []
  )

  const reducedTags = allTags.reduce((acc, tag) => {
    if (acc[tag]) {
      acc[tag] = acc[tag] + 1
    } else {
      acc[tag] = 1
    }
    return acc
  }, {})

  const sortedTags = Object.keys(reducedTags)
    .sort()
    .reduce((obj, key) => {
      obj[key] = reducedTags[key]
      return obj
    }, {})

  return sortedTags
}

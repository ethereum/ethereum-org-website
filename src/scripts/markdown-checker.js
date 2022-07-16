const fs = require("fs")
const path = require("path")
const matter = require("gray-matter")

const PATH_TO_INTL_MARKDOWN = "./src/content/translations/"
const PATH_TO_ALL_CONTENT = "./src/content/"
const TUTORIAL_DATE_REGEX = new RegExp("\\d{4}-\\d{2}-\\d{2}")

const langsArray = fs.readdirSync(PATH_TO_INTL_MARKDOWN)
langsArray.push("en")

function sortMarkdownPathsIntoLanguages(files) {
  const languages = langsArray.reduce((accumulator, value) => {
    return { ...accumulator, [value]: [] }
  }, {})

  files.forEach((file) => {
    const isTranslation = file.includes("/translations/")
    const langIndex = file.indexOf("/translations/") + 14
    const isFourCharLang = file.includes("pt-br") || file.includes("zh-tw")
    const charactersToSlice = isFourCharLang ? 5 : 2

    const lang = isTranslation
      ? file.slice(langIndex, langIndex + charactersToSlice)
      : "en"

    languages[lang].push(file)
  })

  return languages
}

function getAllMarkdownPaths(dirPath, arrayOfFiles = []) {
  let files = fs.readdirSync(dirPath)

  arrayOfFiles = arrayOfFiles || []

  files.forEach(function (file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllMarkdownPaths(dirPath + "/" + file, arrayOfFiles)
    } else {
      const fileToPush = path.join(dirPath, "/", file)

      if (fileToPush.includes(".md")) {
        arrayOfFiles.push(fileToPush)
      }
    }
  })

  return arrayOfFiles
}

function processFrontmatter(md, lang) {
  const file = fs.readFileSync(md, "utf-8")
  const frontmatter = matter(file).data

  // console.log(frontmatter)
  // if (lang === "fr") console.log(frontmatter.title)

  if (frontmatter.lang !== lang) {
    console.log(md)
  }
}

function processFrontmatter(md, lang) {
  const file = fs.readFileSync(md, "utf-8")
  const frontmatter = matter(file).data

  if (!frontMatterHasTitle(frontmatter)) {
    console.warn(
      `Missing title: the file at ${md} does not have the frontmatter prop 'title'`
    )
  }

  // Commented out as there are many 'blanks' we need to fix
  // if (!frontMatterHasDescription(frontmatter)) {
  //   console.warn(
  //     `Missing description: the file at ${md} does not have the frontmatter prop 'description'`
  //   )
  // }

  if (!frontMatterHasLang(frontmatter)) {
    console.warn(
      `Missing lang: the file at ${md} does not have the frontmatter prop of 'lang: ${lang}'`
    )
  }

  if (
    frontMatterHasLang(frontmatter) &&
    !frontMatterHasCorrectLang(frontmatter, lang)
  ) {
    console.warn(
      `Incorrect lang: ${lang} the file at ${md} does not have the expected frontmatter prop of 'lang: ${lang}'. Lang provided: ${frontmatter.lang}`
    )
  }

  if (md.includes("/tutorials/")) {
    if (!tutorialFrontmatterHasPublished(frontmatter)) {
      console.warn(
        `Missing date: the file at ${md} does not have the frontmatter prop of 'published:'`
      )
    }
    try {
      let stringDate = frontmatter.published.toISOString().slice(0, 10)
      const dateIsFormattedCorrectly = TUTORIAL_DATE_REGEX.test(stringDate)

      if (!dateIsFormattedCorrectly) {
        console.log(
          `Incorrect date format: the file at ${md}, does not have a correctly formatted frontmatter prop of 'published'. Date provided: ${frontmatter.published}`
        )
      }
    } catch (e) {
      console.log(
        `Incorrect date format: the file at ${md}, does not have a correctly formatted frontmatter prop of 'published'. Date provided: ${frontmatter.published}`
      )
    }
  }
}

const markdownPaths = getAllMarkdownPaths(PATH_TO_ALL_CONTENT)
const markdownPathsByLang = sortMarkdownPathsIntoLanguages(markdownPaths)

for (const lang in markdownPathsByLang) {
  markdownPathsByLang[lang].forEach((file) => {
    processFrontmatter(file, lang)
  })
}

/// Would it be useful to Luca to quickly get all page titles for a lang?

function frontMatterHasTitle(frontmatter) {
  return frontmatter.title
}

function frontMatterHasDescription(frontmatter) {
  return frontmatter.description
}

function frontMatterHasLang(frontmatter) {
  return frontmatter.lang
}
function frontMatterHasCorrectLang(frontmatter, lang) {
  return frontmatter.lang === lang
}

function tutorialFrontmatterHasPublished(frontmatter) {
  return frontmatter.published
}

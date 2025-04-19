import { EXT_URLS } from "../variables"

const extUrlRefs = EXT_URLS

type RegexSearchAndReplace = {
  search: RegExp
  replace: RegExp
}

// Match {myVar} styled placeholders
// ignores Markdown anchors, e.g. {#myVar}
const rgxCurlyIgnoreAnchor = {
  search: /\{(?!#).*\}/g,
  replace: /(\{?)(\}?)/g,
}

// Match Markdown Headings & Excape anchors' curly
// heading: '# Heading' - anchor: '{#anchor}'
const rgxCurlyEscapeIncludeAnchor = {
  // this beautifully named regex fails with 'named capturing groups available for ^ES2018
  // tsconfig.json contains "ES2021.String" only ¯\_(ツ)_/¯ not sure why, but I won't add/change
  /*     search: /^(?<heading>#{1,6}.*?)\{(?<anchor>#[\w-]+)\}/gm,
      replace: `$<heading>\\{$<anchor>\\}` */

  search: /^(#{1,6}.*?)\{(#[\w-]+)\}/gm,
  replace: `$1\\{$2\\}`,
}

const getVarValue = (varName: string, refsObj: object) => {
  const varValue = refsObj[varName]
  if (!varValue) {
    return
  }
  return varValue
}

const extractVars = (content: string, regex: RegExp) => {
  return content.match(regex)
}

const resolveVars = (
  markdown: string,
  regex: RegexSearchAndReplace,
  refsObj: object
) => {
  let content = markdown

  // Catch empty markdown content
  if (!content) {
    return content
  }

  const varsExtracted = extractVars(markdown, regex.search)

  // Catch empty array of extracted variables
  if (!varsExtracted || !varsExtracted.length) {
    return content
  }

  for (const i in varsExtracted) {
    const varExtracted = varsExtracted[i]
    const varName = varExtracted.replace(regex.replace, "")
    const varValue = getVarValue(varName, refsObj)

    if (varValue) {
      content = content.replace(varExtracted, varValue)
    }
  }
  return content
}

const escapeAnchorChars = (
  markdown: string,
  regex: { search: RegExp; replace: string }
) => {
  let content = markdown

  // Catch empty markdown content
  if (!content) {
    return content
  }
  content = content.replace(regex.search, regex.replace)

  return content
}

export async function preprocessMarkdown(markdown: string) {
  let content = markdown
  // Inject external URLs into placeholders
  content = resolveVars(markdown, rgxCurlyIgnoreAnchor, extUrlRefs)

  // Excape curly braces in Heading Anchors
  content = escapeAnchorChars(content, rgxCurlyEscapeIncludeAnchor)

  return content
}

/*NOTE - Additional RegEx var resolution, waiting on naming convention feedback

// Match ${myVar} styled placeholders
const rgxDollaCurly = {
    search: /\$\{.*\}/g,
    replace: /(\$\{)(\})/g
}

// Match{{myVar}} styled placeholders
const rgxDoubleCurly = {
    search: /\{\{(?!#).*\}\}/g,
    replace: /(\{\{?)(\}\}?)/g
}
    */

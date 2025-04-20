import { EXT_URLS } from "../variables"

const extUrlRefs = EXT_URLS

type RegexSearchAndReplace = {
  search: RegExp
  replace: RegExp
}

// Match {myVar} styled placeholders
// ignore Markdown anchors, e.g. {#myVar}
const rgxCurlyIgnoreAnchor = {
  search: /\{(?!#).*\}/g,
  replace: /(\{?)(\}?)/g,
}

// Match Markdown Headings & Excape anchors' curly braces
const rgxCurlyEscapeIncludeAnchor = {
  //REVIEW: Named capturing groups are only available when targeting 'ES2018' or later.ts(1503)
  // search: /^(?<heading>#{1,6}.*?)\{(?<anchor>#[\w-]+)\}/gm,
  // replace: `$<heading>\\{$<anchor>\\}`
  search: /^(#{1,6}.*?)\{(#[\w-]+)\}/gm,
  replace: "$1\\{$2\\}",
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

//NOTE: not using deifned Type due to commend in line: 19
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

/*NOTE - Additional RegEx options for url variables
// Match ${myVar} styled placeholders
/* const rgxDollaCurly = {
    search: /\$\{.*\}/g,
    replace: /(\$\{)(\})/g
} */

// Match{{myVar}} styled placeholders
/* const rgxDoubleCurly = {
    search: /\{\{(?!#).*\}\}/g,
    replace: /(\{\{?)(\}\}?)/g
} */

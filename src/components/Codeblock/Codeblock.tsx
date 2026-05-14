import React from "react"

import CodeblockClient from "./CodeblockClient"

import { highlight, type Lang, resolveLang } from "@/lib/shiki"

const COPY_WIDGET_LANGS = new Set<Lang>([
  "javascript",
  "json",
  "python",
  "solidity",
])

const getValidChildrenForCodeblock = (child: unknown): string | undefined => {
  try {
    if (typeof child !== "string") {
      const element = child as React.ReactElement<{ children: unknown }>
      return getValidChildrenForCodeblock(element.props.children)
    } else {
      return child
    }
  } catch {
    console.error(`Codeblock children is not valid`)
  }
}

export type CodeblockProps = React.HTMLAttributes<HTMLDivElement> & {
  allowCollapse?: boolean
  codeLanguage: string
  fromHomepage?: boolean
}

const Codeblock = async ({
  children,
  allowCollapse = true,
  codeLanguage,
  fromHomepage = false,
  className,
}: CodeblockProps) => {
  const codeText = React.Children.toArray(children)
    .map((child) => {
      if (!child) return
      return getValidChildrenForCodeblock(child)
    })
    .join("")

  let langClass: string
  if (React.isValidElement<{ className?: string }>(children)) {
    langClass = children?.props?.className || ""
  } else {
    langClass = codeLanguage || ""
  }

  const matches = langClass?.match(/language-(.*)/)
  const language = matches?.[1] || ""
  const resolvedLang = resolveLang(language)

  const html = await highlight(codeText, language)

  const shouldShowCopyWidget =
    resolvedLang !== "text" && COPY_WIDGET_LANGS.has(resolvedLang)
  const shouldShowLineNumbers = resolvedLang !== "bash"
  const totalLines = codeText.split("\n").length

  return (
    <CodeblockClient
      html={html}
      codeText={codeText}
      allowCollapse={allowCollapse}
      shouldShowCopyWidget={shouldShowCopyWidget}
      shouldShowLineNumbers={shouldShowLineNumbers}
      totalLines={totalLines}
      fromHomepage={fromHomepage}
      className={className}
    />
  )
}

export default Codeblock

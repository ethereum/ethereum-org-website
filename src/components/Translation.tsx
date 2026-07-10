import parse, {
  type DOMNode,
  domToReact,
  Element,
  type HTMLReactParserOptions,
} from "html-react-parser"
import { type TranslationValues, useTranslations } from "next-intl"
import type { ComponentType } from "react"

import TooltipLink from "./TooltipLink"

type TransformMap = Record<string, ComponentType<Record<string, unknown>>>

type TranslationProps = {
  id: string
  ns?: string
  values?: TranslationValues
  transform?: TransformMap
}

/**
 * Renders the message for `id` ("key" within `ns`, or legacy "namespace:key"),
 * falling back to English for untranslated locales. Without `values` the raw
 * message is fetched and html-parsed so Crowdin-era embedded HTML (real tags
 * with attributes, e.g. `<a href>`) survives; `<a>` maps to TooltipLink.
 *
 * @deprecated Legacy catalog messages only — do not adopt for new strings.
 * Author new messages as plain ICU (`useTranslations`/`getTranslations`) or,
 * when markup is needed, `t.rich` with tags supplied from code.
 */
const Translation = ({
  id,
  ns = "common",
  values,
  transform = {},
}: TranslationProps) => {
  const t = useTranslations()
  const key = id.includes(":") ? id.replace(":", ".") : `${ns}.${id}`
  const message = values ? t(key, values) : t.raw(key)
  // non-string raw messages (nested objects, missing keys) fall back to the id
  const translatedText = typeof message === "string" ? message : id

  // Custom components mapping used when parsing the translation text
  const defaultTransform: TransformMap = {
    a: TooltipLink,
  }

  const allTransforms: TransformMap = { ...defaultTransform, ...transform }

  const options: HTMLReactParserOptions = {
    replace: (domNode: DOMNode) => {
      if (domNode instanceof Element && domNode.name in allTransforms) {
        const Component = allTransforms[domNode.name]
        return (
          <Component {...domNode.attribs}>
            {domToReact(domNode.children as DOMNode[], options)}
          </Component>
        )
      }
    },
  }

  return <>{parse(translatedText, options)}</>
}

export default Translation

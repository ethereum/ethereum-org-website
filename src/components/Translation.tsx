import parse, {
  type DOMNode,
  domToReact,
  Element,
  type HTMLReactParserOptions,
} from "html-react-parser"
import type { TranslationValues } from "next-intl"
import type { ComponentType } from "react"

import TooltipLink from "./TooltipLink"

import useTranslation from "@/hooks/useTranslation"

type TransformMap = Record<string, ComponentType<Record<string, unknown>>>

type TranslationProps = {
  id: string
  ns?: string
  values?: TranslationValues
  transform?: TransformMap
}

// Renders the translation string for the given translation key `id`. It
// fallback to English if it doesn't find the given key in the current language
const Translation = ({ id, ns, values, transform = {} }: TranslationProps) => {
  const { t } = useTranslation(ns)
  const translatedText = t(id, values)

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

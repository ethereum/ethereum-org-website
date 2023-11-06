import { useEffect, useState } from "react"

import { useTranslation } from "next-i18next"
import htmr from "htmr"
import { useRouter } from "next/router"
import InlineLink from "./Link"

interface Props {
  id: string
  options?: any
}

// Custom components mapping to be used by `htmr` when parsing the translation
// text
const transform = {
  a: InlineLink,
}

// Renders the translation string for the given translation key `id`. It
// fallback to English if it doesn't find the given key in the current language
const Translation = ({ id, options }: Props) => {
  const [requiredNamespaces, setRequiredNamespaces] = useState<string[]>([])
  const { asPath } = useRouter()

  useEffect(() => {
    if (asPath.startsWith("/community")) {
      setRequiredNamespaces([...requiredNamespaces, "page-community"])
    }

    if (asPath.startsWith("/energy-consumption")) {
      setRequiredNamespaces([
        ...requiredNamespaces,
        "page-about",
        "page-what-is-ethereum",
      ])
    }

    if (asPath.startsWith("/history")) {
      setRequiredNamespaces([...requiredNamespaces, "page-history"])
    }

    if (asPath.startsWith("/nft")) {
      setRequiredNamespaces([...requiredNamespaces, "learn-quizzes"])
    }

    if (asPath.startsWith("/staking")) {
      setRequiredNamespaces([...requiredNamespaces, "page-staking"])
    }
  }, [requiredNamespaces])

  const { t } = useTranslation(requiredNamespaces)
  const translatedText = t(id, options)

  // Use `htmr` to parse html content in the translation text
  // @ts-ignore
  return <>{htmr(translatedText, { transform })}</>
}

export default Translation

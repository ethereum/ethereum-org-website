"use client"

import type { TranslationKey } from "@/lib/types"

import CalloutSSR, { CalloutBaseProps } from "./CalloutSSR"

import { useTranslation } from "@/hooks/useTranslation"

export type CalloutProps = CalloutBaseProps & {
  titleKey?: TranslationKey
  descriptionKey?: TranslationKey
}

const Callout = ({ titleKey, descriptionKey, ...props }: CalloutProps) => {
  const { t } = useTranslation("common")

  const title = titleKey ? t(titleKey) : undefined
  const description = descriptionKey ? t(descriptionKey) : undefined

  return <CalloutSSR {...props} title={title} description={description} />
}

export default Callout

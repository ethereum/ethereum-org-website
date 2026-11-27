"use client"

import { useMemo } from "react"
import { useTranslations } from "next-intl"

import {
  CREDENTIAL_PREFIX,
  SIGNING_PATH,
  type ValidatorKeysPart,
} from "./model"

/**
 * Labels and definitions for the parts a figure draws, from `t`. Both
 * figures share the part strings, so a key reads the same in each.
 */
export function useKeyParts(ids: readonly ValidatorKeysPart[]) {
  const t = useTranslations("component-diagrams")
  return useMemo(() => {
    const labels: Partial<Record<ValidatorKeysPart, string>> = {}
    const definitions: Partial<Record<ValidatorKeysPart, string>> = {}
    for (const part of ids) {
      labels[part] = t(`validator-keys-label-${part}`)
      definitions[part] = t(`validator-keys-definition-${part}`, {
        bls: CREDENTIAL_PREFIX.bls,
        compounding: CREDENTIAL_PREFIX.compounding,
        signingPath: SIGNING_PATH,
      })
    }
    const parts = Object.fromEntries(
      ids.map((part) => [
        part,
        { label: labels[part], definition: definitions[part] },
      ])
    )
    return { labels, definitions, parts }
  }, [t, ids])
}

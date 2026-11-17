"use client"

import { useMemo } from "react"
import { useTranslations } from "next-intl"

import { VAULT_FIGURE_PARTS, type VaultFigure, type VaultPart } from "./model"

/**
 * Labels and definitions for the parts a figure draws. Every figure shares
 * the part strings, so a part reads the same on both pages.
 */
export function useVaultParts(figure: VaultFigure) {
  const t = useTranslations("component-diagrams")
  return useMemo(() => {
    const ids = VAULT_FIGURE_PARTS[figure]
    const labels: Partial<Record<VaultPart, string>> = {}
    const definitions: Partial<Record<VaultPart, string>> = {}
    for (const part of ids) {
      labels[part] = t(`token-vault-label-${part}`)
      definitions[part] = t(`token-vault-definition-${part}`)
    }
    const parts = Object.fromEntries(
      ids.map((part) => [
        part,
        { label: labels[part], definition: definitions[part] },
      ])
    )
    return { labels, definitions, parts }
  }, [t, figure])
}

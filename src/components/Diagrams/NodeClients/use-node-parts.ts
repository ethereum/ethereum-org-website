"use client"

import { useMemo } from "react"
import { useTranslations } from "next-intl"

import { NODE_PARTS, type NodePart } from "./model"

/** Labels and definitions for every part of the node rig, from `t`. */
export function useNodeParts() {
  const t = useTranslations("component-diagrams")
  return useMemo(() => {
    const labels = {} as Record<NodePart, string>
    const definitions = {} as Record<NodePart, string>
    for (const part of NODE_PARTS) {
      labels[part] = t(`node-clients-label-${part}`)
      definitions[part] = t(`node-clients-definition-${part}`)
    }
    const parts = Object.fromEntries(
      NODE_PARTS.map((part) => [
        part,
        { label: labels[part], definition: definitions[part] },
      ])
    )
    return { labels, definitions, parts }
  }, [t])
}

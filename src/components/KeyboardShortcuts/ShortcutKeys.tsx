import { Fragment } from "react"
import { useTranslations } from "next-intl"

import KBD from "@/components/ui/kbd"

import { getKeyLabel, isApplePlatform } from "./keyLabels"

import type { Shortcut } from "@/lib/keyboard-shortcuts"

/**
 * Renders a shortcut's chords: tokens joined by `+`, alternate chords joined
 * by "or" (or an en dash for a contiguous range such as 1-5).
 */
const ShortcutKeys = ({ shortcut }: { shortcut: Shortcut }) => {
  const t = useTranslations("common")
  // Safe to read during render: the dialog only ever mounts client-side.
  const isApple = isApplePlatform()

  const combos = shortcut.displayCombos ?? shortcut.combos
  const separator = shortcut.separator === "range" ? "–" : t("shortcut-or")

  return (
    <span className="flex flex-wrap items-center justify-end gap-1 text-sm">
      {combos.map((combo, comboIndex) => (
        <Fragment key={combo.join("+")}>
          {comboIndex > 0 && (
            <span className="px-0.5 text-body-medium">{separator}</span>
          )}
          {combo.map((token, tokenIndex) => (
            <Fragment key={token}>
              {tokenIndex > 0 && <span className="text-body-medium">+</span>}
              <KBD className="text-sm whitespace-nowrap">
                {getKeyLabel(token, isApple)}
              </KBD>
            </Fragment>
          ))}
        </Fragment>
      ))}
    </span>
  )
}

export default ShortcutKeys

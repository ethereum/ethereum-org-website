import { pickBy } from "lodash"

import { baseLocales } from "./next-intl"
import { breakpointSet } from "./preview"

export const viewportModes = breakpointSet.reduce<{
  [mode: string]: { viewport: string }
}>((arr, [token]) => {
  return {
    ...arr,
    [token]: {
      viewport: token,
    },
  }
}, {})

const localesToTest = ["en", "ar"]
const locales = pickBy(baseLocales, (_, key) => localesToTest.includes(key))
export const langModes = Object.keys(locales).reduce<{
  [locale: string]: { locale: string }
}>((arr, curr) => {
  return {
    ...arr,
    [curr]: {
      locale: curr,
    },
  }
}, {})

type LangViewModeObj = {
  [key: string]: { viewport: string; locale: string }
}

// One width per device class, not per breakpoint token: the six tokens include
// near-neighbours that never disagreed. RTL adds only the narrowest, since what
// it proves is that direction flips. Every story spreading these pays the full
// matrix, so widths here are the largest single lever on snapshot usage.
const ltrViewports = new Set(["base", "md", "xl"])
const rtlViewports = new Set(["base"])

export const langViewportModes = Object.entries(
  viewportModes
).reduce<LangViewModeObj>((arr, curr) => {
  const [viewKey, viewVal] = curr

  const currLangViewObj = {} as LangViewModeObj

  Object.entries(langModes).forEach(([langKey, langVal]) => {
    const widths = langKey === "en" ? ltrViewports : rtlViewports
    if (!widths.has(viewKey)) return
    currLangViewObj[`${langKey}-${viewKey}`] = {
      viewport: viewVal.viewport,
      locale: langVal.locale,
    }
  })

  return {
    ...arr,
    ...currLangViewObj,
  }
}, {})

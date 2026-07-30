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

// RTL locales only get a representative subset of widths. Direction bugs
// surface at mobile + desktop, so snapshotting Arabic at all 6 breakpoints
// doubled the per-story count for little added signal.
const rtlViewports = new Set(["base", "lg"])

export const langViewportModes = Object.entries(
  viewportModes
).reduce<LangViewModeObj>((arr, curr) => {
  const [viewKey, viewVal] = curr

  const currLangViewObj = {} as LangViewModeObj

  Object.entries(langModes).forEach(([langKey, langVal]) => {
    if (langKey !== "en" && !rtlViewports.has(viewKey)) return
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

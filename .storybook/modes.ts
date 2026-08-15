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

// The responsive + RTL contract (langViewportModes) belongs on ONE
// representative story per component -- on `meta` it multiplies by every
// content variant in the file for no added signal. Content variants use
// variantMode instead, which proves the variant renders at all.
//
// The key must stay "en-lg": Chromatic stacks modes across project/meta/story
// level rather than replacing them, de-duping by key. On the representative
// story this set unions with langViewportModes down to langViewportModes'
// own 8 -- renaming the key would silently add a 9th.
export const variantMode: LangViewModeObj = {
  "en-lg": { viewport: "lg", locale: "en" },
}

// For components with no responsive classes anywhere in their subtree --
// width isn't a variable for them, but direction still is.
export const staticModes: LangViewModeObj = {
  "en-lg": { viewport: "lg", locale: "en" },
  "ar-lg": { viewport: "lg", locale: "ar" },
}

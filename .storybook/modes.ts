import pickBy from "lodash/pickBy"

import { baseLocales } from "./i18next"
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

const localesToTest = ["en", "fa"]
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

export const langViewportModes = Object.entries(
  viewportModes
).reduce<LangViewModeObj>((arr, curr) => {
  const [viewKey, viewVal] = curr

  const currLangViewObj = {} as LangViewModeObj

  Object.entries(langModes).forEach(([langKey, langVal]) => {
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

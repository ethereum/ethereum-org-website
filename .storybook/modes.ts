export const viewportModes = {
  base: {
    viewport: "base",
  },
  sm: {
    viewport: "sm",
  },
  md: {
    viewport: "md",
  },
  lg: {
    viewport: "lg",
  },
  xl: {
    viewport: "xl",
  },
  "2xl": {
    viewport: "2xl",
  },
}

export const langModes = {
  en: {
    locale: "en",
  },
  zh: {
    locale: "zh",
  },
  ru: {
    locale: "ru",
  },
  uk: {
    locale: "uk",
  },
  fa: {
    locale: "fa",
  },
}

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

export const allModes = {
  ...langViewportModes,
}

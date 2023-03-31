import { ButtonProps, SystemStyleObject } from "@chakra-ui/react"

const commonBtnStateStyles: SystemStyleObject = {
  boxShadow: "none",
  bg: "none",
  outline: "1px solid",
  outlineColor: "primaryHover",
  outlineOffset: "-2px",
}

export const getSearchButtonStyles = (): ButtonProps => ({
  alignItems: "center",
  borderRadius: "base",
  border: "1px",
  borderColor: "disabled",
  height: "42px",
  bg: "none",
  gap: 4,
  m: 0,
  pl: 3,
  _hover: {
    ...commonBtnStateStyles,
    ".DocSearch-Button-Keys kbd": {
      color: "disabled",
      borderColor: "disabled",
    },
  },
  _focus: commonBtnStateStyles,
  _active: commonBtnStateStyles,
  sx: {
    "--docsearch-searchbox-shadow": `inset 0 0 0 1px var(--eth-colors-primaryHighContrast)`,
    ".DocSearch-Button-Container svg": {
      boxSize: 3.5,
    },
    ".DocSearch-Search-Icon, .DocSearch-Button-Placeholder": {
      color: "body",
    },
    ".DocSearch-Button-Placeholder": {
      fontWeight: "normal",
      textTransform: "lowercase",
    },
    ".DocSearch-Button-Keys": {
      alignItems: "center",
      display: "flex",
      gap: 1,
      height: "full",
      mt: 0.5,
      minW: "44px",
      p: 0,
      kbd: {
        bg: "none",
        border: "1px",
        borderColor: "disabled",
        boxSize: 5,
        boxShadow: "none",
        color: "disabled",
        fontSize: "sm",
        m: 0,
        p: 0.5,
        textTransform: "lowercase",
        _first: {
          fontSize: "md",
          pt: 1,
        },
      },
    },
  },
})

export const getSearchModalStyles = (): SystemStyleObject => ({
  "--docsearch-modal-background": "var(--eth-colors-background)",
  "--docsearch-searchbox-height": "fit-content",
  "--docsearch-highlight-color": "var(--eth-colors-primaryHover)",
  "--docsearch-modal-width": "650px",
  "--docsearch-hit-height": "fit-content",

  ".DocSearch-SearchBar": {
    p: { base: 4, md: 8 },
    pb: 4,
    form: {
      "--docsearch-searchbox-shadow": `inset 0 0 0 1px var(--eth-colors-primaryHighContrast)`,
      bg: "neutral",
      py: 3,
    },
    "label, input": {
      color: "primaryHighContrast",
    },

    label: {
      boxSize: 4,
    },
    input: {
      fontSize: { base: "md", md: "xl" },
    },
  },

  ".DocSearch-Cancel": {
    color: { base: "primary", md: "primaryHighContrast" },
    _hover: {
      color: "primary",
    },
  },

  ".DocSearch-Container--Stalled .DocSearch-MagnifierLabel, .DocSearch-Container--Stalled .DocSearch-LoadingIndicator":
    {
      color: "primaryHighContrast",
    },

  ".DocSearch-Dropdown": {
    ps: { base: 4, md: 8 },
    pe: { base: 2, md: 4 },
    maxH: {
      base: "calc(100vh - 75px - var(--docsearch-footer-height) - 2 * var(--inset))",
      md: "calc(100vh - 16rem)",
    },
    overflowY: { base: "scroll", md: "auto" },
  },

  ".DocSearch-Hit-source": {
    color: "body",
    lineHeight: 6,
    pb: 0.5,
  },

  ".DocSearch-Hit": {
    pb: 0,
    a: {
      "--docsearch-hit-shadow": "none",
      borderRadius: 0,
      borderBottom: "1px",
      borderColor: "disabled",
      bg: "none",
      py: 3,
    },
    '&[aria-selected="true"] a': {
      "--docsearch-hit-active-color": "colors.background",
      bg: "primaryHover",
      boxShadow: `4px 4px 0 0 var(--eth-colors-primaryLight)`,
      borderColor: "transparent",
    },
  },

  ".DocSearch-Hit-content-wrapper": {
    whiteSpace: "normal",
  },

  ".DocSearch-Hit-icon": {
    color: "body",
  },

  ".DocSearch-Hit-Select-Icon:focus, .DocSearch-Hit-Select-Icon:hover": {
    color: "switchBackground",
  },

  ".DocSearch-Footer": {
    "--docsearch-footer-height": "space.10",
    "--docsearch-logo-color": "colors.bodyLight",
    "--docsearch-footer-shadow": "none",
    bg: "primaryLowContrast",
    borderTop: "2px",
    borderColor: "primary",
  },

  ".DocSearch-Commands": {
    gap: 4,
    li: {
      margin: 0,
    },
  },

  ".DocSearch-Label": {
    color: "body",
    textTransform: "lowercase",
  },

  ".DocSearch-Commands-Key": {
    bg: "background",
    border: "1px",
    borderColor: "primary",
    color: "primary",
    boxShadow: "none",
    boxSize: 4,
    padding: 0,
    display: "grid",
    placeItems: "center",
    borderRadius: "base",
  },

  ".DocSearch-Logo": {
    ".DocSearch-Label": {
      color: "bodyLight",
      textTransform: "uppercase",
    },
  },

  "svg[aria-label='Algolia'] *": {
    fill: "bodyLight",
  },

  "@media (max-width: 768px)": {
    ".DocSearch-Modal": {
      "--inset": "space.4",
      borderRadius: "base",
      inset: "var(--inset)",
      maxWidth: "calc(100vw - 2 * var(--inset))",
      maxHeight: "calc(100vh - 2 * var(--inset))",
      overflow: "hidden",
      position: "fixed",
    },
  },
})

const shadows = {
  // using css variables bc shadows do not support color tokens yet

  outline: "0 0 0 4px var(--eth-colors-primary-hover)",
  table:
    "0 14px 66px rgba(0,0,0,.07), 0 10px 17px rgba(0,0,0,.03), 0 4px 7px rgba(0,0,0,.05)",
  drop: "0 4px 17px 0 var(--eth-colors-blackAlpha-200)",
  tableBox: {
    light:
      "0 14px 66px rgba(0,0,0,.07), 0 10px 17px rgba(0,0,0,.03), 0 4px 7px rgba(0,0,0,.05)",
    dark: "0 14px 66px hsla(0,0%,96.1%,.07), 0 10px 17px hsla(0,0%,96.1%,.03), 0 4px 7px hsla(0,0%,96.1%,.05)",
  },
  tableBoxHover: "0px 8px 17px rgba(0, 0, 0, 0.15)",
  tableItemBox: {
    light: "0 1px 1px rgba(0, 0, 0, 0.1)",
    dark: "0 1px 1px hsla(0,0%,100%,.1)",
  },
  tableItemBoxHover: "0 0 1px var(--eth-colors-primary-base)",
  gridYellowBoxShadow: "8px 8px 0px 0px var(--eth-colors-gridYellow)",
  gridBlueBowShadow: "8px 8px 0px 0px var(--eth-colors-gridBlue)",

  // * Part of new DS
  // TODO: Deprecate buttonHover when all buttons migrated to tailwind
  buttonHover: "4px 4px 0 0 var(--eth-colors-primary-lowContrast)",
  tooltip: "0 0 16px var(--eth-colors-tooltipShadow)",
}

export default shadows

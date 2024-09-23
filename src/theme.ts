import { mix } from "polished"

const white = "#ffffff"
const black = "#000000"
const primaryLight = "#1c1cff"
const primaryDark = "#ff7324"
const success = "#109e62"
const fail = "#b80000"
const turquoise = "#ccfcff"
const turquoiseDark = "#293233"
const yellow = "#fff8df"
const mint = "#e1fefa"
const mintDark = "#2d3332"
const codeBoxDark = "#2a2734"
const codeBoxLight = "#fafafa"

// purple and orangeDark introduced for dark mode alts for homepage boxes
const purpleDark = "#212131"
const orangeDark = "#332821"
const pink = "#ffe5f9"
const pinkDark = "#332027"
const gridYellow = "#ffe78e"
const gridRed = "#ef7d7d"
const gridBlue = "#a7d0f4"
const gridPink = "#ffa1c3"

const white500 = white
const white600 = mix(0.03, black, white)
const white700 = mix(0.1, black, white)
const white800 = mix(0.2, black, white)
const white900 = mix(0.3, black, white)

const black50 = mix(0.5, white, black)
const black100 = mix(0.4, white, black)
const black200 = mix(0.3, white, black)
const black300 = mix(0.2, white, black)
const black400 = mix(0.1, white, black)
const black500 = black

const primaryLight950 = mix(0.85, black, primaryLight)
const primaryLight900 = mix(0.8, black, primaryLight)
const primaryLight800 = mix(0.6, black, primaryLight)
const primaryLight700 = mix(0.4, black, primaryLight)
const primaryLight600 = mix(0.2, black, primaryLight)
const primaryLight500 = primaryLight
const primaryLight400 = mix(0.2, white, primaryLight)
const primaryLight300 = mix(0.4, white, primaryLight)
const primaryLight200 = mix(0.6, white, primaryLight)
const primaryLight100 = mix(0.8, white, primaryLight)
const primaryLight50 = mix(0.9, white, primaryLight)

const primaryDark950 = mix(0.9, black, primaryDark)
const primaryDark900 = mix(0.8, black, primaryDark)
const primaryDark800 = mix(0.6, black, primaryDark)
const primaryDark700 = mix(0.4, black, primaryDark)
const primaryDark600 = mix(0.2, black, primaryDark)
const primaryDark500 = primaryDark
const primaryDark400 = mix(0.2, white, primaryDark)
const primaryDark300 = mix(0.4, white, primaryDark)
const primaryDark200 = mix(0.6, white, primaryDark)
const primaryDark100 = mix(0.8, white, primaryDark)

const success900 = mix(0.8, black, success)
const success800 = mix(0.6, black, success)
const success700 = mix(0.4, black, success)
const success600 = mix(0.2, black, success)
const success500 = success
const success400 = mix(0.2, white, success)
const success300 = mix(0.4, white, success)
const success200 = mix(0.6, white, success)
const success100 = mix(0.8, white, success)

const fail900 = mix(0.8, black, fail)
const fail800 = mix(0.6, black, fail)
const fail700 = mix(0.4, black, fail)
const fail600 = mix(0.2, black, fail)
const fail500 = fail
const fail400 = mix(0.2, white, fail)
const fail300 = mix(0.4, white, fail)
const fail200 = mix(0.6, white, fail)
const fail100 = mix(0.8, white, fail)

const baseColors = {
  white,
  white500,
  white600,
  white700,
  white800,
  white900,
  black,
  black500,
  black400,
  black300,
  black200,
  black100,
  black50,
  boxShadow: "rgba(0,0,0,0.12)",
  boxShadowHover: "rgba(0,0,0,0.24)",
  secondary: "#b2b2b2", // TODO replace
  success900,
  success800,
  success700,
  success600,
  success,
  success500,
  success400,
  success300,
  success200,
  success100,
  fail900,
  fail800,
  fail700,
  fail600,
  fail,
  fail500,
  fail400,
  fail300,
  fail200,
  fail100,
  tagBlue: primaryLight100,
  tagOrange: primaryDark100,
  tagGreen: success100,
  tagRed: fail100,
  tagTurquoise: turquoise,
  tagGray: white700,
  tagYellow: yellow,
  tagMint: mint,
  tagPink: pink,
  warning: primaryDark100,
  warningLink: primaryDark700,
  warningLinkHover: primaryDark900,
  lowBug: primaryDark100,
  mediumBug: primaryDark300,
  primaryLight300,
  primaryDark300,
  yellow,
  gridYellow,
  gridRed,
  gridBlue,
  gridGreen: success300,
  gridOrange: primaryDark300,
  gridPink,
  gridPurple: primaryLight200,
  infoBanner: primaryLight50,
}

// TODO replace random variables w/ baseColor variables
const lightColors = {
  buttonColor: white,
  ghostCardBackground: white,
  ghostCardGhost: white600,
  secondaryButtonBackgroundActive: white700,
  primary: primaryLight,
  primary950: primaryLight950,
  primary900: primaryLight900,
  primary800: primaryLight800,
  primary700: primaryLight700,
  primary600: primaryLight600,
  primary500: primaryLight500,
  primary400: primaryLight400,
  primary300: primaryLight300,
  primary200: primaryLight200,
  primary100: primaryLight100,
  primaryHover: "rgba(28, 28, 225, 0.8)",
  primaryActive: primaryLight600,
  lightBorder: "#ececec",
  searchBorder: "#7f7f7f",
  searchBackground: white,
  searchBackgroundEmpty: "#f2f2f2",
  searchResultText: "#33363d",
  searchResultBackground: "#f1f3f5",
  selectHover: primaryLight100,
  selectActive: primaryLight200,
  dropdownBackground: white,
  dropdownBackgroundHover: "#f2f2f2",
  dropdownBorder: "#e5e5e5",
  markBackground: "rgba(143,187,237,.1)",
  markUnderline: "rgba(143,187,237,.5)",
  modalBackground: "hsla(0, 0%, 69.8%, 0.9)",
  text: "#333333",
  text200: "#666666",
  text300: "#4c4c4c",
  textTableOfContents: "#7f7f7f",
  background: white,
  ednBackground: white600,
  layer2ContentSecondary: white700,
  border: white700,
  tableBoxShadow:
    "0 14px 66px rgba(0,0,0,.07), 0 10px 17px rgba(0,0,0,.03), 0 4px 7px rgba(0,0,0,.05)",
  tableItemBoxShadow: "rgba(0, 0, 0, 0.1)",
  tableBackgroundHover: "#f2f2f2",
  preBackground: "#f2f2f2",
  preBorder: "rgba(0,0,0,.05)",
  homeDivider: "#a4a4f3",
  displayDark: "none",
  displayLight: "block",
  grayBackground: "#fcfcfc",
  cardGradient:
    // Migrate to: "bg-gradient-to-r from-accent-a/10 to-accent-c/10"
    "radial-gradient(46.28% 66.31% at 66.95% 58.35%, #e6e6f7 0%, #e7edfa 50%, #e9fbfa 100%)",
  warning: primaryDark100,
  warningLink: primaryDark700,
  warningLinkHover: primaryDark900,
  tagMint: mint,
  mainnet: success200,
  mainnetBorder: black50,
  beaconchain: turquoise,
  beaconchainBorder: black50,
  shard: primaryDark100,
  shardBorder: black50,
  infoLink: primaryLight800,
  infoLinkHover: primaryLight900,
  cardBoxShadow: "4px 4px 0px 0px #d2d2f9",
  homeBoxMint: mint,
  homeBoxTurquoise: turquoise,
  homeBoxOrange: primaryDark100,
  homeBoxPurple: primaryLight50,
  homeBoxPink: pink,
  codeBackground: codeBoxLight,
  rollupDevDocList: primaryLight50,
  beta: "radial-gradient(25.56% 133.51% at 28.36% 45.54%, rgba(28, 28, 225, 0) 0%, rgba(28, 28, 225, 0.06) 100%)",
  offBackground: "#f7f7f7",
  stakingPillPlatform: "#cd9df3",
  stakingPillUI: "#ebd27a",
  stakingGold: "#be8d10",
  stakingGoldFill: "#fef9ef",
  stakingGreen: "#129e5b",
  stakingGreenFill: "#f7faf1",
  stakingBlue: "#0b83dc",
  stakingBlueFill: "#f1fcf5",
  stakingRed: "#a0524c",
  stakingRedFill: "#f8fbf9",
  feedbackGradient:
    "linear-gradient(102.7deg, rgba(185, 185, 241, 0.2) 0%, rgba(84, 132, 234, 0.2) 51.56%, rgba(58, 142, 137, 0.2) 100%)",
  bannerGridGradient:
    "linear-gradient(90deg, rgba(127,127,213,0.2) 0%, rgba(132,145,221,0.2) 50%, rgba(145,234,228,0.2) 100%)",
  sliderBg: "#F7F7F7",
  sliderBorder: "#ECECEC",
  sliderDot: "#A4A4A4",
  sliderDotActive: "#1C1DFF",
  sliderBtnBg: "#A4A4A4",
  sliderBtnColor: white,
  sliderBtnBgDisabled: "#E7E7E7",
  sliderBtnColorDisabled: "#737373",
}

// TODO replace random variables w/ baseColor variables
const darkColors = {
  buttonColor: black300,
  primaryHover: primaryDark400,
  primaryActive: primaryDark200,
  ghostCardBackground: black300,
  ghostCardGhost: black50,
  secondaryButtonBackgroundActive: black300,
  primary: primaryDark,
  primary950: primaryDark950,
  primary900: primaryDark900,
  primary800: primaryDark800,
  primary700: primaryDark700,
  primary600: primaryDark600,
  primary500: primaryDark500,
  primary400: primaryDark400,
  primary300: primaryDark300,
  primary200: primaryDark200,
  primary100: primaryDark100,
  lightBorder: "#404040",
  searchBorder: "#b2b2b2",
  searchBackground: "#4c4c4c",
  searchBackgroundEmpty: "#333333",
  searchResultText: "#f1f3f5",
  searchResultBackground: "#33363d",
  selectHover: primaryDark700,
  selectActive: primaryDark600,
  dropdownBackground: "#191919",
  dropdownBackgroundHover: "#000000",
  dropdownBorder: "#333333",
  markBackground: "rgb(255, 115, 36, .1)",
  markUnderline: "rgb(255, 115, 36, .5)",
  modalBackground: "rgba(25,25,25,0.8)",
  text: "#f2f2f2",
  text200: "#b2b2b2",
  text300: "#cccccc",
  textTableOfContents: "hsla(0,0%,69.8%,.8)",
  background: "#222222",
  ednBackground: black400,
  layer2ContentSecondary: black300,
  border: black300,
  tableBoxShadow:
    "0 14px 66px hsla(0,0%,96.1%,.07), 0 10px 17px hsla(0,0%,96.1%,.03), 0 4px 7px hsla(0,0%,96.1%,.05)",
  tableItemBoxShadow: "hsla(0,0%,100%,.1)",
  tableBackgroundHover: "rgba(255,115,36,.013)",
  preBackground: "#191919",
  preBorder: "hsla(0,0%,100%,.05)",
  homeDivider: "#ffc7a7",
  displayDark: "block",
  displayLight: "none",
  grayBackground: "#272627",
  warning: primaryDark100,
  warningLink: primaryDark700,
  warningLinkHover: primaryDark900,
  tagMint: mint,
  mainnet: "#222222",
  mainnetBorder: success300,
  beaconchain: "#222222",
  beaconchainBorder: pink,
  shard: "#222222",
  shardBorder: primaryDark500,
  infoLink: primaryLight800,
  infoLinkHover: primaryLight900,
  cardBoxShadow: "4px 4px 0px 0px #ffab7c",
  homeBoxMint: mintDark,
  homeBoxTurquoise: turquoiseDark,
  homeBoxOrange: orangeDark,
  homeBoxPurple: purpleDark,
  homeBoxPink: pinkDark,
  codeBackground: codeBoxDark,
  rollupDevDocList: "#4c4c4c",
  beta: "background: radial-gradient(25.56% 133.51% at 28.36% 45.54%, rgba(255, 143, 80, 0.72) 0%, rgba(255, 143, 80, 0.22) 100%)",
  cardGradient:
    // Migrate to: "dark:bg-gradient-to-tr dark:from-primary/20 dark:from-20% dark:via-accent-a/20 dark:via-60% dark:to-accent-c/20 dark:to-95%"
    "linear-gradient(49.21deg, rgba(127, 127, 213, 0.2) 19.87%, rgba(134, 168, 231, 0.2) 58.46%, rgba(145, 234, 228, 0.2) 97.05% )",
  offBackground: "#181818",
  stakingPillPlatform: "#cd9df3",
  stakingPillUI: "#ebd27a",
  stakingGold: "#F2BB2F",
  stakingGoldFill: "#373228",
  stakingGreen: "#49DE96",
  stakingGreenFill: "#30342b",
  stakingBlue: "#A9D3F2",
  stakingBlueFill: "#2b352f",
  stakingRed: "#D6BBB9",
  stakingRedFill: "#313432",
  feedbackGradient:
    "linear-gradient(83.46deg, #2C2C32 7.03%, #44404D 52.42%, #303038 98.77%)",
  bannerGridGradient:
    "linear-gradient(90deg, rgba(172, 182, 229, 0.08) 0%, rgba(134, 253, 232, 0.08) 100%)",
  sliderBg: "#191919",
  sliderBorder: "#404040",
  sliderDot: "#A4A4A4",
  sliderDotActive: "#FF7324",
  sliderBtnBg: "#404040",
  sliderBtnColor: white,
  sliderBtnBgDisabled: "#404040",
  sliderBtnColorDisabled: "#737373",
}

const lightThemeColors = Object.assign({}, baseColors, lightColors)
const darkThemeColors = Object.assign({}, baseColors, darkColors)

const theme = {
  isDark: false, // Overwritten in Object.assign
  colors: {}, // Overwritten in Object.assign
  fonts: {
    monospace:
      '"SFMono-Regular", Consolas, "Roboto Mono", "Droid Sans Mono", "Liberation Mono", Menlo, Courier, monospace',
  },
  fontSizes: {
    // based on typical browser default font size of 16px
    xs: "0.75rem", // 12px
    s: "0.875rem", // 14px
    m: "1rem", // 16px
    r: "1.125rem", // 18px
    l: "1.5rem", // 24px
    xl: "2rem", // 32px
  },
  breakpoints: {
    xs: "320px",
    s: "414px",
    m: "768px",
    l: "1024px",
    xl: "1440px", // Used as the max-width
  },
  variables: {
    maxPageWidth: "1504px", // xl breakpoint (1440px) + 72px (2rem padding on each side)
    navHeight: "4.75rem",
    navBannerHeightDesktop: "134px", // 76px + 58px
    navBannerHeightTablet: "159px", // 76px + 83px
    navBannerHeightMobile: "184px", // 76px + 108px
    navSubNavHeightDesktop: "134px", // 76px + 58px
    navSideNavHeightMobile: "140px", // 76px + 64px
  },
}

export const lightTheme = Object.assign(
  {},
  theme,
  { isDark: false },
  { colors: lightThemeColors }
)
export const darkTheme = Object.assign(
  {},
  theme,
  { isDark: true },
  { colors: darkThemeColors }
)

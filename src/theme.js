import { createGlobalStyle } from "styled-components"

const white = "#FFFFFF"
const black = "#000000"
const primaryLight = "#1C1CFF"
const primaryDark = "#FF7324"
const success = "#109E62"
const fail = "#B80000"
const turquoise = "#CCFCFF"
const turquoiseDark = "#293233"
const yellow = "#FFF8DF"
const mint = "#E1FEFA"
const mintDark = "#2D3332"
const codeBoxDark = "#2A2734"
const codeBoxLight = "#FAFAFA"

// purple and orangeDark introduced for dark mode alts for homepage boxes
const purpleDark = "#212131"
const orangeDark = "#332821"
const pink = "#FFE5F9"
const pinkDark = "#332027"
const gridYellow = "#FFE78E"
const gridRed = "#EF7D7D"
const gridBlue = "#A7D0F4"
const gridPink = "#FFA1C3"

const white500 = white
const white600 = "#F7F7F7"
const white700 = "#E5E5E5"
const white800 = "#CCCCCC"
const white900 = "#B2B2B2"

const black50 = "#7F7F7F"
const black100 = "#666666"
const black200 = "#4C4C4C"
const black300 = "#333333"
const black400 = "#191919"
const black500 = black

const primaryLight950 = "#040426"
const primaryLight900 = "#050532"
const primaryLight800 = "#0B0B66"
const primaryLight700 = "#101099"
const primaryLight600 = "#1616CC"
const primaryLight500 = primaryLight
const primaryLight400 = "#4949FF"
const primaryLight300 = "#7676FF"
const primaryLight200 = "#A4A4FF"
const primaryLight100 = "#D1D1FF"
const primaryLight50 = "#E8E8FF"

const primaryDark950 = "#190B03"
const primaryDark900 = "#321607"
const primaryDark800 = "#662E0E"
const primaryDark700 = "#994515"
const primaryDark600 = "#CC5C1C"
const primaryDark500 = primaryDark
const primaryDark400 = "#FF8F4F"
const primaryDark300 = "#FFAB7B"
const primaryDark200 = "#FFC7A7"
const primaryDark100 = "#FFE3D3"

const success900 = "#031F13"
const success800 = "#063F27"
const success700 = "#095E3A"
const success600 = "#0C7E4E"
const success500 = success
const success400 = "#3FB181"
const success300 = "#6FC4A0"
const success200 = "#9FD8C0"
const success100 = "#CFEBDF"

const fail900 = "#240000"
const fail800 = "#490000"
const fail700 = "#6E0000"
const fail600 = "#930000"
const fail500 = fail
const fail400 = "#C63333"
const fail300 = "#D46666"
const fail200 = "#E29999"
const fail100 = "#F0CCCC"

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
  boxShadow: "#000000",
  boxShadowHover: "#000000",
  secondary: "#B2B2B2", // TODO replace
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
  tagTurqouise: turquoise,
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
  upgradesGradient:
    "linear-gradient(285.24deg, #F7CBC0 0%, #F4B1AB 29.8%, #8476D9 49.78%, #85ACF9 54.14%, #1C1CE1 61.77%, #000000 69.77%)",
  runNodeGradient:
    "linear-gradient(0deg, #999DF4 0%, #999DF4 100%), linear-gradient(270.72deg, #FDF0FF 0.62%, #ECC3C3 32.61%, #CFBDE6 49.67%, #C4C4C4 72.88%);",
  runNodeGradient2: "linear-gradient(135deg, #4F71EB 9.8%, #E84FEB 92.84%);",
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
  primaryHover: "#1C1CE1",
  primaryActive: primaryLight600,
  lightBorder: "#ECECEC",
  priceCardBackgroundPositive: "linear-gradient( 0, #CFECE0 0%,	#CFECE0 100%)",
  priceCardBackgroundNegative:
    "linear-gradient(180deg, #F1CCCC 0%, #F1CCCC 100%)",
  priceCardBorder: "#ECECEC",
  priceCardBorderNegative: "#ECECEC",
  searchBorder: "#7F7F7F",
  searchBackground: white,
  searchBackgroundEmpty: "#F2F2F2",
  searchResultText: "#33363D",
  searchResultBackground: "#F1F3F5",
  selectHover: primaryLight100,
  selectActive: primaryLight200,
  dropdownBackground: white,
  dropdownBackgroundHover: "#F2F2F2",
  dropdownBorder: "#E5E5E5",
  markBackground: "#8FBBED",
  markUnderline: "#8FBBED",
  modalBackground: "#B2B2B2",
  text: "#333333",
  text200: "#666666",
  text300: "#4C4C4C",
  textTableOfContents: "#7F7F7F",
  background: white,
  ednBackground: white600,
  border: white700,
  tableBoxShadow: "0 14px 66px #000000, 0 10px 17px #000000, 0 4px 7px #000000",
  tableItemBoxShadow: "#000000",
  tableBackgroundHover: "#F2F2F2",
  preBackground: "#F2F2F2",
  preBorder: "#000000",
  homeDivider: "#A4A4F3",
  displayDark: "none",
  displayLight: "block",
  grayBackground: "#FCFCFC",
  cardGradient:
    "radial-gradient(46.28% 66.31% at 66.95% 58.35%, #E6E6F7 0%, #E7EDFA 50%, #E9FBFA 100%)",
  upgradeStatusBackground:
    "linear-gradient(180deg, #00F0FF 0%, #FFFFFF 100%), linear-gradient(0deg, #FFFFFF, #FFFFFF), #1C1CE1",
  upgradeStatusShippedBackground:
    "linear-gradient(180deg, #00F0FF 0%, #FFFFFF 100%), linear-gradient(0deg, #FFFFFF, #FFFFFF), #109E62",
  upgradeStatusBorder: "none",
  upgradeStatusShippedBorder: "none",
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
  cardBoxShadow: "4px 4px 0px 0px #D2D2F9",
  homeBoxMint: mint,
  homeBoxTurquoise: turquoise,
  homeBoxOrange: primaryDark100,
  homeBoxPurple: primaryLight50,
  homeBoxPink: pink,
  codeBackground: codeBoxLight,
  beta: "radial-gradient(25.56% 133.51% at 28.36% 45.54%, #1C1CE1 0%, #1C1CE1 100%)",
}

// TODO replace random variables w/ baseColor variables
const darkColors = {
  buttonColor: black300,
  upgradesGradient:
    "linear-gradient(285.24deg, #F7CBC0 0%, #FBEAE3 17.81%, #F4B1AB 29.8%, #8476D9 49.78%, #8DB4FF 69.77%);",
  runNodeGradient:
    "linear-gradient(0deg, #999DF4 0%, #999DF4 100%), linear-gradient(89.24deg, #FDF0FF -64.3%, #D47777 -7.43%, #BCA3DC 46.66%, #C4C4C4 99.16%);",
  runNodeGradient2: "linear-gradient(135deg, #4F71EB 9.8%, #E84FEB 92.84%);",
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
  priceCardBackground: "transparent",
  priceCardBorder: success700,
  priceCardBorderNegative: fail300,
  searchBorder: "#B2B2B2",
  searchBackground: "#4C4C4C",
  searchBackgroundEmpty: "#333333",
  searchResultText: "#F1F3F5",
  searchResultBackground: "#33363D",
  selectHover: primaryDark700,
  selectActive: primaryDark600,
  dropdownBackground: "#191919",
  dropdownBackgroundHover: "#000000",
  dropdownBorder: "#333333",
  markBackground: "#FF7324",
  markUnderline: "#FF7324",
  modalBackground: "#191919",
  text: "#F2F2F2",
  text200: "#B2B2B2",
  text300: "#CCCCCC",
  textTableOfContents: "#B2B2B2",
  background: "#222222",
  ednBackground: black400,
  border: black300,
  tableBoxShadow: "0 14px 66px #F5F5F5, 0 10px 17px #F5F5F5, 0 4px 7px #F5F5F5",
  tableItemBoxShadow: "#FFFFFF",
  tableBackgroundHover: "#FF7324",
  preBackground: "#191919",
  preBorder: "#FFFFFF",
  homeDivider: "#FFC7A7",
  displayDark: "block",
  displayLight: "none",
  grayBackground: "#272627",
  upgradeStatusBackground: "#222222",
  upgradeStatusShippedBackground: "#222222",
  upgradeStatusBorder: `${primaryLight200} solid 2px`,
  upgradeStatusShippedBorder: `${success400} solid 2px`,
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
  cardBoxShadow: "4px 4px 0px 0px #FFAB7C",
  homeBoxMint: mintDark,
  homeBoxTurquoise: turquoiseDark,
  homeBoxOrange: orangeDark,
  homeBoxPurple: purpleDark,
  homeBoxPink: pinkDark,
  codeBackground: codeBoxDark,
  beta: "background: radial-gradient(25.56% 133.51% at 28.36% 45.54%, #FF8F50 0%, #FF8F50 100%)",
  cardGradient:
    "linear-gradient(49.21deg, #7F7FD5 19.87%, #7F7FD5 58.46%, #91EAE4 97.05% )",
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

// Dynamic global styles
// Unfortunately Prettier doesn't format `createGlobalStyle`
// TODO external link styles no longer working...
// Seemingly nothing that doesn't involve a theme variable?
export const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(props) => props.theme.colors.background};
    color: ${(props) => props.theme.colors.text};
  }
  a {
    color: ${(props) => props.theme.colors.primary};
    text-decoration: underline;
  }
  mark {
    background: ${(props) => props.theme.colors.markBackground};
    box-shadow: inset 0 -2px 0 0 rgba(69,142,225,.8);
  }

  .anchor.before {
    fill: ${(props) => props.theme.colors.text};
  }

  hr {
    background: ${(props) => props.theme.colors.lightBorder};
  }

  /* Legacy styles from lists.styl */
  ul {
    font-size: 1rem;
    line-height: 1.6;
    font-weight: 400;
    margin: 2rem 0 1rem;
    padding: 0;
    margin: 1em;
    list-style-type: none;
    list-style-image: none;
  }

  li {
    padding-left: .5em;
    margin-bottom: .5em;
      p:first-of-type {
        margin-top: 0;
      }
      p:last-of-type {
        margin-bottom: 0;
      }
    &:before {
      content: "\2022";
      color: ${(props) => props.theme.colors.primary};
      display: inline-block;
      width: 1em;
      margin-left: -1em;
      position: absolute;
    }
  }

  /* YouTube embeds */
  iframe {
    display: block;
    max-width: 560px;
    margin: 32px 0;
  }
  
  h1 {
    font-size: 3rem;
    line-height: 1.4;
    margin: 2rem 0;
    font-weight: 700;
    scroll-margin-top: ${theme.variables.navHeight};
    scroll-snap-margin: ${theme.variables.navHeight};
    @media (max-width: ${theme.breakpoints.m}) {
      font-size: 2.5rem;
    }
  }
  
  h2 {
    font-size: 2rem;
    line-height: 1.4;
    margin: 2rem 0;
    margin-top: 3rem;
    font-weight: 600;
    scroll-margin-top: ${theme.variables.navHeight};
    scroll-snap-margin: ${theme.variables.navHeight};
    @media (max-width: ${theme.breakpoints.m}) {
      font-size: 1.5rem;
    }
  }
  
  h3 {
    font-size: 1.5rem;
    line-height: 1.4;
    margin: 2rem 0;
    margin-top: 2.5rem;
    font-weight: 600;
    scroll-margin-top: ${theme.variables.navHeight};
    scroll-snap-margin: ${theme.variables.navHeight};
    @media (max-width: ${theme.breakpoints.m}) {
      font-size: 1.25rem;
    }
  }
  
  h4 {
    font-size: 1.25rem;
    line-height: 1.4;
    font-weight: 500;
    margin: 2rem 0;
    scroll-margin-top: ${theme.variables.navHeight};
    scroll-snap-margin: ${theme.variables.navHeight};
    @media (max-width: ${theme.breakpoints.m}) {
      font-size: 1rem;
    }
  }
  
  h5 {
    font-size: 1rem;
    line-height: 1.4;
    font-weight: 450;
    margin: 2rem 0;
    scroll-margin-top: ${theme.variables.navHeight};
    scroll-snap-margin: ${theme.variables.navHeight};
  }

  h6 {
    font-size: 0.9rem;
    line-height: 1.4;
    font-weight: 400;
    text-transform: uppercase;
    margin: 2rem 0;
    scroll-margin-top: ${theme.variables.navHeight};
    scroll-snap-margin: ${theme.variables.navHeight};
  }
  
`
// H6 basically only uses as labels as per design system

// Old Mixins for referecne
// export const Mixins = {
//   textLevel1: `
//     font-size: 3rem;
//     line-height: 1.4;
//     margin: 2rem 0;
//     font-weight: 400;
//   `,
//   textLevel2: `
//     font-size: 2rem;
//     line-height: 1.4;
//     margin: 2rem 0;
//     font-weight: 600;
//   `,
//   textLevel3: `
//     font-size: 1.5rem;
//     line-height: 1.4;
//     margin: 1.5rem 0 2rem;
//     font-weight: 600;
//   `,
//   textLevel4: `
//     font-size: 1.25rem;
//     line-height: 1.4;
//     font-weight: 400;
//     margin-top: 2rem;
//   `,
//   textLevel5: `
//     font-size: 1rem;
//     line-height: 1.6;
//     font-weight: 400;
//     margin-top: 2rem;
//   `,
//   textLevel6: `
//     font-size: .875rem;
//     line-height: 1.6;
//     font-weight: 400;
//     letter-spacing: 0.04em;
//     margin: 1.14em 0;
//     text-transform uppercase
//   `,
//   textLevel7: `
//     font-size: 1rem;
//     line-height: 1.6;
//     font-weight: 400;
//     margin: 2rem 0 1rem;
//   `,
//   textLevel8: `
//     font-size: .875rem;
//     line-height:1.6;
//     margin: 1.14em 0;
//     font-weight: 400;
//   `,
// }

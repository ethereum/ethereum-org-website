import { createGlobalStyle } from "styled-components"

// TODO mix() for styled-components? Need to create shades of white & black
// Check out: https://github.com/styled-components/polished
// Solves same thing: https://stylus-lang.com/docs/bifs.html#mixcolor1-color2-amount
const baseColors = {
  white: "#fff",
  black: "rgb(0,0,0)",
  boxShadow: "rgba(0,0,0,0.12)",
  boxShadowHover: "rgba(0,0,0,0.24)",
  secondary: "#b2b2b2",
}

const lightColors = {
  primary: "rgb(28,28,225)",
  primaryHover: "rgba(28, 28, 225, 0.8)",
  border: "rgb(28,28,225)",
  lightBorder: "#ececec",
  searchBorder: "#7f7f7f",
  searchBackground: "#fff",
  searchBackgroundEmpty: "#f2f2f2",
  dropdownBackground: "#fff",
  dropdownBackgroundHover: "#f2f2f2",
  dropdownBorder: "#e5e5e5",
  markBackground: "rgba(143,187,237,.1)",
  markUnderline: "rgba(143,187,237,.5)",
  modalBackground: "hsla(0, 0%, 69.8%, 0.9)",
  success: "rgb(16,158,98)",
  fail: "rgb(184,0,0)",
  text: "#333",
  textSecondary: "#4c4c4c",
  textSidebar: "#7f7f7f",
  background: "#fff",
  text200: "#666",
  tableBoxShadow:
    "0 14px 66px rgba(0,0,0,.07), 0 10px 17px rgba(0,0,0,.03), 0 4px 7px rgba(0,0,0,.05)",
  tableItemBoxShadow: "rgba(0, 0, 0, 0.1)",
  tableBackgroundHover: "#f2f2f2",
  preBackground: "#f2f2f2",
  preBorder: "rgba(0,0,0,.05)",
}

const darkColors = {
  primary: "rgb(255, 115, 36)",
  border: "rgb(255, 115, 36)",
  lightBorder: "#404040",
  searchBorder: "#b2b2b2",
  searchBackground: "#4c4c4c",
  searchBackgroundEmpty: "#333",
  dropdownBackground: "#191919",
  dropdownBackgroundHover: "#000",
  dropdownBorder: "#333",
  markBackground: "rgb(255, 115, 36, .1)",
  markUnderline: "rgb(255, 115, 36, .5)",
  modalBackground: "rgba(25,25,25,0.8)",
  success: "rgb(16,158,98)", // TODO
  fail: "rgb(184,0,0)", // TODO
  text: "#f2f2f2",
  textSecondary: "#ccc",
  textSidebar: "hsla(0,0%,69.8%,.8)",
  background: "rgb(34,34,34)", // "#222222",
  text200: "#b2b2b2",
  tableBoxShadow:
    "0 14px 66px hsla(0,0%,96.1%,.07), 0 10px 17px hsla(0,0%,96.1%,.03), 0 4px 7px hsla(0,0%,96.1%,.05)",
  tableItemBoxShadow: "hsla(0,0%,100%,.1)",
  tableBackgroundHover: "rgba(255,115,36,.013)",
  preBackground: "#191919",
  preBorder: "hsla(0,0%,100%,.05)",
}

const lightThemeColors = Object.assign({}, baseColors, lightColors)
const darkThemeColors = Object.assign({}, baseColors, darkColors)

const theme = {
  fontSizes: {
    // based on typical browser default font size of 16px
    xs: "0.75rem", // 12px
    s: "0.875rem", // 14px
    m: "1rem", // 16px
    r: "1.125rem", // 18px
    l: "1.5rem", // 20px
    xl: "2rem", // 24px
  },
  breakpoints: {
    xs: "320px",
    s: "414px",
    m: "768px",
    l: "1024px",
    xl: "1440px", // Used as the max-width
  },
}

export const lightTheme = Object.assign({}, theme, { colors: lightThemeColors })
export const darkTheme = Object.assign({}, theme, { colors: darkThemeColors })

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
    text-decoration: none;
  }
  mark {
    background: ${(props) => props.theme.colors.markBackground};
    box-shadow: inset 0 -2px 0 0 rgba(69,142,225,.8);
  }

  .featured {
    border-left: 1px dotted ${(props) => props.theme.colors.primary};
  }

  .anchor.before {
    fill: ${(props) => props.theme.colors.text};
  }

  /* Style external MD links */
  a:not([href^="https://ethereum.org"]):not([href^="http://ethereum.org"]):not([href^="/"]):not([href^="#"]):not([href^="."]):not([href^="https://deploy-preview-"]):not([href^="deploy-preview-"]) {
    &:after {
      margin-left: .125em;
      margin-right: .3em;
      display: inline-block;
      content:'↗';
      transition: all 0.1s ease-in-out;
      font-style: normal;
    }
    &:hover {
      &:after {
        transform: translate(.15em, -.2em)
      }
    }
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
      /* TODO color */
      display: inline-block;
      width: 1em;
      margin-left: -1em;
      position: absolute;
    }
  }
  `

// Mixins
// TODO must be a better way...
export const Mixins = {
  textLevel1: `
    font-size: 3rem;
    line-height: 1.4;
    margin: 2rem 0;
    font-weight: 400;
  `,
  textLevel2: `
    font-size: 2rem;
    line-height: 1.4;
    margin: 4.5rem 0 1.5rem;
    font-weight: 400;
  `,
  textLevel3: `
    font-size: 1.5rem;
    line-height: 1.4;
    margin: 1.5rem 0;
    font-weight: 400;
  `,
  textLevel4: `
    font-size: 1.25rem;
    line-height: 1.4;
    font-weight: 400;
  `,
  textLevel5: `
    font-size: 1rem;
    line-height: 1.6;
    font-weight: 400;
  `,
  textLevel6: `
    font-size: .875rem;
    line-height: 1.6;
    font-weight: 400;
    letter-spacing: 0.04em;
    margin: 1.14em 0;
    text-transform uppercase
  `,
  textLevel7: `
    font-size: 1rem;
    line-height: 1.6;
    font-weight: 400;
    margin: 2rem 0 1rem;
  `,
  textLevel8: `
    font-size: .875rem;
    line-height:1.6;
    margin: 1.14em 0;
    font-weight: 400;
  `,
}

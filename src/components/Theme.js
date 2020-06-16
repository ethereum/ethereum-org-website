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
  success: "rgb(16,158,98)",
  fail: "rgb(184,0,0)",
  text: "#333",
  textSecondary: "#4c4c4c",
  background: "#fff",
  text200: "#666",
}

const darkColors = {
  primary: "rgb(255, 115, 36)",
  border: "rgb(255, 115, 36)",
  lightBorder: "#404040",
  searchBorder: "#b2b2b2",
  searchBackground: "#4c4c4c",
  success: "rgb(16,158,98)", // TODO
  fail: "rgb(184,0,0)", // TODO
  text: "#f2f2f2",
  textSecondary: "#ccc",
  background: "rgb(34,34,34)", // "#222222",
  text200: "#b2b2b2",
}

const lightThemeColors = Object.assign({}, baseColors, lightColors)
const darkThemeColors = Object.assign({}, baseColors, darkColors)

const theme = {
  fontSizes: {
    // based on typical browser default font size of 16px
    xSmall: "0.75rem", // 12px
    small: "0.875rem", // 14px
    medium: "1rem", // 16px
    regular: "1.125rem", // 18px
    large: "1.5rem", // 20px
    xLarge: "2rem", // 24px
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
// TODO external styles no longer working...
export const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(props) => props.theme.colors.background};
    color: ${(props) => props.theme.colors.text};
  }
  a {
    color: ${(props) => props.theme.colors.primary};
    text-decoration: none;
  }

  /* Style external MD links */
  a:not([href^="https://ethereum.org"]):not([href^="http://ethereum.org"]):not([href^="/"]):not([href^="#"]):not([href^="."]):not([href^="https://deploy-preview-"]):not([href^="deploy-preview-"]):not(.hide-icon) {
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

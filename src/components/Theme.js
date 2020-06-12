import { createGlobalStyle } from "styled-components"

const baseColors = {
  colors: {
    white: "#fff",
    black: "rgb(0,0,0)",
    boxShadow: "rgba(0,0,0,0.12)",
    boxShadowHover: "rgba(0,0,0,0.24)",
  },
}

const lightColors = {
  colors: {
    primary: "rgb(28,28,225)",
    border: "rgb(28,28,225)",
    lightBorder: "#ececec",
    success: "rgb(16,158,98)",
    fail: "rgb(184,0,0)",
    text: "#333",
    background: "#fff",
  },
}

const darkColors = {
  colors: {
    primary: "rgb(255, 115, 36)",
    border: "rgb(255, 115, 36)",
    lightBorder: "#404040",
    success: "rgb(16,158,98)", // TODO
    fail: "rgb(184,0,0)", // TODO
    text: "#f2f2f2",
    background: "rgb(34,34,34)", // "#222222",
  },
}

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

export const lightTheme = Object.assign({}, theme, baseColors, lightColors)
export const darkTheme = Object.assign({}, theme, baseColors, darkColors)

// Dynamic global styles
// Unfortunately Prettier doesn't format `createGlobalStyle`
export const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(props) => props.theme.colors.background};
    color: ${(props) => props.theme.colors.text};
  }
  a {
    color: ${(props) => props.theme.colors.primary};
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

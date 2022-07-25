import React from "react"
import { Global, css, useTheme } from "@emotion/react"

const GlobalStyle: React.FC = () => {
  const theme = useTheme()

  return (
    <Global
      styles={css`
        body {
          background-color: ${theme.colors.background};
          color: ${theme.colors.text};
        }
        a {
          color: ${theme.colors.primary};
          text-decoration: underline;
        }
        mark {
          background: ${theme.colors.markBackground};
          box-shadow: inset 0 -2px 0 0 rgba(69, 142, 225, 0.8);
        }

        .anchor.before {
          fill: ${theme.colors.text};
        }

        hr {
          background: ${theme.colors.lightBorder};
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
          padding-left: 0.5em;
          margin-bottom: 0.5em;
          p:first-of-type {
            margin-top: 0;
          }
          p:last-of-type {
            margin-bottom: 0;
          }
          &:before {
            content: "\2022";
            color: ${theme.colors.primary};
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

        /* Anchor tag styles */
        /* Selected specifically for mdx rendered side icon link */
        .header-anchor {
          position: relative;
          display: initial;
          margin-left: -1.5em;
          padding-right: 0.5rem;
          font-size: 1rem;
          vertical-align: middle;

          svg {
            fill: ${theme.colors.primary}};
            visibility: hidden;
          }
        }

        h1:hover,
        h2:hover,
        h3:hover,
        h4:hover,
        h5:hover,
        h6:hover {
          .header-anchor svg {
            visibility: visible;
          }
        }

        .header-anchor:focus svg {
          visibility: visible;
        }
      `}
    />
  )
}

export default GlobalStyle

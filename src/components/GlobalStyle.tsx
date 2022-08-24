import React from "react"
import { Global, css, useTheme } from "@emotion/react"

/**
 * These are legacy global styles. Global styles that were created when
 * `styled-components` were used. We have merged all of those old global
 * styles in one place, this component.
 *
 * As we transition from our old theme `src/theme.ts` to our new theme
 * `src/@chakra-ui/gatsby-plugin/theme.ts`, we need to keep these
 * styles.
 *
 * TODO: remove this file when all of our components use the new theme
 */

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
            display: inline;
            fill: ${theme.colors.primary};
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

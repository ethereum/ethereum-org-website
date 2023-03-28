import React from "react"
import { Theme } from "@chakra-ui/react"
import { Global, css } from "@emotion/react"

import "@docsearch/css"

type Styles = typeof Global.prototype.props.styles
const styles: Styles = (theme: Theme) => {
  const { space, radii, borders, fontSizes, fontWeights } = theme
  return css`
    /* Search button on desktop nav bar */
    .DocSearch-Button {
      border-radius: ${radii["base"]};
      border: ${borders["1px"]};
      border-color: var(--eth-colors-disabled);
      height: 42px;
      background: none;
      margin: 0;
      padding-inline: ${space["3"]};
      gap: ${space["4"]};
      align-items: center;
      --docsearch-searchbox-shadow: inset 0 0 0 1px
        var(--eth-colors-primaryHighContrast);
    }

    .DocSearch-Button:active,
    .DocSearch-Button:focus,
    .DocSearch-Button:hover {
      box-shadow: none;
      outline: ${borders["1px"]};
      outline-color: var(--eth-colors-primaryHover);
      background: none;
    }
    .DocSearch-Button:hover .DocSearch-Button-Keys kbd {
      color: var(--eth-colors-disabled);
      border-color: var(--eth-colors-disabled);
    }

    .DocSearch-Button-Keys {
      display: flex;
      min-width: 44px;
      gap: ${space["1"]};
      align-items: center !important;
      margin: 0;
      margin-top: ${space["0.5"]};
      padding: 0;
      height: 100%;
    }

    .DocSearch-Button-Keys kbd {
      background: none;
      border: ${borders["1px"]};
      border-color: var(--eth-colors-disabled);
      color: var(--eth-colors-disabled);
      box-shadow: none;
      padding: ${space["0.5"]};
      margin: 0;
      height: ${space["5"]};
      width: ${space["5"]};
      font-size: ${fontSizes["s"]};
      text-transform: lowercase;
    }

    .DocSearch-Button-Keys kbd:first-of-type {
      font-size: ${fontSizes["m"]};
      padding-top: ${space["1"]};
    }

    .DocSearch-Button-Container svg {
      --icon-size: 0.875rem;
      width: var(--icon-size);
      height: var(--icon-size);
    }

    .DocSearch-Button-Placeholder {
      text-transform: lowercase;
      color: var(--eth-colors-body);
      font-weight: ${fontWeights["normal"]};
    }

    /**
    * Algolia search modal styling
    */
    .DocSearch-Modal {
      --docsearch-modal-background: var(--eth-colors-background);
      --docsearch-searchbox-height: fit-content;
      --docsearch-highlight-color: var(--eth-colors-primaryHover);
      --docsearch-modal-width: 650px;
      --docsearch-hit-height: fit-content;
    }

    /* Modal header */
    .DocSearch-SearchBar {
      padding: ${space["8"]};
      padding-bottom: ${space["4"]};
    }

    .DocSearch-SearchBar form {
      padding-block: ${space["3"]};
      --docsearch-searchbox-shadow: inset 0 0 0 1px
        var(--eth-colors-primaryHighContrast);
      background: var(--eth-colors-neutral);
    }

    .DocSearch-SearchBar label {
      --size: ${space["4"]};
      height: var(--size);
      width: var(--size);
      color: var(--eth-colors-primaryHighContrast);
    }

    .DocSearch-SearchBar input {
      font-size: ${fontSizes["l"]};
      color: var(--eth-colors-primaryHighContrast);
    }

    .DocSearch-SearchBar button {
      color: var(--eth-colors-primaryHighContrast);
    }

    .DocSearch-SearchBar button:hover {
      color: var(--eth-colors-primary);
    }

    .DocSearch-Container--Stalled .DocSearch-MagnifierLabel,
    .DocSearch-Container--Stalled .DocSearch-LoadingIndicator {
      color: var(--eth-colors-primaryHighContrast);
    }

    /* Modal body */
    .DocSearch-Dropdown {
      padding-inline-start: ${space["8"]};
      padding-inline-end: ${space["4"]} !important;
      max-height: calc(100vh - 16rem);
      overflow-y: scroll;
    }

    .DocSearch-Hit-source {
      line-height: ${space["6"]};
      color: var(--eth-colors-body);
      padding-bottom: ${space["0.5"]};
    }

    .DocSearch-Hit {
      padding-bottom: 0;
    }

    .DocSearch-Hit-content-wrapper {
      white-space: normal;
    }

    .DocSearch-Hit a {
      border-radius: 0;
      --docsearch-hit-shadow: none;
      border-bottom: ${borders["1px"]};
      border-color: var(--eth-colors-disabled);
      background: none;
      padding-block: ${space["3"]};
    }

    .DocSearch-Hit[aria-selected="true"] a {
      background: var(--eth-colors-primaryHover);
      box-shadow: 4px 4px 0 0 var(--eth-colors-primaryLight);
      border-bottom: transparent;
      --docsearch-hit-active-color: var(--eth-colors-background);
    }

    .DocSearch-Hit-action-button:focus path,
    .DocSearch-Hit-action-button:hover path {
      fill: var(--eth-colors-switchBackground);
    }

    .DocSearch-Hit-icon {
      color: var(--eth-colors-body);
    }

    .DocSearch-Footer {
      --docsearch-footer-height: ${space["10"]};
    }

    /* Modal footer */
    .DocSearch-Commands kbd {
      background: var(--eth-colors-button-background);
      border: ${borders["1px"]};
      border-color: var(--eth-colors-primary);
      color: var(--eth-colors-primary);
      box-shadow: none;
      --size: ${space["4"]};
      height: var(--size);
      width: var(--size);
      padding: 0;
      display: grid;
      place-items: center;
      border-radius: ${radii["base"]};
    }

    .DocSearch-Footer {
      background: var(--eth-colors-primaryLowContrast);
      --docsearch-logo-colors: var(--eth-colors-bodyLight);
      --docsearch-footer-shadow: none;
      border-top: ${borders["2px"]};
      border-color: var(--eth-colors-primary);
    }

    .DocSearch-Footer ul {
      gap: ${space["4"]};
    }

    .DocSearch-Footer ul li {
      margin: 0 !important;
    }

    .DocSearch-Footer span {
      color: var(--eth-colors-body);
      text-transform: lowercase;
    }

    .DocSearch-Logo a span {
      color: var(--eth-colors-bodyLight);
      text-transform: uppercase;
    }

    svg[aria-label="Algolia"] * {
      fill: var(--eth-colors-bodyLight);
    }

    /* Mobile modal styling */
    @media (max-width: 768px) {
      .DocSearch-Container {
        position: fixed;
        inset: 0;
        z-index: 1100;
      }

      .DocSearch-Modal {
        position: fixed;
        --inset: ${space["4"]};
        inset: var(--inset);
        max-width: calc(100vw - 2 * var(--inset));
        max-height: calc(100vh - 2 * var(--inset));
        border-radius: ${radii["base"]};
        overflow: hidden;
      }

      .DocSearch-SearchBar {
        padding: ${space["4"]};
      }

      .DocSearch-SearchBar input {
        font-size: ${fontSizes["m"]};
      }

      .DocSearch-Cancel {
        color: var(--eth-colors-primary);
      }

      .DocSearch-Dropdown {
        padding-inline-start: ${space["4"]};
        padding-inline-end: ${space["2"]} !important;
        --search-form-height: 75px;
        max-height: calc(
          100vh - var(--search-form-height) - var(--docsearch-footer-height) - 2 *
            var(--inset)
        );
        overflow-y: scroll;
      }
    }
  `
}

const DocSearchStyles = () => <Global styles={styles} />

export default DocSearchStyles

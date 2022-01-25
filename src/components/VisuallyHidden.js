import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

// "Accessibility/SEO Friendly CSS Hiding"
// Source: https://css-tricks.com/snippets/css/accessibilityseo-friendly-css-hiding/
const Container = styled.span`
  border: 0;
  clip: rect(1px, 1px, 1px, 1px);
  clip-path: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
  word-wrap: normal !important;
  &:focus {
    background-color: #eee;
    clip: auto !important;
    clip-path: none;
    color: #444;
    display: block;
    font-size: 1em;
    height: auto;
    left: 5px;
    line-height: normal;
    padding: 15px 23px 14px;
    text-decoration: none;
    top: 5px;
    width: auto;
    z-index: 100000;
  }
`

const VisuallyHidden = (props) =>
  props.isHidden ? <Container>{props.children}</Container> : props.children

VisuallyHidden.propTypes = {
  isHidden: PropTypes.bool,
}

VisuallyHidden.defaultProps = {
  isHidden: false,
}

export default VisuallyHidden

import React from "react"
import { FormattedMessage } from "gatsby-plugin-intl"
import { getDefaultMessage } from "../utils/translations"

// Wrapper on <FormattedMessage /> to always fallback to English
// Use this component for any user-facing string
const Translation = ({ id }) => (
  <FormattedMessage id={id} defaultMessage={getDefaultMessage(id)} />
)

export default Translation

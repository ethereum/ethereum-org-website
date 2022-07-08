import React from "react"
import { FormattedMessage } from "react-intl"
import { getDefaultMessage, TranslationKey } from "../utils/translations"

// Wrapper on <FormattedMessage /> to always fallback to English
// Use this component for any user-facing string
const Translation = ({ id }: { id: TranslationKey }) => (
  <FormattedMessage id={id} defaultMessage={getDefaultMessage(id)} />
)

export default Translation

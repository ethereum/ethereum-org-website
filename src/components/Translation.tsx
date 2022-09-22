import React from "react"
import { Trans } from "gatsby-plugin-react-i18next"
import { TranslationKey } from "../utils/translations"

// Wrapper on <FormattedHTMLMessage /> to always fallback to English
// Use this component for any user-facing string
const Translation = ({ id }: { id: TranslationKey }) => <Trans>{id}</Trans>

export default Translation

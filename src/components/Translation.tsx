import React from "react"
import { Trans } from "gatsby-plugin-react-i18next"

interface Props extends React.ComponentProps<typeof Trans> {
  id: string
}

// Wrapper on <FormattedHTMLMessage /> to always fallback to English
// Use this component for any user-facing string
const Translation = ({ id, ...rest }: Props) => <Trans i18nKey={id} {...rest} />

export default Translation

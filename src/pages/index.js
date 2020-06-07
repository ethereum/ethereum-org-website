import React from "react"
import { useIntl, Link, FormattedMessage } from "gatsby-plugin-intl"

import { getLangVersion } from "../utils/translations"

const Home = () => {
  const intl = useIntl()
  const langVersion = getLangVersion(intl.locale)

  return (
    <div>
      {/* <SEO title={intl.formatMessage({ id: "title" })} /> */}
      <h1>
        <FormattedMessage id="page-home-section-beginners-item-one" />
      </h1>
      <p>
        <Link to="/what-is-ethereum/">
          <FormattedMessage id="page-home-section-beginners-item-two" />
        </Link>
      </p>
      <p>
        {langVersion >= 1.1 && (
          <Link to="/build/">
            <FormattedMessage id="page-build-title" />
          </Link>
        )}
      </p>
    </div>
  )
}

export default Home

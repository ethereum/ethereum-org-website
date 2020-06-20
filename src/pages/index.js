import React from "react"
import { useIntl, Link } from "gatsby-plugin-intl"

import { getLangContentVersion } from "../utils/translations"
import SEO from "../components/SEO"
import Translation from "../components/Translation"

// TODO implement
const HomePage = () => {
  const intl = useIntl()
  const contentVersion = getLangContentVersion(intl.locale)

  return (
    <div>
      <SEO
        title={intl.formatMessage({ id: "page-home-meta-title" })}
        description={intl.formatMessage({ id: "page-home-meta-description" })}
      />
      <h1>
        <Translation id="page-home-section-beginners-item-one" />
      </h1>
      <p>
        <Link to="/what-is-ethereum/">
          <Translation id="page-home-section-beginners-item-two" />
        </Link>
      </p>
      <p>
        {contentVersion >= 1.1 && (
          <Link to="/build/">
            <Translation id="page-build-title" />
          </Link>
        )}
      </p>
    </div>
  )
}

export default HomePage
